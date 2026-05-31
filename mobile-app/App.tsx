import React, {
  useEffect,
} from 'react';

import {
  StatusBar,
} from 'expo-status-bar';

import {
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import Toast from 'react-native-toast-message';

import AppNavigator from './src/navigation/AppNavigator';

import {
  getToken,
  getUser,
} from './src/utils/secureStorage';

import {
  useAuthStore,
} from './src/store/authStore';

import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const restoreAuth =
    useAuthStore(
      state =>
        state.restoreAuth
    );

  useEffect(() => {
    const hydrate =
      async () => {
        const token =
          await getToken();

        const user =
          await getUser();

        if (
          token &&
          user
        ) {
          restoreAuth(
            token,
            user
          );
        }
      };

    hydrate();
  }, []);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
      <SafeAreaProvider>
        <StatusBar
          style="light"
        />

        <AppNavigator />

        <Toast />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}