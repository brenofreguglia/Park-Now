import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';

const FaleConosco = ({ navigation }) => {
  const [mensagem, setMensagem] = useState('');

  const enviarMensagem = () => {
    if (mensagem.trim() === '') {
      Alert.alert("Erro", "Por favor, digite sua mensagem.");
    } else {
      Alert.alert(
        "Mensagem Enviada",
        "Nós entraremos em contato em breve!",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
      setMensagem(''); // Limpar o TextInput após enviar a mensagem
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Entre em contato conosco</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua mensagem..."
        multiline
        value={mensagem}
        onChangeText={text => setMensagem(text)}
      />
      <TouchableOpacity style={styles.button} onPress={enviarMensagem}>
        <Text style={{ color: '#fff' }}>Enviar mensagem</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 150,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});

export default FaleConosco;
