import React from 'react';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import LoginScreen from '@screens/LoginScreen';
import RegisterScreen from '@screens/RegisterScreen';
import OtpScreen from '@screens/OtpScreen';

import {
  RootStackParamList,
} from './types';

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export default function GuestNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:
          false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={
          LoginScreen
        }
      />

      <Stack.Screen
        name="Register"
        component={
          RegisterScreen
        }
      />

      <Stack.Screen
        name="OTP"
        component={
          OtpScreen
        }
      />
    </Stack.Navigator>
  );
}