import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepo.create(createUserDto);
    await this.userRepo.save(newUser);
    return newUser;
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findOAuthId(oauthId: string) {
    return await this.userRepo.findOne({
      where: { oauthId: oauthId },
    });
  }
  async findOne(id: string) {
    return await this.userRepo.find({
      where: { id: id },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
