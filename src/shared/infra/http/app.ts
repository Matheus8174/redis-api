import 'reflect-metadata';
import '@shared/config/env';
import '@shared/container';

import express from 'express';

import routes from '@shared/infra/http/routes';

const app = express();

app.use(express.json());

app.use(routes);

export default app;
