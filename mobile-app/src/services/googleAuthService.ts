import api from './api';

export const googleAuthAPI = async (idToken:string) => {
    const response =
      await api.post('/auth/google',
        {
          idToken,
        }
      );

    return response.data;
  };