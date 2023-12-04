import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getSession } from './common/redis.session';
import { RedisIoAdapter } from './common/redis.adapter';
import * as passport from 'passport';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as process from 'process';

async function bootstrap() {
  const keyPath =
    process.env.NODE_ENV === 'production'
      ? '/privkey1.pem'
      : '../../privkey1.pem';
  const certPath =
    process.env.NODE_ENV === 'production'
      ? '/fullchain1.pem'
      : '../../fullchain1.pem';

  const httpsOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  const session = getSession();
  app.use(session);
  app.use(passport.initialize());
  app.use(passport.session());

  const redisIoAdapter = new RedisIoAdapter(app, session);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  const httpServer = http.createServer(server).listen(3000);
  const httpsServer = https.createServer(httpsOptions, server).listen(443);

  await app.init();
}

bootstrap();
