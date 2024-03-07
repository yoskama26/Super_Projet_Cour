// AppTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import NonAlcoholicCocktailsScreen from './NonAlcoholicCocktailsScreen';

const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }} />
        <Tab.Screen name="NonAlcoholic" component={NonAlcoholicCocktailsScreen} options={{ title: 'Sans Alcool' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppTabs;
