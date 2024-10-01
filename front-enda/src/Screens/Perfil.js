import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Texto } from '../Componentes/Textos';

const { height, width } = Dimensions.get('window'); // Obter altura e largura da tela

export default function Perfil({ handleLogout }) {
  const [userName, setUserName] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const nome = await AsyncStorage.getItem('userName');
        if (nome) {
          setUserName(nome);
        } else {
          console.error('Nome do usuário não encontrado');
        }
      } catch (error) {
        console.error('Erro ao obter o nome do usuário do AsyncStorage:', error);
      }
    };

    fetchUserName();
  }, []);

  const VoltarTela = () => {
    navigation.navigate("Menu");
  };

  const handleEditPress = async () => {
    try {
      const id = await AsyncStorage.getItem('userId');
      if (id) {
        navigation.navigate('EditarPerfil', { userId: id });
      } else {
        Alert.alert('Erro', 'Não foi possível obter o ID do usuário');
      }
    } catch (error) {
      console.error('Erro ao obter o userId do AsyncStorage:', error);
    }
  };

  const handleLogoutPress = () => {
    Alert.alert(
      'Confirmar Logout',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          onPress: async () => {
            try {
              await handleLogout();
              navigation.navigate('Login');
            } catch (error) {
              console.error('Erro ao fazer logout:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity style={styles.backButton} onPress={VoltarTela}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Image
          source={require("../../assets/Imgs/Avatar.png")}
          style={styles.image}
        />
        <View style={styles.profileDetails}>
          <Texto cor={"#000000"} tamanho={24} marginR={10} msg={userName}/> 
          <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.recentRentalsTitle}>Aluguéis Recentes</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Adicione a lista de aluguéis aqui */}
        </ScrollView>
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
  profileHeader: {
    backgroundColor: '#73D2C0',
    width: '100%',
    alignItems: 'center',
    paddingVertical: height * 0.05, // 5% da altura da tela
    position: 'absolute',
    top: 0,
    paddingTop: height * 0.05 + 20, // 5% + espaço extra
  },
  backButton: {
    position: 'absolute',
    left: width * 0.05, // 5% da largura da tela
    top: height * 0.05, // 5% da altura da tela
  },
  image: {
    height: width * 0.35, // 35% da largura da tela
    width: width * 0.35, // 35% da largura da tela
    borderRadius: (width * 0.35) / 2, // Metade da largura para criar um círculo
    margin: 20,
    resizeMode: 'cover',
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#D2F0EE',
    borderRadius: 20,
  },
  editButtonText: {
    color: '#060606',
    fontWeight: 'bold',
  },
  logoutButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#D2F0EE',
    borderRadius: 20,
    position: 'absolute',
    right: width * 0.05, // 5% da largura da tela
    top: height * 0.05, // 5% da altura da tela
  },
  logoutButtonText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: height * 1, 
    position: 'absolute',
    top: height * 0.4, 
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    padding: 20,
  },
  recentRentalsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
