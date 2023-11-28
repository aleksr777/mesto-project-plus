import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import User, { IUser } from '../models/user-model';
import logErrorMessage from './log-error-message';
import { SUCC_CODE_DEFAULT } from '../constants/http-codes';

const updateUserData = async (
  req: Request,
  res: Response,
  next: NextFunction,
  updateData: Partial<IUser>,
) => {
  const { ValidationError, DocumentNotFoundError } = Error;
  const userId = req.user._id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true },
    ).orFail();
    return res.status(SUCC_CODE_DEFAULT).json(updatedUser);
  } catch (error) {
    logErrorMessage(error);
    if (error instanceof ValidationError) {
      return next(new Error('validation'));
    }
    if (error instanceof DocumentNotFoundError) {
      return next(new Error('not-found-id'));
    }
    return next(error);
  }
};

export default updateUserData;
