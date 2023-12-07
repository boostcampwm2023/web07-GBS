import { forwardRef, Module } from '@nestjs/common';
import { StreamsService } from './streams.service';
import { StreamsController } from './streams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stream } from './entities/stream.entity';
import { UsersModule } from 'src/users/users.module';
import { VideoInfoProvider } from './provider/video-info.provider';
import { ChatModule } from 'src/chat/chat.module';
import { StreamKeysController } from './stream-keys.controller';
import { ThumbnailsService } from 'src/thumbnails/thumbnails.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stream]),
    forwardRef(() => UsersModule),
    ChatModule,
  ],
  controllers: [StreamsController, StreamKeysController],
  providers: [StreamsService, VideoInfoProvider, ThumbnailsService],
  exports: [StreamsService, TypeOrmModule],
})
export class StreamsModule {}
