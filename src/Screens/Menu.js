import { StyleSheet, View, Image, ScrollView, Dimensions } from "react-native";
import { Button } from "../Componentes/Buttons";
import { Texto, TextoInput } from "../Componentes/Textos";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from 'react-native-maps';
import React from 'react';

export default function Menu({}) {
  return (


    
    <View style={styles.container}>
      
      {/* VIEW DO INPUT */}
      <View style={styles.searchContainer}>

       <TextoInput 
            tamanho={20} 
            holder={"🔎 Busca"} 
            width={300}
            height={45}
            color={"white"}
            borda={10}
            style={styles.searchInput} />
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

      <Texto cor={"black"} 
      msg={"Selecione o Veiculo:"}
      tamanho={20}
      margin={30}
      />

      <View style={{ flexDirection: "row" }}>
        

        {/* VIEW CARRO */}
        <View style={styles.container_carro}>
          <Image source={require("../../assets/Imgs/carroMenu.jpg")} />
          <Texto msg={"CARRO"} ></Texto>
          <Button width={120} borda={30} height={50} color={"#73D2C0"} texto={">>>"}></Button>
        </View>
        
        {/* VIEW DO MOTO */}
        <View style={styles.container_moto}>
        <Image source={require("../../assets/Imgs/motoMenu.jpg")} />
          <Texto msg={"MOTO"} ></Texto>
          <Button width={120} borda={30} height={50} color={"#73D2C0"} texto={">>>"}></Button>
        </View>
        
      </View>
    </View>
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
    alignSelf: "flex-start",
  
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
  },
  container_geo: {
    borderRadius: 10,
    borderWidth: 6,
    borderColor: '#fff',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#e1d1d1",
    height: 240,
    width: 350,
    marginTop: 40
    
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container_carro: {
    backgroundColor: "#fff",
    width: 150,
    height: 150,
    margin: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "flex-end",
    marginEnd: 30
  },
  container_moto: {
    backgroundColor: "#fff",
    width: 150,
    height: 150,
    borderRadius: 20,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  text: {
    fontSize: 20,
    marginTop: 20,
  },
});
