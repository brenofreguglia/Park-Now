import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from "lottie-react-native";
import { useNavigation } from '@react-navigation/native';

const SplachScreen = () => {
  const navigation = useNavigation(); // Hook para la navegación

  // Función para navegar a la pantalla de Login
  const handleAnimationFinish = () => {
    navigation.navigate('Login'); // 'Login' es el nombre de la pantalla en tu stack
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/Animations/AnimaçãoScreen.json')}
        style={styles.animation}
        autoPlay
        loop={false}
        onAnimationFinish={handleAnimationFinish}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 400,
    height: 870,
  },
});

export default SplachScreen;
