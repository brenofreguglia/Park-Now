
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { Button } from "../Componentes/Buttons";
import { Texto, TextoInput } from "../Componentes/Textos";
import { useNavigation } from "@react-navigation/native";


export default function Cadastro({}) {
  const navigation = useNavigation();

  const cadastrar_se = (indice) =>{
    const produtoSelecionado = produtos [indice];
    navigation.navigate("Cadastrar-se", {item: produtoSelecionado })
  };


    return (
      <View style={styles.container}>
        <Image
        source={require("../../assets/Imgs/carrinho.png")}
        style={{ height: 550, margin: 30, width:300 }}
        
        
        
        
        
        
        
        
        
        
        
        />








      </View>
    );
  }



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  