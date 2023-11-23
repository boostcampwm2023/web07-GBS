import { Module } from '@nestjs/common';
import { StreamsService } from './streams.service';
import { StreamsController } from './streams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stream } from './entities/stream.entity';
import { UsersModule } from 'src/users/users.module';
import { VideoInfoProvider } from './provider/video-info.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Stream]), UsersModule],
  controllers: [StreamsController],
  providers: [StreamsService, VideoInfoProvider],
})
export class StreamsModule {}
