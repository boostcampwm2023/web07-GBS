import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private httpService: HttpService) {}

  async getNaverToken(code: string, state: string) {
    const client_id = 'YOUR_CLIENT_ID';
    const client_secret = 'YOUR_CLIENT_SECRET';
    const redirectURI = encodeURI('YOUR_CALLBACK_URL');
    const api_url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirectURI}&code=${code}&state=${state}`;

    try {
      const response = await lastValueFrom(
        this.httpService.get(api_url, {
          headers: {
            'X-Naver-Client-Id': client_id,
            'X-Naver-Client-Secret': client_secret,
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to retrieve Naver token');
    }
  }
}
