import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AllCocktailsScreen from './AllCocktailsScreen';
import FavoritesScreen from './FavoritesScreen';
import NonAlcoholicScreen from './NonAlcoholicScreen';
import AlcoholicScreen from './AlcoholicScreen';
import CocktailDetailsScreen from './CocktailDetailsScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function CocktailsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AllCocktails" component={AllCocktailsScreen} options={{ title: 'All Cocktails' }} />
      <Stack.Screen name="CocktailDetails" component={CocktailDetailsScreen} options={{ title: 'Cocktail Details' }} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={CocktailsStack} options={{ headerShown: false }} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen name="NonAlcoholic" component={NonAlcoholicScreen} />
        <Tab.Screen name="Alcoholic" component={AlcoholicScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
