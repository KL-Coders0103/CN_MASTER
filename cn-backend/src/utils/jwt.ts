import jwt, {
  Secret,
  SignOptions,
} from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
  role: string;
}

export const generateToken = (
  payload: TokenPayload
) => {
  const secret =
    process.env.JWT_SECRET as Secret;

  const options: SignOptions = {
    expiresIn:
      (process.env
        .JWT_EXPIRES_IN ||
        '7d') as SignOptions['expiresIn'],
  };

  return jwt.sign(
    payload,
    secret,
    options
  );
};