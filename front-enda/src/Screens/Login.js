import React, { useState } from 'react';
import { StyleSheet, View, Image, ScrollView, Text, Dimensions } from 'react-native';
import { Button } from '../Componentes/Buttons';
import { TextoInput, Texto } from '../Componentes/Textos';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const al = Dimensions.get('screen').height;
const rota = "http://10.111.9.17:3000";

export default function Login() {

  const navigation = useNavigation();
  const [login, setLogin] = useState('breno@gmail.com');
  const [senha, setSenha] = useState('BHgf#078');
  const [error, setError] = useState('');

  const verificarLogin = async () => {
    if (!login || !senha) {
      setError('Por favor, preencha todos os campos');
      return;
    }
  
    try {
      console.log("clicou");
      const response = await fetch(`${rota}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: login, senha: senha }),
      });
  
      const contentType = response.headers.get("content-type");
  
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          if (data.id) {
            await AsyncStorage.setItem('isLoggedIn', 'true');
            await AsyncStorage.setItem('userId', data.id.toString());
            const userName = data.nome || 'Usuário';
            await AsyncStorage.setItem('userName', userName);

            let id = data.id
  
            navigation.reset({
              index: 0,
              routes: [{ name: 'Menu', params: { user: userName, id:id } }],
            });
          } else {
            setError('Resposta do servidor inválida');
          }
        } else {
          setError(data.msg || 'Credenciais inválidas');
        }
      } else {
        const text = await response.text();
        console.error('Resposta inesperada do servidor:', text);
        setError('Resposta inesperada do servidor');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      setError('Erro ao se conectar ao servidor');
    }
  };
  const irParaCadastro = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/Imgs/imagem.png')}
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
            value={login}
            descricao={setLogin}
            secureTextEntry={false}
          />
          <TextoInput
            color={"#D2F0EE"}
            width={330}
            borda={30}
            height={60}
            lugar={"center"}
            tamanho={20}
            holder={"Senha"}
            secureTextEntry={true}
            value={senha}
            descricao={setSenha}
          />

          {/* Exibe a mensagem de erro, se houver */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Texto
            acao={irParaCadastro}
            msg={"____________________________"}
            tamanho={15}
            margin={-20}
            cor={"#D9D9D9"}
          />

          <Button
            texto={` Login`}
            texcolor={"white"}
            acao={verificarLogin}
            width={50}
            margin={23}
          />
          <Texto
            acao={irParaCadastro}
            msg={"Ainda não possui uma conta? Cadastre-se"}
            tamanho={15}
            margin={3}
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
    backgroundColor: '#D2F0EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_2: {
    backgroundColor: '#73D2C0',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 90,
  },
  image: {
    height: 250,
    margin: 70,
    resizeMode: 'contain',
  },
  errorText: {
    color: '#000000',
    fontWeight:  'bold',
    marginVertical: 10,
    fontSize: 16,
  },
});
