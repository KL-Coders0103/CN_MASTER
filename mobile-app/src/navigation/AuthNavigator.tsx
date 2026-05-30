import React from 'react';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';

import ModuleDetailScreen from '@screens/ModuleDetailScreen';
import LessonScreen from '@screens/LessonScreen';
import QuizPlayScreen from '@screens/QuizPlayScreen';

import {
  RootStackParamList,
} from './types';
import NoteDetailScreen from '@/screens/NoteDetailScreen';

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
        name="Tabs"
        component={
          TabNavigator
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