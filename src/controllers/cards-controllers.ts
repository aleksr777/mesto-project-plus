import { Request, Response } from 'express';
import { Error } from 'mongoose';
import Card from '../models/card-model';
import logErrorMessage from '../utils/log-error-message';
import updateCardData from '../utils/update-card-data';
import {
  SUCC_CODE_DEFAULT,
  SUCC_CODE_CREATED,
} from '../constants/http-codes';
import handleErrors from '../utils/handle-errors';

export const getAllCards = async (_req: Request, res: Response) => {
  try {
    const allCards = await Card.find();
    return res.status(SUCC_CODE_DEFAULT).json(allCards);
  } catch (error) {
    logErrorMessage(error);
    return handleErrors(res);
  }
};

export const createCard = async (req: Request, res: Response) => {
  const { ValidationError } = Error;
  const { name, link } = req.body;
  const userId = req.user._id;
  try {
    const newCard = new Card({
      name,
      link,
      owner: userId,
    });
    const savedCard = await newCard.save();
    return res.status(SUCC_CODE_CREATED).json(savedCard);
  } catch (error) {
    logErrorMessage(error);
    if (error instanceof ValidationError) return handleErrors(res, 'validation');
    return handleErrors(res);
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  const { CastError, DocumentNotFoundError } = Error;
  const { cardId } = req.params;
  const userId = req.user._id;
  try {
    const foundCard = await Card.findById(cardId).orFail();
    if (foundCard.owner.toString() !== userId) return handleErrors(res, 'insufficient-rights');
    await foundCard.deleteOne();
    return res.status(SUCC_CODE_DEFAULT).json({ message: 'Карточка удалена' });
  } catch (error) {
    logErrorMessage(error);
    if (error instanceof CastError) return handleErrors(res, 'cast');
    if (error instanceof DocumentNotFoundError) return handleErrors(res, 'not-found-id');
    return handleErrors(res);
  }
};

export const likeCard = async (req: Request, res: Response) => {
  await updateCardData(req.params.cardId, req.user._id, res, 'add like');
};

export const dislikeCard = async (req: Request, res: Response) => {
  await updateCardData(req.params.cardId, req.user._id, res, 'remove like');
};
