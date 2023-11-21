import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { NaverAuthGuard } from './naver-auth.guard';
@Controller('oauth')
export class AuthController {
  @UseGuards(NaverAuthGuard)
  @Get('login/naver')
  async naverlogin() {
    return;
  }

  @UseGuards(NaverAuthGuard)
  @Get('login/naver/callback')
  async callback(@Req() req, @Res() res): Promise<any> {
    const jwt: string = req.user.jwt;
    if (jwt) res.redirect('http://localhost:3000/' + jwt);
    else res.redirect('http://localhost:3000');
  }
}
