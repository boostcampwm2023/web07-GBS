import { Controller, Get, Req, Res, UseGuards, Logger } from '@nestjs/common';
import { NaverAuthGuard } from './naver-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('oauth')
export class AuthController {
  constructor(private authService: AuthService) {}

  private logger = new Logger('auth');

  @UseGuards(NaverAuthGuard)
  @Get('callback')
  async callback(@Req() req, @Res() res: Response): Promise<any> {
    console.log(`callback:: ${req.user.accessToken}`);
    res.cookie('access_token', req.user.accessToken);
    res.cookie('refresh_token', req.user.refreshToken);
    res.cookie('type', req.user.type);
    res.cookie('oauthId', req.user.oauthId);
    res.redirect('http://localhost:3000');
    res.end();
  }

  @UseGuards(NaverAuthGuard)
  @Get('login/naver')
  async naverlogin() {
    this.logger.debug('Logging...');
    return;
  }
}
