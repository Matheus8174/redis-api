import { Router } from 'express';

import championsRoutes from './champions.routes';

const routes = Router();

const prefixRoutes = process.env.PREFIX_ROUTES;

routes.use(`${prefixRoutes}/champion`, championsRoutes);

export default routes;
