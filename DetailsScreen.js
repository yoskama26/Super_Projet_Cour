import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

function DetailsScreen({ route }) {
  const { cocktailId } = route.params;
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`)
      .then((response) => response.json())
      .then((data) => {
        setDetails(data.drinks[0]);
      })
      .catch((error) => console.error(error));
  }, [cocktailId]);

  if (!details) {
    return <Text>Chargement...</Text>;
  }

  // Générer dynamiquement la liste des ingrédients et mesures
  const ingredients = [];
  for (let i = 1; i <= 15; i++) { // L'API peut lister jusqu'à 15 ingrédients
    if (details[`strIngredient${i}`]) {
      ingredients.push(`${details[`strMeasure${i}`]} ${details[`strIngredient${i}`]}`);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: details.strDrinkThumb }} style={styles.image} />
      <Text style={styles.title}>{details.strDrink}</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.text}>{details.strInstructions}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingrédients</Text>
        {ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.text}>{ingredient}</Text>
        ))}
      </View>
      {/* Ajoutez ici d'autres sections si nécessaire */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default DetailsScreen;
