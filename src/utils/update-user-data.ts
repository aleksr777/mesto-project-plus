import { Response } from 'express';
import { Schema, Error } from 'mongoose';
import User, { IUser } from '../models/user-model';
import logErrorMessage from './log-error-message';
import { SUCC_CODE_DEFAULT } from '../constants/http-codes';
import handleErrors from './handle-errors';

const updateUserData = async (
  userId: Schema.Types.ObjectId | string,
  updateData: Partial<IUser>,
  res: Response,
) => {
  const { ValidationError, DocumentNotFoundError } = Error;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true },
    ).orFail();
    return res.status(SUCC_CODE_DEFAULT).json(updatedUser);
  } catch (error) {
    if (error instanceof ValidationError) return handleErrors(res, 'validation');
    if (error instanceof DocumentNotFoundError) return handleErrors(res, 'not-found-id');
    logErrorMessage(error);
    return handleErrors(res);
  }
};

export default updateUserData;
