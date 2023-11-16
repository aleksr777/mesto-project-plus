import { Request, Response } from 'express';
import { Error } from 'mongoose';
import User from '../models/user-model';
import logError from '../utils/log-error';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    logError(error);
    return res.status(500).json({ error: 'Ошибка на сервере при обработке запроса.' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const userById = await User.findById(userId);
    if (!userById) {
      return res.status(404).json({ error: 'Пользователь по указанному _id не найден.' });
    }
    return res.json(userById);
  } catch (error) {
    logError(error);
    if (error instanceof Error.CastError) {
      return res.status(400).json({ error: 'Некорректный формат _id пользователя.' });
    }
    return res.status(500).json({ error: 'Ошибка на сервере при обработке запроса.' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  try {
    const newUser = await User.create({ name, about, avatar });
    const validationError = newUser.validateSync();
    if (validationError) {
      return res.status(400).json({ error: 'Переданы некорректные данные для создании пользователя.' });
    }
    return res.status(201).json(newUser);
  } catch (error) {
    logError(error);
    if (error instanceof Error.ValidationError) {
      return res.status(400).json({ error: 'Переданы некорректные данные для создании пользователя.' });
    }
    return res.status(500).json({ error: 'Ошибка на сервере при обработке запроса.' });
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
      return res.status(404).json({ error: 'Пользователь с указанным _id не найден.' });
    }
    const validationError = updatedUser.validateSync();
    if (validationError) {
      return res.status(400).json({ error: 'Переданы некорректные данные при обновлении профиля.' });
    }
    return res.json(updatedUser);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(400).json({ error: 'Переданы некорректные данные при обновлении профиля.' });
    }
    logError(error);
    return res.status(500).json({ error: 'Ошибка на сервере при обработке запроса.' });
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
      return res.status(404).json({ error: 'Пользователь с указанным _id не найден.' });
    }
    const validationError = updatedUser.validateSync();
    if (validationError) {
      return res.status(400).json({ error: 'Переданы некорректные данные при обновлении аватара.' });
    }
    return res.json(updatedUser);
  } catch (error) {
    logError(error);
    if (error instanceof Error.ValidationError) {
      return res.status(400).json({ error: 'Переданы некорректные данные при обновлении аватара.' });
    }
    return res.status(500).json({ error: 'Ошибка на сервере при обработке запроса.' });
  }
};
