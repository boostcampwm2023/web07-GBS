import { Module } from '@nestjs/common';
import { ThumbnailsController } from './thumbnails.controller';
import { ThumbnailsService } from './thumbnails.service';

@Module({
  controllers: [ThumbnailsController],
  providers: [ThumbnailsService],
  exports: [ThumbnailsService],
})
export class ThumbnailsModule {}
