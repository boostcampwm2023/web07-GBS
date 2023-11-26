import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setUpSession } from './init.session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setUpSession(app);
  await app.listen(3000);
}
bootstrap();
