import 'dotenv/config';
import express from 'express';
import connectToDatabase from './utils/connect-to-database';
import routes from './routes/index';
import { logRequest, logError } from './middlewares/logger-middleware';
import handleErrors from './middlewares/handle-errors';

const { PORT = 3000 } = process.env;
const app: express.Express = express();
connectToDatabase();

app.use(express.json());
app.use(logRequest);
app.use(routes);
app.use(logError);
app.use(handleErrors);

app.listen(+PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
