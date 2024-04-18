import React from "react";
import { TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import { Texto } from "./Textos";

const Lg = Dimensions.get('screen').width

const Button = ({texto, acao, color}) => {
    return (
        <TouchableOpacity style = {[styles.botoes,{backgroundColor: color}]}  onPress={acao}>
           <Texto msg={texto}/>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    texto:{
        textAlign: "center",
        fontWeight: "bold",
        color: "white",
        fontSize: 18,
    },

    botoes:{
        margin: 10,
        borderRadius: 20,
        width: Lg / 2,
        justifyContent: "center",
        alignItems: "center"

    },
})
export {Button}