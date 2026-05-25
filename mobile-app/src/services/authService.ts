import api from './api';
import { RegisterFormData } from '../utils/validation';
import {
  getToken,
} from '@utils/secureStorage';

export const registerUserAPI = async (
  data: RegisterFormData
) => {
  try {
    const response = await api.post(
      '/auth/register',
      data
    );

    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      'Server connection failed';

    throw new Error(message);
  }
};

export const getCurrentUserAPI =
  async () => {
    const token =
      await getToken();

    const response =
      await api.get(
        '/auth/me',
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };