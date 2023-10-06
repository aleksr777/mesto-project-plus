import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import routes from './routes/index';

// Объявление собственного типа для объекта 'user'
interface User {
  _id: string;
}

// Расширение типа 'Request' для добавления свойства 'user'
declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

// Временный мидлвар для авторизации
app.use((req: Request, _res: Response, next: NextFunction) => {
  req.user = {
    _id: '65198bdc11e4cfb283c97609'
  };
  next();
});

app.use(routes);

const start = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://localhost:27017/mestodb');
    console.log('База данных подключена');
    app.listen(+PORT, () => {
      console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log('Ошибка подключения', err);
  }
};

start();
