import { INestApplication } from '@nestjs/common';
import * as session from 'express-session';
import RedisStore from 'connect-redis';
import * as passport from 'passport';
import { createClient } from 'redis';
import { Logger } from '@nestjs/common';

export function setUpSession(app: INestApplication): void {
  const logger = new Logger(setUpSession.name);

  const url = process.env.REDIS_URL || 'redis://localhost:6379';
  const redisClient = createClient({
    url,
  });
  redisClient.connect().catch(logger.error);

  const redisStore = new RedisStore({
    client: redisClient,
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      store: redisStore,
      cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
}
