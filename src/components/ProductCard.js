import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, formatPrice } from '../styles/theme';
import { useCart } from '../context/CartContext';

export default function ProductCard({
  product,
  favorite,
  onToggleFavorite,
  onPress,
}) {
  const { addToCart } = useCart();

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <View style={styles.topLine}>
          <Text numberOfLines={2} style={styles.name}>
            {product.name}
          </Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'
            }
            onPress={(event) => {
              event.stopPropagation?.();
              onToggleFavorite();
            }}
            hitSlop={8}
            style={styles.heartButton}
          >
            <Text
              style={[
                styles.heart,
                favorite && styles.heartActive,
              ]}
            >
              {favorite ? '♥' : '☆'}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.price}>
          {formatPrice(product.price)}
        </Text>

        <Text style={styles.category}>
          {product.category}
        </Text>

        <Pressable
          style={styles.addButton}
          onPress={(event) => {
            event.stopPropagation?.();
            addToCart(product);
          }}
        >
          <Text style={styles.addButtonText}>
            + Agregar al carrito
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 136,
    backgroundColor: colors.blueLight,
    borderRadius: 18,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 14,
  },
  image: {
    width: '36%',
    minHeight: 136,
    backgroundColor: '#D7E0EB',
  },
  info: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 16,
    justifyContent: 'center',
  },
  topLine: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  name: {
    flex: 1,
    color: colors.navy,
    fontSize: 18,
    fontWeight: '800',
  },
  heartButton: {
    paddingHorizontal: 2,
    paddingTop: 1,
  },
  heart: {
    fontSize: 25,
    lineHeight: 28,
    color: colors.navy,
  },
  heartActive: {
    color: '#D92D60',
  },
  price: {
    color: colors.blue,
    fontWeight: '800',
    fontSize: 19,
    marginTop: 8,
  },
  category: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 3,
  },
  addButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.blue,
    borderRadius: 10,
    paddingHorizontal: 11,
    paddingVertical: 8,
    marginTop: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
});