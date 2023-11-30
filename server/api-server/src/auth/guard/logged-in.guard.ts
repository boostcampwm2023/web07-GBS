import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor() {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest() as Request;
    const session = request.session;
    return !!session;
  }
}
