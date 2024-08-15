import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ActivityIndicator, Text, StyleSheet, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';

import FaleConosco from "./src/Screens/FaleConosco";
import Cadastro from "./src/Screens/Cadastro";
import Estacionamento from './src/Screens/Estacionamento';
import Perfil from './src/Screens/Perfil';
import Login from './src/Screens/Login';
import Menu from './src/Screens/Menu';
import EditarPerfil from './src/Screens/EditarPerfil';
import { ButtonTitle } from './src/Componentes/Buttons';

function LogoTitle() {
  const navigation = useNavigation();

  const Perfil = () => {
    navigation.navigate("Perfil");
  };

  return (
    <View style={styles.header}>
      <View style={{ flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{ color: "black", marginRight: 40, textAlign: "center", left: 100, fontSize: 20, fontWeight: "bold"}}>HOME</Text>
        <ButtonTitle acao={Perfil} />
      </View>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Estado para armazenar o status de login

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      setIsLoggedIn(loggedIn === 'true');
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    // Exibir um indicador de carregamento enquanto o status de login é verificado
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          // Se estiver logado, redireciona para o Menu
          <Drawer.Screen name="Menu" component={Menu} options={{
            headerStyle: { backgroundColor: "#D2F0EE" },
            headerTitle: (props) => <LogoTitle {...props} />,
            headerShown: true
          }} />
        ) : (
          // Se não estiver logado, redireciona para o Login
          <Drawer.Screen name="Login" component={Login} options={{ 
            headerShown: false 
          }} />
        )}
        
        <Drawer.Screen name="Perfil" component={Perfil} options={{
          drawerItemStyle: { display: 'none' }
        }} />

        <Drawer.Screen name="Estacionamento" component={Estacionamento} options={{
          // drawerItemStyle: { display: 'none' }
        }} />  

        <Drawer.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false, drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="FaleConosco" component={FaleConosco} />
        <Drawer.Screen name="EditarPerfil" component={EditarPerfil} options={{
          drawerItemStyle: { display: 'none' }
        }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // title: {
  //   color: "black",
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   textAlign: "center",
  //   paddingHorizontal: 30,
  // },
  // loadingContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
});
