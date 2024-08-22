import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenHeight = Dimensions.get('screen').height;

export default function Perfil({ handleLogout }) {
  const navigation = useNavigation();

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
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.image}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>Nome S.</Text>
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
    paddingVertical: 20,
    position: 'absolute',
    top: 0,
    paddingTop: 40,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 40,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
    margin: 20,
    resizeMode: 'cover',
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  editButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#0097A7',
    borderRadius: 20,
  },
  editButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  logoutButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#d9534f',
    borderRadius: 20,
    position: 'absolute',
    right: 20,
    top: 40,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#D2F0EE',
    width: '100%',
    height: screenHeight - 300,
    position: 'absolute',
    top: 320,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    shadowColor: '#000',
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
