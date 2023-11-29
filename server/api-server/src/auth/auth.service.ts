import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { v4 as uuid } from 'uuid';
import {
  REDIS_REPOSITORY_OUTBOUND_PORT,
  RedisRepositoryOutboundPort,
} from '../redis/redis-repository.outbound-port';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    @Inject(REDIS_REPOSITORY_OUTBOUND_PORT)
    private readonly redisRepositoryOutboundPort: RedisRepositoryOutboundPort,
  ) {}
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

    return user;
  }

  async signup(createUserDto: CreateUserDto): Promise<any> {
    return await this.usersService.create(createUserDto);
  }

  async getfromRedis() {
    return await this.redisRepositoryOutboundPort.get({
      key: 'test',
    });
  }
}
