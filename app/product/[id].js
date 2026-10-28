
import { useMemo } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { demoProducts, normalizeProduct } from '../../src/api/products';
import { useFavorites } from '../../src/context/FavoritesContext';
import { useCart } from '../../src/context/CartContext';
import { colors, formatPrice } from '../../src/styles/theme';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();

  const product = useMemo(() => {
    const item = [...demoProducts].find(
      (entry) => String(entry.id) === String(id)
    );

    return item ? normalizeProduct(item) : null;
  }, [id]);

  if (!product) {
    return (
      <SafeAreaView style={styles.screen}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>‹ Volver</Text>
        </Pressable>

        <Text style={styles.title}>
          No encontramos el producto
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.back}>‹ Volver al catálogo</Text>
        </Pressable>

        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <Text style={styles.category}>
          {product.category}
        </Text>

        <Text style={styles.title}>
          {product.name}
        </Text>

        <Text style={styles.price}>
          {formatPrice(product.price)}
        </Text>

        <Text style={styles.description}>
          {product.description}
        </Text>

        <Pressable
          style={styles.cartButton}
          onPress={() => addToCart(product)}
        >
          <Text style={styles.buttonText}>
            🛒 Agregar al carrito
          </Text>
        </Pressable>

        <Pressable
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(product)}
        >
          <Text style={styles.favoriteButtonText}>
            {isFavorite(product.id)
              ? '♥ Quitar de favoritos'
              : '♡ Agregar a favoritos'}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 36,
  },
  backButton: {
    marginBottom: 16,
  },
  back: {
    color: colors.blue,
    fontWeight: '800',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 22,
    backgroundColor: colors.blueLight,
  },
  category: {
    color: colors.blue,
    fontWeight: '800',
    marginTop: 22,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    color: colors.navy,
    fontSize: 30,
    fontWeight: '900',
    marginTop: 8,
  },
  price: {
    color: colors.blue,
    fontSize: 25,
    fontWeight: '900',
    marginTop: 12,
  },
  description: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
  },
  cartButton: {
    backgroundColor: colors.blue,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 28,
  },
  favoriteButton: {
    backgroundColor: colors.blueLight,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  favoriteButtonText: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: '900',
  },
});
