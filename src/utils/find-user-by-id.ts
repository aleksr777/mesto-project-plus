import { Response, NextFunction } from 'express';
import { Schema, Error } from 'mongoose';
import User from '../models/user-model';
import logErrorMessage from './log-error-message';
import { SUCC_CODE_DEFAULT } from '../constants/http-codes';

export default async function findUserById(
  userId: string | Schema.Types.ObjectId,
  res: Response,
  next: NextFunction,
) {
  const { CastError, DocumentNotFoundError } = Error;
  try {
    const userById = await User.findById(userId).orFail();
    return res.status(SUCC_CODE_DEFAULT).json(userById);
  } catch (error) {
    logErrorMessage(error);
    if (error instanceof CastError) {
      return next(new Error('cast'));
    }
    if (error instanceof DocumentNotFoundError) {
      return next(new Error('not-found-id'));
    }
    return next(error);
  }
}
