import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import 'react-native-gesture-handler';

import Menu from "./src/Screens/Menu";
import FaleConosco from "./src/Screens/FaleConosco";
import Login from "./src/Screens/Login";
import Cadastro from "./src/Screens/Cadastro";

const Drawer = createDrawerNavigator();


export default function App() {
  return (
    <NavigationContainer>
    <Drawer.Navigator screenOptions={{headerStyle: {backgroundColor: "#D2F0EE"}}}>
      
      <Drawer.Screen name="Home" component={Menu}/>
      <Drawer.Screen name="Login" component={Login}/> 
      <Drawer.Screen name="Cadastro" component={Cadastro} options={{headerStyle:{backgroundColor: "#73D2C0"}}}/>
      <Drawer.Screen name="FaleConosco" component={FaleConosco}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
