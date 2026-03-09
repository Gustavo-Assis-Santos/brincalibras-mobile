import { FontAwesome, Ionicons } from '@expo/vector-icons'; // Para os ícones
import { Animated, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useLogin } from '../../hooks/useLogin';
import { styles } from './login.styles';

export default function LoginScreen() {
  const { 
    email, setEmail, 
    senha, setSenha, 
    erro, validarESubmeter,
    focusAnimEmail, animateFocus,
    focusAnimSenha,
    errorAnim
  } = useLogin();

  const placeholderOpacityEmail = focusAnimEmail.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0], // 1 quando blur (visível), 0 quando focado (invisível)
  });

  const backgroundColorEmail = focusAnimEmail.interpolate({
    inputRange: [0, 1],
    outputRange: ['#eeeeee', '#d1d1d1']
  });

  const placeholderOpacitySenha = focusAnimSenha.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0], 
  });

  const backgroundColorSenha = focusAnimSenha.interpolate({
    inputRange: [0, 1],
    outputRange: ['#eeeeee', '#d1d1d1']
  });

  const backgroundColorErro = errorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#eeeeee', '#fcc5c5']
  });

  const finalBgEmail = erro.email ? backgroundColorErro : backgroundColorEmail;
  const finalBgSenha = erro.senha ? backgroundColorErro : backgroundColorSenha;

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

      {/* Formulário */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>E-mail</Text>
        <Animated.View style={[styles.inputContainer, {backgroundColor: finalBgEmail}]}>
          <Ionicons name="mail-outline" size={20} color="#000000" style={styles.inputIcon} />
          <Animated.Text
            style={[
              styles.customPlaceholder,
              { opacity: placeholderOpacityEmail }
            ]}
          >
            email@email.com
          </Animated.Text>
          <TextInput 
            style={styles.input} 
            onFocus={() => animateFocus(focusAnimEmail, 1)}
            onBlur={(e) => {
              if (email === "") animateFocus(focusAnimEmail, 0)
            }} 
            value={email}
            onChangeText={setEmail}
          />
        </Animated.View>

        <Text style={styles.label}>Senha</Text>
        <Animated.View style={[styles.inputContainer, {backgroundColor: finalBgSenha}]}>
          <Ionicons name="lock-closed-outline" size={20} color="#000000" style={styles.inputIcon} />
          <Animated.Text
            style={[
              styles.customPlaceholder,
              { opacity: placeholderOpacitySenha }
            ]}
          >
            ***************
          </Animated.Text>
          <TextInput 
            style={styles.input} 
            onFocus={() => animateFocus(focusAnimSenha, 1)}
            onBlur={(e) => {
              if (senha === "") animateFocus(focusAnimSenha, 0)
            }} 
            secureTextEntry 
            value={senha}
            onChangeText={setSenha}
          />
        </Animated.View>

        <TouchableOpacity style={styles.button} onPress={validarESubmeter}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        Não tem uma conta? <Text style={styles.link}>Cadastre-se</Text>
      </Text>
      <Text style={styles.footerText}>
        Esqueceu a senha? <Text style={styles.link}>Recupere aqui</Text>
      </Text>
    </View>
  );
}