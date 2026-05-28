import {
  Request,
  Response,
  NextFunction,
} from 'express';

import {
  getQuizService,
  submitQuizService,
} from '../services/quizService';

import {
  AuthRequest,
} from '../middlewares/authMiddleware';

export const getQuiz =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const quizzes =
        await getQuizService();

      return res
        .status(200)
        .json({
          success: true,
          quizzes,
        });
    } catch (
      error
    ) {
      next(error);
    }
  };

export const submitQuiz =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId =
        req.user?.userId;

      const {
        score,
      } = req.body;

      const result =
        await submitQuizService(
          userId!,
          score
        );

      return res
        .status(200)
        .json({
          success: true,

          xpReward:
            result.xpReward,

          user:
            result.user,
        });
    } catch (
      error
    ) {
      next(error);
    }
  };