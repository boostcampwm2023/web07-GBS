import { Injectable } from '@nestjs/common';
import AWS = require('aws-sdk');

@Injectable()
export class ThumbnailsService {
  async getThumbnailUrl(userId: string) {
    const objectName = `${process.env.AWS_S3_URL}${process.env.AWS_S3_BUCKET_NAME}/thumb/${userId}_240p264kbs.png`;
    const endpoint = new AWS.Endpoint(process.env.AWS_S3_URL);
    const region = process.env.AWS_S3_REGION;
    const accessKey = process.env.AWS_ACCESS_KEY_ID;
    const secretKey = process.env.AWS_SECRET_ACCESS_KEY;
    const S3 = new AWS.S3({
      endpoint: endpoint,
      region: region,
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
    });

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: objectName,
    };

    const objectInfo = await S3.getObject(params).promise();

    return {
      contentLength: objectInfo.ContentLength,
      url: objectName,
    };
  }
}
