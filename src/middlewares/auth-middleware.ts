import { Request, Response, NextFunction } from 'express';
import { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import logErrorMessage from '../utils/log-error-message';
import {
  ERR_TEXT_NOT_FOUND_JWT_SECRET,
} from '../constants/error-text';
import handleErrors from '../utils/handle-errors';

interface TokenPayload extends jwt.JwtPayload {
  _id: string;
}

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error(ERR_TEXT_NOT_FOUND_JWT_SECRET);
}

export const createToken = (userId: Schema.Types.ObjectId | string): string => jwt.sign({ _id: userId }, secret, { expiresIn: '1w' });

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, secret) as TokenPayload;
  } catch (error) {
    logErrorMessage(error);
    return null;
  }
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return handleErrors(res, 'token_not_provided');
  const payload = verifyToken(token);
  if (!payload) return handleErrors(res, 'invalid-token');
  req.user = payload;
  return next();
};
