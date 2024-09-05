// components/SearchBar.js
import React from 'react';
import { View, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './SearchBarStyles.js';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="O que você procura?"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <MaterialIcons name="search" size={24} color="#000" style={styles.icon} />
    </View>
  );
};

export default SearchBar;
