import React from 'react';
import { Alert, Button } from 'react-native';

export default  function HelpButton({ pageInfo }) {
  const handleHelpClick = () => {
    // Exibe um alerta com as informações fornecidas sobre a página atual
    Alert.alert('Ajuda', pageInfo);
  };

  return (
    // Botão de ajuda que chama a função handleHelpClick quando é pressionado
    // obs: ele deve estar em todas as paginas do app
    <Button title="Ajuda" onPress={handleHelpClick} />
  );
}