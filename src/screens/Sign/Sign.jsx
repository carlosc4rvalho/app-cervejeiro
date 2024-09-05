import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, ImageBackground, Image } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { createUser } from '@backend/users/user';
import styles from './SignStyles';

import background from '@images/bg-login.png';
import logo from '@icons/logo.png';

function Sign() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    const signUpData = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await createUser(signUpData);

      if (response) {
        Alert.alert('Sucesso', 'Cadastro bem-sucedido!');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
      } else {
        Alert.alert('Erro', 'Houve um erro no cadastro, verifique seus dados.');
      }
    } catch (error) {
      console.error('Erro ao criar usuário', error);
      Alert.alert('Erro', 'Houve um erro no cadastro.');
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <Pressable style={styles.signupBtn} onPress={handleSignUp}>
            <Text style={styles.signupBtnText}>Cadastre-se</Text>
          </Pressable>
        </View>

        <Pressable style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Já tem uma conta? Faça Login</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

export default Sign;
