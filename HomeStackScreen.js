import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen'; // Ajustez le chemin selon votre structure de projet
import DetailsScreen from './DetailsScreen'; // Ajustez le chemin selon votre structure de projet

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ title: 'Liste des Cocktails' }} />
      <HomeStack.Screen name="Details" component={DetailsScreen} options={{ title: 'Détails du Cocktail' }} />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
