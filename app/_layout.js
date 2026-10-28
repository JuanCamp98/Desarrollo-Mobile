import 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { FavoritesProvider } from '../src/context/FavoritesContext';
import { UserProvider } from '../src/context/UserContext';
import { CartProvider } from '../src/context/CartContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <FavoritesProvider>
          <CartProvider>
            <UserProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen
                  name="product/[id]"
                  options={{ presentation: 'card' }}
                />
              </Stack>
            </UserProvider>
          </CartProvider>
        </FavoritesProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}