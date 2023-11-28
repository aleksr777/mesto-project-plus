import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import Card from '../models/card-model';
import logErrorMessage from './log-error-message';
import { SUCC_CODE_DEFAULT } from '../constants/http-codes';

const updateCardData = async (
  req: Request,
  res: Response,
  next: NextFunction,
  action: 'add like' | 'remove like',
) => {
  const { CastError, DocumentNotFoundError } = Error;
  const { cardId } = req.params;
  const userId = req.user._id;
  let update;

  switch (action) {
  case 'add like':
    update = { $addToSet: { likes: userId } };
    break;
  case 'remove like':
    update = { $pull: { likes: userId } };
    break;
  default:
    return next(new Error('invalid-action'));
  }

  try {
    const updatedCard = await Card.findByIdAndUpdate(cardId, update, {
      new: true,
    }).orFail();
    return res.status(SUCC_CODE_DEFAULT).json(updatedCard);
  } catch (error) {
    logErrorMessage(error);
    if (error instanceof CastError) {
      return next(new Error('cast'));
    }
    if (error instanceof DocumentNotFoundError) {
      return next(new Error('not-found-id'));
    }
    return next(error);
  }
};

export default updateCardData;
