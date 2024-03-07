import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Button, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [cocktails, setCocktails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [likedCocktails, setLikedCocktails] = useState([]);
  const [filter, setFilter] = useState('All'); // 'All', 'Liked', 'Non_Alcoholic'

  useEffect(() => {
    const loadLikedCocktails = async () => {
      const likedIdsString = await AsyncStorage.getItem('likedCocktails');
      setLikedCocktails(likedIdsString ? JSON.parse(likedIdsString) : []);
    };
    loadLikedCocktails();
  }, []);

  useEffect(() => {
    const fetchCocktails = async () => {
      setIsLoading(true);
      let url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail';
      if (filter === 'Non_Alcoholic') {
        url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic';
      } else if (filter === 'Alcoholic') {
        url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic';
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        setCocktails(data.drinks);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCocktails();
  }, [filter]);

  const toggleLike = async (idDrink) => {
    const updatedLikes = likedCocktails.includes(idDrink) ? likedCocktails.filter(id => id !== idDrink) : [...likedCocktails, idDrink];
    setLikedCocktails(updatedLikes);
    await AsyncStorage.setItem('likedCocktails', JSON.stringify(updatedLikes));
  };

  const displayedCocktails = filter === 'Liked'
    ? cocktails.filter(cocktail => likedCocktails.includes(cocktail.idDrink))
    : cocktails;

  return (
    <View style={styles.container}>
      <View style={styles.filterButtons}>
        <Button title="Tous" onPress={() => setFilter('All')} />
        <Button title="Favoris" onPress={() => setFilter('Liked')} />
        <Button title="Sans Alcool" onPress={() => setFilter('Non_Alcoholic')} />
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={displayedCocktails}
          keyExtractor={(item) => item.idDrink}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Details', { cocktailId: item.idDrink })}>
              <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
              <Text style={styles.text}>{item.strDrink}</Text>
              <Button
                title={likedCocktails.includes(item.idDrink) ? '❤️' : '🖤'}
                onPress={() => toggleLike(item.idDrink)}
              />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

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

export default HomeScreen;
