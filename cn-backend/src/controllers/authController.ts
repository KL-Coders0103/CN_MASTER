import {
  Request,
  Response,
  NextFunction,
} from 'express';

import {
  registerUserService,
  verifyOtpService,
  resendOtpService,
} from '../services/authService';

export const registerUser =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user =
        await registerUserService(
          req.body
        );

      return res
        .status(201)
        .json({
          success: true,
          message:
            'OTP sent successfully',
          userId: user.id,
        });
    } catch (error) {
      next(error);
    }
  };

export const verifyOtp =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {
        userId,
        otp,
      } = req.body;

      await verifyOtpService(
        userId,
        otp
      );

      return res
        .status(200)
        .json({
          success: true,
          message:
            'Email verified successfully',
        });
    } catch (error) {
      next(error);
    }
  };

  export const resendOtp =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {
        userId,
      } = req.body;

      await resendOtpService(
        userId
      );

      return res
        .status(200)
        .json({
          success: true,
          message:
            'OTP resent successfully',
        });
    } catch (error) {
      next(error);
    }
  };