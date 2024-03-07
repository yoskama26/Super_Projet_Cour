import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Button, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = ({ navigation }) => {
  const [cocktails, setCocktails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [likedCocktails, setLikedCocktails] = useState([]);

  useEffect(() => {
    const loadCocktailsAndLikes = async () => {
      setIsLoading(true);
      const likedIdsString = await AsyncStorage.getItem('likedCocktails');
      const likedIds = likedIdsString ? JSON.parse(likedIdsString) : [];
      setLikedCocktails(likedIds);

      // Chargez tous les cocktails puis filtrez selon les likes
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');
        const data = await response.json();
        const likedCocktailsData = data.drinks.filter(drink => likedIds.includes(drink.idDrink));
        setCocktails(likedCocktailsData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCocktailsAndLikes();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={cocktails}
          keyExtractor={(item) => item.idDrink}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Details', { cocktailId: item.idDrink })}>
              <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
              <Text style={styles.text}>{item.strDrink}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

// Réutilisez les styles de HomeScreen ici ou créez-en de nouveaux si nécessaire
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    filterButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    image: {
      width: 50,
      height: 50,
      marginRight: 10,
    },
    text: {
      flex: 1,
    },
  });

export default FavoritesScreen;
