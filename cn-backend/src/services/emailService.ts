import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface SendOTPEmailProps {
  email: string;
  otp: string;
}

export const sendOTPEmail = async ({
  email,
  otp,
}: SendOTPEmailProps) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'CN Master OTP Verification',
    html: `
      <div style="font-family:sans-serif;padding:20px">
        <h2>CN Master Email Verification</h2>

        <p>Your verification code is:</p>

        <h1 style="
          letter-spacing:6px;
          color:#1D4ED8;
        ">
          ${otp}
        </h1>

        <p>
          This OTP expires in
          ${process.env.OTP_EXPIRY_MINUTES}
          minutes.
        </p>
      </div>
    `,
  });
};