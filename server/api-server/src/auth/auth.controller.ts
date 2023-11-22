import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
  Logger,
  Session,
  Post,
  Body,
} from '@nestjs/common';
import { NaverAuthGuard } from './guard/naver-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import {LoggedInGuard} from "./guard/logge-in.guard";

@Controller('oauth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    // console.log(createUserDto);
    const result = await this.authService.signup(createUserDto);
    return result;
  }
  @UseGuards(NaverAuthGuard)
  @Get('callback')
  async callback(
    @Session() session: Record<string, any>,
    @Req() req,
    @Res() res: Response,
  ): Promise<any> {
    session.accessToken = req.user.accessToken;
    session.refreshToken = req.user.refreshToken;
    session.oauthId = req.user.oauthId;
    session.type = req.user.type;
    res.redirect('http://localhost:3000');
    res.end();
  }

  @UseGuards(NaverAuthGuard)
  @Get('login/naver')
  async naverlogin() {
    return;
  }
  //
  // @UseGuards(LoggedInGuard) // login이 되어있으면 못들어옴 test
  // @Get('hi')
  // async hi() {
  //   return 'hi';
  // }
}
