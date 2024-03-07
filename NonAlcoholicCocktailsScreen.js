import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';

const NonAlcoholicCocktailsScreen = () => {
  const [cocktails, setCocktails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Supposons que votre API retourne tous les cocktails et que vous devez filtrer côté client
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') // Exemple d'URL, ajustez selon vos besoins
      .then((response) => response.json())
      .then((data) => {
        // Filtrer pour ne garder que les cocktails sans alcool
        const nonAlcoholicDrinks = data.drinks.filter(drink => drink.strAlcoholic === "No");
        setCocktails(nonAlcoholicDrinks);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
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
            <View style={styles.item}>
              <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
              <Text style={styles.text}>{item.strDrink}</Text>
            </View>
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

export default NonAlcoholicCocktailsScreen;
