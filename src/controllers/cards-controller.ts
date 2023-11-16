import { Request, Response } from 'express';
import { Error } from 'mongoose';
import Card from '../models/card-model';
import logError from '../utils/log-error';

export const getAllCards = async (_req: Request, res: Response) => {
  try {
    const cards = await Card.find();
    return res.json(cards);
  } catch (error) {
    logError(error);
    return res.status(500).json({ error: 'Ошибка на сервере при обработке запроса.' });
  }
};

export const createCard = async (req: Request, res: Response) => {
  const { name, link } = req.body;
  try {
    const newCard = new Card({
      name,
      link,
      owner: req.user._id,
    });
    const validationError = newCard.validateSync();
    if (validationError) {
      return res.status(400).json({ error: 'Переданы некорректные данные для создания карточки.' });
    }
    const savedCard = await newCard.save();
    return res.status(201).json(savedCard);
  } catch (error) {
    logError(error);
    if (error instanceof Error.ValidationError) {
      return res.status(400).json({ error: 'Переданы некорректные данные для создания карточки.' });
    }
    return res.status(500).json({ error: 'Ошибка на сервере при обработке запроса.' });
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({ error: 'Карточка с указанным _id не найдена.' });
    }
    await card.deleteOne();
    return res.json({ message: 'Карточка удалена.' });
  } catch (error) {
    logError(error);
    if (error instanceof Error.CastError) {
      return res.status(400).json({ error: 'Некорректный формат _id карточки.' });
    }
    return res.status(500).json({ error: 'Ошибка на сервере при обработке запроса.' });
  }
};

export const likeCard = async (req: Request, res: Response) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return res.status(404).json({ error: 'Карточка не найдена.' });
    }
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    return res.json(updatedCard);
  } catch (error) {
    logError(error);
    if (error instanceof Error.CastError) {
      return res.status(400).json({ error: 'Некорректный формат _id карточки.' });
    }
    return res.status(500).json({ error: 'Ошибка на сервере при обработке запроса.' });
  }
};

export const dislikeCard = async (req: Request, res: Response) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return res.status(404).json({ error: 'Карточка не найдена.' });
    }
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    return res.json(updatedCard);
  } catch (error) {
    logError(error);
    if (error instanceof Error.CastError) {
      return res.status(400).json({ error: 'Некорректный формат _id карточки.' });
    }
    return res.status(500).json({ error: 'Ошибка на сервере при обработке запроса.' });
  }
};
