import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import User, { IUser } from '../models/user-model';
import logErrorMessage from './log-error-message';
import { SUCC_CODE_DEFAULT } from '../constants/http-codes';
import { ERR_TEXT_NOT_FOUND_ID_USER, ERR_TEXT_INVALID_DATA } from '../constants/error-text';
import NotFoundErr from '../errors/not-found-err';
import BadRequestErr from '../errors/bad-request-err';

const updateUserData = async (
  req: Request,
  res: Response,
  next: NextFunction,
  updateData: Partial<IUser>,
) => {
  const { ValidationError } = Error;
  const userId = req.user._id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true },
    )
      .orFail(new NotFoundErr(ERR_TEXT_NOT_FOUND_ID_USER));
    return res.status(SUCC_CODE_DEFAULT).json(updatedUser);
  } catch (error) {
    logErrorMessage(error);
    if (error instanceof ValidationError) {
      return next(new BadRequestErr(ERR_TEXT_INVALID_DATA));
    }
    return next(error);
  }
};

export default updateUserData;
