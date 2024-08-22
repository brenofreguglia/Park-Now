import React, { useEffect } from 'react';
import { StyleSheet, View, Image, ScrollView, Text } from "react-native";
import { Button } from "../Componentes/Buttons";
import { Texto, TextoInput } from "../Componentes/Textos";
import { useRoute } from "@react-navigation/native";
import MapView, { Marker } from 'react-native-maps';
import Toast from 'react-native-toast-message';

export default function Menu() {
  const route = useRoute();
  const { user } = route.params || {}; // Desestruturação segura com valor padrão

  useEffect(() => {
    if (user) {
      Toast.show({
        type: 'success',
        text1: `Seja bem-vindo, ${user}!`,
        position: 'center', // Altere a posição para 'center'
        visibilityTime: 4000,
      });
    }
  }, [user]);

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* VIEW DO INPUT */}
      <View style={styles.searchContainer}>
        <TextoInput 
          tamanho={20} 
          holder={"🔎 Busca"} 
          width={300}
          height={45}
          color={"white"}
          borda={10}
          style={styles.searchInput} 
        />
        <Button texto={"OK"} color={"#73D2C0"} width={45} borda={10} height={45} texcolor={"white"}/>
      </View>
      
      {/* VIEW DA GEOLOCALIZACAO */}
      <View style={styles.container_geo}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -22.1256,
            longitude: -51.3889,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{ latitude: -22.1256, longitude: -51.3889 }}
            title="Presidente Prudente"
            description="Uma cidade em São Paulo, Brasil"
          />
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
          <Button width={120} borda={30} height={50} color={"#73D2C0"} texto={">>>"} />
        </View>
        
        {/* VIEW MOTO */}
        <View style={styles.vehicle}>
          <Image source={require("../../assets/Imgs/motoMenu.jpg")} style={styles.vehicleImage} />
          <Texto msg={"MOTO"} tamanho={16} />
          <Button width={120} borda={30} height={50} color={"#73D2C0"} texto={">>>"} />
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
    flex: 1,
    marginRight: 10,
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
  text: {
    fontSize: 70,
    marginTop: 20,
  },
});
