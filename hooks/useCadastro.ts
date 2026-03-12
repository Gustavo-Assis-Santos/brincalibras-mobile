import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Animated } from 'react-native';

export const useCadastro = () => {
    const router = useRouter();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [mensagens, setMensagens] = useState<any>({});
    const [sucesso, setSucesso] = useState(false); // Estado para o modal

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

    const dispararErro = () => {
        Animated.sequence([
            Animated.timing(errorAnim, { toValue: 1, duration: 200, useNativeDriver: false })
        ]).start();
    };

    const resetarErro = () => {
        Animated.timing(errorAnim, { toValue: 0, duration: 200, useNativeDriver: false }).start();

        const resetarErros = {
            nome: false,
            email: false,
            senha: false,
            confirmaSenha: false
        }

        setErro(resetarErros)
    };

    const fecharESair = () => {
        setSucesso(false);
        router.replace('/');
    }

    const validarECadastrar = async () => {
        try {
            const response = await fetch('http://localhost:8080/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email, senha })
            });

            if (response.status === 400 || response.status === 409) {
                const data = await response.json();
                
                const novosErros = {
                    nome: !!data.fields?.nome,
                    email: response.status === 409 ? true : !!data.fields?.email,
                    senha: !!data.fields?.senha,
                    confirmaSenha: false 
                };

                setErro(novosErros);
                setMensagens(data.fields || { email: data.message });
                dispararErro();
            } else if (response.ok) {
                resetarErro();
                setSucesso(true);
            }
        } catch (e) {
            console.error("Erro na conexão");
        }
    };

    return {
        nome, setNome, email, setEmail, senha, setSenha, confirmaSenha, setConfirmaSenha,
        erro, validarECadastrar, animateFocus,
        focusAnimNome, focusAnimEmail, focusAnimSenha, focusAnimConfirma, errorAnim,
        mensagens,
        sucesso, fecharESair
    };
};