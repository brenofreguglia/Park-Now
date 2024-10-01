import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text, StyleSheet, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ButtonTitle } from './src/Componentes/Buttons';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import FaleConosco from "./src/Screens/FaleConosco";
import Cadastro from "./src/Screens/Cadastro";
import Perfil from './src/Screens/Perfil';
import Login from './src/Screens/Login';
import Menu from './src/Screens/Menu';
import EditarPerfil from './src/Screens/EditarPerfil';
import SplachScreen from './src/Screens/SplachScreen';
import Estacionamento from './src/Screens/Estacionamento';
import Estacionamento2 from './src/Screens/Estacionamento2';
import EsqueceuSenha from './src/Screens/Senha';
import VerificarCodigo from './src/Screens/VerificarCodigo';
import RedefinirSenha from './src/Screens/RedefinirSenha';




function LogoTitle() {
  const navigation = useNavigation();

  const navigateToPerfil = () => {
    navigation.navigate("Perfil");
  };

  return (
    <View style={styles.header}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: "black", marginRight: 40, textAlign: "center", left: 100, fontSize: 20, fontWeight: "bold" }}>HOME</Text>
        <ButtonTitle acao={navigateToPerfil} />
      </View>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const savedUser = await AsyncStorage.getItem('user');
      if (savedUser) {
        setIsLoggedIn(true);
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };
  
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ headerShown: false }}>

        <Drawer.Screen name="SplashScreen" component={SplachScreen} />

        <Drawer.Screen
          name="Menu"
          component={Menu}
          options={{
            headerStyle: { backgroundColor: "#D2F0EE" },
            headerTitle: (props) => <LogoTitle {...props} />,
            headerShown: true
          }}
          initialParams={{ user: isLoggedIn ? 'Seu Nome' : null }} // Passar o nome do usuário como parâmetro inicial
        />
        <Drawer.Screen
          name="Perfil"
          options={{
            drawerItemStyle: { display: 'none' }
          }}
        >
          {(props) => <Perfil {...props} handleLogout={handleLogout} />}
        </Drawer.Screen>
        <Drawer.Screen name='Estacionamento' component={Estacionamento2}   options={{
            drawerItemStyle: { display: 'none' }
          }}/>
        <Drawer.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false, drawerItemStyle: { display: 'none' } }}
         />
        <Drawer.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ headerShown: false, drawerItemStyle: { display: 'none' } }}
        />
        <Drawer.Screen name="FaleConosco" component={FaleConosco} />
        <Drawer.Screen name="EditarPerfil" component={EditarPerfil} options={{
          drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name="EsqueceuSenha" component={EsqueceuSenha} options={{
          drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name="VerificarCodigo" component={VerificarCodigo} options={{
          drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name="RedefinirSenha" component={RedefinirSenha} options={{
          drawerItemStyle: { display: 'none' }
        }} />
      </Drawer.Navigator>

      {/* Adicione o Toast aqui para ter acesso global */}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
