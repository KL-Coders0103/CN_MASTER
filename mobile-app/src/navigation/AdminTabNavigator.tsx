import React from 'react';

import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {
  Ionicons,
} from '@expo/vector-icons';

import {
  View,
  StyleSheet,
} from 'react-native';

import HomeScreen
from
'@screens/HomeScreen';

import ProfileScreen
from
'@screens/ProfileScreen';

import Colors
from
'@theme/colors';

const Tab =
createBottomTabNavigator();

export default function
AdminTabNavigator() {

  return (
    <Tab.Navigator
      screenOptions={({
        route,
      })=>({

        headerShown:
          false,

        tabBarShowLabel:
          false,

        tabBarIcon:
          ({
            focused,
          }) => {

            let icon:
              keyof typeof
              Ionicons.glyphMap =
              'grid';

            if(
              route.name ===
              'AdminHome'
            ){
              icon =
                focused
                  ? 'grid'
                  : 'grid-outline';
            }

            if(
              route.name ===
              'Profile'
            ){
              icon =
                focused
                  ? 'person'
                  : 'person-outline';
            }

            return(
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
        name="AdminHome"
        component={
          HomeScreen
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

  iconWrap:{
    width:48,
    height:48,
    justifyContent:
      'center',
    alignItems:
      'center',
    borderRadius:16,
  },

  activeWrap:{
    backgroundColor:
      'rgba(29,78,216,0.10)',
  },

});