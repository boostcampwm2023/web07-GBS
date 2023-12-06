import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { exec } from 'child_process';
import { unlink } from 'fs';
import { join } from 'path';

@Injectable()

export class ThumbnailsService {
  async extractTsUrls(streamkey: string) {
    try {
      console.log('streamkey:::::', streamkey);
      const prefixURL = 'https://kr.object.ncloudstorage.com/hls-bucket/hls/';
      let result = '';
      const m3u8Url = `https://kr.object.ncloudstorage.com/hls-bucket/hls/${streamkey}.m3u8`;
      console.log('m3u8Url:::::', m3u8Url);
      const response = await fetch(m3u8Url);
      const body = await response.text();      
      result = JSON.stringify(body);
      const lines = body.split('\n');

      const newM3U8 = lines[3];
      console.log('newM3U8:::::', newM3U8);
      const newResponse = await fetch(
        `https://kr.object.ncloudstorage.com/hls-bucket/hls/${newM3U8}`,
      );
      const newBody = await newResponse.text();
      const newLines = newBody.split('\n');

      const temp = newM3U8.split('/');
      const arg = `${prefixURL}${temp[0]}/${newLines[5]}`;

      console.log('arg:::::', arg);
      this.executeShellScript(
        `${process.cwd()}/src/thumbnails/makeThumbnail.sh`,
        `${arg}`,
        async () => {
          console.log('Thumbnail created successfully');
          // Callback after shell script execution
          const thumbnailsDir = join(process.cwd(), 'src', 'thumbnails');
          await this.removeFile(join(thumbnailsDir, 'segment.ts'));
          await this.removeFile(join(thumbnailsDir, 'segment.mp4'));
        },
      );
      return result;
    } catch (error) {
      console.error('Error fetching M3U8 file:', error);
    }
  }

  executeShellScript(
    scriptPath: string,
    args: string,
    callback: () => void,
  ): void {
    exec(`sh ${scriptPath} ${args}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Execution error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Error: ${stderr}`);
        return;
      }
      console.log(`Output: ${stdout}`);
      callback(); // Execute the callback after the script completes
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
}
