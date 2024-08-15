import React, { useState } from 'react';
import { StyleSheet, View, Image, ScrollView, Dimensions } from 'react-native';
import { Button } from '../Componentes/Buttons';
import { TextoInput, Texto } from '../Componentes/Textos';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const al = Dimensions.get('screen').height;

export default function Login() {
  const navigation = useNavigation();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const verificarLogin = async () => {
    try {
      console.log("clicou");
      const response = await fetch('http://10.111.9.16:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: login, senha: senha }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || 'Credenciais inválidas');
      }

      if (data.email) {
        await AsyncStorage.setItem('isLoggedIn', 'true');

        const userName = data.nome || 'Usuário'; // Nome padrão se 'data.nome' não estiver presente
        await AsyncStorage.setItem('userName', userName);

        // Resetando o estado de navegação e direcionando para a tela 'Menu'
        navigation.reset({
          index: 0,
          routes: [{ name: 'Menu', params: { user: userName } }],
        });
      } else {
        throw new Error('Resposta do servidor inválida');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
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
          <Button
            texto={"Login"}
            texcolor={"white"}
            acao={verificarLogin}
          />
          <Texto
            acao={irParaCadastro}
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
    backgroundColor: '#D2F0EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_2: {
    backgroundColor: '#73D2C0',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 60,
  },
  image: {
    height: 250,
    margin: 70,
    resizeMode: 'contain',
  },
});
