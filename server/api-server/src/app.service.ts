import { Inject, Injectable } from '@nestjs/common';
import {
  REDIS_REPOSITORY_OUTBOUND_PORT,
  RedisRepositoryOutboundPort,
} from './redis/redis-repository.outbound-port';

@Injectable()
export class AppService {
  constructor(
    @Inject(REDIS_REPOSITORY_OUTBOUND_PORT)
    private readonly redisRepositoryOutboundPort: RedisRepositoryOutboundPort,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async getfromRedis() {
    return await this.redisRepositoryOutboundPort.get({
      key: 'test'
    });
  }
}
