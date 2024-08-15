import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

export default function Estacionamento() {
  const [matriz, setMatriz] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]);

  const toggleVaga = (i, j) => {
    const novaMatriz = [...matriz];
    novaMatriz[i][j] = matriz[i][j] === 0 ? 1 : 0;
    setMatriz(novaMatriz);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Estacionamento Interativo</Text>
      <View style={styles.gridContainer}>
        {matriz.map((row, i) => (
          row.map((cell, j) => (
            <TouchableOpacity
              key={`${i}-${j}`}
              style={[styles.gridItem, cell === 1 && styles.occupied]}
              onPress={() => toggleVaga(i, j)}
            >
              <Text style={styles.gridText}>{cell === 0 ? 'Livre' : 'Ocupada'}</Text>
            </TouchableOpacity>
          ))
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
    color: 'brown',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 10,
  },
  gridItem: {
    width: 80,
    height: 80,
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  occupied: {
    backgroundColor: 'brown',
  },
  gridText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
