import React from 'react';

import {
  NavigationContainer,
} from '@react-navigation/native';

import GuestNavigator from './GuestNavigator';
import AuthNavigator from './AuthNavigator';

import {
  useAuthStore,
} from '@store/authStore';

export default function AppNavigator() {
  const token =
    useAuthStore(
      state =>
        state.token
    );

  return (
    <NavigationContainer>
      {token ? (
        <AuthNavigator />
      ) : (
        <GuestNavigator />
      )}
    </NavigationContainer>
  );
}