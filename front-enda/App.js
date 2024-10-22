import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
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
import CadastroCarro from './src/Screens/CadastroCarro';
 
const LogoTitle = () => {
  const navigation = useNavigation();
 
  return (
    <View style={styles.header}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.title}>HOME</Text>
        <ButtonTitle acao={() => navigation.navigate("Perfil")} />
      </View>
    </View>
  );
};
 
const Drawer = createDrawerNavigator();
 
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
 
  useEffect(() => {
    const checkUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');
        if (savedUser) {
          setIsLoggedIn(true);
          setUserName(savedUser);
        }
      } catch (error) {
        console.error('Erro ao verificar usuário:', error);
      } finally {
        setLoading(false);
      }
    };
 
    checkUser();
  }, []);
 
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Erro durante o logout:', error);
    }
  };
 
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
 
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="SplashScreen" component={SplachScreen} options={{ drawerItemStyle: { display: 'none' }}} />
        <Drawer.Screen
          name="Menu"
          component={Menu}
          options={{
            headerStyle: { backgroundColor: "#D2F0EE" },
            headerTitle: (props) => <LogoTitle {...props} />,
            headerShown: true
          }}
          initialParams={{ user: isLoggedIn ? userName : null }}
        />
        <Drawer.Screen name="Perfil" options={{ drawerItemStyle: { display: 'none' } }}>
          {(props) => <Perfil {...props} handleLogout={handleLogout} />}
        </Drawer.Screen>
        <Drawer.Screen name='Estacionamento' component={Estacionamento2} options={{ drawerItemStyle: { display: 'none' }}} />
        <Drawer.Screen name="Login" component={Login} options={{ headerShown: false, drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false, drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="Fale Conosco" component={FaleConosco} />
        <Drawer.Screen name="Cadastre Veículo" component={CadastroCarro} />
        <Drawer.Screen name="EditarPerfil" component={EditarPerfil} options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="EsqueceuSenha" component={EsqueceuSenha} options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="VerificarCodigo" component={VerificarCodigo} options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="RedefinirSenha" component={RedefinirSenha} options={{ drawerItemStyle: { display: 'none' } }} />
      </Drawer.Navigator>
      <Toast />
    </NavigationContainer>
  );
};
 
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: "black",
    marginRight: 40,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  }
});
 
export default App;