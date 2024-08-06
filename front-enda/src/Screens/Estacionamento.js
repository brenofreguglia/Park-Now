import { StyleSheet, View, Image, ScrollView, Dimensions } from "react-native";
import { Button } from "../Componentes/Buttons";
import { Texto, TextoInput } from "../Componentes/Textos";
import { useNavigation } from "@react-navigation/native";


const al = Dimensions.get("screen").height;

export default function Estacionamento({}) {
  const navigation = useNavigation();

  const Cadastro = () => {
    navigation.navigate("Cadastro" ,{screen: "Cadastro"});
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/Imgs/imagem.png")}
          style={styles.image}
        />
        <View style={styles.container_2}>
          <TextoInput
            color={"#D2F0EE"}
            width={330}
            borda={30}
            margin={20}
            height={60}
            lugar={"center"}
            tamanho={20}
            holder={"E-mail"}
          />
          <TextoInput
            color={"#D2F0EE"}
            width={330}
            borda={30}
            height={60}
            lugar={"center"}
            tamanho={20}
            holder={"Senha"}
          />
            <Button 
            texto={"Login"} 
            texcolor={"white"} />
            <Texto
            acao={Cadastro}
            msg={"Ainda não possui uma conta? Cadastre-se"}
            tamanho={15}
            margin={20}
            cor={"#D9D9D9"}
          />
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
    alignItems: "center",
    paddingVertical: 60,
  },
  image: {
    height: 250,
    margin: 70,
    resizeMode: "contain",
  },
});
