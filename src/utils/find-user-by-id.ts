import { Response } from 'express';
import { Error } from 'mongoose';
import User from '../models/user-model';
import logErrorMessage from './log-error-message';
import {
  SUCC_CODE_DEFAULT,
} from '../constants/http-codes';
import handleErrors from './handle-errors';

export default async function findUserById(userId:string, res:Response) {
  try {
    const userById = await User.findById(userId).orFail();
    return res.status(SUCC_CODE_DEFAULT).json(userById);
  } catch (error) {
    logErrorMessage(error);
    if (error instanceof Error.CastError) return handleErrors(res, 'cast');
    if (error instanceof Error.DocumentNotFoundError) return handleErrors(res, 'not-found-id');
    return handleErrors(res);
  }
}
