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
} from '@nestjs/common';
import { NaverAuthGuard } from './guard/naver-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';

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
  async callback(
    @Session() session: Record<string, any>,
    @Req() req,
    @Res() res: Response,
  ): Promise<any> {
    if (!req.user) {
      return res.status(401).send('Unauthorized');
    }

    session.userId = req.user.userId;
    res.send(`<script>window.close();</script>`);
  }

  @Get('sessionId')
  async getSessionId(@Session() session: Record<string, any>) {
    if (!session.id) {
      throw new HttpException('Unauthorized', 401);
    }
    return { session: session.id };
  }
}
