import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setUpSession } from './init.session';
import { RedisIoAdapter } from './redis.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setUpSession(app);

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(3000);
}
bootstrap();
