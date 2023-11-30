import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getSession } from './common/redis.session';
import { RedisIoAdapter } from './common/redis.adapter';
import * as passport from 'passport';
import { LoggedInGuard } from './auth/guard/logged-in.guard';
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CLIENT_ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  const session = getSession();
  app.use(session);
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalGuards(new LoggedInGuard());
  const redisIoAdapter = new RedisIoAdapter(app, session);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(3000);
}
bootstrap();
