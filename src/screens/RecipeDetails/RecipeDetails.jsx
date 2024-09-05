import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useAuth } from '@context/AuthContext';
import { useRoute } from '@react-navigation/native';
import styles from './RecipeDetailsStyles';

const recipes = [
  {
    id: '1',
    name: 'Receita 1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem est doloremque at sint explicabo quisquam dolore architecto animi, voluptatem odit aut facilis. Maiores nam doloribus corporis, culpa consectetur eos natus!',
  },
  {
    id: '2',
    name: 'Receita 2',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem est doloremque at sint explicabo quisquam dolore architecto animi, voluptatem odit aut facilis. Maiores nam doloribus corporis, culpa consectetur eos natus!',
  },
  {
    id: '3',
    name: 'Receita 3',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem est doloremque at sint explicabo quisquam dolore architecto animi, voluptatem odit aut facilis. Maiores nam doloribus corporis, culpa consectetur eos natus!',
  },
  {
    id: '4',
    name: 'Receita 4',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem est doloremque at sint explicabo quisquam dolore architecto animi, voluptatem odit aut facilis. Maiores nam doloribus corporis, culpa consectetur eos natus!',
  },
  {
    id: '5',
    name: 'Receita 5',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem est doloremque at sint explicabo quisquam dolore architecto animi, voluptatem odit aut facilis. Maiores nam doloribus corporis, culpa consectetur eos natus!',
  },
  {
    id: '6',
    name: 'Receita 6',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem est doloremque at sint explicabo quisquam dolore architecto animi, voluptatem odit aut facilis. Maiores nam doloribus corporis, culpa consectetur eos natus!',
  },
  {
    id: '7',
    name: 'Receita 7',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem est doloremque at sint explicabo quisquam dolore architecto animi, voluptatem odit aut facilis. Maiores nam doloribus corporis, culpa consectetur eos natus!',
  },
  {
    id: '8',
    name: 'Receita 8',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem est doloremque at sint explicabo quisquam dolore architecto animi, voluptatem odit aut facilis. Maiores nam doloribus corporis, culpa consectetur eos natus!',
  },
  {
    id: '9',
    name: 'Receita 9',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem est doloremque at sint explicabo quisquam dolore architecto animi, voluptatem odit aut facilis. Maiores nam doloribus corporis, culpa consectetur eos natus!',
  },
  {
    id: '10',
    name: 'Receita 10',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem est doloremque at sint explicabo quisquam dolore architecto animi, voluptatem odit aut facilis. Maiores nam doloribus corporis, culpa consectetur eos natus!',
  },
];

function RecipeDetail({ navigation }) {
  const route = useRoute();
  const { user } = useAuth();
  const { recipeId } = route.params;
  const [recipeDetail, setRecipeDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.idUser) {
          const recipe = recipes.find(r => r.id === recipeId);
          setRecipeDetail(recipe);
        }
      } catch (error) {
        console.error('Erro ao carregar detalhes da receita', error);
      }
    };

    fetchData();
  }, [recipeId, user?.idUser]);

  const handleProductAssistant = () => {
    navigation.navigate('ProductAssistant');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{recipeDetail?.name}</Text>
        <Pressable onPress={handleProductAssistant} style={styles.button}>
          <Text style={styles.buttonText}>Produzir</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.detail}>{recipeDetail?.description}</Text>
      </View>
    </ScrollView>
  );
}

export default RecipeDetail;
