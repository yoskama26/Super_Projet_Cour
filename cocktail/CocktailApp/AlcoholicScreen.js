import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

const AlcoholicScreen = () => {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    const fetchCocktails = async () => {
      const { data } = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic');
      setCocktails(data.drinks);
    };

    fetchCocktails();
  }, []);

  return (
    <View>
      <FlatList
        data={cocktails}
        keyExtractor={item => item.idDrink}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ flexDirection: 'row', padding: 10 }}>
            <Image source={{ uri: item.strDrinkThumb }} style={{ width: 100, height: 100 }} />
            <Text style={{ marginLeft: 10, alignSelf: 'center' }}>{item.strDrink}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default AlcoholicScreen;
