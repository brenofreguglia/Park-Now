import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const screenHeight = Dimensions.get('screen').height;

export default function Perfil() {
  const navigation = useNavigation();

  const rentals = [
    {
      id: 1,
      location: 'Max Atacadista Jardim Eldorado',
      date: '26/07/24',
      time: '14:20 às 16:40',
      spot: '05',
    },
    {
      id: 2,
      location: 'PrudenShopping',
      date: '14/07/24',
      time: '19:40 às 22:10',
      spot: '06',
    },
    {
      id: 3,
      location: 'Parque Shopping Prudente',
      date: '22/06/24',
      time: '18:10 às 22:40',
      spot: '07',
    },
    {
      id: 4,
      location: 'Shopping Center Norte',
      date: '02/08/24',
      time: '10:00 às 12:00',
      spot: '12',
    },
    {
      id: 5,
      location: 'Iguatemi São Paulo',
      date: '05/08/24',
      time: '14:00 às 16:00',
      spot: '15',
    },
    {
      id: 6,
      location: 'Shopping Morumbi',
      date: '08/08/24',
      time: '17:00 às 19:00',
      spot: '08',
    },
    {
      id: 7,
      location: 'Shopping Eldorado',
      date: '10/08/24',
      time: '11:30 às 13:30',
      spot: '10',
    },
    {
      id: 8,
      location: 'Shopping Ibirapuera',
      date: '12/08/24',
      time: '09:00 às 11:00',
      spot: '03',
    },
  ];

  const handleBackNavigation = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackNavigation}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Substitua pela URL da imagem de perfil
          style={styles.image}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>Nome S.</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.recentRentalsTitle}>Aluguéis Recentes</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {rentals.map(rental => (
            <View key={rental.id} style={styles.rentalItem}>
              <Image
                source={{ uri: 'https://via.placeholder.com/50' }}
                style={styles.rentalImage}
              />
              <View style={styles.rentalDetails}>
                <Text style={styles.rentalLocation}>{rental.location}</Text>
                <Text style={styles.rentalInfo}>Data: {rental.date}</Text>
                <Text style={styles.rentalInfo}>Horário: {rental.time}</Text>
                <Text style={styles.rentalInfo}>Número da Vaga: {rental.spot}</Text>
              </View>
              <TouchableOpacity>
                <MaterialIcons name="delete" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ))}
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
    paddingTop: 40, // Adicionando mais espaço no topo
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
  card: {
    backgroundColor: '#D2F0EE',
    width: '100%',
    height: screenHeight - 300,
    position: 'absolute',
    top: 320,
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
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  recentRentalsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  rentalItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  rentalImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  rentalDetails: {
    flex: 1,
  },
  rentalLocation: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  rentalInfo: {
    color: '#097f6c',
  },
});
