import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useAuth } from '@context/AuthContext';
import { useRoute } from '@react-navigation/native';
import styles from './EquipmentDetailsStyles';

const equipment = [
  {
    id: '1',
    name: 'Equipamento 1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem est doloremque at sint explicabo quisquam dolore architecto animi, voluptatem odit aut facilis. Maiores nam doloribus corporis, culpa consectetur eos natus!',
  },
  {
    id: '2',
    name: 'Equipamento 2',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem est doloremque at sint explicabo quisquam dolore architecto animi, voluptatem odit aut facilis. Maiores nam doloribus corporis, culpa consectetur eos natus!',
  },
  {
    id: '3',
    name: 'Equipamento 3',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem est doloremque at sint explicabo quisquam dolore architecto animi, voluptatem odit aut facilis. Maiores nam doloribus corporis, culpa consectetur eos natus!',
  },
  {
    id: '4',
    name: 'Equipamento 4',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem est doloremque at sint explicabo quisquam dolore architecto animi, voluptatem odit aut facilis. Maiores nam doloribus corporis, culpa consectetur eos natus!',
  },
  {
    id: '5',
    name: 'Equipamento 5',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem est doloremque at sint explicabo quisquam dolore architecto animi, voluptatem odit aut facilis. Maiores nam doloribus corporis, culpa consectetur eos natus!',
  },
  {
    id: '6',
    name: 'Equipamento 6',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem est doloremque at sint explicabo quisquam dolore architecto animi, voluptatem odit aut facilis. Maiores nam doloribus corporis, culpa consectetur eos natus!',
  },
  {
    id: '7',
    name: 'Equipamento 7',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem est doloremque at sint explicabo quisquam dolore architecto animi, voluptatem odit aut facilis. Maiores nam doloribus corporis, culpa consectetur eos natus!',
  },
  {
    id: '8',
    name: 'Equipamento 8',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem est doloremque at sint explicabo quisquam dolore architecto animi, voluptatem odit aut facilis. Maiores nam doloribus corporis, culpa consectetur eos natus!',
  },
  {
    id: '9',
    name: 'Equipamento 9',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem est doloremque at sint explicabo quisquam dolore architecto animi, voluptatem odit aut facilis. Maiores nam doloribus corporis, culpa consectetur eos natus!',
  },
  {
    id: '10',
    name: 'Equipamento 10',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem est doloremque at sint explicabo quisquam dolore architecto animi, voluptatem odit aut facilis. Maiores nam doloribus corporis, culpa consectetur eos natus!',
  },
];

function EquipmentDetails({ navigation }) {
  const route = useRoute();
  const { user } = useAuth();
  const { equipmentId } = route.params;
  const [equipmentDetail, setEquipmentDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.idUser) {
          const equipmentItem = equipment.find(e => e.id === equipmentId);
          setEquipmentDetail(equipmentItem);
        }
      } catch (error) {
        console.error('Erro ao carregar detalhes do equipamento', error);
      }
    };

    fetchData();
  }, [equipmentId, user?.idUser]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{equipmentDetail?.name}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.detail}>Descrição: {equipmentDetail?.description}</Text>
      </View>
    </ScrollView>
  );
}

export default EquipmentDetails;
