import { Router } from 'express';
import homeRouter from './homeRouter';
import cardsRouter from './cardsRouter';
import usersRouter from './usersRouter';

const routes = Router();

routes.use('/', homeRouter);
routes.use('/users', usersRouter);
routes.use('/cards', cardsRouter);

export default routes;
