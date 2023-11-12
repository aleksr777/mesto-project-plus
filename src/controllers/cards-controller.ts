import { Request, Response } from 'express';
import Card from '../models/card-model';

// Вернуть все карточки
export const getAllCards = async (_req: Request, res: Response) => {
  try {
    const cards = await Card.find();
    return res.json(cards);
  } catch (error) {
    return res.status(500).json({ error: 'Ошибка обработки запроса к серверу.' });
  }
};

// Создать новую карточку
export const createCard = async (req: Request, res: Response) => {
  const { name, link } = req.body;
  try {
    const newCard = new Card({
      name,
      link,
      owner: req.user._id,
    });
    const savedCard = await newCard.save();
    return res.status(201).json(savedCard);
  } catch (error) {
    return res.status(400).json({ error: 'Переданы некорректные данные при создании карточки.' });
  }
};

// Удалить карточку по идентификатору
export const deleteCard = async (req: Request, res: Response) => {
  const { cardId } = req.params;
  try {
    const deletedCard = await Card.findByIdAndDelete(cardId);
    if (!deletedCard) {
      return res.status(404).json({ error: 'Карточка с указанным _id не найдена.' });
    }
    return res.json(deletedCard);
  } catch (error) {
    return res.status(500).json({ error: 'Ошибка обработки запроса к серверу.' });
  }
};

// Добавить лайк карточке
export const likeCard = async (req: Request, res: Response) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!updatedCard) {
      return res.status(404).json({ error: 'Переданы некорректные данные для постановки лайка.' });
    }
    return res.json(updatedCard);
  } catch (error) {
    return res.status(500).json({ error: 'Ошибка обработки запроса к серверу.' });
  }
};

// Удалить лайк у карточки
export const dislikeCard = async (req: Request, res: Response) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!updatedCard) {
      return res.status(404).json({ error: 'Переданы некорректные данные для снятия лайка.' });
    }
    return res.json(updatedCard);
  } catch (error) {
    return res.status(500).json({ error: 'Ошибка обработки запроса к серверу.' });
  }
};
