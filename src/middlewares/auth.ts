import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {
  ERR_TEXT_INVALID_TOKEN,
  ERR_TEXT_NOT_FOUND_JWT_SECRET,
  ERR_TEXT_TOKEN_NOT_PROVIDED,
} from '../constants/error-text';
import { ERR_CODE_UNAUTH_ERROR } from '../constants/http-codes';

interface TokenPayload extends jwt.JwtPayload {
  _id: string;
}

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error(ERR_TEXT_NOT_FOUND_JWT_SECRET);
}

export const createToken = (userId: string): string => jwt.sign({ _id: userId }, secret, { expiresIn: '1w' });

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, secret) as TokenPayload;
  } catch (error) {
    return null;
  }
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(ERR_CODE_UNAUTH_ERROR).json({ error: ERR_TEXT_TOKEN_NOT_PROVIDED });
  }
  const payload = verifyToken(token);
  if (!payload) {
    return res.status(ERR_CODE_UNAUTH_ERROR).json({ error: ERR_TEXT_INVALID_TOKEN });
  }
  req.user = payload;
  return next();
};
