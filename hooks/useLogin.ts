import { useRef, useState } from 'react';
import { Animated } from 'react-native';

export const useLogin = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [erro, setErro] = useState({ email: false, senha: false });

    const focusAnimEmail = useRef(new Animated.Value(0)).current;
    const focusAnimSenha = useRef(new Animated.Value(0)).current;

    const errorAnim = useRef(new Animated.Value(0)).current; // 0 = normal, 1 = erro

    const dispararErro = () => {
        Animated.sequence([ //Deixado como sequence caso queira implementar mais animações
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
    };

    const validarESubmeter = () => {
        //Em algum momento a api do back-end tem que entrar aqui, por enquanto ele só faz a
        //validação dos campos vazios
        let temErro = false;
        const novoErro = { email: false, senha: false };

        if (!email || email === "") { novoErro.email = true; temErro = true; }
        if (!senha || email === "") { novoErro.senha = true; temErro = true; }

        setErro(novoErro); //Registra se houve erro ou não

        if (temErro) {
            dispararErro();
        } else {
            resetarErro(); //Desfaz o background vermelho
        }

        return;
    };

    return { 
        email, setEmail, 
        senha, setSenha,
        erro, validarESubmeter,
        focusAnimEmail, animateFocus,
        focusAnimSenha,
        errorAnim
    };
};