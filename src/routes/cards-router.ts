import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth-middleware';
import {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards-controllers';

const cardsRouter = Router();

cardsRouter.get('/', authenticateToken, getAllCards);
cardsRouter.post('/', authenticateToken, createCard);
cardsRouter.delete('/:cardId', authenticateToken, deleteCard);
cardsRouter.put('/:cardId/likes', authenticateToken, likeCard);
cardsRouter.delete('/:cardId/likes', authenticateToken, dislikeCard);

export default cardsRouter;
