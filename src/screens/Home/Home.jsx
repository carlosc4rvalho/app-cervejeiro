import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '@context/AuthContext';
// import { getAllReceitasBD as getRecipes } from '@backend/receitas/receita';
import { MaterialIcons } from '@expo/vector-icons';

import Recipe from '@components/Recipe';
import HelpButton from '@components/HelpButton';

import styles from './HomeStyles';

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

function Home({ navigation }) {
  const db = getFirestore();
  const { user } = useAuth();
  const [userName, setUserName] = useState('Fic Cervejeiro');
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.idUser) {
          await loadUserName(user.idUser);

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
    const filtered = recipes.slice(-5);
    setFilteredRecipes(filtered);
  }, [recipes]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const loadUserName = async idUser => {
    try {
      const userDoc = doc(db, 'users', idUser);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        setUserName(userSnapshot.data().name);
      } else {
        console.error('Usuário não encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar o nome do usuário', error);
    }
  };

  const handleAddRecipe = () => {
    navigation.navigate('RecipeRegistration');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.greeting}>Carlos!</Text>
        </View>
        <HelpButton />
      </View>

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
          renderItem={({ item }) => <Recipe key={item.id} id={item.id} name={item.name} status={item.status} />}
        />
      )}
    </View>
  );
}

export default Home;
