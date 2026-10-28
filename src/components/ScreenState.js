import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/theme';

export function LoadingState({ label = 'Cargando productos...' }) {
  return <View style={styles.wrap}><ActivityIndicator size="large" color={colors.blue} /><Text style={styles.text}>{label}</Text></View>;
}

export function EmptyState({ title, message }) {
  return <View style={styles.wrap}><Text style={styles.emoji}>♡</Text><Text style={styles.title}>{title}</Text><Text style={styles.text}>{message}</Text></View>;
}

export function ErrorState({ message, onRetry }) {
  return <View style={styles.wrap}><Text style={styles.title}>No pudimos cargar los productos</Text><Text style={styles.text}>{message}</Text><Pressable style={styles.button} onPress={onRetry}><Text style={styles.buttonText}>Reintentar</Text></Pressable></View>;
}

const styles = StyleSheet.create({
  wrap: { padding: 28, alignItems: 'center', justifyContent: 'center', gap: 12, minHeight: 180 },
  emoji: { fontSize: 46, color: colors.blue },
  title: { fontSize: 18, fontWeight: '800', color: colors.navy, textAlign: 'center' },
  text: { color: colors.muted, textAlign: 'center', lineHeight: 21 },
  button: { backgroundColor: colors.blue, paddingHorizontal: 20, paddingVertical: 11, borderRadius: 12, marginTop: 4 },
  buttonText: { color: colors.white, fontWeight: '800' }
});
