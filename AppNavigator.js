import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import NonAlcoholicCocktailsScreen from './NonAlcoholicCocktailsScreen'; // Assurez-vous que ce fichier existe et est correct

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Liste des Cocktails' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Détails du Cocktail' }} />
        <Stack.Screen name="NonAlcoholicCocktails" component={NonAlcoholicCocktailsScreen} options={{ title: 'Cocktails Sans Alcool' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
