import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StreamsModule } from './streams/streams.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { APP_GUARD } from '@nestjs/core';
import { LoggedInGuard } from './auth/guard/logged-in.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      envFilePath: `${process.cwd()}/config/env/.env.${process.env.NODE_ENV}`
   }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_ID,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    StreamsModule,
    AuthModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: LoggedInGuard,
    },
    AppService,
  ],
})
export class AppModule {}
