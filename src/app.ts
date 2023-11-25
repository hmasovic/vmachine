import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import db from '@lib/db';

import * as routes from './routes';

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routing setup
routes.register(app);

/**
 * Application function responsible for the initial startup logic.
 */
export const onInit = async () => {
  await db.authenticate();
};

export default app;
