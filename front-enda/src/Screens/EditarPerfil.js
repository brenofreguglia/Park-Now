import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Dimensions, Alert, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rota = "http://10.111.9.17:3000";
const screenHeight = Dimensions.get('screen').height;

export default function EditarPerfil() {
  const [name, setName] = useState('');
  const [sobrenome, setsobrenome] = useState(''); 
  const [numero, setnumero] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState(''); 
  const [endereco, setendereco] = useState(''); 
  const [cep, setCep] = useState(''); 
  const [senha, setsenha] = useState('');
  const [confirmsenha, setConfirmsenha] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar a senha
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar a senha de confirmação

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const id = await AsyncStorage.getItem('userId'); // Obtém o ID do usuário do AsyncStorage
            if (id) {
                console.log(`ID do usuário: ${id}`);
                setUserId(id);

                // Fazendo a requisição ao backend
                let resposta = await fetch(`${rota}/buscar/${id}`); // Concatenação correta da rota

                if (resposta.ok) {
                    let dados = await resposta.json();

                    // Preenche os estados com os dados retornados do banco de dados
                    setName(dados.nome);
                    setsobrenome(dados.sobrenome);
                    setnumero(dados.telefone);
                    setEmail(dados.email);
                    setCpf(dados.cpf);
                    setendereco(dados.endereco);
                    setCep(dados.cep);

                    console.log("Dados do usuário carregados com sucesso");
                } else {
                    Alert.alert('Erro', 'Usuário não encontrado');
                    console.error(`Erro: Usuário com ID ${id} não encontrado`);
                }
            } else {
                Alert.alert('Erro', 'ID do usuário não encontrado');
                console.error('Erro: ID do usuário não encontrado no AsyncStorage');
            }
        } catch (erro) {
            console.error('Erro ao carregar dados do usuário:', erro);
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

  const validateFields = () => {
    const newErrors = {};

    if (!name) newErrors.name = 'Nome é obrigatório.';
    if (!sobrenome) newErrors.sobrenome = 'Sobrenome é obrigatório.';
    if (!email.includes('@')) newErrors.email = 'E-mail inválido.';
    if (senha.length < 8) newErrors.senha = 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.';
    if (!/^\d{11}$/.test(numero)) newErrors.numero = 'Telefone inválido.';
    if (!/^\d{11}$/.test(cpf)) newErrors.cpf = 'CPF inválido.';
    if (!endereco) newErrors.endereco = 'Endereço é obrigatório.';
    if (!/^\d{8}$/.test(cep)) newErrors.cep = 'CEP inválido.';

    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (senha !== confirmsenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch(`${rota}/atualizar/${userId}`, { // Usando userId na URL
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId,
          nome: name,
          sobrenome: sobrenome,
          telefone: numero,
          email: email,
          senha: senha,
          cpf: cpf,
          endereco: endereco,
          cep: cep,
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

  const campos = [
    { key: 'name', label: 'Nome', placeholder: 'Digite seu nome', value: name, onChange: setName, error: errors.name },
    { key: 'sobrenome', label: 'Sobrenome', placeholder: 'Digite seu sobrenome', value: sobrenome, onChange: setsobrenome, error: errors.sobrenome },
    { key: 'email', label: 'E-mail', placeholder: 'Digite seu e-mail', value: email, onChange: setEmail, error: errors.email },
    { key: 'senha', label: 'Senha', placeholder: 'Digite sua senha', value: senha, onChange: setsenha, secureTextEntry: !showPassword, error: errors.senha, toggleShow: () => setShowPassword(!showPassword) },
    { key: 'confirmsenha', label: 'Confirmar Senha', placeholder: 'Confirme sua senha', value: confirmsenha, onChange: setConfirmsenha, secureTextEntry: !showConfirmPassword, toggleShow: () => setShowConfirmPassword(!showConfirmPassword), error: null },
    { key: 'numero', label: 'Telefone', placeholder: 'Digite seu telefone', value: numero, onChange: setnumero, keyboardType: 'number-pad', error: errors.numero },
    { key: 'cpf', label: 'CPF', placeholder: 'Digite seu CPF', value: cpf, onChange: setCpf, error: errors.cpf },
    { key: 'endereco', label: 'Endereço', placeholder: 'Digite seu endereço', value: endereco, onChange: setendereco, error: errors.endereco },
    { key: 'cep', label: 'CEP', placeholder: 'Digite seu CEP', value: cep, onChange: setCep, error: errors.cep },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Perfil")}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={profileImage ? { uri: profileImage } : require('../../assets/Imgs/carroMenu.jpg')} style={styles.image} />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <FlatList
          data={campos}
          renderItem={({ item }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{item.label}</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder={item.placeholder}
                  value={item.value}
                  onChangeText={item.onChange}
                  secureTextEntry={item.secureTextEntry}
                  keyboardType={item.keyboardType}
                />
                {(item.key === 'senha' || item.key === 'confirmsenha') && (
                  <TouchableOpacity onPress={item.toggleShow} style={styles.eyeIcon}>
                    <MaterialIcons name={item.secureTextEntry ? 'visibility-off' : 'visibility'} size={24} color="black" />
                  </TouchableOpacity>
                )}
              </View>
              {item.error && <Text style={styles.errorText}>{item.error}</Text>}
            </View>
          )}
          keyExtractor={item => item.key}
          contentContainerStyle={styles.scrollContainer}
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
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 40,
    zIndex: 1,
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
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
  },
  card: {
    marginTop: 220,
    height: 600,
    padding: 20,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }], // Ajusta a posição vertical do ícone
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: '#73D2C0',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
});
