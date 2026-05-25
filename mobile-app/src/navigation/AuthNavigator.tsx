import React from 'react';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';

const Stack =
  createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:
          false,
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={
          TabNavigator
        }
      />
    </Stack.Navigator>
  );
}