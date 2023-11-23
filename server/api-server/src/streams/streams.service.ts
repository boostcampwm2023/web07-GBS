import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStreamDto } from './dto/create-stream.dto';
import { UpdateStreamDto } from './dto/update-stream.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Stream } from './entities/stream.entity';
import { VideoInfoProvider } from './provider/video-info.provider';
import { ReadStreamDetailDto } from './dto/read-stream-detail.dto';
import { ReadStreamDto } from './dto/read-stream.dto';
import { PageDto } from 'src/common/dto/page.dto';

@Injectable()
export class StreamsService {
  constructor(
    @InjectRepository(Stream)
    private readonly streamRepo: Repository<Stream>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly videoInfoProvider: VideoInfoProvider,
  ) {}

  create(createStreamDto: CreateStreamDto) {
    return this.streamRepo.create({
      ...createStreamDto,
    });
  }

  async findAll(page: number, size: number): Promise<PageDto<ReadStreamDto>> {
    const videoInfos = await this.videoInfoProvider.getVideoInfo();
    const streamKeys = videoInfos.map((info) => info.streamKey);

    const condition = { stream: { streamKey: In(streamKeys) } };

    const [users, count] = await this.userRepo.findAndCount({
      where: condition,
      skip: (page - 1) * size,
      take: size,
      relations: ['stream'],
    });

    return {
      data: users.map((user) => ({
        userId: user.userId,
        title: user.stream.title,
        category: user.stream.category,
        ...videoInfos.find((info) => info.streamKey === user.stream.streamKey),
      })),
      pageInfo: {
        page,
        size,
        totalPage: Math.ceil(count / size),
      },
    };
  }

  async findOne(userId: string): Promise<ReadStreamDetailDto> {
    const user = await this.userRepo.findOne({
      where: { userId },
      relations: ['stream'],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const videoInfos = await this.videoInfoProvider.getVideoInfo();
    const videoInfo = videoInfos.find(
      (info) => info.streamKey === user.stream.streamKey,
    );

    return {
      userId,
      title: user.stream.title,
      category: user.stream.category,
      desc: user.stream.desc,
      ...videoInfo,
    };
  }

  async update(userId: string, updateStreamDto: UpdateStreamDto) {
    const stream = await this.streamRepo.findOne({
      where: { user: {userId} },
    });

    if (!stream) {
      throw new HttpException('Stream not found', HttpStatus.NOT_FOUND);
    }

    stream.title = updateStreamDto.title || stream.title;
    stream.desc = updateStreamDto.desc || stream.category;
    stream.category = updateStreamDto.category || stream.category;

    return this.streamRepo.save(stream);
  }
}
