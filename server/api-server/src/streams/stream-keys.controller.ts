import { Body, Controller, Post, Res } from '@nestjs/common';
import { StreamsService } from './streams.service';
import { VerifyStreamKeyDto } from './dto/verify-stream-key.dto';
import { Response } from 'express';

@Controller('stream-keys')
export class StreamKeysController {
  constructor(private readonly streamsService: StreamsService) {}

  @Post()
  async getVerifiedRedirect(
    @Body() body: VerifyStreamKeyDto,
    @Res() res: Response,
  ) {
    const streamURL = await this.streamsService.getStreamURL(body.name);
    return res.redirect(streamURL);
  }
}
