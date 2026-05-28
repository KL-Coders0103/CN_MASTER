import api from './api';

import {
  getToken,
} from '@utils/secureStorage';

export const getQuizAPI =
  async () => {
    const response =
      await api.get(
        '/quiz'
      );

    return response.data;
  };

export const submitQuizAPI =
  async (
    score: number
  ) => {
    const token =
      await getToken();

    const response =
      await api.post(
        '/quiz/submit',
        {
          score,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };