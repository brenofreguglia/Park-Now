import { StyleSheet, View, Image, ScrollView, Dimensions } from "react-native";
import { Button } from "../Componentes/Buttons";
import { Texto, TextoInput } from "../Componentes/Textos";
import { useNavigation } from "@react-navigation/native";


const al = Dimensions.get("screen").height;

export default function Perfil({}) {
  const navigation = useNavigation();

  const Menu = () => {
    navigation.navigate("Menu" ,{screen: "Menu"});
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D2F0EE",
    alignItems: "center",
    justifyContent: "center",
  },
  container_2: {
    backgroundColor: "#73D2C0",
    width: "100%",
    alignItems: "center",
    paddingVertical: 60,
  },
  image: {
    height: 250,
    margin: 70,
    resizeMode: "contain",
  },
});
