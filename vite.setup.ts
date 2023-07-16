import 'reflect-metadata';
import '@shared/config/env';

import { afterAll, afterEach, beforeAll } from 'vitest';

import redisClient from '@shared/infra/redis/RedisClient';

beforeAll(async () => {
  await redisClient.connect();
});

afterEach(async () => {
  await redisClient.flushAll();
});

afterAll(async () => {
  await redisClient.disconnect();
});
