import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getSession } from './common/redis.session';
import { RedisIoAdapter } from './common/redis.adapter';
import * as passport from 'passport';
import * as fs from 'fs';
import * as process from 'process';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  let app: INestApplication<any>;

  if (process.env.NODE_ENV === 'production') {
    app = await NestFactory.create(AppModule, {
      httpsOptions: {
        key: fs.readFileSync(process.env.KEY_PATH),
        cert: fs.readFileSync(process.env.CERT_PATH),
      },
    });
  } else {
    app = await NestFactory.create(AppModule);
  }

  const session = getSession();
  app.use(session);
  app.use(passport.initialize());
  app.use(passport.session());

  const redisIoAdapter = new RedisIoAdapter(app, session);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(process.env.PORT);
}

bootstrap();
