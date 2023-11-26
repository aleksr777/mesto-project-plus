import { Response } from 'express';
import { Error } from 'mongoose';
import Card from '../models/card-model';
import logErrorMessage from './log-error-message';
import { SUCC_CODE_DEFAULT } from '../constants/http-codes';
import handleErrors from './handle-errors';

const updateCardData = async (
  cardId: string,
  userId: string,
  res: Response,
  action: 'add like' | 'remove like',
) => {
  let update;
  switch (action) {
  case 'add like':
    update = { $addToSet: { likes: userId } };
    break;
  case 'remove like':
    update = { $pull: { likes: userId } };
    break;
  default:
    return undefined;
  }
  try {
    const updatedCard = await Card.findByIdAndUpdate(cardId, update, {
      new: true,
    }).orFail();
    return res.status(SUCC_CODE_DEFAULT).json(updatedCard);
  } catch (error) {
    logErrorMessage(error);
    if (error instanceof Error.CastError) return handleErrors(res, 'cast');
    if (error instanceof Error.DocumentNotFoundError) return handleErrors(res, 'not-found-id');
    return handleErrors(res);
  }
};

export default updateCardData;
