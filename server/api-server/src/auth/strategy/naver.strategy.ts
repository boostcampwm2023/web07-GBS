import { Strategy } from 'passport-naver';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// import { AuthService } from '../auth.service';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_CALLBACK_URL,
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (error: any, user?: any, info?: any) => void,
  ) {
    try {
      console.log(profile);
      const { _json } = profile;
      const user = {
        oauth_id: _json.id,
      };
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
  // async validate(
  //   request: any,
  //   accessToken: string,
  //   refreshToken: string,
  //   done: any,
  // ) {
  //   try {
  //     const jwt = 'placeholderJWT';
  //     const user = {
  //       jwt,
  //     };
  //     done(null, user);
  //   } catch (err) {
  //     console.error(err);
  //     done(err, false);
  //   }
  // }
}
