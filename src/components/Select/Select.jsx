import React from 'react';
import { Picker } from 'react-native';

function Select({ options, onSelect }) {
  return (
    <>
      {/* ainda não está completo */}
      <Picker
        selectedValue={options[0].value}
        onValueChange={(itemValue) => onSelect(itemValue)}
      >
        {options.map((option, index) => (
          <Picker.Item key={index} label={option.label} value={option.value} />
        ))}
      </Picker>
    </>
  );
}

export default Select;
