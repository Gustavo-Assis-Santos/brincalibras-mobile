import { useRef, useState } from 'react';
import { Animated } from 'react-native';

export const useCadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');

    const [erro, setErro] = useState({ nome: false, email: false, senha: false, confirmaSenha: false });

    // Valores de animação para cada campo
    const focusAnimNome = useRef(new Animated.Value(0)).current;
    const focusAnimEmail = useRef(new Animated.Value(0)).current;
    const focusAnimSenha = useRef(new Animated.Value(0)).current;
    const focusAnimConfirma = useRef(new Animated.Value(0)).current;
    const errorAnim = useRef(new Animated.Value(0)).current;

    const animateFocus = (value: Animated.Value, toValue: number) => {
        Animated.timing(value, { toValue, duration: 200, useNativeDriver: false }).start();
    };

    const validarECadastrar = () => {
        const novoErro = {
            nome: !nome,
            email: !email,
            senha: !senha,
            confirmaSenha: !confirmaSenha || confirmaSenha !== senha
        };

        setErro(novoErro);

        if (Object.values(novoErro).some(e => e)) {
            Animated.timing(errorAnim, { toValue: 1, duration: 200, useNativeDriver: false }).start();
        } else {
            console.log("Enviando novo usuário para o Spring Boot...");
        }
    };

    return {
        nome, setNome, email, setEmail, senha, setSenha, confirmaSenha, setConfirmaSenha,
        erro, validarECadastrar, animateFocus,
        focusAnimNome, focusAnimEmail, focusAnimSenha, focusAnimConfirma, errorAnim
    };
};