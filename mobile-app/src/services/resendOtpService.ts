import api from './api';

export const resendOtpAPI =
  async (
    userId: string
  ) => {
    try {
      const response =
        await api.post(
          '/auth/resend-otp',
          {
            userId,
          }
        );

      return response.data;
    } catch (
      error: any
    ) {
      const message =
        error?.response
          ?.data?.message ||
        'Failed to resend OTP';

      throw new Error(
        message
      );
    }
  };