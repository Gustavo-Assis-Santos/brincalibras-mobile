import { useRef, useState } from 'react';
import { Animated } from 'react-native';

export const useLogin = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [erro, setErro] = useState({ email: false, senha: false });
    const [errorMessage, setErrorMessage] = useState('');

    const focusAnimEmail = useRef(new Animated.Value(0)).current;
    const focusAnimSenha = useRef(new Animated.Value(0)).current;

    const errorAnim = useRef(new Animated.Value(0)).current; // 0 = normal, 1 = erro

    const dispararErro = (message: string) => {
        setErrorMessage(message);
        Animated.sequence([
            Animated.timing(errorAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false
            })
        ]).start();
    };

    const animateFocus = (value: Animated.Value, toValue: number) => {
        Animated.timing(value, {
        toValue,
        duration: 200, 
        useNativeDriver: false, 
        }).start();
    };

    const resetarErro = () => {
        Animated.timing(errorAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false
        }).start();
        setErrorMessage('');
    };

    const validarESubmeter = () => {
        //Em algum momento a api do back-end tem que entrar aqui, por enquanto ele só faz a
        //validação dos campos vazios
        let temErro = false;
        const novoErro = { email: false, senha: false };
        let message = '';

        if (!email || email === "") {
            novoErro.email = true;
            temErro = true;
            message += '*E-mail é obrigatório. '; //fazendo a exibição de mensagens de erro assim, enquanto não há back-end.
        }
        if (!senha || senha === "") {
            novoErro.senha = true;
            temErro = true;
            message += '*Senha é obrigatória. ';
        }

        setErro(novoErro); //Registra se houve erro ou não

        if (temErro) {
            dispararErro(message);
        } else {
            resetarErro(); //Desfaz o background vermelho
        }

        return;
    };

    return {
        email, setEmail,
        senha, setSenha,
        erro, errorMessage, validarESubmeter,
        focusAnimEmail, animateFocus,
        focusAnimSenha,
        errorAnim
    };
};