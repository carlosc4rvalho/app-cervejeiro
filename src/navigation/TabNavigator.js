import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import Home from '@screens/Home';
import RecipeList from '@screens/RecipeList';
import OptionRegister from '@screens/OptionRegister';
import EquipmentList from '@screens/EquipmentList';
import Profile from '@screens/Profile';

const Tab = createBottomTabNavigator();

const iconMap = {
  Home: 'home',
  Receitas: 'description',
  Novo: 'add-circle',
  Equipamentos: 'settings',
  Perfil: 'account-circle',
};

const customIconColor = '#EFBA2F';

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#FFFFFF',
          tabBarLabelStyle: styles.tabBarLabel,
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <MaterialIcons name={iconMap.Home} size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Receitas"
        component={RecipeList}
        options={{
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#DDDDDD',
          tabBarLabelStyle: styles.tabBarLabel,
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <MaterialIcons name={iconMap.Receitas} size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Novo"
        component={OptionRegister}
        options={{
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#DDDDDD',
          tabBarLabelStyle: styles.tabBarLabel,
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View style={[styles.iconContainer, { marginTop: -size / 10 }]}>
              <MaterialIcons name={iconMap.Novo} size={size * 3} color={customIconColor} />
            </View>
          ),
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="Equipamentos"
        component={EquipmentList}
        options={{
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#DDDDDD',
          tabBarLabelStyle: styles.tabBarLabel,
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <MaterialIcons name={iconMap.Equipamentos} size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#DDDDDD',
          tabBarLabelStyle: styles.tabBarLabel,
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <MaterialIcons name={iconMap.Perfil} size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#206A30',
    height: 75,
    padding: 5,
  },
  tabBarLabel: {
    fontSize: 12,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    width: 70,
    overflow: 'visible',
  },
});

export default TabNavigator;
