import { Response, NextFunction } from 'express';
import { Schema, Error } from 'mongoose';
import User from '../models/user-model';
import logErrorMessage from './log-error-message';
import { SUCC_CODE_DEFAULT } from '../constants/http-codes';
import { ERR_TEXT_NOT_FOUND_ID_USER, ERR_TEXT_INVALID_ID } from '../constants/error-text';
import NotFoundErr from '../errors/not-found-err';
import BadRequestErr from '../errors/bad-request-err';

export default async function findUserById(
  userId: string | Schema.Types.ObjectId,
  res: Response,
  next: NextFunction,
) {
  const { CastError } = Error;
  try {
    const userById = await User.findById(userId)
      .orFail(new NotFoundErr(ERR_TEXT_NOT_FOUND_ID_USER));
    return res.status(SUCC_CODE_DEFAULT).json(userById);
  } catch (error) {
    logErrorMessage(error);
    if (error instanceof CastError) {
      return next(new BadRequestErr(ERR_TEXT_INVALID_ID));
    }
    return next(error);
  }
}
