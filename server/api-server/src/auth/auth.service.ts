import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(oauthId: string, oauthType: string): Promise<any> {
    let user = await this.usersService.findByOAuthId(oauthId);
    if (!user) {
      const createUserDto: CreateUserDto = {
        oauthId,
        oauthType,
        nickname: uuid(),
        userId: uuid(),
      };
      user = await this.usersService.create(createUserDto);
    }

    if (!user) {
      throw new HttpException('Internal server error', 500);
    }

    return user;
  }

  async signup(createUserDto: CreateUserDto): Promise<any> {
    return await this.usersService.create(createUserDto);
  }
}
