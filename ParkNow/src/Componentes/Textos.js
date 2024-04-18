import React from "react";
import { Text, StyleSheet, Dimensions, TextInput} from "react-native";

const Lg = Dimensions.get('screen').width

const Texto = ({msg, tamanho, color}) => {
    return (
       <Text style = {[styles.texto,{fontSize: tamanho, color: color}]}>
                {msg}
         </Text>
    )
}
const TextoInput = ({msg, tamanho, color, width, borda}) => {
    return (
       <TextInput placeholder="Digite Aqui" style ={{backgroundColor: color, width: width , borderRadius: borda}}>{msg}</TextInput>
    )
}


const styles = StyleSheet.create({
    texto:{
        justifyContent: "center",
        textAlign: "center",
        fontWeight: "bold",
        width: Lg/2,
    },
})
    export {Texto,TextoInput}