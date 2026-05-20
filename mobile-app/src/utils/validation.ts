import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, 'Name must be at least 3 characters'),

    email: z
      .string()
      .trim()
      .email('Invalid email address'),

    mobile: z
      .string()
      .trim()
      .regex(/^[0-9]{10,15}$/, 'Invalid mobile number'),

    yearOfStudy: z
      .string()
      .trim()
      .min(1, 'Year is required'),

    branch: z
      .string()
      .trim()
      .min(1, 'Branch is required'),

    section: z
      .string()
      .trim()
      .min(1, 'Section is required'),

    password: z
      .string()
      .min(8, 'Minimum 8 characters')
      .regex(/[A-Z]/, 'Must contain uppercase')
      .regex(/[a-z]/, 'Must contain lowercase')
      .regex(/[0-9]/, 'Must contain number')
      .regex(
        /[^A-Za-z0-9]/,
        'Must contain special character'
      ),

    confirmPassword: z.string(),
  })
  .refine(
    data => data.password === data.confirmPassword,
    {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    }
  );

export type RegisterFormData =
  z.infer<typeof registerSchema>;