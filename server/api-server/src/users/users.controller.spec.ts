import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { StreamsModule } from '../streams/streams.module';
import { ConfigModule } from '@nestjs/config';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.DB_HOST,
          port: +process.env.DB_PORT,
          username: process.env.DB_ID,
          password: process.env.DB_PW,
          database: process.env.DB_NAME,
          autoLoadEntities: true,
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
        forwardRef(() => AuthModule),
        forwardRef(() => StreamsModule),
      ],
      controllers: [UsersController],
      providers: [UsersService],
      exports: [UsersService, TypeOrmModule]
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('findAll', () => {
    it('should call usersService.findAll()', () => {
      // Arrange
      const findAllSpy = jest.spyOn(service, 'findAll');

      // Act
      controller.findAll();

      // Assert
      expect(findAllSpy).toHaveBeenCalled();
    });

    // Existing code...

    it('should return the result of usersService.findAll()', async () => {
      // Arrange
      const expectedResult = [
        {
          "id": "3cdce141-d9de-4f7b-b95c-e42acb602167",
          "userId": "ddd",
          "oauthId": "iNGxLq4KTWs7A6YCAMkdj76nNbWoW2Q1CO9kPbxbOqg",
          "oauthType": "naver",
          "nickname": "jmh",
          "createdAt": "2023-11-27T14:37:35.955Z",
          "updatedAt": "2023-11-27T14:45:14.795Z",
          "deletedAt": null,
          "stream": null // Add the stream property here
        }
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
 