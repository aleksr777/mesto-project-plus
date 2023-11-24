import 'dotenv/config';
import express from 'express';
import connectToDatabase from './utils/connect-to-database';
import routes from './routes/index';
import { login, createUser } from './controllers/users-controllers';

// TODO: после доработки авторизации у нужно удалить этот код типизации
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

app.use(routes);
app.post('/signin', login);
app.post('/signup', createUser);

app.listen(+PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
