import {
  Request,
  Response,
  NextFunction,
} from 'express';

import {
  registerUserService,
  verifyOtpService,
  resendOtpService,
  loginUserService,
  getCurrentUserService,
} from '../services/authService';

import {
  AuthRequest,
} from '../middlewares/authMiddleware';
import { getAchievements } from '../utils/achievementsEngine';

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

  export const loginUser =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {
        email,
        password,
      } = req.body;

      const result =
        await loginUserService(
          email,
          password
        );

      return res
        .status(200)
        .json({
          success: true,
          message:
            'Login successful',
          token:
            result.token,
          user: {
            id:
              result.user.id,
            name:
              result.user.name,
            email:
              result.user.email,
            role:
              result.user.role,
            xp: result.user.xp,
            streak: result.user.streak,
            isVerified:
              result.user.isVerified,
            avatar:
              result.user.avatar,
          },
        });
    } catch (error) {
      next(error);
    }
  };

  export const getCurrentUser =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId =
        req.user?.userId;

      const user =
        await getCurrentUserService(
          userId!
        );

      const achievements =
        getAchievements({
          xp: user.xp,
          streak:
            user.streak,
          quizCompleted:
            user.quizCompleted,
        });

      return res
        .status(200)
        .json({
          success: true,
          user: {
            id:
              user.id,
            name:
              user.name,
            email:
              user.email,
            role:
              user.role,
            xp:
              user.xp,
            streak:
              user.streak,
            isVerified:
              user.isVerified,
            avatar:
              user.avatar,
            achievements,
          },
        });
    } catch (
      error
    ) {
      next(error);
    }
  };