import * as session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import { Logger } from '@nestjs/common';

export function getSession() {
  const logger = new Logger(getSession.name);
  const url = process.env.REDIS_URL;
  const redisClient = createClient({
    url,
  });
  redisClient.connect().catch(logger.error);

  const redisStore = new RedisStore({
    client: redisClient,
  });

  return session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: redisStore,
    proxy: true,
    cookie: {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  });
}
