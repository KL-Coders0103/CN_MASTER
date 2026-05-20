import { Router } from 'express';

import {
  registerUser,
  verifyOtp,
  resendOtp,
} from '../controllers/authController';

import validate from '../middlewares/validate';

import {
  registerSchema,
  verifyOtpSchema,
  resendOtpSchema,
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

export default router;