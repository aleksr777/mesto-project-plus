import { Request, Response } from 'express';
import { Error } from 'mongoose';
import Card from '../models/card-model';
import logError from '../utils/log-error';
import errorMessages from '../constants/error-messages';

export const getAllCards = async (_req: Request, res: Response) => {
  try {
    const allCards = await Card.find();
    return res.status(200).json(allCards);
  } catch (error) {
    logError(error);
    return res.status(errorMessages.default.code)
      .json({ error: errorMessages.default.text });
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
      return res.status(errorMessages.invalidData.code)
        .json({ error: errorMessages.invalidData.text });
    }
    const savedCard = await newCard.save();
    return res.status(201).json(savedCard);
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

export const deleteCard = async (req: Request, res: Response) => {
  const { cardId } = req.params;
  try {
    const foundCard = await Card.findById(cardId).orFail();
    await foundCard.deleteOne();
    return res.status(200).json({ message: 'Карточка удалена' });
  } catch (error) {
    logError(error);
    if (error instanceof Error.CastError) {
      return res.status(errorMessages.invalidId.code)
        .json({ error: errorMessages.invalidId.text });
    }
    if (error instanceof Error.DocumentNotFoundError) {
      return res.status(errorMessages.notFoundById.code)
        .json({ error: errorMessages.notFoundById.text });
    }
    return res.status(errorMessages.default.code)
      .json({ error: errorMessages.default.text });
  }
};

export const likeCard = async (req: Request, res: Response) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail();
    return res.status(200).json(updatedCard);
  } catch (error) {
    logError(error);
    if (error instanceof Error.CastError) {
      return res.status(errorMessages.invalidId.code)
        .json({ error: errorMessages.invalidId.text });
    }
    if (error instanceof Error.DocumentNotFoundError) {
      return res.status(errorMessages.notFoundById.code)
        .json({ error: errorMessages.notFoundById.text });
    }
    return res.status(errorMessages.default.code)
      .json({ error: errorMessages.default.text });
  }
};

export const dislikeCard = async (req: Request, res: Response) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail();
    return res.status(200).json(updatedCard);
  } catch (error) {
    logError(error);
    if (error instanceof Error.CastError) {
      return res.status(errorMessages.invalidId.code)
        .json({ error: errorMessages.invalidId.text });
    }
    if (error instanceof Error.DocumentNotFoundError) {
      return res.status(errorMessages.notFoundById.code)
        .json({ error: errorMessages.notFoundById.text });
    }
    return res.status(errorMessages.default.code)
      .json({ error: errorMessages.default.text });
  }
};
