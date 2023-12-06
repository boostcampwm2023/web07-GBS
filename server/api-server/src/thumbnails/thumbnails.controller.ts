import { Controller, Get, Param } from '@nestjs/common';
import { ThumbnailsService } from './thumbnails.service';
import * as fs from 'fs';
@Controller('thumbnails')
export class ThumbnailsController {
  constructor(private readonly thumbnailsService: ThumbnailsService) {}

  @Get(':userId')
  async findAll(@Param('userId') userId: string) {
    const object_name = `thumbnails/${userId}.jpg`;
    await this.thumbnailsService.extractTsUrls(userId);
    const filePath = `${process.cwd()}/src/thumbnails/thumbnail.jpg`;

    if (fs.existsSync(filePath)) {
      await this.thumbnailsService.uploadS3(filePath, object_name);
      await this.thumbnailsService.removeFile(filePath);
      return `${process.env.AWS_S3_URL}${process.env.AWS_S3_BUCKET_NAME}/thumbnails/${userId}.jpg`
    } else {
      return 'thumbnail not found'
    }
    
  }
}
