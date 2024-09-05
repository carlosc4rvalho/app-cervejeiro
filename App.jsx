import React from 'react';
import StackNavigator from '@navigation/StackNavigator';
import { AuthProvider } from '@context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <StackNavigator />
    </AuthProvider>
  );
}