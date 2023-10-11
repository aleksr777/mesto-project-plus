import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import routes from './routes/index';

// Расширение типа 'Request' для добавления свойства 'user'
declare global {
  namespace Express {
    interface Request {
      user: {
        _id: string;
        name?: string;
        about?: string;
        avatar?: string;
      };
    }
  }
}

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

// Временный мидлвар для авторизации
app.use((req: Request, _res: Response, next: NextFunction) => {
  req.user = {
    _id: '65198bdc11e4cfb283c97609',
  };
  next();
});

app.use(routes);

app.listen(+PORT);
