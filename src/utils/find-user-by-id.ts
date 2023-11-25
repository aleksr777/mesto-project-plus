import { Response } from 'express';
import { Error } from 'mongoose';
import User from '../models/user-model';
import logError from './log-error';
import {
  SUCC_CODE_DEFAULT,
} from '../constants/http-codes';
import {
  handleDefaultError,
  handleCastError,
  handleNotFoundIdError,
} from './handle-errors';

export default async function findUserById(userId:string, res:Response) {
  try {
    const userById = await User.findById(userId).orFail();
    return res.status(SUCC_CODE_DEFAULT).json(userById);
  } catch (error) {
    logError(error);
    if (error instanceof Error.CastError) return handleCastError(res);
    if (error instanceof Error.DocumentNotFoundError) return handleNotFoundIdError(res);
    return handleDefaultError(res);
  }
}
