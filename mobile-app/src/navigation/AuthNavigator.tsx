import React from 'react';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import HomeScreen from '@screens/HomeScreen';

import {
  RootStackParamList,
} from './types';

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:
          false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={
          HomeScreen
        }
      />
    </Stack.Navigator>
  );
}