import React, { useState } from "react";
import { Text, StyleSheet, Dimensions, TextInput, View, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de instalar @expo/vector-icons

const Lg = Dimensions.get('screen').width;

const TextoInput = ({
  holder,
  tamanho,
  color,
  width,
  borda,
  height,
  lugar,
  margin,
  cor,
  descricao,
  value,
  secureTextEntry
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, { width: width, margin: margin }]}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={holder}
          placeholderTextColor={cor}
          style={[
            styles.textInput,
            {
              backgroundColor: color,
              borderRadius: borda,
              height: height,
              textAlign: lugar,
              fontSize: tamanho,
            },
          ]}
          onChangeText={descricao}
          value={value}
          secureTextEntry={!isPasswordVisible} // Usa o estado para visibilidade
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="#000000" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const Texto = ({ msg, tamanho, cor, margin, acao, marginR }) => {
  return (
    <Text
      onPress={acao}
      style={[
        styles.texto,
        {
          fontSize: tamanho,
          color: cor,
          margin: margin,
          marginRight: marginR
        },
      ]}
    >
      {msg}
    </Text>
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
    flex: 1,
    paddingHorizontal: 15,
    fontSize: 20,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    overflow: 'hidden',
  },
  eyeIcon: {
    position: 'absolute',
    left: 270,
    padding: 10,
  },
});

export { Texto, TextoInput };
