import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from './HelpButtonStyles';

function HelpButton() {
  // Função para exibir o alerta
  const showAlert = () => {
    Alert.alert('Ajuda', 'Aqui você pode adicionar a mensagem de ajuda que desejar.', [{ text: 'OK' }]);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={showAlert}>
      <Text style={styles.text}>?</Text>
    </TouchableOpacity>
  );
}

export default HelpButton;
