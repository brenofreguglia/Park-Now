import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, ActivityIndicator, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const SendEmail = () => {
  const [subject, setSubject] = useState(''); // Assunto do e-mail
  const [text, setText] = useState(''); // Corpo da mensagem
  const [clientEmail, setClientEmail] = useState(''); // E-mail do cliente
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async () => {
    // Validação do e-mail do cliente
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!subject || !text || !clientEmail) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }
    if (!emailRegex.test(clientEmail)) {
      Alert.alert('Erro', 'O e-mail fornecido é inválido.');
      return;
    }

    setLoading(true);
    // trocar ip 
    try {
      const response = await axios.post('http://192.168.167.106:3000/send-email', {
        subject,
        text,
        clienteEmail: clientEmail // Enviando o e-mail do cliente
      });
      Alert.alert('Sucesso', response.data);
    } catch (error) {
      // Logando o erro para depuração
      console.error('Erro ao enviar o e-mail:', error.response || error.message);
      Alert.alert('Erro', 'Não foi possível enviar o e-mail. Verifique os detalhes e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
      <Text style={styles.faleTextTitle}>Fale Conosco</Text>
      {/* <Image source={require('./assets/img/oi.png')} style={styles.carIcon} /> */}
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Erro, Falha ou Outro Assunto "
          value={subject}
          onChangeText={setSubject}
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          placeholder="Seu E-mail"
          value={clientEmail}
          onChangeText={setClientEmail}
          keyboardType="email-address" // Facilita a entrada de e-mail
          autoCapitalize="none" // Evita que o e-mail seja capitalizado
          placeholderTextColor="#fff"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Mensagem"
          value={text}
          onChangeText={setText}
          multiline
          numberOfLines={4}
          placeholderTextColor="#fff"
        />

        {/* Substitui o Button por TouchableOpacity para personalização */}
        <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
          <Text style={styles.buttonText}>Enviar E-mail</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Move o conteúdo para o topo
    padding: 16,
    backgroundColor: '#73D2C0', // Fundo do formulário verde menta
  },
  header: {
    marginBottom: 100,
    marginTop: 40, // Move a seção para mais perto do topo
    alignItems: 'center', // Centraliza o texto "Fale Conosco"
    flexDirection: 'row', // Exibe o texto e a imagem lado a lado
    justifyContent: 'center', // Alinha o texto e imagem no centro
  },
  faleTextTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000', // Texto preto para contraste
    marginLeft: 10, // Espaço entre o ícone do carro e o texto
  },
  carIcon: {
    width: 80, // Largura do ícone do carro
    height: 80, // Altura do ícone do carro
    
  },
  form: {
    backgroundColor: '#73D2C0', // Cor de fundo do formulário
    padding: 16,
  },
  input: {
    height: 50,
    borderColor: '#fff', // Borda branca
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: 'transparent', // Fundo transparente para dar contraste ao placeholder
    color: '#fff', // Texto branco
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#488378', // Cor do botão
    padding: 12,
    borderRadius: 8,
    alignItems: 'center', // Centraliza o texto do botão
  },
  buttonText: {
    color: '#fff', // Cor do texto do botão
    fontSize: 16,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 16,
  },
});

export default SendEmail;
