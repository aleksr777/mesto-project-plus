import { Router } from 'express';
import {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cardsController';

const cardsRouter = Router();

cardsRouter.get('/cards', getAllCards); // Получение всех карточек
cardsRouter.post('/cards', createCard); // Создание карточки
cardsRouter.delete('/cards/:cardId', deleteCard); // Удаление карточки по идентификатору
cardsRouter.put('/cards/:cardId/likes', likeCard); // Добавить лайк карточке
cardsRouter.delete('/cards/:cardId/likes', dislikeCard); // Удалить лайк

export default cardsRouter;
