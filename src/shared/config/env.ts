import { config } from 'dotenv-safe';
import { resolve } from 'path';

const whichEnvFileLoad = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

config({
  example: `${whichEnvFileLoad}.example`,
  path: resolve(__dirname, '..', '..', '..', whichEnvFileLoad)
});
