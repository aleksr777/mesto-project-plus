import { Request, Response } from 'express';
import { Error } from 'mongoose';
import User from '../models/user-model';
import logError from '../utils/log-error';
import errorMessages from '../constants/error-messages';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    logError(error);
    return res.status(errorMessages.default.code)
      .json({ error: errorMessages.default.text });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const userById = await User.findById(userId);
    if (!userById) {
      return res.status(errorMessages.notFoundId.code)
        .json({ error: errorMessages.notFoundId.text });
    }
    return res.status(200).json(userById);
  } catch (error) {
    logError(error);
    if (error instanceof Error.CastError) {
      return res.status(errorMessages.invalidId.code)
        .json({ error: errorMessages.invalidId.text });
    }
    return res.status(errorMessages.default.code)
      .json({ error: errorMessages.default.text });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  try {
    const newUser = await User.create({ name, about, avatar });
    const validationError = newUser.validateSync();
    if (validationError) {
      return res.status(errorMessages.invalidData.code)
        .json({ error: errorMessages.invalidData.text });
    }
    return res.status(201).json(newUser);
  } catch (error) {
    logError(error);
    if (error instanceof Error.ValidationError) {
      return res.status(errorMessages.invalidData.code)
        .json({ error: errorMessages.invalidData.text });
    }
    return res.status(errorMessages.default.code)
      .json({ error: errorMessages.default.text });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  const { name, about } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      return res.status(errorMessages.notFoundId.code)
        .json({ error: errorMessages.notFoundId.text });
    }
    const validationError = updatedUser.validateSync();
    if (validationError) {
      return res.status(errorMessages.invalidData.code)
        .json({ error: errorMessages.invalidData.text });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(errorMessages.invalidData.code)
        .json({ error: errorMessages.invalidData.text });
    }
    logError(error);
    return res.status(errorMessages.default.code)
      .json({ error: errorMessages.default.text });
  }
};

export const updateUserAvatar = async (req: Request, res: Response) => {
  const { avatar } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      return res.status(errorMessages.notFoundId.code)
        .json({ error: errorMessages.notFoundId.text });
    }
    const validationError = updatedUser.validateSync();
    if (validationError) {
      return res.status(errorMessages.invalidData.code)
        .json({ error: errorMessages.invalidData.text });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    logError(error);
    if (error instanceof Error.ValidationError) {
      return res.status(errorMessages.invalidData.code)
        .json({ error: errorMessages.invalidData.text });
    }
    return res.status(errorMessages.default.code)
      .json({ error: errorMessages.default.text });
  }
};
