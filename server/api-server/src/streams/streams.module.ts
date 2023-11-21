import { Module } from '@nestjs/common';
import { StreamsService } from './streams.service';
import { StreamsController } from './streams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stream } from './entities/stream.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stream])],
  controllers: [StreamsController],
  providers: [StreamsService],
})
export class StreamsModule {}
