import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './HomeStackScreen'; // Assurez-vous que le chemin est correct
import FavoritesStackScreen from './FavoritesStackScreen'; // Assurez-vous que le chemin est correct
import NonAlcoholicStackScreen from './NonAlcoholicStackScreen'; // Assurez-vous que le chemin est correct
import Ionicons from 'react-native-vector-icons/Ionicons'; // Assurez-vous d'avoir installé react-native-vector-icons

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'HomeTab') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'FavoritesTab') {
              iconName = focused ? 'ios-heart' : 'ios-heart-outline';
            } else if (route.name === 'NonAlcoholicTab') {
              iconName = focused ? 'ios-water' : 'ios-water-outline';
            }
            // Vous pouvez ajouter d'autres conditions ici pour d'autres onglets
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="HomeTab" component={HomeStackScreen} options={{ title: 'Tous' }} />
        <Tab.Screen name="FavoritesTab" component={FavoritesStackScreen} options={{ title: 'Favoris' }} />
        <Tab.Screen name="NonAlcoholicTab" component={NonAlcoholicStackScreen} options={{ title: 'Sans Alcool' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
