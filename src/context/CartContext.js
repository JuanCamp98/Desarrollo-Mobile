
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Alert } from 'react-native';

const CartContext = createContext(null);
const STORAGE_KEY = '@mi-tienda:carrito';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  // Cargar el carrito guardado al iniciar la aplicación.
  useEffect(() => {
    let active = true;
    let timeoutId;

    async function loadCart() {
      try {
        const saved = await Promise.race([
          AsyncStorage.getItem(STORAGE_KEY),
          new Promise((_, reject) => {
            timeoutId = setTimeout(() => {
              reject(new Error('Tiempo de espera agotado'));
            }, 5000);
          }),
        ]);

        if (active && saved) {
          const parsed = JSON.parse(saved);

          if (Array.isArray(parsed)) {
            setItems(parsed);
          }
        }
      } catch (error) {
        if (active) {
          Alert.alert(
            'Carrito',
            'No se pudieron recuperar los datos guardados. Podés seguir usando el carrito.'
          );
        }
      } finally {
        clearTimeout(timeoutId);

        if (active) {
          setReady(true);
        }
      }
    }

    loadCart();

    return () => {
      active = false;
      clearTimeout(timeoutId);
    };
  }, []);

  // Guardar los cambios del carrito.
  const persist = useCallback(async (nextItems) => {
    setItems(nextItems);

    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(nextItems)
      );
    } catch {
      Alert.alert(
        'Carrito',
        'No se pudieron guardar los cambios.'
      );
    }
  }, []);

  // Agregar un producto o aumentar su cantidad.
  const addToCart = useCallback(
    (product) => {
      if (!ready) {
        Alert.alert(
          'Carrito',
          'El carrito todavía se está inicializando. Intentá de nuevo en un momento.'
        );
        return;
      }

      const existing = items.find(
        (item) => String(item.id) === String(product.id)
      );

      const nextItems = existing
        ? items.map((item) =>
            String(item.id) === String(product.id)
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          )
        : [
            ...items,
            {
              ...product,
              quantity: 1,
            },
          ];

      persist(nextItems);

      Alert.alert(
        'Agregado al carrito',
        `${product.name} se agregó correctamente.`
      );
    },
    [items, persist, ready]
  );

  // Aumentar o disminuir la cantidad.
  const changeQuantity = useCallback(
    (id, delta) => {
      const nextItems = items
        .map((item) =>
          String(item.id) === String(id)
            ? {
                ...item,
                quantity: item.quantity + delta,
              }
            : item
        )
        .filter((item) => item.quantity > 0);

      persist(nextItems);
    },
    [items, persist]
  );

  // Eliminar un producto específico.
  const removeFromCart = useCallback(
    (id) => {
      const nextItems = items.filter(
        (item) => String(item.id) !== String(id)
      );

      persist(nextItems);
    },
    [items, persist]
  );

  // Vaciar el carrito después de una compra simulada.
  const clearCart = useCallback(() => {
    persist([]);
  }, [persist]);

  // Cantidad total de unidades.
  const itemCount = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.quantity,
        0
      ),
    [items]
  );

  // Importe total de la compra.
  const total = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum +
          Number(item.price || 0) * item.quantity,
        0
      ),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        ready,
        addToCart,
        changeQuantity,
        removeFromCart,
        clearCart,
        itemCount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      'useCart debe usarse dentro de CartProvider'
    );
  }

  return context;
}
