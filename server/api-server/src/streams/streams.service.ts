import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateStreamDto } from './dto/update-stream.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Stream } from './entities/stream.entity';
import { VideoInfoProvider } from './provider/video-info.provider';
import { ReadStreamDetailDto } from './dto/read-stream-detail.dto';
import { ReadStreamDto } from './dto/read-stream.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { ChatGateway } from 'src/chat/chat.gateway';
import { ThumbnailsService } from 'src/thumbnails/thumbnails.service';

@Injectable()
export class StreamsService {
  constructor(
    @InjectRepository(Stream)
    private readonly streamRepo: Repository<Stream>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly videoInfoProvider: VideoInfoProvider,
    private readonly chatGateway: ChatGateway,
    private readonly thumbnailService: ThumbnailsService,
  ) {}

  async findAll(page: number, size: number): Promise<PageDto<ReadStreamDto>> {
    const videoInfos = await this.videoInfoProvider.getVideoInfo();
    const streamKeys = videoInfos.map((info) => info.streamKey);

    const [users, count] = await this.userRepo.findAndCount({
      where: { stream: { streamKey: In(streamKeys) } },
      skip: (page - 1) * size,
      take: size,
      relations: ['stream'],
    });

    const dataProms = users.map(async (user) => {
      const { streamKey, ...videoInfo } = videoInfos.find(
        (info) => info.streamKey === user.stream.streamKey,
      );
      return {
        userId: user.userId,
        nickname: user.nickname,
        title: user.stream.title,
        category: user.stream.category,
        ...videoInfo,
        viewer: this.chatGateway.getViewers(user.userId),
        thumbnail: await this.thumbnailService.getThumbnailUrl(user.userId),
      };
    });

    return {
      data: await Promise.all(dataProms),
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
    const { streamKey, ...videoInfo } = videoInfos.find(
      (info) => info.streamKey === user.stream.streamKey,
    );

    return {
      userId,
      nickname: user.nickname,
      title: user.stream.title,
      category: user.stream.category,
      desc: user.stream.desc,
      ...videoInfo,
      viewer: this.chatGateway.getViewers(userId),
      thumbnail: await this.thumbnailService.getThumbnailUrl(user.userId),
    };
  }

  async update(userId: string, updateStreamDto: UpdateStreamDto) {
    const stream = await this.streamRepo.findOne({
      where: { user: { userId } },
    });

    if (!stream) {
      throw new HttpException('Stream not found', HttpStatus.NOT_FOUND);
    }

    stream.title = updateStreamDto.title || stream.title;
    stream.desc = updateStreamDto.desc || stream.category;
    stream.category = updateStreamDto.category || stream.category;

    return this.streamRepo.save(stream);
  }

  async getStreamURL(streamKey: string) {
    const stream = await this.streamRepo.findOne({
      where: { streamKey },
      relations: ['user'],
    });

    if (!stream) {
      throw new HttpException('Stream not found', HttpStatus.NOT_FOUND);
    }

    return process.env.ENCODING_URL + '/' + stream.user.userId;
  }

  async getStreamKey(userId: string) {
    const user = await this.userRepo.findOne({
      where: { id:userId },
      relations: ['stream'],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user.stream.streamKey;
  }
}
