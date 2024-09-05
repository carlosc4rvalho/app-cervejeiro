import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '@backend/users/user';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = async data => {
    try {
      const response = await loginUser(data);

      if (response.results === 'OK') {
        const idUser = response.idUser;

        await AsyncStorage.setItem('idUser', idUser);

        setUser({ idUser: idUser });

        return { success: true, user: { idUser } };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Erro ao realizar login', error);
      return { success: false, message: 'Erro ao realizar login' };
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('idUser');

      setUser(null);
    } catch (error) {
      console.error('Erro ao realizar logout', error);
    }
  };

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
