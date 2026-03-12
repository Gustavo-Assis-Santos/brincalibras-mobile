import { FontAwesome, Ionicons } from '@expo/vector-icons'; // Para os ícones
import { Link } from 'expo-router';
import { Animated, Text, TouchableOpacity, View } from 'react-native';

import { useLogin } from '../../../../hooks/useLogin';
import { InputAnimado } from '../../components/inputAnimado';
import { styles } from './login.styles';

export default function LoginScreen() {
  const {
    email, setEmail, senha, setSenha, erro, errorMessage, validarESubmeter,
    focusAnimEmail, focusAnimSenha, errorAnim, animateFocus
  } = useLogin();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Conectando via outros apps */}
      <View style={styles.socialContainer}>
        <Text style={styles.socialText}>Utilize uma rede social...</Text>
        <View style={styles.iconRow}>
          <Ionicons name="logo-google" size={32} color="#4285F4" />
          <FontAwesome name="facebook-official" size={32} color="#3b5998" />
          <Ionicons name="logo-instagram" size={32} color="#C13584" />
          <Ionicons name="logo-linkedin" size={32} color="#0077B5" />
        </View>
      </View>

      <View style={styles.dividerRow}>
        <View style={styles.line} />
        <Text style={styles.orText}>ou</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.inputSection}>
        {errorMessage ? (
          <Animated.View style={[styles.errorBox, { opacity: errorAnim }]}> 
            {errorMessage.split(/\s*\.\s*/).filter(Boolean).map((msg, idx) => (
              <Text style={styles.errorText} key={idx}>{msg.trim()}</Text>
            ))}
          </Animated.View>
        ) : null}

        <InputAnimado
          label="E-mail"
          placeholder="email@email.com"
          value={email}
          onChangeText={setEmail}
          iconName="mail-outline"
          focusAnim={focusAnimEmail}
          errorAnim={errorAnim}
          temErro={erro.email}
          animateFocus={animateFocus}
        />

        <InputAnimado
          label="Senha"
          placeholder="***************"
          value={senha}
          onChangeText={setSenha}
          iconName="lock-closed-outline"
          focusAnim={focusAnimSenha}
          errorAnim={errorAnim}
          temErro={erro.senha}
          secureTextEntry
          animateFocus={animateFocus}
        />

        <TouchableOpacity style={styles.button} onPress={validarESubmeter}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        Não tem uma conta?{' '}
        <Link href="/cadastro" asChild>
          <Text style={styles.link}>Cadastre-se</Text>
        </Link>
      </Text>
      <Text style={styles.footerText}>
        Esqueceu a senha? <Text style={styles.link}>Recupere aqui</Text>
      </Text>
    </View>
  );
}