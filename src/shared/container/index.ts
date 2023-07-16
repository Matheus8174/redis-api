import '@shared/container/providers';

import { container } from 'tsyringe';

import ChampionCountersRepository from '@modules/championCounters/infra/redis/repositories/ChampionCountersRepository';
import IChampionCountersRepository from '@modules/championCounters/repositories/IChampionCountersRepository';

import RedisClient from '@shared/infra/redis/RedisClient';
// import { RedisClientType } from '@redis/client';

container.registerSingleton<IChampionCountersRepository>(
  'ChampionCountersRepository',
  ChampionCountersRepository
);

container.registerInstance('RedisClient', RedisClient);
