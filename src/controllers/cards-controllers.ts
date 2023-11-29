import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import Card from '../models/card-model';
import logErrorMessage from '../utils/log-error-message';
import updateCardData from '../utils/update-card-data';
import {
  SUCC_CODE_DEFAULT,
  SUCC_CODE_CREATED,
} from '../constants/http-codes';
import {
  ERR_TEXT_NOT_FOUND_ID_CARD,
  ERR_TEXT_INSUFFICIENT_RIGHTS,
  ERR_TEXT_INVALID_ID,
} from '../constants/error-text';
import BadRequestErr from '../errors/bad-request-err';
import NotFoundErr from '../errors/not-found-err';
import ForbiddenErr from '../errors/forbidden-err';

export const getAllCards = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const allCards = await Card.find();
    return res.status(SUCC_CODE_DEFAULT).json(allCards);
  } catch (error) {
    logErrorMessage(error);
    return next(error);
  }
};

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
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
    if (error instanceof ValidationError) {
      return next(new BadRequestErr());
    }
    return next(error);
  }
};

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  const { CastError } = Error;
  const { cardId } = req.params;
  const userId = req.user._id;
  try {
    const foundCard = await Card.findById(cardId)
      .orFail(new NotFoundErr(ERR_TEXT_NOT_FOUND_ID_CARD));
    if (foundCard.owner.toString() !== userId) {
      return next(new ForbiddenErr(ERR_TEXT_INSUFFICIENT_RIGHTS));
    }
    await foundCard.deleteOne();
    return res.status(SUCC_CODE_DEFAULT).json({ message: 'Карточка удалена' });
  } catch (error) {
    logErrorMessage(error);
    if (error instanceof CastError) {
      return next(new BadRequestErr(ERR_TEXT_INVALID_ID));
    }
    return next(error);
  }
};

export const likeCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return await updateCardData(req, res, next, 'add-like');
  } catch (error) {
    return next(error);
  }
};

export const dislikeCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return await updateCardData(req, res, next, 'remove-like');
  } catch (error) {
    return next(error);
  }
};
