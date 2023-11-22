import { PassportModule } from '@nestjs/passport';
import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';

import { NaverStrategy } from './strategy/naver.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import {UsersService} from "../users/users.service";

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
  ],
  controllers: [AuthController],
  providers: [NaverStrategy, AuthService],
  exports: [PassportModule, JwtModule, AuthService],
})
export class AuthModule {}