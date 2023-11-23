import { Router } from 'express';
import {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
} from '../controllers/users-controllers';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.patch('/me', updateUserProfile);
usersRouter.patch('/me/avatar', updateUserAvatar);

export default usersRouter;
