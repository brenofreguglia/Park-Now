import React from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import { Button } from "../Componentes/Buttons";
import { Texto, TextoInput } from "../Componentes/Textos";
import { useNavigation } from "@react-navigation/native";



export default function Login({}) {

    const navigation = useNavigation();
  
    const cadastrar_se = (indice) => {
    


        const produtoSelecionado = produtos[indice]
        navigation.navigate('Cadastrar_se',{item:produtoSelecionado})
    
    }


  return (
    <ScrollView>
        
        <View style={styles.container}>

        <Image source={require("../../assets/Imgs/imagem.png")} style={{height:250, margin: 30}}/>
        
            <View style={styles.container_2}>
                


              
                    <TextoInput style={styles.input} />
                        <TextoInput style={styles.input} color={"#D2F0EE"} width ={330} borda={30}/>
                        <Button texto={"Login"}/>
                        <Texto msg={"Ainda não tem uma conta ?"} onPress={() => cadastrar_se(index)} style={{ color: "red" }} ></Texto>
            



            </View>

        </View>   

    </ScrollView>
  ) 
  }
  


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#D2F0EE",
    },
    container_2: {
        flex: 1,
        backgroundColor: "#73D2C0",
        marginTop: "10%",
        width: "100%",
        flexDirection: "column",
        justifyContent: 'space-evenly',
        flexDirection: "column",
        alignItems: "center",

    },
    
  });
