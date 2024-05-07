// Componente SearchInput.js
import React from 'react';
import { TextInput, View } from 'react-native';

function SearchInput({ onSearch }) {
    const handleInputChange = (searchTerm) => {
        onSearch(searchTerm);
    };

    // de algum modo ele vai ter q influenciar a busca do componente cards

    return (
        <View>
            <TextInput
                placeholder="O que você procura?"
                onChangeText={handleInputChange}
            />
        </View>
    );
}

export default SearchInput;
