import supertest from 'supertest';
import { afterAll, afterEach, beforeAll } from 'vitest';

import app from '@shared/infra/http/app';
import redisClient from '@shared/infra/redis/RedisClient';

declare global {
  // eslint-disable-next-line no-var
  var testRequest: supertest.SuperTest<supertest.Test>;
}

beforeAll(async () => {
  await redisClient.connect();

  global.testRequest = supertest(app);
});

afterEach(async () => {
  await redisClient.flushAll();
});

afterAll(async () => {
  await redisClient.disconnect();
});
