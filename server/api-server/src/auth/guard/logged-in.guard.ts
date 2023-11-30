import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Session,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor() {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest() as Request;
    const cookieSid = this.parseSessionIdFromCookie(
      request.cookies['connect.sid'],
    );
    const sid = request.session.id;
    console.log(`cookieSid: ${cookieSid}, sid: ${sid}`);
    console.log(sid === cookieSid);
    if (sid == cookieSid) {
      if (new Date() > new Date(request.session.cookie.expires)) {
        return false;
      }
      // Update the session's 'expires' property
      request.session.cookie.expires = new Date(
        Date.now() + 1000 * 60 * 60 * 24 * 7,
      );
      return true;
    }
    return false;
  }

  parseSessionIdFromCookie(cookieValue) {
    // Extract the part before the dot, if it exists
    const sessionId = cookieValue.split('.')[0];
    // Remove the 's:' prefix, if it exists
    return sessionId.startsWith('s:') ? sessionId.slice(2) : sessionId;
  }
}
