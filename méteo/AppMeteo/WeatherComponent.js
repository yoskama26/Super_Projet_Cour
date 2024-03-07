import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLatitude(latitude);
      setLongitude(longitude);
      const address = await Location.reverseGeocodeAsync({ latitude, longitude });
      setLocationName(address[0].city);

      const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
          lat: latitude,
          lon: longitude,
          appid: 'd0fa09e4fa4bbba8464255e1a5a8e1cd',
          units: 'metric',
        }
      });
      setWeatherData(response.data);
    } catch (error) {
      setErrorMsg('Error fetching weather data: ' + error.message);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const renderWeatherItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.hourText}>{new Date(item.dt * 1000).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</Text>
      <Text style={styles.dayText}>{new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}</Text>
      <Text>Temperature: {item.main.temp}°C</Text>
      <Image
        source={{ uri: `http://openweathermap.org/img/w/${item.weather[0].icon}.png` }}
        style={styles.weatherIcon}
      />
      <Text>{item.weather[0].description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topSpace} />
      <Button title="Get Location" onPress={getLocation} />
      {locationName && (
        <Text style={styles.locationText}>{locationName}</Text>
      )}
      {latitude && longitude && (
        <Text style={styles.coordinateText}>Latitude: {latitude}, Longitude: {longitude}</Text>
      )}
      {errorMsg && <Text>{errorMsg}</Text>}
      {weatherData && (
        <FlatList
          data={weatherData.list}
          keyExtractor={(item) => item.dt.toString()}
          renderItem={renderWeatherItem}
          contentContainerStyle={styles.contentContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topSpace: {
    height: 145,
  },
  contentContainer: {
    alignItems: 'center',
  },
  itemContainer: {
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  hourText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  locationText: {
    position: 'absolute',
    top: 100,
    fontSize: 16,
    fontWeight: 'bold',
  },
  coordinateText: {
    position: 'absolute',
    top: 120,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WeatherComponent;
