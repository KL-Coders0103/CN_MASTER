import { Router } from 'express';

import {
  registerUser,
  verifyOtp,
  resendOtp,
  loginUser,
} from '../controllers/authController';

import validate from '../middlewares/validate';

import {
  registerSchema,
  verifyOtpSchema,
  resendOtpSchema,
  loginSchema,
} from '../validations/authValidation';

const router = Router();

router.post(
  '/register',
  validate(registerSchema),
  registerUser
);

router.post(
  '/verify-otp',
  validate(verifyOtpSchema),
  verifyOtp
);

router.post(
  '/resend-otp',
  validate(
    resendOtpSchema
  ),
  resendOtp
);

router.post(
  '/login',
  validate(
    loginSchema
  ),
  loginUser
);

export default router;