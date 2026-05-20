import bcrypt from 'bcrypt';
import prisma from '../config/db';

import { generateOTP } from '../utils/generateOtp';
import { sendOTPEmail } from './emailService';

interface RegisterData {
  name: string;
  email: string;
  mobile?: string;
  yearOfStudy?: string;
  branch?: string;
  section?: string;
  password: string;
}

export const registerUserService = async (
  data: RegisterData
) => {
  const {
    name,
    email,
    mobile,
    yearOfStudy,
    branch,
    section,
    password,
  } = data;

  const existingUser =
    await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          ...(mobile
            ? [{ mobile }]
            : []),
        ],
      },
    });

  if (existingUser) {
    throw new Error(
      'Email or Mobile already registered'
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );

  const otp = generateOTP();

  const expiryMinutes =
    Number(
      process.env
        .OTP_EXPIRY_MINUTES
    ) || 5;

  const otpExpiry =
    new Date(
      Date.now() +
        expiryMinutes *
          60 *
          1000
    );

  const user =
    await prisma.user.create({
      data: {
        name,
        email,
        mobile,
        yearOfStudy,
        branch,
        section,
        password:
          hashedPassword,
        isVerified: false,
        otp,
        otpExpiry,
      },
    });

  await sendOTPEmail({
    email,
    otp,
  });

  return user;
};

export const verifyOtpService =
  async (
    userId: string,
    otp: string
  ) => {
    const user =
      await prisma.user.findUnique({
        where: { id: userId },
      });

    if (!user) {
      throw new Error(
        'User not found'
      );
    }

    if (!user.otp) {
      throw new Error(
        'OTP not generated'
      );
    }

    if (
      user.otpExpiry &&
      user.otpExpiry <
        new Date()
    ) {
      throw new Error(
        'OTP expired'
      );
    }

    if (user.otp !== otp) {
      throw new Error(
        'Invalid OTP'
      );
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        isVerified: true,
        otp: null,
        otpExpiry: null,
      },
    });

    return true;
  };

  export const resendOtpService =
  async (
    userId: string
  ) => {
    const user =
      await prisma.user.findUnique({
        where: { id: userId },
      });

    if (!user) {
      throw new Error(
        'User not found'
      );
    }

    if (user.isVerified) {
      throw new Error(
        'User already verified'
      );
    }

    const otp =
      generateOTP();

    const expiryMinutes =
      Number(
        process.env
          .OTP_EXPIRY_MINUTES
      ) || 5;

    const otpExpiry =
      new Date(
        Date.now() +
          expiryMinutes *
            60 *
            1000
      );

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        otp,
        otpExpiry,
      },
    });

    await sendOTPEmail({
      email:
        user.email,
      otp,
    });

    return true;
  };