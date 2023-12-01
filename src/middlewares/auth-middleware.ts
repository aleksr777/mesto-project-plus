import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logErrorMessage from '../utils/log-error-message';
import {
  ERR_TEXT_NOT_FOUND_JWT_SECRET,
  ERR_TEXT_TOKEN_NOT_PROVIDED,
  ERR_TEXT_INVALID_TOKEN,
} from '../constants/error-text';
import NotFoundErr from '../errors/not-found-err';
import UnauthErr from '../errors/unauth-err';
import idType from '../types/id-type';

interface TokenPayload extends jwt.JwtPayload {
  _id: idType;
}

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new NotFoundErr(ERR_TEXT_NOT_FOUND_JWT_SECRET);
}

export const createToken = (userId: idType): string => jwt.sign({ _id: userId }, secret, { expiresIn: '1w' });

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
  if (!token) return next(new UnauthErr(ERR_TEXT_TOKEN_NOT_PROVIDED));
  const payload = verifyToken(token);
  if (!payload) return next(new UnauthErr(ERR_TEXT_INVALID_TOKEN));
  req.user = payload;
  return next();
};
