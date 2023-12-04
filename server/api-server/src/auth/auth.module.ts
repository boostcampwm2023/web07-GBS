import { PassportModule } from '@nestjs/passport';
import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';

import { NaverStrategy } from './strategy/naver.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from '../redis/redis.module';
import { REDIS_REPOSITORY_OUTBOUND_PORT } from '../redis/redis-repository.outbound-port';
import { RedisRepository } from '../redis/redis.repository';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    RedisModule,
  ],
  controllers: [AuthController],
  providers: [
    NaverStrategy,
    AuthService,
    {
      provide: REDIS_REPOSITORY_OUTBOUND_PORT,
      useClass: RedisRepository,
    },
  ],
  exports: [PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
