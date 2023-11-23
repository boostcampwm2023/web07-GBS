import { INestApplication } from '@nestjs/common';
import * as session from 'express-session';
import RedisStore from 'connect-redis';
import { Redis } from 'ioredis';
import * as passport from 'passport';
import { createClient } from 'redis';

export function setUpSession(app: INestApplication): void {
  const url = process.env.REDIS_URL || 'redis://localhost:6379';
  const redisClient = createClient({
    url,
  });
  redisClient.connect().catch(console.error);

  const redisStore = new RedisStore({
    client: redisClient,
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET, // 세션에 사용될 시크릿 값. 감춰두자.
      saveUninitialized: false,
      resave: false,
      store: redisStore,
      cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 쿠키 유효기간: 일주일?
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
}
