import { Response } from 'express';
import { Error } from 'mongoose';
import User, { IUser } from '../models/user-model';
import logError from './log-error';
import {
  handleDefaultError,
  handleValidationError,
  handleNotFoundError,
} from './handle-errors';

const updateUserData = async (
  userId: string,
  updateData: Partial<IUser>,
  res: Response,
) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true },
    ).orFail();
    return res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof Error.ValidationError) return handleValidationError(res);
    if (error instanceof Error.DocumentNotFoundError) return handleNotFoundError(res);
    logError(error);
    return handleDefaultError(res);
  }
};

export default updateUserData;
