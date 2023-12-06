import { Controller, Get, Param } from '@nestjs/common';
import { ThumbnailsService } from './thumbnails.service';

@Controller('thumbnails')
export class ThumbnailsController {
  constructor(private readonly thumbnailsService: ThumbnailsService) {}

  @Get(':streamkey')
  findAll(@Param('streamkey') streamkey: string) {

    return this.thumbnailsService.extractTsUrls(streamkey);
  }
}
