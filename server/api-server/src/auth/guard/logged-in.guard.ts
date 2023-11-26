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
    // TODO token이 유효한지 확인하는 로직이 필요함
    return sid !== null;
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
