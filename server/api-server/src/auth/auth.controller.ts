import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
  Session,
  Post,
  Body,
} from '@nestjs/common';
import { NaverAuthGuard } from './guard/naver-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoggedInGuard } from './guard/logged-in.guard';

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
    session.userId = req.user.userId;
    const sessionId = session.id;
    res.json({ success: true, message: 'user login successful', sessionId });
    // res.redirect(process.env.CLIENT_ORIGIN);
  }

  @UseGuards(LoggedInGuard)
  @Get('test')
  async test() {
    return 'test';
  }




  @Get('sessionId')
  async getSessionId(@Session() session: Record<string, any>) {
    if (!session.id) {
      return { session: 'login required' };
    }
    return { session: session.id };
  }
  @Get('user')
  async getUserBySessionId(@Session() session: Record<string, any>) {
    if (!session.id) {
      return { session: 'login required' };
    }
    return { session: session.id, userId: session.userId };
  }
}
