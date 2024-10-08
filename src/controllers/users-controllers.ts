import { Request, Response, NextFunction } from 'express';
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
import findUserById from '../utils/find-user-by-id';
import { ERR_TEXT_CONFLICT_EMAIL, ERR_TEXT_LOGIN_IMPOSSIBLE } from '../constants/error-text';
import ConflictErr from '../errors/conflict-err';
import BadRequestErr from '../errors/bad-request-err';
import UnauthErr from '../errors/unauth-err';

export const getUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find();
    return res.status(SUCC_CODE_DEFAULT).json(users);
  } catch (error) {
    logErrorMessage(error);
    return next(error);
  }
};

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user._id;
  try {
    return await findUserById(userId, res, next);
  } catch (error) {
    return next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  try {
    return await findUserById(userId, res, next);
  } catch (error) {
    return next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { ValidationError } = Error;
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
    logErrorMessage(error);
    if (error instanceof ValidationError) {
      return next(new BadRequestErr());
    }
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 11000) {
      return next(new ConflictErr(ERR_TEXT_CONFLICT_EMAIL));
    }
    return next(error);
  }
};

export const updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  try {
    return await updateUserData(req, res, next, { name, about });
  } catch (error) {
    return next(error);
  }
};

export const updateUserAvatar = async (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  try {
    return await updateUserData(req, res, next, { avatar });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new UnauthErr(ERR_TEXT_LOGIN_IMPOSSIBLE));
    }
    const token = createToken(user._id.toString());
    res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
    return res.status(SUCC_CODE_DEFAULT).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    });
  } catch (error) {
    logErrorMessage(error);
    return next(error);
  }
};
