import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Estacionamento2 = () => {
  const navigation = useNavigation();

  const initialSpaces = [
    [{ available: true }, { available: true }], // A1, A2
    [{ available: false }, { available: true }], // A3, A4
    [{ available: true }, { available: true }], // A5, A6
    [{ available: true }, { available: true }], // B1, B2
    [{ available: true }, { available: true }], // B3, B4
    [{ available: true }, { available: true }], // B5, B6
  ];

  const [spaces, setSpaces] = useState(initialSpaces);

  const handleSpacePress = (row, col) => {
    if (spaces[row][col].available) {
      const updatedSpaces = spaces.map((r, rowIndex) =>
        r.map((space, colIndex) =>
          rowIndex === row && colIndex === col
            ? { ...space, available: false }
            : space
        )
      );
      setSpaces(updatedSpaces);
    }
  };

  const renderSpace = (row, col) => {
    const isAvailable = spaces[row][col].available;
    const spaceColor = isAvailable ? 'gray' : 'black';
    const icon = isAvailable ? 'car' : 'checkcircle';

    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        onPress={() => handleSpacePress(row, col)}
        style={styles.space}
      >
        <AntDesign name={icon} size={30} color={spaceColor} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>SELECIONE A VAGA</Text>
      </View>

      <View style={styles.parkingGrid}>
        {spaces.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((_, colIndex) => renderSpace(rowIndex, colIndex))}
          </View>
        ))}
      </View>

      <View style={styles.labels}>
        {['A', 'B'].map((label, index) => (
          <Text key={index} style={styles.label}>{`${label}${index + 1}`}</Text>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Menu')}
      >
        <Text style={styles.buttonText}>Selecionar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0FFFF',
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  parkingGrid: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  space: {
    width: 50,
    height: 50,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Estacionamento2;
