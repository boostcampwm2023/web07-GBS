import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { StreamsService } from './streams.service';
import { VerifyStreamKeyDto } from './dto/verify-stream-key.dto';
import { Response } from 'express';
import { LoggedInGuard } from '../auth/guard/logged-in.guard';

@Controller('stream-keys')
export class StreamKeysController {
  constructor(private readonly streamsService: StreamsService) {}

  @UseGuards(LoggedInGuard)
  @Get('me')
  async getStreamKey(@Session() session: Record<string, any>) {
    if (!session.userId) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const streamKey = await this.streamsService.getStreamKey(session.userId);
    return { streamKey };
  }

  @Post()
  async getVerifiedRedirect(
    @Body() body: VerifyStreamKeyDto,
    @Res() res: Response,
  ) {
    const streamURL = await this.streamsService.getStreamURL(body.name);
    return res.redirect(streamURL);
  }
}
