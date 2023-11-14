import { Request, Response } from 'express';
import User from '../models/user-model';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Ошибка обработки запроса к серверу.' });
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
    return res.status(500).json({ error: 'Ошибка обработки запроса к серверу.' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  try {
    const newUser = await User.create({ name, about, avatar });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(400).json({ error: 'Переданы некорректные данные при создании пользователя.' });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  const { name, about } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true },
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'Пользователь с указанным _id не найден.' });
    }
    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: 'Ошибка обработки запроса к серверу.' });
  }
};

export const updateUserAvatar = async (req: Request, res: Response) => {
  const { avatar } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true },
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'Пользователь с указанным _id не найден.' });
    }
    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: 'Ошибка обработки запроса к серверу.' });
  }
};
