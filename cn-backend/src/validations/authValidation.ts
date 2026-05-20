import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    mobile: z.string().min(10).optional(),
    password: z
      .string()
      .min(8)
      .regex(/[A-Z]/, 'Must contain uppercase')
      .regex(/[a-z]/, 'Must contain lowercase')
      .regex(/[0-9]/, 'Must contain number')
      .regex(/[^A-Za-z0-9]/, 'Must contain special character'),
    yearOfStudy: z.string().optional(),
    branch: z.string().optional(),
    section: z.string().optional(),
  });

  export const verifyOtpSchema = z.object({
  userId: z.string().uuid(),
  otp: z
    .string()
    .length(6, 'OTP must be 6 digits'),
});

export const resendOtpSchema =
  z.object({
    userId:
      z.string().uuid(),
  });