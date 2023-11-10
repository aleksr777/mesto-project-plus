import express, {
  Response,
  NextFunction,
} from 'express';
import connectToDatabase from './utils/connect-to-database';
import routes from './routes/index';

const { PORT = 3000 } = process.env;
const app: express.Express = express();

app.use(express.json());

connectToDatabase();

// Временный мидлвар для авторизации
app.use((req: any, res: Response, next: NextFunction) => {
  req.user = {
    _id: '65198bdc11e4cfb283c97609',
  };
  next();
});

app.use(routes);

app.listen(+PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
