import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Importer AntDesign pour l'icône de la croix

export default function App() {
  const [objectif, setObjectif] = useState('');
  const [listeObjectifs, setListeObjectifs] = useState([
    { id: '1', value: 'Faire les courses' },
    { id: '2', value: 'Aller à la salle de sport 3 fois par semaine' },
    { id: '3', value: 'Monter à plus de 5000m d altitude' },
    { id: '4', value: 'Acheter mon premier appartement' },
    { id: '5', value: 'Perdre 5kgs' },
    { id: '6', value: 'Faire un triathlon' },
  ]);

  const ajouterObjectif = () => {
    setListeObjectifs(listeObjectifs => [
      ...listeObjectifs,
      { id: Math.random().toString(), value: objectif }
    ]);
    setObjectif('');
  };

  const supprimerObjectif = (id) => {
    setListeObjectifs(listeObjectifs => listeObjectifs.filter(objectif => objectif.id !== id));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Ajouter un nouvel objectif..."
          style={styles.input}
          value={objectif}
          onChangeText={setObjectif}
        />
        <Button title="Ajouter" onPress={ajouterObjectif} />
      </View>
      <FlatList 
        keyExtractor={(item, index) => item.id}
        data={listeObjectifs}
        renderItem={itemData => (
          <View style={styles.listItem}>
            <Text>{itemData.item.value}</Text>
            <TouchableOpacity onPress={() => supprimerObjectif(itemData.item.id)}>
              <AntDesign name="closecircle" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: '70%', // Ajusté pour laisser de la place au bouton
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginRight: 10, // Ajouté pour espacer l'input du bouton
  },
  listItem: {
    flexDirection: 'row', // Pour afficher l'objectif et la croix en ligne
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'space-between', // Espacer l'objectif et la croix
    alignItems: 'center', // Centrer verticalement
  },
});
