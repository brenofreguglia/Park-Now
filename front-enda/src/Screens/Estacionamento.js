import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
 
export default function Estacionamento() {
  const [matriz, setMatriz] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]);
 
  const [carColors, setCarColors] = useState([
    ['black', 'black', 'black'],
    ['black', 'black', 'black'],
    ['black', 'black', 'black']
  ]);
 
  const [buttonColors, setButtonColors] = useState([
    ['#d2f0ee', '#d2f0ee', '#d2f0ee'],
    ['#d2f0ee', '#d2f0ee', '#d2f0ee'],
    ['#d2f0ee', '#d2f0ee', '#d2f0ee']
  ]);
 
  const [texts, setTexts] = useState([
    ['Livre', 'Livre', 'Livre'],
    ['Livre', 'Livre', 'Livre'],
    ['Livre', 'Livre', 'Livre']
  ]);
 
  const [defaultButtonColor] = useState('#d2f0ee');
 
  const toggleVaga = (i, j) => {
    const novaMatriz = [...matriz];
    novaMatriz[i][j] = matriz[i][j] === 0 ? 1 : 0;
    setMatriz(novaMatriz);
 
    const novasCoresBotoes = buttonColors.map((row, rowIndex) =>
      row.map((color, colIndex) => {
        if (rowIndex === i && colIndex === j) {
          return color === defaultButtonColor ? 'blue' : defaultButtonColor;
        }
        return color;
      })
    );
    setButtonColors(novasCoresBotoes);
  };
 
  const colorirCarros = () => {
    const novasCores = matriz.map((row) =>
      row.map(() => 'black')
    );
    setCarColors(novasCores);
 
    const novasCoresBotoes = matriz.map((row, i) =>
      row.map((cell, j) => (buttonColors[i][j] === 'blue' ? 'red' : buttonColors[i][j]))
    );
    setButtonColors(novasCoresBotoes);
 
    const novosTextos = matriz.map((row) =>
      row.map((cell) => (cell === 1 ? 'Ocupado' : 'Livre'))
    );
    setTexts(novosTextos);
  };
 
  const resetarVagas = () => {
    setMatriz([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]);
    setCarColors([
      ['black', 'black', 'black'],
      ['black', 'black', 'black'],
      ['black', 'black', 'black']
    ]);
    setButtonColors([
      [defaultButtonColor, defaultButtonColor, defaultButtonColor],
      [defaultButtonColor, defaultButtonColor, defaultButtonColor],
      [defaultButtonColor, defaultButtonColor, defaultButtonColor]
    ]);
    setTexts([
      ['Livre', 'Livre', 'Livre'],
      ['Livre', 'Livre', 'Livre'],
      ['Livre', 'Livre', 'Livre']
    ]);
  };
 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Estacionamento Interativo</Text>
      <View style={styles.gridContainer}>
        {matriz.map((row, i) => (
          <View style={styles.row} key={i}>
            {row.map((cell, j) => (
              <TouchableOpacity
                key={`${i}-${j}`}
                style={[
                  styles.gridItem,
                  { backgroundColor: buttonColors[i][j] }
                ]}
                onPress={() => toggleVaga(i, j)}
              >
                <FontAwesome name="car" size={24} color={carColors[i][j]} />
                <Text style={[styles.gridText, { color: carColors[i][j] }]}>{texts[i][j]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.selectButton} onPress={colorirCarros}>
        <Text style={styles.selectButtonText}>Selecionar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resetButton} onPress={resetarVagas}>
        <Text style={styles.resetButtonText}>Resetar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#d2f0ee',
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
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  gridItem: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  gridText: {
    fontWeight: 'bold',
  },
  selectButton: {
    backgroundColor: "#73D2C0",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  selectButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: "#f44336",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
 