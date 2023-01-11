import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  config: {
    redis: RedisOptions;
  };
  driver: string;
}

export default {
  config: {
    redis: {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      username: 'default',
      password: 'secret',
      db: 0,
    },
  },
  driver: 'redis',
} as ICacheConfig;
