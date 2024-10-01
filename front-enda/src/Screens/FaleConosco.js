import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
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
    try {
      const response = await axios.post('http://10.111.9.15:3000/send-email', {
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
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Assunto"
          value={subject}
          onChangeText={setSubject}
        />
        <TextInput
          style={styles.input}
          placeholder="Seu E-mail"
          value={clientEmail}
          onChangeText={setClientEmail}
          keyboardType="email-address" // Facilita a entrada de e-mail
          autoCapitalize="none" // Evita que o e-mail seja capitalizado
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Mensagem"
          value={text}
          onChangeText={setText}
          multiline
          numberOfLines={4}
        />
        <Button
          title="Enviar E-mail"
          onPress={handleSendEmail}
        />
        {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  form: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#fff'
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  loader: {
    marginTop: 16
  }
});

export default SendEmail;
