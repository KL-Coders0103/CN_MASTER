import { create } from 'zustand';

import {
  saveAuth,
  clearAuth,
} from '@utils/secureStorage';

import {getCurrentUserAPI} from '@services/authService';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  xp?: number;
  streak?: number;
  isVerified?: boolean;
  avatar?: string;

  achievements?: {
    id: string;
    title: string;
    unlocked: boolean;
  }[];
}

interface AuthState {
  token: string | null;
  user: User | null;

  setAuth: (
    token: string,
    user: User
  ) => Promise<void>;

  restoreAuth: (
    token: string,
    user: User
  ) => void;

  refreshUser: () => Promise<void>;

  logout: () => Promise<void>;
}

export const useAuthStore =
  create<AuthState>(
    set => ({
      token: null,
      user: null,

      setAuth:
        async (
          token,
          user
        ) => {
          await saveAuth(
            token,
            user
          );

          set({
            token,
            user,
          });
        },

      restoreAuth:
        (
          token,
          user
        ) =>
          set({
            token,
            user,
          }),

          refreshUser:
  async () => {
    try {
      const result =
        await getCurrentUserAPI();

      set(
        state => ({
          user: {
            ...state.user!,
            ...result.user,
          },
        })
      );

      await saveAuth(
        useAuthStore.getState()
          .token!,
        result.user
      );
    } catch (
      error
    ) {
      console.log(
        'Refresh user failed',
        error
      );

      await clearAuth();

      set({
        token: null,
        user:null,
      })
    }
  },

      logout:
        async () => {
          await clearAuth();

          set({
            token: null,
            user: null,
          });
        },
    })
  );