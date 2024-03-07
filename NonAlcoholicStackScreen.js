import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NonAlcoholicCocktailsScreen from './NonAlcoholicCocktailsScreen'; // Ajustez le chemin selon votre structure de projet
import DetailsScreen from './DetailsScreen'; // Ajustez le chemin selon votre structure de projet

const NonAlcoholicStack = createStackNavigator();

function NonAlcoholicStackScreen() {
  return (
    <NonAlcoholicStack.Navigator>
      <NonAlcoholicStack.Screen name="NonAlcoholic" component={NonAlcoholicCocktailsScreen} options={{ title: 'Cocktails Sans Alcool' }} />
      <NonAlcoholicStack.Screen name="Details" component={DetailsScreen} options={{ title: 'Détails du Cocktail' }} />
    </NonAlcoholicStack.Navigator>
  );
}

export default NonAlcoholicStackScreen;
