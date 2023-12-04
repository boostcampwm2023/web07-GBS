import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';

interface LoggedInSession {
  cookie: any;
  userId: string | undefined;
}

@Injectable()
export class LoggedInGuard implements CanActivate {
  private readonly logger = new Logger(LoggedInGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const session = request.session as unknown as LoggedInSession;
    const isAuthenticated = session?.userId ? true : false;

    if (isAuthenticated) {
      this.logger.debug(`Authenticated: ${session?.userId}`);
    } else {
      this.logger.debug(`Unauthenticated`);
    }

    return isAuthenticated;
  }
}
