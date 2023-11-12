import express, {
  Response,
  NextFunction,
} from 'express';
import connectToDatabase from './utils/connect-to-database';
import routes from './routes/index';

// Для временного обхода ошибок типизации (но линтер при этом выдаёт ошибку)
/* eslint-disable no-unused-vars */
declare global {
  namespace Express {
    interface Request {
      user: {
        _id: string;
      };
    }
  }
}
/* eslint-disable no-unused-vars */

const { PORT = 3000 } = process.env;
const app: express.Express = express();

app.use(express.json());

connectToDatabase();

// Временный мидлвар для авторизации
app.use((req, res: Response, next: NextFunction) => {
  req.user = {
    _id: '65198bdc11e4cfb283c97609',
  };
  next();
});

app.use(routes);

app.listen(+PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
