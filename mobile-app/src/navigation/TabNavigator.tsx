import React from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {
  Ionicons,
} from '@expo/vector-icons';

import HomeScreen from '@screens/HomeScreen';
import LearnScreen from '@screens/LearnScreen';
import AIScreen from '@screens/AIScreen';
import QuizScreen from '@screens/QuizScreen';
import ProfileScreen from '@screens/ProfileScreen';

import Colors from '@theme/colors';
import NotesScreen from '@/screens/NotesScreen';

const Tab =
  createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }) => ({
        headerShown:
          false,

        tabBarShowLabel:
          false,

        tabBarStyle: {
          position:
            'absolute',

          left: 18,
          right: 18,
          bottom: 18,

          height: 76,

          borderRadius: 30,

          backgroundColor:
            'rgba(255,255,255,0.96)',

          borderTopWidth: 0,

          shadowColor:
            '#0F172A',

          shadowOffset: {
            width: 0,
            height: 14,
          },

          shadowOpacity:
            0.08,

          shadowRadius: 24,

          elevation: 8,
        },

        tabBarIcon: ({
          focused,
        }) => {
          let icon:
            keyof typeof Ionicons.glyphMap =
            'home';

          if (
            route.name ===
            'Home'
          )
            icon =
              focused
                ? 'home'
                : 'home-outline';

          if (
            route.name ===
            'Learn'
          )
            icon =
              focused
                ? 'book'
                : 'book-outline';

          if (
            route.name ===
            'AI'
          )
            icon =
              focused
                ? 'sparkles'
                : 'sparkles-outline';

          if (
            route.name ===
            'Quiz'
          )
            icon =
              focused
                ? 'flash'
                : 'flash-outline';

          if (
            route.name ===
            'Profile'
          )
            icon =
              focused
                ? 'person'
                : 'person-outline';

          if (
            route.name ===
            'Notes'
          )
            icon = 
              focused
               ? 'document-text'
               : 'document-text-outline';

          return (
            <View
              style={[
                styles.iconWrap,
                focused &&
                  styles.activeWrap,
              ]}
            >
              <Ionicons
                name={icon}
                size={23}
                color={
                  focused
                    ? Colors.primary
                    : Colors.textMuted
                }
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={
          HomeScreen
        }
      />

      <Tab.Screen
        name="Learn"
        component={
          LearnScreen
        }
      />

      <Tab.Screen
        name="AI"
        component={
          AIScreen
        }
      />

      <Tab.Screen
        name="Quiz"
        component={
          QuizScreen
        }
      />

      <Tab.Screen
        name="Notes"
        component={
          NotesScreen
        }
      />

      <Tab.Screen
        name="Profile"
        component={
          ProfileScreen
        }
      />
    </Tab.Navigator>
  );
}

const styles =
  StyleSheet.create({
    iconWrap: {
      width: 48,
      height: 48,

      justifyContent:
        'center',

      alignItems:
        'center',

      borderRadius: 16,
    },

    activeWrap: {
      backgroundColor:
        'rgba(29,78,216,0.10)',
    },
  });