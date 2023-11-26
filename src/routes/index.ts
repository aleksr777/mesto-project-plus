import { Router } from 'express';
import homeRouter from './home-router';
import cardsRouter from './cards-router';
import usersRouter from './users-router';
import handleErrors from '../utils/handle-errors';
import {
  login,
  createUser,
} from '../controllers/users-controllers';

const routes = Router();

routes.use('/', homeRouter);
routes.post('/signin', login);
routes.post('/signup', createUser);
routes.use('/users', usersRouter);
routes.use('/cards', cardsRouter);
routes.use('*', (_req, res) => handleErrors(res, 'not-found-page'));

export default routes;
