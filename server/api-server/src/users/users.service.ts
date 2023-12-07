import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async findAll() {
    return await this.userRepo.find();
  }

  async findByOAuthId(oauthId: string) {
    return await this.userRepo.findOne({
      where: { oauthId },
    });
  }

  async findByUserId(userId: string) {
    return await this.userRepo.findOne({
      where: { userId },
    });
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user || !id) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    const user = await this.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    for (const key in updateUserDto) {
      if (updateUserDto.hasOwnProperty(key)) {
        user[key] = updateUserDto[key];
      }
    }

    const updatedUser = await this.userRepo.save(user);

    return updatedUser;
  }

  async remove(id: string) {
    const result = await this.userRepo.softDelete(id);
    if (!result.affected)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    else {
      return result;
    }
  }
}
