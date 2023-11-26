import 'dotenv/config';
import express from 'express';
import connectToDatabase from './utils/connect-to-database';
import routes from './routes/index';
import { logRequest, logError } from './middlewares/logger-middleware';

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
connectToDatabase();

app.use(express.json());
app.use(logRequest);
app.use(routes);
app.use(logError);

app.listen(+PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
