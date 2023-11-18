import { Router } from 'express';
import homeRouter from './home-router';
import cardsRouter from './cards-router';
import usersRouter from './users-router';
import { handleNotFoundPageError } from '../utils/handle-errors';

const routes = Router();

routes.use('/', homeRouter);
routes.use('/users', usersRouter);
routes.use('/cards', cardsRouter);
routes.use('*', (_req, res) => handleNotFoundPageError(res));

export default routes;
