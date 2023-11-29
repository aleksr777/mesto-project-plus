import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import Card from '../models/card-model';
import logErrorMessage from './log-error-message';
import { SUCC_CODE_DEFAULT } from '../constants/http-codes';
import { ERR_TEXT_NOT_FOUND_ID_CARD, ERR_TEXT_INVALID_ID } from '../constants/error-text';
import NotFoundErr from '../errors/not-found-err';
import BadRequestErr from '../errors/bad-request-err';

const updateCardData = async (
  req: Request,
  res: Response,
  next: NextFunction,
  action: 'add-like' | 'remove-like',
) => {
  const { CastError } = Error;
  const { cardId } = req.params;
  const userId = req.user._id;
  let update;

  switch (action) {
  case 'add-like':
    update = { $addToSet: { likes: userId } };
    break;
  case 'remove-like':
    update = { $pull: { likes: userId } };
    break;
  default:
    return console.error('В функцию "updateCardData" передан некорректный action');
  }

  try {
    const updatedCard = await Card.findByIdAndUpdate(cardId, update, {
      new: true,
    })
      .orFail(new NotFoundErr(ERR_TEXT_NOT_FOUND_ID_CARD));
    return res.status(SUCC_CODE_DEFAULT).json(updatedCard);
  } catch (error) {
    logErrorMessage(error);
    if (error instanceof CastError) {
      return next(new BadRequestErr(ERR_TEXT_INVALID_ID));
    }
    return next(error);
  }
};

export default updateCardData;
