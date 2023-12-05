import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getSession } from './common/redis.session';
import { RedisIoAdapter } from './common/redis.adapter';
import * as passport from 'passport';
import * as fs from 'fs';
import * as http from 'http';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as process from 'process';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(process.env.KEY_PATH),
    cert: fs.readFileSync(process.env.CERT_PATH),
  };
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    httpsOptions,
  });

  app.enableCors({
    origin: process.env.CLIENT_ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const session = getSession();
  app.use(session);
  app.use(passport.initialize());
  app.use(passport.session());

  const redisIoAdapter = new RedisIoAdapter(app, session);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  await app.init();

  app.listen(443);
  http.createServer(server).listen(3000);
}

bootstrap();
