import { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../../src/context/UserContext';
import { colors } from '../../src/styles/theme';

export default function ProfileScreen() {
  const { user, updateUser, ready } = useUser();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const saveProfile = () => {
    updateUser({ name: name.trim() || 'Tu nombre', email: email.trim() || 'tu@email.com' });
    Alert.alert('Perfil guardado', 'Tus datos se guardaron en el dispositivo.');
  };

  async function choosePhoto() {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permiso necesario', 'Permití el acceso a la galería para elegir una foto.');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.8 });
      if (result.canceled) return;
      updateUser({ photo: result.assets[0].uri });
    } catch (error) {
      Alert.alert('Galería', 'No se pudo abrir la galería.');
    }
  }

  async function takePhoto() {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permiso necesario', 'Permití el acceso a la cámara para sacar una foto.');
        return;
      }
      const result = await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], quality: 0.8 });
      if (result.canceled) return;
      updateUser({ photo: result.assets[0].uri });
    } catch (error) {
      Alert.alert('Cámara', 'No se pudo abrir la cámara. Probá en un dispositivo físico.');
    }
  }

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.eyebrow}>MI TIENDA</Text>
          <Text style={styles.title}>Perfil</Text>
          <View style={styles.profileCard}>
            <Pressable onPress={choosePhoto} style={styles.avatarWrap}>
              {user.photo ? <Image source={{ uri: user.photo }} style={styles.avatar} /> : <View style={styles.avatarPlaceholder}><Text style={styles.avatarLetter}>{(user.name || 'T').slice(0, 1).toUpperCase()}</Text></View>}
              <View style={styles.cameraBadge}><Text style={styles.cameraBadgeText}>＋</Text></View>
            </Pressable>
            <Text style={styles.profileName}>{user.name || 'Tu nombre'}</Text>
            <Text style={styles.profileEmail}>{user.email || 'tu@email.com'}</Text>
            <View style={styles.photoActions}>
              <Pressable style={styles.secondaryButton} onPress={choosePhoto}><Text style={styles.secondaryText}>Elegir imagen</Text></Pressable>
              <Pressable style={styles.secondaryButton} onPress={takePhoto}><Text style={styles.secondaryText}>Sacar foto</Text></Pressable>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Tus datos</Text>
          <Text style={styles.label}>Nombre</Text>
          <TextInput value={name} onChangeText={setName} placeholder="Tu nombre" style={styles.input} autoCapitalize="words" />
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput value={email} onChangeText={setEmail} placeholder="tu@email.com" style={styles.input} keyboardType="email-address" autoCapitalize="none" />
          <Pressable style={styles.saveButton} onPress={saveProfile}><Text style={styles.saveText}>Guardar cambios</Text></Pressable>
          <Text style={styles.note}>{ready ? 'Los datos se guardan localmente en este dispositivo.' : 'Cargando perfil guardado...'}</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 22, paddingTop: 10, paddingBottom: 32 },
  eyebrow: { color: colors.blue, fontSize: 12, fontWeight: '900', letterSpacing: 2 },
  title: { color: colors.navy, fontSize: 34, fontWeight: '900', marginBottom: 20 },
  profileCard: { backgroundColor: colors.white, borderRadius: 22, alignItems: 'center', padding: 22, borderWidth: 1, borderColor: colors.border },
  avatarWrap: { marginBottom: 12, position: 'relative' },
  avatar: { width: 104, height: 104, borderRadius: 52, backgroundColor: colors.blueLight },
  avatarPlaceholder: { width: 104, height: 104, borderRadius: 52, backgroundColor: colors.blueLight, alignItems: 'center', justifyContent: 'center' },
  avatarLetter: { color: colors.blue, fontSize: 42, fontWeight: '900' },
  cameraBadge: { position: 'absolute', right: 0, bottom: 0, width: 32, height: 32, borderRadius: 16, backgroundColor: colors.blue, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#fff' },
  cameraBadgeText: { color: '#fff', fontSize: 20, fontWeight: '900', lineHeight: 22 },
  profileName: { color: colors.navy, fontSize: 20, fontWeight: '900' },
  profileEmail: { color: colors.muted, marginTop: 4 },
  photoActions: { flexDirection: 'row', gap: 8, marginTop: 18, flexWrap: 'wrap', justifyContent: 'center' },
  secondaryButton: { borderWidth: 1, borderColor: colors.blue, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 13 },
  secondaryText: { color: colors.blue, fontWeight: '800', fontSize: 13 },
  sectionTitle: { color: colors.navy, fontSize: 21, fontWeight: '900', marginTop: 24, marginBottom: 14 },
  label: { color: colors.text, fontSize: 14, fontWeight: '800', marginBottom: 7 },
  input: { backgroundColor: '#fff', borderColor: colors.border, borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 14, color: colors.text, fontSize: 16 },
  saveButton: { backgroundColor: colors.blue, borderRadius: 14, alignItems: 'center', paddingVertical: 15, marginTop: 4 },
  saveText: { color: '#fff', fontSize: 16, fontWeight: '900' },
  note: { color: colors.muted, textAlign: 'center', fontSize: 12, marginTop: 14 }
});
