import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useCadastro } from '../../../../hooks/useCadastro';
import { InputAnimado } from '../../components/inputAnimado';
import { styles } from '../login/login.styles';

export default function CadastroScreen() {
    const { 
        nome, setNome, email, setEmail, senha, setSenha, confirmaSenha, setConfirmaSenha,
        erro, validarECadastrar, animateFocus,
        focusAnimNome, focusAnimEmail, focusAnimSenha, focusAnimConfirma, errorAnim
    } = useCadastro();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Cadastro</Text>

            {/* Parte superior permanece igual */}
            <View style={styles.socialContainer}>
                <Text style={styles.socialText}>Utilize uma rede social...</Text>
                <View style={styles.iconRow}>
                    <Ionicons name="logo-google" size={32} color="#4285F4" />
                    <FontAwesome name="facebook-official" size={32} color="#3b5998" />
                    <Ionicons name="logo-instagram" size={32} color="#C13584" />
                    <Ionicons name="logo-linkedin" size={32} color="#0077B5" />
                </View>
            </View>

            <View style={styles.dividerRow}><View style={styles.line} /><Text style={styles.orText}>ou</Text><View style={styles.line} /></View>

            {/* Novos campos conforme a print */}
            <View style={styles.inputSection}>
                <InputAnimado label="Nome" placeholder="Seu nome aqui" value={nome} onChangeText={setNome} iconName="person-outline" focusAnim={focusAnimNome} errorAnim={errorAnim} temErro={erro.nome} animateFocus={animateFocus} />
                
                <InputAnimado label="E-mail" placeholder="email@email.com" value={email} onChangeText={setEmail} iconName="mail-outline" focusAnim={focusAnimEmail} errorAnim={errorAnim} temErro={erro.email} animateFocus={animateFocus} />

                <InputAnimado label="Senha" placeholder="****************" value={senha} onChangeText={setSenha} iconName="lock-closed-outline" focusAnim={focusAnimSenha} errorAnim={errorAnim} temErro={erro.senha} secureTextEntry animateFocus={animateFocus} />

                <InputAnimado label="Confirmar senha" placeholder="****************" value={confirmaSenha} onChangeText={setConfirmaSenha} iconName="lock-closed-outline" focusAnim={focusAnimConfirma} errorAnim={errorAnim} temErro={erro.confirmaSenha} secureTextEntry animateFocus={animateFocus} />

                <TouchableOpacity style={styles.button} onPress={validarECadastrar}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.footerText}>
                Já tem uma conta?{' '}
                <Link href="/" asChild> 
                <Text style={styles.link}>Faça login</Text>
                </Link>
            </Text>
        </ScrollView>
    );
}