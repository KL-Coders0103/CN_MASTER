import express from 'express';

import {
  chatAI,
} from '../controllers/aiControlller';

const router =
  express.Router();

router.post(
  '/chat',
  chatAI
);

export default router;