import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Stream } from '../streams/entities/stream.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Stream)
    private streamRepo: Repository<Stream>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepo.create(createUserDto);
    const newStream = this.streamRepo.create();
    newUser.stream = newStream;

    await this.userRepo.save(newUser);
    return newUser;
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findByOAuthId(oauthId: string) {
    return await this.userRepo.findOne({
      where: { oauthId: oauthId },
    });
  }

  async findOne(id: string) {
    return await this.userRepo.findOne({
      where: { id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error(`User with id: ${id} not found`);
    }

    for (const key in updateUserDto) {
      if (updateUserDto.hasOwnProperty(key)) {
        user[key] = updateUserDto[key];
      }
    }

    const updatedUser = await this.userRepo.save(user);

    return updatedUser;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
