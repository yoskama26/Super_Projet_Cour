import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Button, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllCocktailsScreen = ({ navigation }) => {
  const [cocktails, setCocktails] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCocktails();
    loadFavorites();
  }, []);

  const fetchCocktails = async () => {
    try {
      const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');
      setCocktails(response.data.drinks);
    } catch (error) {
      Alert.alert('Error', 'Failed to load cocktails');
    } finally {
      setIsLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const favs = await AsyncStorage.getItem('favorites');
      setFavorites(favs ? JSON.parse(favs) : []);
    } catch (e) {
      Alert.alert('Error', 'Failed to load favorites');
    }
  };

  const isFavorite = (idDrink) => {
    return favorites.some(item => item.idDrink === idDrink);
  };

  const toggleFavorite = async (cocktail) => {
    let newFavorites;
    if (isFavorite(cocktail.idDrink)) {
      newFavorites = favorites.filter(fav => fav.idDrink !== cocktail.idDrink);
      Alert.alert('Removed from Favorites', `${cocktail.strDrink} has been removed from favorites.`);
    } else {
      newFavorites = [...favorites, cocktail];
      Alert.alert('Added to Favorites', `${cocktail.strDrink} has been added to favorites.`);
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cocktails}
        keyExtractor={item => item.idDrink}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('CocktailDetails', { cocktailId: item.idDrink })} style={styles.touchable}>
              <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
              <Text style={styles.text}>{item.strDrink}</Text>
            </TouchableOpacity>
            <Button
              title={isFavorite(item.idDrink) ? '❤️' : '🖤'}
              onPress={() => toggleFavorite(item)}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  touchable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
});

export default AllCocktailsScreen;
