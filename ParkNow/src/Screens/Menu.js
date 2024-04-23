import { StyleSheet, View, Image, ScrollView, Dimensions } from "react-native";
import { Button } from "../Componentes/Buttons";
import { Texto, TextoInput } from "../Componentes/Textos";
import { useNavigation } from "@react-navigation/native";

export default function Menu({}) {
  return (
    <View style={styles.container}>
      
      {/* VIEW DO INPUT */}
      <TextoInput tamanho={20} msg={" 🔎 Busca"}/>

      {/* VIEW DO BOTAO OK */}
      <Button  texto={"OK"} color={"#73D2C0"}/>
      
      {/* VIEW DA GEOLOCALIZACAO */}
      
      <View style={styles.container_geo}>
      <Image
            source={require("../../assets/Imgs/PresPrudente.png")}
            style={styles.image   }
          />
      </View>
      
  

      <Texto style={styles.text} msg={"Selecione um Veículo"}></Texto>
      <View style={{ flexDirection: "row" }}>
        

        {/* VIEW CARRO */}
        <View style={styles.container_carro}>
          <Image
            source={require("../../assets/Imgs/carro.png")}
            style={styles.image1}
          />
          <Texto lugar={10} msg={"CARRO"} ></Texto>
          <Button largura={100} tamanho={50} color={"#73D2C0"} texto={">>>"}></Button>
        </View>
        
        {/* VIEW DO MOTO */}
        <View style={styles.container_moto}>
          <Image
            source={require("../../assets/Imgs/moto.png")}
            style={styles.image2}
          />
          <Texto msg={"MOTO"} ></Texto>
          <Button largura={100} tamanho={50} color={"#73D2C0"} texto={">>>"}></Button>
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D2F0EE",
    alignItems: "center",
    justifyContent: "center",
  },
  container_geo: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#fff",
    height: 200,
    width: 300,
    borderRadius:20,
    justifyContent:'flex-end'

  },


  container_carro: {
    backgroundColor: "#fff",
    width: 150,
    height: 150,
    margin: 10,
    borderRadius:20,

  },
  container_moto: {
    backgroundColor: "#fff",
    width: 150,
    height: 150,
    borderRadius:20,
    marginTop:10,
  },
  image: {
    marginTop:3,
    height:190,
    width: "100",
    borderRadius: 20 ,
    
  },
  image1:{
    height:50,
    width: "100",
    marginTop:20,
  },
  image2:{
    height:60,
    width: "100",
    marginTop:11,
  },
  text:{
    alignItems:"center",
    fontSize: 30,
  },
});
