import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const screenHeight = Dimensions.get('screen').height;

export default function EditarPerfil() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.uri);
    }
  };

  const handleSave = () => {
    // Lógica para salvar os dados no banco de dados
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={profileImage ? { uri: profileImage } : require('../../assets/Imgs/carroMenu.jpg')} style={styles.image} />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#73D2C0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 40,
  },
  profileHeader: {
    backgroundColor: '#73D2C0',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    position: 'absolute',
    top: 0,
    paddingTop: 100, // Adicionando mais espaço no topo
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: '#D2F0EE',
    borderWidth: 4, // Adicionando uma borda ao redor da imagem para destacá-la
    borderColor: '#ffffff', // Cor da borda branca para destacar a imagem
    marginBottom: -50, // Fazendo a imagem sobrepor o card
  },
  card: {
    backgroundColor: '#D2F0EE',
    width: '100%',
    height: screenHeight - 300,
    position: 'absolute',
    top: 250, // Ajuste de posição para que o card comece um pouco abaixo da imagem
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingTop: 60, // Adicionando espaço no topo para os inputs
    paddingHorizontal: 20, // Adicionando mais padding horizontal
    alignItems: 'center', // Centralizando os inputs
  },
  input: {
    backgroundColor: '#ffffff',
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: '#73D2C0',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
