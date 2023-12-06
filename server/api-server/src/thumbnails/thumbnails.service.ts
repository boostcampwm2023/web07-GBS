import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { exec } from 'child_process';
import { unlink } from 'fs';
import { join } from 'path';
import AWS = require('aws-sdk'); 
import * as fs from 'fs';

@Injectable()
export class ThumbnailsService {
  async extractTsUrls(userId: string) {
    try {

      const prefix = `${process.env.AWS_S3_URL}${process.env.AWS_S3_BUCKET_NAME}`
      const prefixURL = `${prefix}/hls`;

      const m3u8Url = `${prefixURL}/${userId}.m3u8`;

      const response = await fetch(m3u8Url);
      const body = await response.text();     
      const lines = body.split('\n');

      const newM3U8 = lines[3];
      const newResponse = await fetch(
        `${prefixURL}/${newM3U8}`,
      );
      const newBody = await newResponse.text();
      const newLines = newBody.split('\n');

      const temp = newM3U8.split('/');
      const arg = `${prefixURL}/${temp[0]}/${newLines[5]}`;

      await this.executeShellScript(
        `${process.cwd()}/src/thumbnails/makeThumbnail.sh`,
        `${arg}`
      );

    } catch (error) {
      console.error('Error fetching M3U8 file:', error);
    }
  }

  executeShellScript(scriptPath: string, args: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(`sh ${scriptPath} ${args}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Execution error: ${error.message}`);
          reject(error);
          return;
        }
        if (stderr) {
          console.error(`Error: ${stderr}`);
          reject(stderr);
          return;
        }
        console.log(`Output: ${stdout}`);
        resolve('thumbnail saved'); // Resolve the promise with the output
      });
    });
  }

  removeFile(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file ${filePath}:`, err);
          reject(err);
        } else {
          console.log(`File ${filePath} deleted successfully`);
          resolve();
        }
      });
    });
  }

  async uploadS3(filePath: string, object_name: string) {

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
    
    await S3.putObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: object_name,
        Body: fs.createReadStream(filePath),
        ACL: 'public-read',
    }).promise();

  }

}
