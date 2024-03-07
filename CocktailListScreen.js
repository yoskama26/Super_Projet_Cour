// CocktailListScreen.js

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, TextInput, Button } from 'react-native';
import { LikedCocktailsContext } from './LikedCocktailsContext'; // Nous allons créer ce contexte

const CocktailListScreen = ({ navigation }) => {
  const [cocktails, setCocktails] = useState([]);
  const [filteredCocktails, setFilteredCocktails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { likedCocktails, toggleLike } = useContext(LikedCocktailsContext); // Utiliser le contexte pour les cocktails likés

  useEffect(() => {
    // Simule le chargement initial des cocktails (vous pouvez remplacer cela par un appel API)
    const loadedCocktails = [{ idDrink: '11007', strDrink: 'Margarita', strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg' }];
    setCocktails(loadedCocktails);
    setFilteredCocktails(loadedCocktails);
  }, []);

  useEffect(() => {
    const filtered = cocktails.filter(cocktail =>
      cocktail.strDrink.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCocktails(filtered);
  }, [searchQuery, cocktails]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('CocktailDetail', { cocktail: item })}>
      <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
      <Text style={styles.title}>{item.strDrink}</Text>
      <TouchableOpacity onPress={() => toggleLike(item.idDrink)}>
        <Text>{likedCocktails.has(item.idDrink) ? '❤️' : '🖤'}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View>
      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher un cocktail..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredCocktails.filter(cocktail => likedCocktails.has(cocktail.idDrink) || searchQuery !== '' || !showLikedOnly)}
        renderItem={renderItem}
        keyExtractor={item => item.idDrink}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Styles pour votre composant
});
