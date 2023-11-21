import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class NaverAuthGuard extends AuthGuard('naver') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 인증 전에 실행할 로직
    console.log('인증 시작');

    // 기본 인증 로직 실행
    const result = (await super.canActivate(context)) as boolean;

    // 인증 후에 실행할 로직
    if (result) {
      console.log('인증 성공');
    } else {
      console.log('인증 실패');
    }

    return result;
  }
}
