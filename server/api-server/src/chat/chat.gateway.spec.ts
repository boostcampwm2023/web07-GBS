import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from './chat.gateway';
import { INestApplication } from '@nestjs/common';
import { Socket, io } from 'socket.io-client';

describe('ChatGateway', () => {
  let app: INestApplication;
  let gateway: ChatGateway;
  let ioClient: Socket;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGateway],
    }).compile();
    app = module.createNestApplication();
    gateway = module.get<ChatGateway>(ChatGateway);
    ioClient = io('http://localhost:3000');

    app.listen(3000);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('Join Test', async () => {
    ioClient.connect();
    ioClient.emit('join', { room: 'kkg' });
  });

  it('Chat Test', async () => {});
});
