import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import AWS = require('aws-sdk');
import { Logger } from '@nestjs/common';

@Injectable()
export class ThumbnailsService {
  private readonly logger = new Logger(ThumbnailsService.name);

  async getThumbnailUrl(userId: string) {
    try {
      const S3 = new AWS.S3({
        endpoint: new AWS.Endpoint(process.env.AWS_S3_URL),
        region: process.env.AWS_S3_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      });

      const objectName = `thumb/thumbnail-${userId}_240p264kbs.png`;
      const thumbnailUrl = `${process.env.AWS_S3_URL}${process.env.AWS_S3_BUCKET_NAME}/${objectName}`;
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: objectName,
      };

      const objectInfo = await S3.getObject(params).promise();

      return {
        contentLength: objectInfo.ContentLength,
        url: thumbnailUrl,
      };
    } catch (err) {
      this.logger.error(err);
      throw new HttpException('Thumbnail not found', HttpStatus.NOT_FOUND);
    }
  }
}
