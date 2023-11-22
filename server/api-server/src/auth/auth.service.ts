import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {CreateUserDto} from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async validateUser(oauthId: string): Promise<any> {
    const user = await this.usersService.findOAuthId(oauthId);
    if (!user) {
      return null;
    }
    return user;
  }
  async signup(createUserDto: CreateUserDto): Promise<any> {
    return await this.usersService.create(createUserDto);
  }
}
