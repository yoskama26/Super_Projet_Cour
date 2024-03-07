import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoritesJson = await AsyncStorage.getItem('favorites');
      if (favoritesJson != null) {
        setFavorites(JSON.parse(favoritesJson));
      }
    } catch (e) {
      Alert.alert('Loading error', 'Failed to load the favorites');
    }
  };

  const removeFromFavorites = async (idDrink) => {
    try {
      const newFavorites = favorites.filter(favorite => favorite.idDrink !== idDrink);
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (e) {
      Alert.alert('Error', 'Failed to remove the item from favorites');
    }
  };

  return (
    <View>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={item => item.idDrink}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ flexDirection: 'row', padding: 10 }}
              onPress={() => removeFromFavorites(item.idDrink)}
            >
              <Image source={{ uri: item.strDrinkThumb }} style={{ width: 100, height: 100 }} />
              <Text style={{ marginLeft: 10, alignSelf: 'center' }}>{item.strDrink}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No favorites added yet.</Text>
      )}
    </View>
  );
};

export default FavoritesScreen;
