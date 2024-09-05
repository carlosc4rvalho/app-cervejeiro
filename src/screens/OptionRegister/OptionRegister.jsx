import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './OptionRegisterStyles';

function OptionRegister() {
  const navigation = useNavigation();

  const handleNavigate = screen => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>O que você deseja cadastrar?</Text>

      <View style={styles.content}>
        <Pressable style={styles.button} onPress={() => handleNavigate('RecipeRegistration')}>
          <Text style={styles.buttonText}>Receita</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => handleNavigate('EquipmentRegistration')}>
          <Text style={styles.buttonText}>Equipamento</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default OptionRegister;
