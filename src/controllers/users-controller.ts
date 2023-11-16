import { Request, Response } from 'express';
import { Error } from 'mongoose';
import User from '../models/user-model';
import logError from '../utils/log-error';
import updateUserData from '../utils/update-user-data';
import {
  handleDefaultError,
  handleValidationError,
  handleCastError,
  handleNotFoundError,
} from '../utils/handle-errors';


export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    logError(error);
    return handleDefaultError(res);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const userById = await User.findById(userId).orFail();
    return res.status(200).json(userById);
  } catch (error) {
    logError(error);
    if (error instanceof Error.CastError) return handleCastError(res);
    if (error instanceof Error.DocumentNotFoundError) return handleNotFoundError(res);
    return handleDefaultError(res);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  try {
    const newUser = await User.create({ name, about, avatar });
    const validationError = newUser.validateSync();
    if (validationError) return handleValidationError(res);
    return res.status(201).json(newUser);
  } catch (error) {
    logError(error);
    if (error instanceof Error.ValidationError) return handleValidationError(res);
    return handleDefaultError(res);
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  const { name, about } = req.body;
  await updateUserData(req.user._id, { name, about }, res);
};

export const updateUserAvatar = async (req: Request, res: Response) => {
  const { avatar } = req.body;
  await updateUserData(req.user._id, { avatar }, res);
};
