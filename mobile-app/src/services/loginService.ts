import api from './api';

interface LoginData {
  email: string;
  password: string;
}

export const loginAPI =
  async (
    data: LoginData
  ) => {
    try {
      const response =
        await api.post(
          '/auth/login',
          data
        );

      return response.data;
    } catch (
      error: any
    ) {
      const message =
        error?.response
          ?.data?.message ||
        'Login failed';

      throw new Error(
        message
      );
    }
  };