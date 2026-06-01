import React from 'react';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import StudentTabNavigator from './StudentTabNavigator';

import AdminTabNavigator from './AdminTabNavigator';

import {useAuthStore,} from '@store/authStore';

import ModuleDetailScreen from '@screens/ModuleDetailScreen';
import LessonScreen from '@screens/LessonScreen';
import QuizPlayScreen from '@screens/QuizPlayScreen';

import {
  RootStackParamList,
} from './types';
import NoteDetailScreen from '@/screens/NoteDetailScreen';
import CompleteProfileScreen from '@/screens/CompleteProfileScreen';

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export default function AuthNavigator() {

  const user = useAuthStore(state => state.user);

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
          user?.role === 'ADMIN' ? AdminTabNavigator : StudentTabNavigator
        }
      />

      <Stack.Screen
        name="CompleteProfile"
        component={
          CompleteProfileScreen
        }
      />

      <Stack.Screen
        name="ModuleDetail"
        component={
          ModuleDetailScreen
        }
      />

      <Stack.Screen
        name="Lesson"
        component={
          LessonScreen
        }
      />

      <Stack.Screen
        name="QuizPlay"
        component={
          QuizPlayScreen
        }
      />

      <Stack.Screen 
        name="NoteDetail"
        component={NoteDetailScreen}
      />
    </Stack.Navigator>
  );
}