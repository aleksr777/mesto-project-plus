import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} from '../controllers/users-controller';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUser);
usersRouter.patch('/me', updateUserProfile);
usersRouter.patch('/me/avatar', updateUserAvatar);

export default usersRouter;
