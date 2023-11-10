import { Router } from 'express';
import homeRouter from './home-router';
import cardsRouter from './cards-router';
import usersRouter from './users-router';

const routes = Router();

routes.use('/', homeRouter);
routes.use('/users', usersRouter);
routes.use('/cards', cardsRouter);

export default routes;
