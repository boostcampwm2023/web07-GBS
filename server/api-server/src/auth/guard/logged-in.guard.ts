import { CanActivate, ExecutionContext, Injectable, Session} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import {AuthService} from "../auth.service";


@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(
    context: ExecutionContext,
  ){
    const request = context.switchToHttp().getRequest() as Request;
    const sid = this.getSidFromCookie(request.headers.cookie);
    const redistest = await this.authService.getfromRedis();
    console.log(redistest)
    // TODO token이 유효한지 확인하는 로직이 필요함
    if (sid ) {
      // If the session ID from the cookie matches the current session, user is considered logged in
      return true;
    }
    return false;
  }

  getSidFromCookie(cookieString) {
    const cookies = cookieString.split('; ').reduce((acc, cookie) => {
      const [key, value] = cookie.split('=');
      acc[key] = value;
      return acc;
    }, {});

    return cookies['sessionId'];
  }
}
