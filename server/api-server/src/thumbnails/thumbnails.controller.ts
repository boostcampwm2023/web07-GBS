import { Controller, Get, Param } from '@nestjs/common';
import { ThumbnailsService } from './thumbnails.service';

@Controller('thumbnails')
export class ThumbnailsController {
  constructor(private readonly thumbnailsService: ThumbnailsService) {}

  @Get(':userId')
  async getThumbnailUrl(@Param('userId') userId: string) {
    return await this.thumbnailsService.getThumbnailUrl(userId);
  }
}
