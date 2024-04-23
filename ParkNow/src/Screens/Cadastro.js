import { StyleSheet, View, Image, ScrollView } from "react-native";
import { Button } from "../Componentes/Buttons";
import { Texto, TextoInput } from "../Componentes/Textos";
import { useNavigation } from "@react-navigation/native";

export default function Cadastro({}) {
  const navigation = useNavigation();

  const cadastrar_se = (indice) => {
    const produtoSelecionado = produtos[indice];
    navigation.navigate("Cadastrar-se", { item: produtoSelecionado });
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      
      <View style={styles.container_img}>
        <Image
          style={styles.img}
          source={require("../../assets/Imgs/carrinho.png")}
        />
      </View>
<View style={styles.Componentes}>
      <TextoInput tamanho={20} holder={`Nome \n _____________________`} />
      <TextoInput tamanho={20} holder={`Sobrenome \n _____________________`} />
      <TextoInput tamanho={20} holder={`Nome do Usuári \n _____________________`} />
      <TextoInput tamanho={20} holder={`E-mail \n _____________________`} />
      <TextoInput tamanho={20} holder={`Senha \n _____________________`} />
      <TextoInput tamanho={20} holder={`Telefone \n _____________________`} />
      <TextoInput tamanho={20} holder={`CPF \n _____________________`} />
      <TextoInput tamanho={20} holder={`Endereço \n _____________________`} />
      <TextoInput tamanho={20} holder={`CEP \n _____________________`} />
      <Button color={"#D2F0EE"} texto={"Cadastrar"} cor={'white'}/>
      </View>

      
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#73D2C0",
  },
  img: {
    height: 100,
    width: 100,
  },
  container_img: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  
});
