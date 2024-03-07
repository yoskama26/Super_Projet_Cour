import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavoritesScreen from './FavoritesScreen'; // Vous devez créer ce composant basé sur HomeScreen pour les favoris
import DetailsScreen from './DetailsScreen'; // Ajustez le chemin selon votre structure de projet

const FavoritesStack = createStackNavigator();

function FavoritesStackScreen() {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Cocktails Favoris' }} />
      <FavoritesStack.Screen name="Details" component={DetailsScreen} options={{ title: 'Détails du Cocktail' }} />
    </FavoritesStack.Navigator>
  );
}

export default FavoritesStackScreen;
