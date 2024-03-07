import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

const CocktailDetailsScreen = ({ route }) => {
  const { cocktailId } = route.params;
  const [cocktailDetails, setCocktailDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCocktailDetails = async () => {
      try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`);
        if (response.data.drinks) {
          setCocktailDetails(response.data.drinks[0]);
        } else {
          Alert.alert('Error', 'No details found for this cocktail.');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load cocktail details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCocktailDetails();
  }, [cocktailId]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!cocktailDetails) {
    return (
      <View style={styles.centered}>
        <Text>No details available.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: cocktailDetails.strDrinkThumb }} style={styles.image} />
      <Text style={styles.title}>{cocktailDetails.strDrink}</Text>
      <Text style={styles.subtitle}>Instructions:</Text>
      <Text style={styles.text}>{cocktailDetails.strInstructions}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'justify',
    marginTop: 10,
  },
});

export default CocktailDetailsScreen;
