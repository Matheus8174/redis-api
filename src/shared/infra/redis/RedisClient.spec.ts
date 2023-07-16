import { describe, expect, it } from 'vitest';

import redisClient from './RedisClient';

describe.skip('RedisClient', () => {
  it('should be able to connect with the Redis database', async () => {
    await redisClient.connect();

    redisClient.once('ready', () => {
      expect(redisClient.isReady).toBe(true);
    });
  });
});
