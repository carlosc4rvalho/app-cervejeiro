import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import { useAuth } from '@context/AuthContext';
import { fetchEquipamentos as getEquipments } from "@backend/equipamentos/ProfileEquipment/ProfileEquipment";
import { MaterialIcons } from '@expo/vector-icons';

import Equipment from '@components/Equipment';
import SearchBar from '@components/SearchBar';

import styles from './EquipmentListStyles';

const initialEquipments = [
  { id: '1', name: 'Equipamento 1' },
  { id: '2', name: 'Equipamento 2' },
  { id: '3', name: 'Equipamento 3' },
  { id: '4', name: 'Equipamento 4' },
  { id: '5', name: 'Equipamento 5' },
  { id: '6', name: 'Equipamento 6' },
  { id: '7', name: 'Equipamento 7' },
  { id: '8', name: 'Equipamento 8' },
  { id: '9', name: 'Equipamento 9' },
  { id: '10', name: 'Equipamento 10' },
];

function EquipmentList({ navigation }) {
  const { user } = useAuth();
  const [equipment, setEquipment] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.idUser) {
          // const equipamentos = await getEquipments(user.idUser);
          // setEquipment(equipamentos);

          const equipamentos = initialEquipments;
          setEquipment(equipamentos);
        }
      } catch (error) {
        console.error('Erro ao carregar dados', error);
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    const filtered = equipment.filter(equipment => equipment.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredEquipment(filtered);
  }, [equipment, searchQuery]);

  const handleAddEquipment = () => {
    navigation.navigate('EquipmentRegistration');
  };

  return (
    <View style={styles.container}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {filteredEquipment.length === 0 ? (
        <View style={styles.content}>
          <Pressable onPress={handleAddEquipment}>
            <MaterialIcons name="add-circle" color="#FFFFFF" size={75} />
          </Pressable>
          <Text style={styles.addBtnText}>Novo Equipamento</Text>
        </View>
      ) : (
        <FlatList
          style={styles.content}
          data={filteredEquipment}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Equipment key={item.id} id={item.id} name={item.name} />}
        />
      )}
    </View>
  );
}

export default EquipmentList;
