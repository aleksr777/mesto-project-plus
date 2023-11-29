import { Request, Response, NextFunction } from 'express';
import { ERR_CODE_DEFAULT } from '../constants/http-codes';
import { ERR_TEXT_DEFAULT } from '../constants/error-text';
import { extError } from '../types/ext-error';

export default function handleErrors(
  err: extError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusCode = err.statusCode ? err.statusCode : ERR_CODE_DEFAULT;
  const message = err.message ? err.message : ERR_TEXT_DEFAULT;
  res.status(statusCode).json({ message });
  next();
}
