declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      PREFIX_ROUTES: string;

      REDIS_PASSWORD: string;
    }
  }
}

export {};
