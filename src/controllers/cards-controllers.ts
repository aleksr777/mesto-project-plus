import { Request, Response } from 'express';
import { Error } from 'mongoose';
import Card from '../models/card-model';
import logError from '../utils/log-error';
import updateCardData from '../utils/update-card-data';
import {
  handleDefaultError,
  handleValidationError,
  handleCastError,
  handleNotFoundIdError,
} from '../utils/handle-errors';

export const getAllCards = async (_req: Request, res: Response) => {
  try {
    const allCards = await Card.find();
    return res.status(200).json(allCards);
  } catch (error) {
    logError(error);
    return handleDefaultError(res);
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
    const savedCard = await newCard.save();
    return res.status(201).json(savedCard);
  } catch (error) {
    logError(error);
    if (error instanceof Error.ValidationError) return handleValidationError(res);
    return handleDefaultError(res);
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  const { cardId } = req.params;
  try {
    const foundCard = await Card.findById(cardId).orFail();
    await foundCard.deleteOne();
    return res.status(200).json({ message: 'Карточка удалена' });
  } catch (error) {
    logError(error);
    if (error instanceof Error.CastError) return handleCastError(res);
    if (error instanceof Error.DocumentNotFoundError) return handleNotFoundIdError(res);
    return handleDefaultError(res);
  }
};

export const likeCard = async (req: Request, res: Response) => {
  await updateCardData(req.params.cardId, req.user._id, res, 'add like');
};

export const dislikeCard = async (req: Request, res: Response) => {
  await updateCardData(req.params.cardId, req.user._id, res, 'remove like');
};
