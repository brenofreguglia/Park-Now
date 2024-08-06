import React, {useState} from "react";
import { StyleSheet, View, Image, FlatList, Dimensions } from "react-native";
import { Button } from "../Componentes/Buttons";
import { Texto, TextoInput } from "../Componentes/Textos";
import Login from "./Login";
import { useNavigation } from "@react-navigation/native";


const {width, height} = Dimensions.get("window")

export default function Cadastro({}) {

  const navigation = useNavigation();

  const [form, setForm] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    telefone: '',
    cpf: '',
    endereco: '',
    cep: ''
  });

  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleCadastro = async () => {
    try {
      const response = await fetch('http://10.111.9.16:3000/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao realizar cadastro');
      }

      alert(data.msg);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao realizar cadastro:', error.message);
    }
  };

  const campos = [
    { key: 'nome', placeholder: `Nome`, value: form.nome },
    { key: 'sobrenome', placeholder: `Sobrenome`, value: form.sobrenome },
    { key: 'email', placeholder: 'E-mail', value: form.email },
    { key: 'senha', placeholder: 'Senha', value: form.senha },
    { key: 'telefone', placeholder: 'Telefone', value: form.telefone },
    { key: 'cpf', placeholder: 'CPF', value: form.cpf },
    { key: 'endereco', placeholder: 'Endereço', value: form.endereco },
    { key: 'cep', placeholder: 'CEP', value: form.cep }
  ];


  const Login = () => {
    navigation.navigate("Login" ,{screen: "Login"});
  };


  // const campos = [
  //   { key: 'nome', placeholder: `  Nome \n  _______________________________`, value: '' },
  //   { key: 'sobrenome', placeholder:  `  Sobrenome \n  _______________________________`, value: '' },
  //   { key: 'email', placeholder: 'E-mail \n  _______________________________', value: '' },
  //   { key: 'senha', placeholder: 'Senha \n  _______________________________', value: '' },
  //   { key: 'telefone', placeholder: 'Telefone \n  _______________________________', value: '' },
  //   { key: 'cpf', placeholder: 'CPF \n  _______________________________', value: '' },
  //   { key: 'endereco', placeholder: 'Endereço \n  _______________________________', value: '' },
  //   { key: 'cep', placeholder: 'CEP \n  _______________________________', value: '' }
  // ];

  return (
    <View style={styles.container}>
      <View style={styles.container_img}>
        <Image
          style={styles.img}
          source={require("../../assets/Imgs/carrinho.png")}
        />
      </View>

      <FlatList
        data={campos}
        renderItem={({ item }) => (
          <TextoInput 
            tamanho={20} 
            holder={item.placeholder} 
            width={330} 
            borda={30} 
            height={60} 
            lugar={"left"} 
            margin={10}
            cor={"white"}
          />
        )}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.Componentes}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <Button 
              color={"#d2f0eee0"} 
              texto={"Cadastrar"} 
              texcolor={"#b6b6b6"}
              tamanho={330} 
              borda={30}
              height={50} 
            />

            <View style={styles.container_2}>
            <Texto
              acao={Login}
              msg={"Já possui uma conta? Faça o login"}
              cor={"#989696"}
              tamanho={15}
              margin={20}
            />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#73D2C0",
  },
  img: {
    height: 70,
    width: 70,
    margin: 10,
    alignItems: "flex-end"
  },
  container_img: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 20,
  },
  Componentes: {
    alignItems: "center",
  },
  footer: {
    alignItems: "center",
  },
  container_2: {
    backgroundColor: "#D2F0EE",
    width: width,
    height: 100,
    alignItems: "center",
    paddingVertical: 10,
  },
});