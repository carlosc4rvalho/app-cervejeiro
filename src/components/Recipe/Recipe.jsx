import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './RecipeStyles';

const Recipe = ({ id, name }) => {
  const navigation = useNavigation();

  const handleRecipeDetails = () => {
    navigation.navigate('RecipeDetails', { recipeId: id });
  };

  return (
    <Pressable style={styles.container} onPress={handleRecipeDetails}>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text>Descrição...</Text>
      </View>
      <View style={styles.editButton}>
        <MaterialIcons name="favorite" size={32} color="#BD1E18" />
      </View>
    </Pressable>
  );
};

export default Recipe;
