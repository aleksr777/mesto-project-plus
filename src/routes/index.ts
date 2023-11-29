import { Router } from 'express';
import homeRouter from './home-router';
import cardsRouter from './cards-router';
import usersRouter from './users-router';
import {
  login,
  createUser,
} from '../controllers/users-controllers';
import NotFoundErr from '../errors/not-found-err';
import { ERR_TEXT_NOT_FOUND_PAGE } from '../constants/error-text';

const routes = Router();

routes.use('/', homeRouter);
routes.post('/signin', login);
routes.post('/signup', createUser);
routes.use('/users', usersRouter);
routes.use('/cards', cardsRouter);
routes.use('*', (_req, _res, next) => {
  next(new NotFoundErr(ERR_TEXT_NOT_FOUND_PAGE));
});

export default routes;
