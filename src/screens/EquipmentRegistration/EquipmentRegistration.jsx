import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createEquipamento } from '@backend/equipamentos/ProfileEquipment/ProfileEquipment';

function EquipmentRegistration() {
  const [formData, setFormData] = useState({
    nome: '',
    agua: '',
    esquentaAguaLavagemMash: '',
    chiller: '',
    singlevessel: '',
    eficienciaMash: '',
    eficienciaBrewhouse: '',
    volumePanela: '',
    volumeDeadSpace: '',
    volumeAbaixoFundo: '',
    volumePerdidoEvaporacao: '',
    volumeTrubQuente: '',
    volumeTrubFrio: '',
    contracaoLiquido: '',
    absorcaoEstimada: '',
    volumeFinalCervejaDesejado: '',
    diametroPanela: '',
    diametroAberturaPanela: '',
    volumeKegBarril: '',
    pesoMalte: '',
    tempPrimeiraRampa: '',
  });

  const handleSubmit = async () => {
    try {
      const idUser = await AsyncStorage.getItem('idUser');
      await createEquipamento(idUser, formData);
      Alert.alert('Sucesso', 'Equipamento cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar equipamento:', error);
      Alert.alert('Erro', 'Erro ao cadastrar equipamento.');
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={true}
    >
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={formData.nome}
          onChangeText={text => setFormData({ ...formData, nome: text })}
        />
        <Text style={styles.label}>Água:</Text>
        <TextInput
          style={styles.input}
          value={formData.agua}
          onChangeText={text => setFormData({ ...formData, agua: text })}
        />
        <Text style={styles.label}>Esquenta Água Lavagem Mash:</Text>
        <TextInput
          style={styles.input}
          value={formData.esquentaAguaLavagemMash}
          onChangeText={text => setFormData({ ...formData, esquentaAguaLavagemMash: text })}
        />
        <Text style={styles.label}>Chiller:</Text>
        <TextInput
          style={styles.input}
          value={formData.chiller}
          onChangeText={text => setFormData({ ...formData, chiller: text })}
        />
        <Text style={styles.label}>Single Vessel:</Text>
        <TextInput
          style={styles.input}
          value={formData.singlevessel}
          onChangeText={text => setFormData({ ...formData, singlevessel: text })}
        />
        <Text style={styles.label}>Eficiência Mash:</Text>
        <TextInput
          style={styles.input}
          value={formData.eficienciaMash}
          onChangeText={text => setFormData({ ...formData, eficienciaMash: text })}
        />
        <Text style={styles.label}>Eficiência Brewhouse:</Text>
        <TextInput
          style={styles.input}
          value={formData.eficienciaBrewhouse}
          onChangeText={text => setFormData({ ...formData, eficienciaBrewhouse: text })}
        />
        <Text style={styles.label}>Volume Panela:</Text>
        <TextInput
          style={styles.input}
          value={formData.volumePanela}
          onChangeText={text => setFormData({ ...formData, volumePanela: text })}
        />
        <Text style={styles.label}>Volume Dead Space:</Text>
        <TextInput
          style={styles.input}
          value={formData.volumeDeadSpace}
          onChangeText={text => setFormData({ ...formData, volumeDeadSpace: text })}
        />
        <Text style={styles.label}>Volume Abaixo Fundo:</Text>
        <TextInput
          style={styles.input}
          value={formData.volumeAbaixoFundo}
          onChangeText={text => setFormData({ ...formData, volumeAbaixoFundo: text })}
        />
        <Text style={styles.label}>Volume Perdido Evaporação:</Text>
        <TextInput
          style={styles.input}
          value={formData.volumePerdidoEvaporacao}
          onChangeText={text => setFormData({ ...formData, volumePerdidoEvaporacao: text })}
        />
        <Text style={styles.label}>Volume Trub Quente:</Text>
        <TextInput
          style={styles.input}
          value={formData.volumeTrubQuente}
          onChangeText={text => setFormData({ ...formData, volumeTrubQuente: text })}
        />
        <Text style={styles.label}>Volume Trub Frio:</Text>
        <TextInput
          style={styles.input}
          value={formData.volumeTrubFrio}
          onChangeText={text => setFormData({ ...formData, volumeTrubFrio: text })}
        />
        <Text style={styles.label}>Contração Líquido:</Text>
        <TextInput
          style={styles.input}
          value={formData.contracaoLiquido}
          onChangeText={text => setFormData({ ...formData, contracaoLiquido: text })}
        />
        <Text style={styles.label}>Absorção Estimada:</Text>
        <TextInput
          style={styles.input}
          value={formData.absorcaoEstimada}
          onChangeText={text => setFormData({ ...formData, absorcaoEstimada: text })}
        />
        <Text style={styles.label}>Volume Final Cerveja Desejado:</Text>
        <TextInput
          style={styles.input}
          value={formData.volumeFinalCervejaDesejado}
          onChangeText={text => setFormData({ ...formData, volumeFinalCervejaDesejado: text })}
        />
        <Text style={styles.label}>Diâmetro Panela:</Text>
        <TextInput
          style={styles.input}
          value={formData.diametroPanela}
          onChangeText={text => setFormData({ ...formData, diametroPanela: text })}
        />
        <Text style={styles.label}>Diâmetro Abertura Panela:</Text>
        <TextInput
          style={styles.input}
          value={formData.diametroAberturaPanela}
          onChangeText={text => setFormData({ ...formData, diametroAberturaPanela: text })}
        />
        <Text style={styles.label}>Volume Keg Barril:</Text>
        <TextInput
          style={styles.input}
          value={formData.volumeKegBarril}
          onChangeText={text => setFormData({ ...formData, volumeKegBarril: text })}
        />
        <Text style={styles.label}>Peso Malte:</Text>
        <TextInput
          style={styles.input}
          value={formData.pesoMalte}
          onChangeText={text => setFormData({ ...formData, pesoMalte: text })}
        />
        <Text style={styles.label}>Temperatura Primeira Rampa:</Text>
        <TextInput
          style={styles.input}
          value={formData.tempPrimeiraRampa}
          onChangeText={text => setFormData({ ...formData, tempPrimeiraRampa: text })}
        />
        <Button title="Cadastrar Equipamento" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    maxHeight: '100vh',
    padding: 20,
  },
  formContainer: {
    flex: 1,
    gap: 2,
    paddingBottom: '20%',
    overflow: 'auto',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});

export default EquipmentRegistration;
