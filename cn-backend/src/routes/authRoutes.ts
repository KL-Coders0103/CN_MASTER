import { Router } from 'express';

import {
  registerUser,
  verifyOtp,
  resendOtp,
  loginUser,
  getCurrentUser,
  googleAuth,
  completeProfile,
} from '../controllers/authController';

import {
  authMiddleware,
} from '../middlewares/authMiddleware';

import validate from '../middlewares/validate';

import {
  registerSchema,
  verifyOtpSchema,
  resendOtpSchema,
  loginSchema,
} from '../validations/authValidation';
import { authLimiter } from '../middlewares/rateLimiter';

const router = Router();

router.post(
  '/register',
  validate(registerSchema),
  registerUser
);

router.post(
  '/verify-otp',
  validate(verifyOtpSchema),
  authLimiter,
  verifyOtp
);

router.post(
  '/resend-otp',
  validate(
    resendOtpSchema
  ),
  authLimiter,
  resendOtp
);

router.post(
  '/login',
  validate(
    loginSchema
  ),
  authLimiter,
  loginUser
);

router.get(
  '/me',
  authMiddleware,
  getCurrentUser
);

router.post(
  '/google',
  googleAuth
);

router.put(
  '/complete-profile',
  authMiddleware,
  completeProfile
);

export default router;