import React from "react";
import { Text, StyleSheet, Dimensions, TextInput } from "react-native";

const Lg = Dimensions.get('screen').width;

const Texto = ({ msg, tamanho, cor, margin, acao }) => {
  return (
    <Text
      onPress={acao}
      style={[
        styles.texto,
        {
          fontSize: tamanho,
          color: cor,
          margin: margin,
        },
      ]}
    >
      {msg}
    </Text>
  );
};

const TextoInput = ({ holder, tamanho, color, width, borda, height, lugar, margin, cor, descricao, value}) => {
  return (
    <TextInput
      placeholder={holder}
      placeholderTextColor = {cor}
      style={[
        styles.textInput,
        {
            backgroundColor: color,
            width: width,
            borderRadius: borda,
          height: height,
          textAlign: lugar,
          fontSize: tamanho,
          margin: margin,
        },
      ]}
      onChangeText={descricao}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  texto: {
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    width: Lg / 2,
  },
  textInput: {
    paddingHorizontal: 15,
  },
});

export { Texto, TextoInput };
