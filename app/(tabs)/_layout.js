import { Tabs } from 'expo-router';
import { Text } from 'react-native';

import { colors } from '../../src/styles/theme';
import { useCart } from '../../src/context/CartContext';

function TabIcon({ children, focused }) {
  return (
    <Text
      style={{
        fontSize: 21,
        color: focused ? colors.blue : '#8A929E',
      }}
    >
      {children}
    </Text>
  );
}

export default function TabsLayout() {
  const { itemCount } = useCart();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: '#8A929E',
        tabBarStyle: {
          height: 72,
          paddingTop: 8,
          paddingBottom: 12,
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E3EAF3',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Catálogo',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused}>▾</TabIcon>
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused}>♥</TabIcon>
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: itemCount ? `Carrito (${itemCount})` : 'Carrito',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused}>🛒</TabIcon>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused}>●</TabIcon>
          ),
        }}
      />
    </Tabs>
  );
}