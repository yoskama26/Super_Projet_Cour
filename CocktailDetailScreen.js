import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const CocktailDetailScreen = ({ route }) => {
  const { cocktailId } = route.params;
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    // Simuler le chargement des détails du cocktail
    if (cocktailId === '11007') {
      setCocktail({
        strDrink: 'Margarita',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
        strInstructions: 'Rub the rim of the glass with the lime slice...',
        // Ajoutez d'autres détails selon vos besoins
      });
    }
  }, [cocktailId]);

  if (!cocktail) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{cocktail.strDrink}</Text>
      <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.image} />
      <Text style={styles.instructions}>{cocktail.strInstructions}</Text>
      {/* Affichez d'autres détails du cocktail ici */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
  instructions: {
    marginTop: 20,
  },
});

export default CocktailDetailScreen;
