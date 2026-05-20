import api from './api';
import { RegisterFormData } from '../utils/validation';

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