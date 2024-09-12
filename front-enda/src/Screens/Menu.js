import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Image, ScrollView, TextInput, TouchableOpacity, Alert, Text } from "react-native";
import { Button } from "../Componentes/Buttons";
import { Texto, TextoInput } from "../Componentes/Textos";
import { useRoute, useNavigation } from "@react-navigation/native"; // Adicionado useNavigation
import MapView, { Marker } from 'react-native-maps';
import Toast from 'react-native-toast-message';
import * as Location from 'expo-location'; // Importando Location

export default function Menu() {
  const route = useRoute();
  const { user } = route.params || {}; // Desestruturação segura com valor padrão
  const navigation = useNavigation(); // Hook de navegação

  const [search, setSearch] = useState('');
  const [region, setRegion] = useState({
    latitude: -22.121265,
    longitude: -51.383400,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markerLocation, setMarkerLocation] = useState(null);
  const mapRef = useRef(null); // Referência para o MapView

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
      Alert.alert('Erro', 'Não foi possível realizar a busca: ' + error.message);
    }
  };

  // Funções para navegação
  const navigateToEstacionamentoCarro = () => {
    navigation.navigate('Estacionamento', { vehicleType: 'carro' });
  };

  const navigateToEstacionamentoMoto = () => {
    navigation.navigate('Estacionamento', { vehicleType: 'moto' });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* VIEW DO INPUT */}
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

      {/* VIEW DA GEOLOCALIZACAO */}
      <View style={styles.container_geo}>
        <MapView
          ref={mapRef}
          style={styles.map}
          region={region}
        >
          {markerLocation && (
            <Marker
              coordinate={markerLocation}
              title="Localização Pesquisada"
            />
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
        {/* VIEW CARRO */}
        <View style={styles.vehicle}>
          <Image source={require("../../assets/Imgs/carroMenu.jpg")} style={styles.vehicleImage} />
          <Texto msg={"CARRO"} tamanho={16} />
          <Button width={120} borda={30} height={50} color={"#73D2C0"} texto={">>>"} acao={navigateToEstacionamentoCarro}/>
        </View>
        
        {/* VIEW MOTO */}
        <View style={styles.vehicle}>
          <Image source={require("../../assets/Imgs/motoMenu.jpg")} style={styles.vehicleImage} />
          <Texto msg={"MOTO"} tamanho={16} />
          <Button width={120} borda={30} height={50} color={"#73D2C0"} texto={">>>"} acao={navigateToEstacionamentoMoto}/>
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
