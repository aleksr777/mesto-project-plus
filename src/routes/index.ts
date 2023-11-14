import { Router } from 'express';
import homeRouter from './home-router';
import cardsRouter from './cards-router';
import usersRouter from './users-router';

const routes = Router();

routes.use('/', homeRouter);
routes.use('/users', usersRouter);
routes.use('/cards', cardsRouter);
routes.use('*', (req, res) => {
  res.status(404).send('Error 404! Страница не найдена!');
});

export default routes;
