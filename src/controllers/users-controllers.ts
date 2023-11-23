import { Request, Response } from 'express';
import { Error } from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user-model';
import logError from '../utils/log-error';
import updateUserData from '../utils/update-user-data';
import { createToken } from '../middlewares/auth';
import {
  SUCC_CODE_DEFAULT,
  SUCC_CODE_CREATED,
  ERR_CODE_DEFAULT,
  ERR_CODE_UNAUTH_ERROR,
} from '../constants/http-codes';
import {
  ERR_TEXT_DEFAULT,
  ERR_TEXT_UNAUTH_ERROR,
} from '../constants/error-text';
import {
  handleDefaultError,
  handleValidationError,
  handleCastError,
  handleNotFoundIdError,
} from '../utils/handle-errors';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(SUCC_CODE_DEFAULT).json(users);
  } catch (error) {
    logError(error);
    return handleDefaultError(res);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const userById = await User.findById(userId).orFail();
    return res.status(SUCC_CODE_DEFAULT).json(userById);
  } catch (error) {
    logError(error);
    if (error instanceof Error.CastError) return handleCastError(res);
    if (error instanceof Error.DocumentNotFoundError) return handleNotFoundIdError(res);
    return handleDefaultError(res);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  try {
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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(ERR_CODE_UNAUTH_ERROR).json({ message: ERR_TEXT_UNAUTH_ERROR });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(ERR_CODE_UNAUTH_ERROR).json({ message: ERR_TEXT_UNAUTH_ERROR });
    }
    const token = createToken(user._id.toString());
    res.cookie('token', token, { httpOnly: true });
    return res.status(SUCC_CODE_DEFAULT).send();
  } catch (error) {
    logError(error);
    return res.status(ERR_CODE_DEFAULT).json({ message: ERR_TEXT_DEFAULT });
  }
};
