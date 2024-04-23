import { StyleSheet, View, Image, ScrollView, Dimensions } from "react-native";
import { Button } from "../Componentes/Buttons";
import { Texto, TextoInput } from "../Componentes/Textos";
import { useNavigation } from "@react-navigation/native";

const al = Dimensions.get("screen").height


export default function Login({}) {
  const navigation = useNavigation();
 
  const cadastrar_se = (index) => {
    const produtoSelecionado = produtos[indice];
    navigation.navigate("Cadastrar_se", { item: produtoSelecionado });
  };

  return (
    <ScrollView>
      <View style={styles.container}>

        <Image source={require("../../assets/Imgs/imagem.png")} style={{ height: 250, margin: 30 }}/>

        <View style={styles.container_2}>

          <TextoInput color={"#D2F0EE"} width={330} borda={30} margin={20} height={60} lugar={"center"} tamanho={20} holder={"E-mail"}/>

          <TextoInput color={"#D2F0EE"} width={330} borda={30} height={60} lugar={"center"} tamanho={20} holder={"Senha"}/>
          
          <Button texto={"Login"} />

          {/* Terminar Essa Ação do Texto */}
          <Texto acao={() => cadastrar_se(index)} msg={"Ainda não tem uma conta ?"} color={"#D9D9D9"} tamanho={15} margin={20}/>
        
        </View>
      
      </View>
    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D2F0EE",
    height: "50%",
  },
  container_2: {
    flex: 1,
    backgroundColor: "#73D2C0",
    // marginBottom: '2%',
    width: "100%",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height:al/2.05,
  },
});
