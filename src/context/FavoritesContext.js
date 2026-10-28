import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

const FavoritesContext = createContext(null);
const STORAGE_KEY = '@mi-tienda:favoritos';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function loadFavorites() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setFavorites(JSON.parse(saved));
      } catch (error) {
        Alert.alert('Favoritos', 'No se pudieron recuperar los favoritos guardados.');
      } finally {
        setReady(true);
      }
    }
    loadFavorites();
  }, []);

  const commitFavorites = useCallback(async (next) => {
    const previous = favorites;
    setFavorites(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (error) {
      setFavorites(previous);
      Alert.alert('No se guardó', 'Volvé a intentar guardar los cambios.');
    }
  }, [favorites]);

  const isFavorite = useCallback((id) => favorites.some((item) => String(item.id) === String(id)), [favorites]);

  const toggleFavorite = useCallback((product) => {
    const exists = favorites.some((item) => String(item.id) === String(product.id));
    const next = exists
      ? favorites.filter((item) => String(item.id) !== String(product.id))
      : [...favorites, product];
    commitFavorites(next);
  }, [favorites, commitFavorites]);

  const removeFavorite = useCallback((id) => {
    commitFavorites(favorites.filter((item) => String(item.id) !== String(id)));
  }, [favorites, commitFavorites]);

  const reorderFavorites = useCallback((next) => commitFavorites(next), [commitFavorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, ready, isFavorite, toggleFavorite, removeFavorite, reorderFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
  return context;
}
