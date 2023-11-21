import { Response } from 'express';
import { Error } from 'mongoose';
import Card from '../models/card-model';
import logError from './log-error';
import { SUCC_CODE_DEFAULT } from '../constants/http-codes';
import {
  handleCastError,
  handleNotFoundIdError,
  handleDefaultError,
} from './handle-errors';

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
    logError(error);
    if (error instanceof Error.CastError) return handleCastError(res);
    if (error instanceof Error.DocumentNotFoundError) return handleNotFoundIdError(res);
    return handleDefaultError(res);
  }
};

export default updateCardData;
