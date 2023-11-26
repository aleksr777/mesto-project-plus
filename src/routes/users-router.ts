import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth-middleware';
import {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUserProfile,
  updateUserAvatar,
} from '../controllers/users-controllers';

const usersRouter = Router();

usersRouter.get('/', authenticateToken, getUsers);
usersRouter.get('/me', authenticateToken, getCurrentUser);
usersRouter.patch('/me', authenticateToken, updateUserProfile);
usersRouter.patch('/me/avatar', authenticateToken, updateUserAvatar);
usersRouter.get('/:userId', authenticateToken, getUserById);

export default usersRouter;
