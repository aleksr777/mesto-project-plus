import { Request, Response } from 'express';
import { Error } from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user-model';
import logErrorMessage from '../utils/log-error-message';
import updateUserData from '../utils/update-user-data';
import { createToken } from '../middlewares/auth-middleware';
import {
  SUCC_CODE_DEFAULT,
  SUCC_CODE_CREATED,
} from '../constants/http-codes';
import handleErrors from '../utils/handle-errors';
import findUserById from '../utils/find-user-by-id';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(SUCC_CODE_DEFAULT).json(users);
  } catch (error) {
    logErrorMessage(error);
    return handleErrors(res);
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const userId = req.user._id;
  await findUserById(userId, res);
};

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  await findUserById(userId, res);
};

export const createUser = async (req: Request, res: Response) => {
  const { ValidationError } = Error;
  const {
    name, about, avatar, email, password,
  } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return handleErrors(res, 'conflict-email');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });
    return res.status(SUCC_CODE_CREATED).json(newUser);
  } catch (error) {
    logErrorMessage(error);
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 11000) return handleErrors(res, 'conflict-email');
    if (error instanceof ValidationError) return handleErrors(res, 'validation');
    return handleErrors(res);
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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) return handleErrors(res, 'unauth');
    const token = createToken(user._id.toString());
    res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
    return res.status(SUCC_CODE_DEFAULT).send();
  } catch (error) {
    logErrorMessage(error);
    return handleErrors(res);
  }
};
