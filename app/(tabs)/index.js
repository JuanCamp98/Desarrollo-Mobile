import { useMemo } from 'react';
import { FlatList, ImageBackground, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../../src/components/ProductCard';
import { ErrorState, LoadingState } from '../../src/components/ScreenState';
import { useFavorites } from '../../src/context/FavoritesContext';
import useFetch from '../../src/hooks/useFetch';
import { demoProducts, normalizeProduct, productsUrl } from '../../src/api/products';
import { colors } from '../../src/styles/theme';

export default function CatalogScreen() {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { data, loading, error, refetch } = useFetch(productsUrl);
  const products = useMemo(() => {
    const source = Array.isArray(data) && data.length ? data : demoProducts;
    return source.map(normalizeProduct);
  }, [data]);
  const usingDemo = !productsUrl || Boolean(error);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            favorite={isFavorite(item.id)}
            onToggleFavorite={() => toggleFavorite(item)}
            onPress={() => router.push({ pathname: '/product/[id]', params: { id: item.id } })}
          />
        )}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} tintColor={colors.blue} />}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View><Text style={styles.eyebrow}>MI TIENDA</Text><Text style={styles.title}>Catálogo</Text></View>
              <Text style={styles.count}>{products.length} artículos</Text>
            </View>
            <ImageBackground
              source={{ uri: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200' }}
              style={styles.hero}
              imageStyle={styles.heroImage}
              resizeMode="cover"
            >
              <View style={styles.overlay}>
                <Text style={styles.heroTitle}>Elegí tu próximo favorito</Text>
                <Text style={styles.heroText}>Diseño simple. Productos útiles.</Text>
              </View>
            </ImageBackground>
            <Text style={styles.sectionTitle}>Destacados</Text>
            {loading && !data ? <LoadingState /> : null}
            {error && productsUrl ? <View style={styles.apiNotice}><Text style={styles.apiNoticeText}>Mostrando productos de ejemplo porque la API no respondió. Podés reintentar deslizando hacia abajo.</Text></View> : null}
            {usingDemo && !productsUrl ? <View style={styles.apiNotice}><Text style={styles.apiNoticeText}>Datos de demostración: configurá la URL de mockAPI en src/api/config.js para conectar tu API.</Text></View> : null}
          </>
        }
        ListEmptyComponent={error ? <ErrorState message={error} onRetry={refetch} /> : null}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 26 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  eyebrow: { color: colors.blue, fontSize: 12, fontWeight: '900', letterSpacing: 2 },
  title: { color: colors.navy, fontSize: 35, fontWeight: '900', marginTop: 2 },
  count: { color: colors.blue, fontSize: 16, fontWeight: '800' },
  hero: { height: 210, justifyContent: 'flex-end', marginBottom: 26 },
  heroImage: { borderRadius: 22 },
  overlay: { backgroundColor: 'rgba(16,42,67,0.60)', padding: 22, borderRadius: 22 },
  heroTitle: { color: '#fff', fontSize: 29, lineHeight: 34, fontWeight: '900', maxWidth: 340 },
  heroText: { color: '#EAF3FF', fontSize: 15, marginTop: 8 },
  sectionTitle: { color: colors.navy, fontSize: 24, fontWeight: '900', marginBottom: 16 },
  apiNotice: { backgroundColor: '#FFF5D6', borderRadius: 12, padding: 11, marginBottom: 14 },
  apiNoticeText: { color: '#795C10', fontSize: 12, lineHeight: 17 }
});
