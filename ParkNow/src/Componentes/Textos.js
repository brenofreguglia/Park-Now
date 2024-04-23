import React from "react";
import { Text, StyleSheet, Dimensions, TextInput } from "react-native";

const Lg = Dimensions.get("screen").width;

const Texto = ({ msg, tamanho, color, acao, lugar, margin }) => {
  return (
    <Text style={[styles.texto, { fontSize: tamanho, color: color, alignItems: lugar, margin: margin}]} onPress={acao}>
      {msg}
    </Text>
  );
};
const TextoInput = ({ msg, tamanho, color, width, borda, margin, height, lugar, holder, cor}) => {
  return (  
    <TextInput
    placeholder = {holder}
      style={{ backgroundColor: color, width: width, borderRadius: borda, margin: margin, height: height, textAlign: lugar, fontSize: tamanho, }}
    >
      {msg}
    </TextInput>
  );
};

const styles = StyleSheet.create({
  texto: {
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    width: Lg / 2,
  },
});
export { Texto, TextoInput };
