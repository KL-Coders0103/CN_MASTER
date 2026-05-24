import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY =
  'cnmaster_token';

const USER_KEY =
  'cnmaster_user';

export const saveAuth =
  async (
    token: string,
    user: any
  ) => {
    await SecureStore.setItemAsync(
      TOKEN_KEY,
      token
    );

    await SecureStore.setItemAsync(
      USER_KEY,
      JSON.stringify(
        user
      )
    );
  };

export const getToken =
  async () => {
    return SecureStore.getItemAsync(
      TOKEN_KEY
    );
  };

export const getUser =
  async () => {
    const user =
      await SecureStore.getItemAsync(
        USER_KEY
      );

    return user
      ? JSON.parse(
          user
        )
      : null;
  };

export const clearAuth =
  async () => {
    await SecureStore.deleteItemAsync(
      TOKEN_KEY
    );

    await SecureStore.deleteItemAsync(
      USER_KEY
    );
  };