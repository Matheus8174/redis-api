import { Router } from 'express';

import getChampionsCounters from '@modules/championCounters/useCases/getChampionsCounters';

const passwordRoutes = Router();

passwordRoutes.get('/', getChampionsCounters);

export default passwordRoutes;
