import React from 'react';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Image, Text, StyleSheet, View } from "react-native"; 
import { ButtonTitle } from './src/Componentes/Buttons';
import 'react-native-gesture-handler';


import FaleConosco from "./src/Screens/FaleConosco";
import Cadastro from "./src/Screens/Cadastro";
import Estacionamento from './src/Screens/Estacionamento';
import Perfil from './src/Screens/Perfil';
import Login from './src/Screens/Login';
import Menu from './src/Screens/Menu';

function LogoTitle() {

  const navigation = useNavigation();

  const Perfil = () => {
    navigation.navigate("Perfil" ,{screen: "Perfil"});
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
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ headerShown: false }}>

        <Drawer.Screen name="Menu" component={Menu} options={{ 
          headerStyle: { backgroundColor: "#D2F0EE" },
          headerTitle: (props) => <LogoTitle {...props} />,
          headerShown: true}} />

        <Drawer.Screen name="Perfil" component={Perfil} />

        <Drawer.Screen name='Estacionamento' component={Estacionamento} />  

        <Drawer.Screen name="Login" component={Login} options={{ 
          headerShown: false }} />




        <Drawer.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
        <Drawer.Screen name="FaleConosco" component={FaleConosco} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
