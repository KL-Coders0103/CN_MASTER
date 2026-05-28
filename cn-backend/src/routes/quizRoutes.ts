import express from 'express';

import {
  getQuiz,
  submitQuiz,
} from '../controllers/quizController';

import {
  authMiddleware,
} from '../middlewares/authMiddleware';

const router =
  express.Router();

router.get(
  '/',
  getQuiz
);

router.post(
  '/submit',
  authMiddleware,
  submitQuiz
);



export default router;