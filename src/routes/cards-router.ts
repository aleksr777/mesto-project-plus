import { Router } from 'express';
import {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards-controller';

const cardsRouter = Router();

cardsRouter.get('/', getAllCards); // Получение всех карточек
cardsRouter.post('/', createCard); // Создание карточки
cardsRouter.delete('/:cardId', deleteCard); // Удаление карточки по идентификатору
cardsRouter.put('/:cardId/likes', likeCard); // Добавить лайк карточке
cardsRouter.delete('/:cardId/likes', dislikeCard); // Удалить лайк

export default cardsRouter;
