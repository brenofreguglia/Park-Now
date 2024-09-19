import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, TouchableOpacity, Animated } from 'react-native';
import axios from 'axios';

const VerificarCodigo = ({ navigation, route }) => {
    const rota = "http://10.111.9.16:3000"; // Certifique-se de que esta URL está correta
    const [codigo, setCodigo] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));
    const [borderColor] = useState(new Animated.Value(0));

    const email = route.params?.email; // Assume que o email foi passado pela navegação

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, []);

    useEffect(() => {
        Animated.timing(borderColor, {
            toValue: isFocused ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isFocused]);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleVerifyCode = async () => {
        if (!codigo) {
            Alert.alert('Código inválido', 'Por favor, insira o código de verificação.');
            return;
        }

        if (!email) {
            Alert.alert('Erro', 'O email não foi fornecido. Volte e tente novamente.');
            return;
        }

        try {
            // Envia o código e o email para o backend
            const response = await axios.post(`${rota}/verify-code`, { code: codigo, email });

            if (response.data.success) {
                Alert.alert(
                    'Código Verificado',
                    'O código foi verificado com sucesso. Agora você pode redefinir sua senha.',
                    [
                        { text: 'OK', onPress: () => navigation.navigate('RedefinirSenha', { email }) }
                    ]
                );
            } else {
                Alert.alert('Erro', 'Código de verificação inválido ou expirado.');
            }
        } catch (error) {
            console.error('Erro ao verificar o código:', error);
            let errorMessage = 'Ocorreu um erro ao verificar o código.';
            if (error.response) {
                errorMessage += ` Detalhes: ${error.response.data.message || error.response.data.error}`;
            }
            Alert.alert('Erro', errorMessage);
        }
    };

    const borderColorInterpolated = borderColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['#ccc', '#0088CC'],
    });

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Text style={styles.title}>Verificar Código</Text>
            <View style={styles.inputContainer}>
                <Animated.View style={[styles.inputWrapper, { borderColor: borderColorInterpolated }]}>
                    <TextInput
                        style={styles.input}
                        value={codigo}
                        onChangeText={setCodigo}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder="Digite o código de verificação"
                        placeholderTextColor="#aaa"
                    />
                </Animated.View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
                <Text style={styles.buttonText}>Verificar Código</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('EsqueceuSenha')}>
                <Text style={styles.linkText}>Voltar para Esqueceu a Senha</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#023047',
        marginBottom: 20,
    },
    inputContainer: {
        width: '90%',
        marginBottom: 20,
    },
    inputWrapper: {
        borderWidth: 1,
    },
    input: {
        width: '100%',
        padding: 15,
        fontSize: 15,
        color: '#000',
    },
    button: {
        backgroundColor: '#0088CC',
        width: '90%',
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkButton: {
        marginTop: 15,
    },
    linkText: {
        color: 'black',
        fontSize: 14,
    },
});

export default VerificarCodigo;
