import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenHeight = Dimensions.get('screen').height;

export default function EditarPerfil() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [userId, setUserId] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    // Carregar o userId e outros dados iniciais se estiverem disponíveis
    const fetchUserData = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (id) {
          setUserId(id);

          // Opcional: Carregar os dados do perfil para edição, se necessário
          // const response = await fetch(`https://10.111.9.16:3000/usuario/${id}`);
          // const userData = await response.json();
          // setName(userData.nome);
          // setPhone(userData.telefone);
          // setEmail(userData.email);
        } else {
          Alert.alert('Erro', 'ID do usuário não encontrado');
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário');
      }
    };

    fetchUserData();
  }, []);

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

  const handleSave = async () => {
    if (!name || !phone || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch('https://10.111.9.16:3000/atualizar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId,
          nome: name,
          telefone: phone,
          email: email,
          senha: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
      Alert.alert('Erro', 'Erro ao salvar os dados');
    }
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
    paddingTop: 100,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: '#D2F0EE',
    borderWidth: 4,
    borderColor: '#ffffff',
    marginBottom: -50,
  },
  card: {
    backgroundColor: '#D2F0EE',
    width: '100%',
    height: screenHeight - 300,
    position: 'absolute',
    top: 250,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
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
