import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = async () => {
    // Lógica de submissão do formulário aqui
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message,
          isAnonymous,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      Alert.alert("Sucesso", "Formulário enviado com sucesso!");
      // Resetar os campos do formulário
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
      setIsAnonymous(false);
    } catch (error) {
      Alert.alert("Erro", "Houve um problema ao enviar o formulário.");
      console.error("Houve um problema ao enviar o formulário:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>FALE CONOSCO</Text>
      </View>

      <View style={styles.radioGroup}>
        <TouchableOpacity onPress={() => setIsAnonymous(false)} style={styles.radioOption}>
          <Text style={isAnonymous ? styles.radioText : styles.radioTextSelected}>Identificado</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsAnonymous(true)} style={styles.radioOption}>
          <Text style={isAnonymous ? styles.radioTextSelected : styles.radioText}>Anônima</Text>
        </TouchableOpacity>
      </View>

      {!isAnonymous && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Seu nome"
            required
          />
        </View>
      )}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Seu email"
          keyboardType="email-address"
          required
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Telefone:</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={(text) => setPhone(text)}
          placeholder="Seu telefone"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Assunto:</Text>
        <TextInput
          style={styles.input}
          value={subject}
          onChangeText={(text) => setSubject(text)}
          placeholder="Assunto"
          required
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Mensagem:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={message}
          onChangeText={(text) => setMessage(text)}
          placeholder="Escreva sua mensagem aqui"
          multiline
          numberOfLines={4}
          required
        />
      </View>

      <Button title="Enviar" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    flexGrow: 1,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  radioOption: {
    padding: 10,
  },
  radioText: {
    fontSize: 16,
    color: "#666",
  },
  radioTextSelected: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
  },
});

export default ContactUs;
