import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  Session,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { StreamsService } from './streams.service';
import { UpdateStreamDto } from './dto/update-stream.dto';
import { LoggedInGuard } from '../auth/guard/logged-in.guard';
import { UsersService } from '../users/users.service';

@Controller('streams')
export class StreamsController {
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

  @Get()
  findAll(@Query('page') page = '1', @Query('size') size = '5') {
    return this.streamsService.findAll(+page, +size);
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.streamsService.findOne(userId);
  }

  @Patch(':userId')
  update(
    @Param('userId') userId: string,
    @Body() updateStreamDto: UpdateStreamDto,
  ) {
    return this.streamsService.update(userId, updateStreamDto);
  }
}
