import { createClient } from 'redis';

const redisClient = createClient({
  password: process.env.REDIS_PASSWORD
});

redisClient.on('error', (err) => {
  throw new Error(`Redis Client Error: ${err}`);
});

export default redisClient;
