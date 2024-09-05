import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './EquipmentStyles';

const Equipment = ({ id, name }) => {
  const navigation = useNavigation();

  const handleRecipeDetails = () => {
    navigation.navigate('EquipmentDetails', { equipmentId: id });
  };

  return (
    <Pressable style={styles.container} onPress={handleRecipeDetails}>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text>Descrição...</Text>
      </View>
      <Pressable style={styles.editButton} onPress={id}>
        <MaterialIcons name="favorite" size={32} color="#BD1E18" />
      </Pressable>
    </Pressable>
  );
};

export default Equipment;
