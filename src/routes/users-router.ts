import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} from '../controllers/users-controller';

const usersRouter = Router();

usersRouter.get('/', getUsers); // Получить всех пользователей
usersRouter.get('/:userId', getUserById); // Получить пользователя по _id
usersRouter.post('/', createUser); // Создать пользователя
usersRouter.patch('/me', updateUserProfile); // Обновить профайл
usersRouter.patch('/me/avatar', updateUserAvatar); // Обновить аватар

export default usersRouter;
