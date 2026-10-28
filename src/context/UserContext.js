import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

const UserContext = createContext(null);
const STORAGE_KEY = '@mi-tienda:profile';
const initialUser = { name: 'Tu nombre', email: 'tu@email.com', photo: '' };

export function UserProvider({ children }) {
  const [user, setUser] = useState(initialUser);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setUser({ ...initialUser, ...JSON.parse(saved) });
      } catch (error) {
        Alert.alert('Perfil', 'No se pudieron recuperar los datos guardados.');
      } finally {
        setReady(true);
      }
    }
    loadUser();
  }, []);

  useEffect(() => {
    if (!ready) return;
    async function saveUser() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } catch (error) {
        Alert.alert('Perfil', 'No se pudieron guardar los cambios.');
      }
    }
    saveUser();
  }, [user, ready]);

  const updateUser = (changes) => setUser((current) => ({ ...current, ...changes }));

  return (
    <UserContext.Provider value={{ user, updateUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser debe usarse dentro de UserProvider');
  return context;
}
