import bcrypt from 'bcrypt';
import prisma from '../config/db';

import { generateOTP } from '../utils/generateOtp';
import { sendOTPEmail } from './emailService';
import { generateToken } from '../utils/jwt';
import { verifyGoogleToken } from '../utils/google';

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

  const hashedOtp = await bcrypt.hash(otp, 10);

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
        otp:hashedOtp,
        otpExpiry,
        isProfileComplete:true,
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

    const matched = await bcrypt.compare(otp, user.otp);

    if(!matched) {
      throw new Error('Invalid OTP');
    }

    const updatedUser =
  await prisma.user.update({
    where:{
      id:userId,
    },
    data:{
      isVerified:true,
      otp:null,
      otpExpiry:null,
    },
  });

const token =
  generateToken({
    userId:
      updatedUser.id,
    role:
      updatedUser.role,
  });

return {
  token,
  user:
    updatedUser,
};
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

    const cooldownMs =
      60 * 1000;

    if (
      user.otpResentAt &&
      Date.now() -
        user.otpResentAt.getTime() <
        cooldownMs
    ) {
      throw new Error(
        'Please wait before requesting another OTP'
      );
    }

    const otp = generateOTP();

    const hashedOtp = await bcrypt.hash(otp,10);

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
        otp: hashedOtp,
        otpExpiry,
        otpResentAt:
          new Date(),
      },
    });

    await sendOTPEmail({
      email:
        user.email,
      otp,
    });

    return true;
  };

export const loginUserService =
  async (
    email: string,
    password: string
  ) => {
    const user =
      await prisma.user.findUnique({
        where: { email },
      });

    if (!user) {
      throw new Error(
        'Invalid credentials'
      );
    }

    if (!user.isVerified) {
      throw new Error(
        'Please verify your email first'
      );
    }

    if (user.isSuspended) {
      throw new Error(
        'Account suspended'
      );
    }

    const matched =
      await bcrypt.compare(
        password,
        user.password || ''
      );

    if (!matched) {
      throw new Error(
        'Invalid credentials'
      );
    }

    const token =
      generateToken({
        userId:
          user.id,
        role:
          user.role,
      });

    return {
      token,
      user,
    };
  };

  export const getCurrentUserService =
  async (
    userId: string
  ) => {
    const user =
      await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

    if (!user) {
      throw new Error(
        'User not found'
      );
    }

    return user;
  };

  export const googleAuthService =
  async (
    idToken:string
  ) => {

    const googleUser =
      await verifyGoogleToken(
        idToken
      );

    let user =
      await prisma.user.findUnique({
        where:{
          email:
            googleUser.email,
        },
      });

    if (
      !user
    ) {
      user =
        await prisma.user.create({
          data:{
            email:
              googleUser.email,

            name:
              googleUser.name,

            avatar:
              googleUser.picture,

            googleId:
              googleUser.googleId,

            authProvider:
              'GOOGLE',

            isVerified:
              true,

            isProfileComplete:
              false,
          },
        });
    }

    const token =
      generateToken({
        userId:
          user.id,
        role:
          user.role,
      });

    return {
      token,
      user,
    };
  };

export const
completeProfileService =
async (
  userId:string,
  data:{
    mobile:string;
    yearOfStudy:string;
    branch:string;
    section:string;
  }
) => {

  const existing =
    await prisma.user.findFirst({
      where:{
        mobile:
          data.mobile,
        NOT:{
          id:userId,
        },
      },
    });

  if (
    existing
  ) {
    throw new Error(
      'Mobile already registered'
    );
  }

  const user =
    await prisma.user.update({
      where:{
        id:userId,
      },
      data:{
        mobile:
          data.mobile,

        yearOfStudy:
          data.yearOfStudy,

        branch:
          data.branch,

        section:
          data.section,

        isProfileComplete:
          true,
      },
    });

  return user;
};