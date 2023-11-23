// auth/logged-in.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class LoggedInGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const sid = this.getSidFromCookie(request.headers.cookie);
    console.log(sid);
    // TODO token이 유효한지 확인하는 로직이 필요함
    if(sid == null) return false;
    else return true;
  }

  getSidFromCookie(cookieString) {
    const cookies = cookieString.split('; ').reduce((acc, cookie) => {
      const [key, value] = cookie.split('=');
      acc[key] = value;
      return acc;
    }, {});

    return cookies['connect.sid'];
  }
}
