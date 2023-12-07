import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
  Session,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NaverAuthGuard } from './guard/naver-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { GoogleAuthGuard } from './guard/google-auth.guard';

@Controller('oauth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const result = await this.authService.signup(createUserDto);
    return result;
  }

  @UseGuards(NaverAuthGuard)
  @Get('login/naver')
  async naverLogin() {
    return;
  }

  @UseGuards(NaverAuthGuard)
  @Get('login/naver/callback')
  async naveCallback(
    @Session() session: Record<string, any>,
    @Req() req,
    @Res() res: Response,
  ): Promise<any> {
    if (!req.user) {
      return res.sendStatus(401);
    }

    session.userId = req.user.userId;
    res.send(`<script>window.close();</script>`);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('login/google')
  async googleLogin() {
    return;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('login/google/callback')
  async googleCallback(
    @Session() session: Record<string, any>,
    @Req() req,
    @Res() res: Response,
  ): Promise<any> {
    if (!req.user) {
      return res.sendStatus(401);
    }

    session.userId = req.user.userId;
    res.send(`<script>window.close();</script>`);
  }

  @Get('sessionId')
  async getSessionId(@Session() session: Record<string, any>) {
    if (!session.userId) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return { session: session.userId };
  }
}
