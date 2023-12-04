import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { StreamsModule } from '../streams/streams.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // forwardRef(() => AuthModule),
    forwardRef(() => StreamsModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
