import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { VideoInfoDto } from '../dto/video-info.dto';

@Injectable()
export class VideoInfoProvider {
  async getVideoInfo(): Promise<VideoInfoDto[]> {
    const result = await axios.get(process.env.VIDEO_STAT_URL);

    if (result.status === 200) {
      return result?.data?.[
        'http-flv'
      ].servers[0].applications[0].live.streams.map((video) => {
        const meta = video.meta.video;

        return {
          streamKey: video.name,
          viewer: 0, // TODO: 시청자 수
          thumbnail: '', // TODO: 썸네일 URL
          startedAt: new Date(Date.now() - video.clients[0].time).toISOString(),
          resolution: meta.width + 'x' + meta.height,
          frameRate: meta.frame_rate,
        };
      });
    }
  }
}
