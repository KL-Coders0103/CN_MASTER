import { create } from 'zustand';

import {
  saveAuth,
  clearAuth,
} from '@utils/secureStorage';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
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