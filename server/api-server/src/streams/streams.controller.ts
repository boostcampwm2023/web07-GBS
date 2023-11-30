import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { StreamsService } from './streams.service';
import { UpdateStreamDto } from './dto/update-stream.dto';

@Controller('streams')
export class StreamsController {
  constructor(private readonly streamsService: StreamsService) {}
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
