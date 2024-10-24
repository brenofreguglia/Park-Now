import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity, Alert, Text, Linking } from "react-native";
import { Button } from "../Componentes/Buttons";
import { Texto } from "../Componentes/Textos";
import { useRoute, useNavigation } from "@react-navigation/native";
import MapView, { Marker } from 'react-native-maps';
import Toast from 'react-native-toast-message';
import * as Location from 'expo-location';

export default function Menu() {
  const route = useRoute();
  const { user } = route.params || {};
  const navigation = useNavigation();

  const locais = [
    { id: 1, latitude: -22.13151, longitude: -51.39025, title: 'Estacionamento 1' },
    { id: 2, latitude: -22.1200, longitude: -51.3850, title: 'Estacionamento 2' },
    { id: 3, latitude: -22.1250, longitude: -51.3800, title: 'Local 3' },
  ];

  const [search, setSearch] = useState('');
  const [region, setRegion] = useState({
    latitude: -22.121265,
    longitude: -51.383400,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markerLocation, setMarkerLocation] = useState(null);
  const [origin, setOrigin] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (user) {
      Toast.show({
        type: 'success',
        text1: `Seja bem-vindo, ${user}!`,
        position: 'center',
        visibilityTime: 4000,
      });
    }
  }, [user]);

  useEffect(() => {
    const getUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'A permissão para acessar a localização foi negada.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
      setRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setMarkerLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    getUserLocation();
  }, []);

  const handleSearch = async () => {
    try {
      const geocoding = await Location.geocodeAsync(search);
      if (geocoding.length > 0) {
        const { latitude, longitude } = geocoding[0];
        const searchRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setRegion(searchRegion);
        setMarkerLocation({ latitude, longitude });

        if (mapRef.current) {
          mapRef.current.animateToRegion(searchRegion, 1000);
        }
      } else {
        Alert.alert('Local não encontrado', 'Não foi possível encontrar o local pesquisado.');
      }
    } catch (error) {
      Alert.alert( 'Não foi possível realizar a busca, coloque o nome do local');
    }
  };

  const openGoogleMaps = (local) => {
    if (origin && local) {
      const originLatLng = `${origin.latitude},${origin.longitude}`;
      const destinationLatLng = `${local.latitude},${local.longitude}`;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${originLatLng}&destination=${destinationLatLng}`;
      Linking.openURL(url).catch((err) => {
        Alert.alert('Erro', 'Não foi possível abrir o Google Maps: ' + err.message);
      });
    } else {
      Alert.alert('Erro', 'Defina um ponto de origem e um destino antes de tentar navegar.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput}
          placeholder="🔎 Busca"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>OK</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container_geo}>
        <MapView
          ref={mapRef}
          style={styles.map}
          region={region}
          showsUserLocation={true}
        >
          {/* Marcadores dos locais */}
          {locais.map((local) => (
            <Marker
              key={local.id}
              coordinate={{ latitude: local.latitude, longitude: local.longitude }}
              title={local.title}
              onPress={() => openGoogleMaps(local)}  // Abre o Google Maps ao clicar no marcador
            >
              <Image
                source={require('../../assets/Imgs/customMarker.png')}  // Imagem customizada do marcador
                style={styles.markerImage}
              />
            </Marker>
          ))}

          {/* Marcador da localização pesquisada */}
          {markerLocation && (
            <Marker
              coordinate={markerLocation}
              title="Localização Pesquisada"
            >
              <Image
                source={require('../../assets/Imgs/customMarker.png')}  // Imagem customizada para o marcador da localização
                style={styles.markerImage}
              />
            </Marker>
          )}
        </MapView>
      </View>

      <Texto 
        cor={"black"} 
        msg={"Selecione o Veiculo:"}
        tamanho={20}
        margin={30}
      />

      <View style={styles.vehiclesContainer}>
        <View style={styles.vehicle}>
          <Image source={require("../../assets/Imgs/carroMenu.jpg")} style={styles.vehicleImage} />
          <Texto msg={"CARRO"} tamanho={16} />
          <Button width={120} borda={30} height={50} color={"#73D2C0"} texto={">>>"} acao={() => navigation.navigate('Estacionamento', { vehicleType: 'carro', id_lugar:1 })}/>
        </View>

        <View style={styles.vehicle}>
          <Image source={require("../../assets/Imgs/motoMenu.jpg")} style={styles.vehicleImage} />
          <Texto msg={"MOTO"} tamanho={16} />
          <Button width={120} borda={30} height={50} color={"#73D2C0"} texto={">>>"} acao={() => navigation.navigate('Estacionamento', { vehicleType: 'moto', id_lugar:2 })}/>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#D2F0EE",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  markerImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  searchInput: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  searchButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#73D2C0',
    borderRadius: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  container_geo: {
    borderRadius: 10,
    borderWidth: 6,
    borderColor: '#fff',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#e1d1d1",
    height: 240,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  vehiclesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: '100%',
  },
  vehicle: {
    backgroundColor: "#fff",
    width: 150,
    height: 200,
    margin: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  vehicleImage: {
    width: 120,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});
