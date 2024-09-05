import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './TabNavigator';

import Login from '@screens/Login';
import Sign from '@screens/Sign';
import EquipmentList from '@screens/EquipmentList';
import EquipmentDetails from '@screens/EquipmentDetails';
import EquipmentRegistration from '@screens/EquipmentRegistration';
import RecipeList from '@screens/RecipeList';
import RecipeDetails from '@screens/RecipeDetails';
import RecipeRegistration from '@screens/RecipeRegistration';
import ProductAssistant from '@screens/ProductAssistant';
import WaterCorrection from '@screens/WaterCorrection';
import OptionRegister from '@screens/OptionRegister';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Sign" component={Sign} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="EquipmentList" component={EquipmentList} options={{ headerShown: false }} />
        <Stack.Screen name="EquipmentDetails" component={EquipmentDetails} options={{ title: '' }} />
        <Stack.Screen name="EquipmentRegistration" component={EquipmentRegistration} options={{ headerShown: false }} />
        <Stack.Screen name="RecipeList" component={RecipeList} options={{ headerShown: false }} />
        <Stack.Screen name="RecipeDetails" component={RecipeDetails} options={{ title: '' }} />
        <Stack.Screen name="RecipeRegistration" component={RecipeRegistration} options={{ headerShown: false }} />
        <Stack.Screen name="ProductAssistant" component={ProductAssistant} options={{ headerShown: true }} />
        <Stack.Screen name="WaterCorrection" component={WaterCorrection} options={{ headerShown: false }} />
        <Stack.Screen name="OptionRegister" component={OptionRegister} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
