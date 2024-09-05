import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '@context/AuthContext';

import styles from './profileStyles.js';

const Profile = () => {
  const db = getFirestore();
  const { user } = useAuth();
  const [userName, setUserName] = useState('Seu nome aqui');
  const [userEmail, setUserEmail] = useState('examplo@gmail.com');
  const [image, setImage] = useState(null);

  const navigation = useNavigation();
  const { signOut } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.idUser) {
          await loadUserDetails(user.idUser);
        }
      } catch (error) {
        console.error('Erro ao carregar dados', error);
      }
    };

    fetchData();
  }, [user]);

  const loadUserDetails = async idUser => {
    try {
      const userDoc = doc(db, 'users', idUser);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        setUserName(userSnapshot.data().name);
        setUserEmail(userSnapshot.data().email);
      } else {
        console.error('Usuário não encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar o nome do usuário', error);
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível fazer logout.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        {/* foto de perfil */}
      </View>
      
      <View style={styles.header}>
        <Text style={styles.userName}>{userName}</Text>
        {/* nome */}
        <Text style={styles.userEmail}>{userEmail}</Text>
        {/* e-mail */}
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text>Receitas</Text>
        </View>
        <View style={styles.card}>
          <Text>Equipamentos</Text>
        </View>
        <View style={styles.card}>
          <Text>Bronze</Text>
        </View>
        <View style={styles.card}>
          <Text>XP</Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;