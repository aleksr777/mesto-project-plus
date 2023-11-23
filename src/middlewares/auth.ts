import jwt from 'jsonwebtoken';
import { ERR_TEXT_INVALID_TOKEN, ERR_TEXT_NOT_FOUND_JWT_SECRET } from '../constants/error-text';

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error(ERR_TEXT_NOT_FOUND_JWT_SECRET);
}

export const createToken = (userId: string): string => jwt.sign({ _id: userId }, secret, { expiresIn: '1w' });

export const verifyToken = (token: string): jwt.JwtPayload => {
  try {
    return jwt.verify(token, secret) as jwt.JwtPayload;
  } catch (error) {
    throw new Error(ERR_TEXT_INVALID_TOKEN);
  }
};
