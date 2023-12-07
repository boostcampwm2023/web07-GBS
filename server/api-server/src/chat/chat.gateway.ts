import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JoinPayload } from './dto/join-payload.dto';
import { ChatPayload } from './dto/chat-payload.dto';
import { KickPayload } from './dto/kick-payload.dto';
import { Logger } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AIChatFilter } from './util/ai-chat-filter';

@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private aiChatFilter: AIChatFilter,
  ) {}

  @WebSocketServer() server: Server = new Server({ cookie: true });
  private readonly logger = new Logger(ChatGateway.name);

  async handleConnection(client: Socket) {
    const id = client.handshake['session'].userId || '';

    let user: User;
    try {
      user = await this.userRepo.findOneBy({ id });
    } catch (e) {
      this.logger.error(e);
    }

    client.data.userId = user?.userId || 'anonymous';
    client.data.nickname = user?.nickname || '익명';

    this.logger.debug('Socket Connected: ' + client.data.userId);
  }

  handleDisconnect(client: Socket) {
    this.logger.debug('Socket Disconnected: ' + client.data.userId);
  }

  @SubscribeMessage('join')
  async handleSetClientDataEvent(
    @MessageBody() payload: JoinPayload,
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.debug('Join payload: ', payload);
    client.data.room = payload.room;
    client.join(payload.room);
  }

  @SubscribeMessage('chat')
  async handleChatEvent(
    @MessageBody() payload: ChatPayload,
    @ConnectedSocket() client: Socket,
  ): Promise<ChatPayload> {
    this.logger.debug('Chat payload: ', payload);

    const message = await this.aiChatFilter.filter(payload.message);

    this.server.to(client.data.room).emit('chat', {
      nickname: payload.nickname,
      message : message,
    });
    return payload;
  }

  @SubscribeMessage('kick')
  async handleKickEvent(
    @MessageBody() payload: KickPayload,
    @ConnectedSocket() client: Socket,
  ): Promise<KickPayload> {
    if (client.data.room !== client.data.userId) {
      return;
    }

    this.logger.debug('Kick payload: ', payload);

    this.server.to(client.data.room).emit('kick', {
      nickname: payload.nickname,
    });
    return payload;
  }

  getViewers(room: string) {
    return this.server.sockets.adapter.rooms.get(room)?.size || 0;
  }
}
