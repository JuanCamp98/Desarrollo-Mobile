import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';

import { useCart } from '../../src/context/CartContext';
import { colors, formatPrice } from '../../src/styles/theme';

export default function CartScreen() {
  const router = useRouter();

  const {
    items,
    ready,
    changeQuantity,
    removeFromCart,
    clearCart,
    total,
  } = useCart();

  function finishPurchase() {
    if (items.length === 0) {
      Alert.alert('Carrito vacío', 'Agregá algún producto antes de comprar.');
      return;
    }

    Alert.alert(
      '¡Compra exitosa!',
      `Tu compra fue realizada correctamente.\nTotal: ${formatPrice(total)}`,
      [
        {
          text: 'Volver al catálogo',
          onPress: () => {
            clearCart();
            router.replace('/(tabs)');
          },
        },
      ]
    );
  }

  if (!ready) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>Cargando carrito...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi carrito</Text>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
          <Text style={styles.message}>
            Agregá productos desde el catálogo para verlos acá.
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={() => router.replace('/(tabs)')}
          >
            <Text style={styles.primaryButtonText}>
              Ir al catálogo
            </Text>
          </Pressable>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                  resizeMode="cover"
                />

                <View style={styles.itemInfo}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {item.name}
                  </Text>

                  <Text style={styles.price}>
                    {formatPrice(item.price)}
                  </Text>

                  <View style={styles.quantityRow}>
                    <Pressable
                      style={styles.quantityButton}
                      onPress={() => changeQuantity(item.id, -1)}
                    >
                      <Text style={styles.quantityButtonText}>−</Text>
                    </Pressable>

                    <Text style={styles.quantity}>
                      {item.quantity}
                    </Text>

                    <Pressable
                      style={styles.quantityButton}
                      onPress={() => changeQuantity(item.id, 1)}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </Pressable>
                  </View>

                  <Pressable
                    onPress={() => removeFromCart(item.id)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeText}>Eliminar</Text>
                  </Pressable>
                </View>
              </View>
            )}
          />

          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalPrice}>
                {formatPrice(total)}
              </Text>
            </View>

            <Pressable
              style={styles.primaryButton}
              onPress={finishPurchase}
            >
              <Text style={styles.primaryButtonText}>
                Finalizar compra
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.navy,
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: colors.blueLight,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  image: {
    width: 100,
    height: 115,
    borderRadius: 10,
    backgroundColor: '#D7E0EB',
  },
  itemInfo: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.navy,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.blue,
    marginTop: 5,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 14,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  quantityButtonText: {
    fontSize: 21,
    fontWeight: '700',
    color: colors.blue,
  },
  quantity: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.navy,
  },
  removeButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingVertical: 4,
  },
  removeText: {
    color: '#D92D60',
    fontSize: 13,
    fontWeight: '700',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#E3EAF3',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.navy,
  },
  totalPrice: {
    fontSize: 23,
    fontWeight: '800',
    color: colors.blue,
  },
  primaryButton: {
    backgroundColor: colors.blue,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingBottom: 80,
  },
  emptyTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: colors.navy,
    marginBottom: 8,
  },
  message: {
    color: colors.muted,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});