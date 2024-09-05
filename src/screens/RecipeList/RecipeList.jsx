import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { useAuth } from '@context/AuthContext';
// import { getAllReceitasBD as getRecipes } from "@backend/receitas/receita";
import { MaterialIcons } from '@expo/vector-icons';

import Recipe from '@components/Recipe';
import SearchBar from '@components/SearchBar';

import styles from './RecipeListStyles';

const initialRecipes = [
  { id: '1', name: 'Receita 1' },
  { id: '2', name: 'Receita 2' },
  { id: '3', name: 'Receita 3' },
  { id: '4', name: 'Receita 4' },
  { id: '5', name: 'Receita 5' },
  { id: '6', name: 'Receita 6' },
  { id: '7', name: 'Receita 7' },
  { id: '8', name: 'Receita 8' },
  { id: '9', name: 'Receita 9' },
  { id: '10', name: 'Receita 10' },
];

function RecipeList({ navigation }) {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.idUser) {
          // const recipes = await getRecipes(user.idUser);
          // setRecipes(recipes);

          const recipes = initialRecipes;
          setRecipes(recipes);
        }
      } catch (error) {
        console.error('Erro ao carregar dados', error);
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    const filtered = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredRecipes(filtered);
  }, [recipes, searchQuery]);

  const handleAddRecipe = () => {
    navigation.navigate('RecipeRegistration');
  };

  return (
    <View style={styles.container}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {filteredRecipes.length === 0 ? (
        <View style={styles.content}>
          <Pressable onPress={handleAddRecipe}>
            <MaterialIcons name="add-circle" color="#FFFFFF" size={75} />
          </Pressable>
          <Text style={styles.addBtnText}>Nova Receita</Text>
        </View>
      ) : (
        <FlatList
          style={styles.content}
          data={filteredRecipes}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Recipe key={item.id} id={item.id} name={item.name} />}
        />
      )}
    </View>
  );
}

export default RecipeList;
