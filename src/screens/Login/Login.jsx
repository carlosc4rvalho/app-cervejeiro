import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@context/AuthContext';
import Notification from '@components/Notification';

// Estilos
import styles from './LoginStyles';

// Imagens
import logo from '@icons/logo.png';
import background from '@images/bg-login.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({ visible: false, message: '', type: '' });
  const navigation = useNavigation();
  const { signIn } = useAuth();

  const showNotification = (message, type) => {
    setNotification({ visible: true, message, type });
    setTimeout(() => setNotification({ visible: false, message: '', type: '' }), 3000);
  };

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(username)) {
      showNotification('Por favor, insira um e-mail válido.', 'error');
      return;
    }
    if (password === '') {
      showNotification('Sua senha não pode ser vazia.', 'error');
      return;
    }

    const loginData = {
      email: username,
      password: password,
    };

    const response = await signIn(loginData);

    if (response.success) {
      showNotification('Login bem-sucedido!', 'success');
      navigation.navigate('Home');
    } else {
      showNotification(response.message, 'error');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Sign');
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#aaa"
          />
          <Pressable style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginBtnText}>Entrar</Text>
          </Pressable>
        </View>

        <Pressable style={styles.registerBtn} onPress={handleRegister}>
          <Text style={styles.registerBtnText}>Não possui uma conta? Cadastre-se</Text>
        </Pressable>

        <Notification
          message={notification.message}
          visible={notification.visible}
          onClose={() => setNotification({ ...notification, visible: false })}
          type={notification.type}
        />
      </View>
    </ImageBackground>
  );
}

export default Login;
