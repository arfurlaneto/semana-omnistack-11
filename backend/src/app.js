import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';


const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(errorHandler);

export default app;
