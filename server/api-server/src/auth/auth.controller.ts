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
@Controller('oauth')
export class AuthController {
  private logger = new Logger('auth');
  @UseGuards(NaverAuthGuard)
  @Get('login/naver')
  async naverlogin() {
    this.logger.debug('Logging...');
    return;
  }
  @UseGuards(NaverAuthGuard)
  @Get('login/naver/callback')
  async callback(@Req() req, @Res() res): Promise<any> {
    this.logger.debug('callback');

    const { user } = req;
    this.logger.debug(user);
    return res.send(user);
    // const jwt: string = req.user.jwt;
    // if (jwt) res.redirect('http://localhost:3000/' + jwt);
    // else res.redirect('http://localhost:3000');
  }
  // @UseGuards(NaverAuthGuard)
  // @Get('login/naver/callback')
  // async callback(@Query() query: any, @Req() req, @Res() res): Promise<any> {
  //   this.logger.debug('callback');
  //   if (query) {
  //     const code = query.code;
  //     const state = query.state;
  //     const api_url =
  //       'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=' +
  //       process.env.NAVER_CLIENT_ID +
  //       '&client_secret=' +
  //       process.env.NAVER_CLIENT_SECRET +
  //       '&redirect_uri=' +
  //       process.env.NAVER_CALLBACK_URL +
  //       '&code=' +
  //       code +
  //       '&state=' +
  //       state;
  //     const options = {
  //       url: api_url,
  //       headers: {
  //         'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
  //         'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
  //       },
  //     };
  //     req.get(options, function (error, response, body) {
  //       if (!error && response.statusCode == 200) {
  //         res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
  //         res.end(body);
  //       } else {
  //         res.status(response.statusCode).end();
  //         console.log('error = ' + response.statusCode);
  //       }
  //     });
  //   } else {
  //     const { user } = req;
  //     this.logger.debug(user);
  //     return res.send(user);
  //     // const jwt: string = req.user.jwt;
  //     // if (jwt) res.redirect('http://localhost:3000/' + jwt);
  //     // else res.redirect('http://localhost:3000');
  //   }
  // }
}
