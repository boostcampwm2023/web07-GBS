import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { exec } from 'child_process';
import { unlink } from 'fs';
import { join } from 'path';
import AWS = require('aws-sdk'); 
import * as fs from 'fs';

@Injectable()
export class ThumbnailsService {
  
  async getThumbnailUrl(userId: string) {

    const object_name = `thumb/${userId}_240p264kbs.png`;
    console.log(object_name);
    const endpoint = new AWS.Endpoint(process.env.AWS_S3_URL);
    const region = process.env.AWS_S3_REGION;
    const access_key = process.env.AWS_ACCESS_KEY_ID;
    const secret_key = process.env.AWS_SECRET_ACCESS_KEY;
    const S3 = new AWS.S3({
      endpoint: endpoint,
      region: region,
      credentials: {
          accessKeyId: access_key,
          secretAccessKey: secret_key
      }
    });
    
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: object_name,
    };

    const objectInfo = await S3.getObject(params).promise();
        
    return {ContentLength: objectInfo.ContentLength, thumbnailUrl: object_name}

  }
}
