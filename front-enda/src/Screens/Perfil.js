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

        <View style={styles.container_2}> 

        {/* <Image
            source={{ uri: "https://via.placeholder.com/150" }} // Substitua pela URL da imagem de perfil
            style={styles.image}
          /> */}

        </View>
        
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
    height: "95%",
    alignItems: "center",
    paddingVertical: 60,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 75,
    margin: 20,
    resizeMode: "contain",
  },
});
