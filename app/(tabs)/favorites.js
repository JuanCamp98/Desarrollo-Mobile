import { useCallback } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../../src/components/ProductCard';
import SwipeRow from '../../src/components/SwipeRow';
import { EmptyState } from '../../src/components/ScreenState';
import { useFavorites } from '../../src/context/FavoritesContext';
import { colors } from '../../src/styles/theme';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, ready, isFavorite, toggleFavorite, removeFavorite, reorderFavorites } = useFavorites();

  const confirmDelete = useCallback((item) => {
    Alert.alert('Quitar favorito', `¿Querés quitar "${item.name}" de favoritos?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => removeFavorite(item.id) }
    ]);
  }, [removeFavorite]);

  const moveFavorite = useCallback((index, direction) => {
    const destination = index + direction;
    if (destination < 0 || destination >= favorites.length) return;

    const next = [...favorites];
    [next[index], next[destination]] = [next[destination], next[index]];
    reorderFavorites(next);
  }, [favorites, reorderFavorites]);

  const renderItem = ({ item, index }) => (
    <View style={styles.itemRow}>
      <View style={styles.productArea}>
        <SwipeRow onDelete={() => confirmDelete(item)}>
          <ProductCard
            product={item}
            favorite={isFavorite(item.id)}
            onToggleFavorite={() => toggleFavorite(item)}
            onPress={() => router.push({ pathname: '/product/[id]', params: { id: item.id } })}
          />
        </SwipeRow>
      </View>
      <View style={styles.moveControls}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Mover ${item.name} hacia arriba`}
          disabled={index === 0}
          onPress={() => moveFavorite(index, -1)}
          style={[styles.moveButton, index === 0 && styles.moveButtonDisabled]}
        >
          <Text style={styles.moveIcon}>▲</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Mover ${item.name} hacia abajo`}
          disabled={index === favorites.length - 1}
          onPress={() => moveFavorite(index, 1)}
          style={[styles.moveButton, index === favorites.length - 1 && styles.moveButtonDisabled]}
        >
          <Text style={styles.moveIcon}>▼</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <View><Text style={styles.eyebrow}>MI TIENDA</Text><Text style={styles.title}>Favoritos</Text></View>
        <Text style={styles.count}>{favorites.length} guardados</Text>
      </View>
      {!ready ? <Text style={styles.helper}>Recuperando favoritos...</Text> : null}
      {ready && favorites.length === 0 ? (
        <EmptyState title="Todavía no tenés favoritos" message="Tocá la estrella de un producto en el catálogo para guardarlo acá." />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<Text style={styles.helper}>Deslizá un producto para eliminarlo. Usá las flechas para cambiar el orden.</Text>}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 18 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, paddingBottom: 18 },
  eyebrow: { color: colors.blue, fontSize: 12, fontWeight: '900', letterSpacing: 2 },
  title: { color: colors.navy, fontSize: 32, fontWeight: '900', marginTop: 2 },
  count: { color: colors.blue, fontWeight: '800', fontSize: 14 },
  helper: { color: colors.muted, fontSize: 13, lineHeight: 19, marginBottom: 14 },
  list: { paddingBottom: 24 },
  itemRow: { flexDirection: 'row', alignItems: 'stretch', gap: 7 },
  productArea: { flex: 1 },
  moveControls: { width: 44, alignItems: 'stretch', justifyContent: 'center', gap: 6, marginBottom: 14 },
  moveButton: { flex: 1, minHeight: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E4EEFC', borderRadius: 12 },
  moveButtonDisabled: { opacity: 0.4 },
  moveIcon: { fontSize: 15, fontWeight: '900', color: colors.blue }
});
