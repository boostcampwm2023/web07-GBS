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
  async callback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.authService.getNaverToken(code, state);
      res.cookie('access_token', result.access_token);
    } catch (error) {
      console.error('error =', error);
    }
  }
}
