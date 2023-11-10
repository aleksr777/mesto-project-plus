import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} from '../controllers/users-controller';

const usersRouter = Router();

usersRouter.get('/users', getUsers); // Получить всех пользователей
usersRouter.get('/users/:userId', getUserById); // Получить пользователя по _id
usersRouter.post('/users', createUser); // Создать пользователя
usersRouter.patch('/users/me', updateUserProfile); // Обновить профайл
usersRouter.patch('/users/me/avatar', updateUserAvatar); // Обновить аватар

export default usersRouter;
