import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
  Logger,
  Query,
} from '@nestjs/common';
import { NaverAuthGuard } from './naver-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Controller('oauth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private httpService: HttpService,
  ) {}
  private logger = new Logger('auth');
  @UseGuards(NaverAuthGuard)
  @Get('login/naver')
  async naverlogin() {
    this.logger.debug('Logging...');
    return;
  }
  @UseGuards(NaverAuthGuard)
  @Get('login/naver/callback')
  async callback(@Req() req, @Res() res: Response): Promise<any> {
    res.cookie('once_token', req.user.once_token);
    res.redirect('/');
    // res.cookie('access_token', req.user.access_token);
    // res.cookie('refresh_token', req.user.refresh_token);
  }
}
