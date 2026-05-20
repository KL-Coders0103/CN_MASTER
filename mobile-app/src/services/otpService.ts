import api from './api';

export const verifyOtpAPI = async (
  userId: string,
  otp: string
) => {
  try {
    const response = await api.post(
      '/auth/verify-otp',
      {
        userId,
        otp,
      }
    );

    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      'Verification failed';

    throw new Error(message);
  }
};