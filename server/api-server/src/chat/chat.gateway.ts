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
import { ChatPayload } from './dto/chat-payload';
import { Logger } from '@nestjs/common';

import * as dotenv from 'dotenv'
import { UsersService } from 'src/users/users.service';
dotenv.config()

@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly userService: UsersService
  ) {}

  @WebSocketServer() server: Server = new Server({cookie: true});
  private readonly logger = new Logger(ChatGateway.name);

  async handleConnection(client: Socket) {
    const id = client.handshake['session'].userId

    const [user] = await this.userService.findOne(id);
    client.data.userId = user.userId || 'anonymous';
    client.data.nickname = user.nickname || '익명';

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
    this.server.socketsJoin(payload.room);
  }

  @SubscribeMessage('chat')
  async handleChatEvent(
    @MessageBody() payload: ChatPayload,
    @ConnectedSocket() client: Socket,
  ): Promise<ChatPayload> {
    this.logger.debug('Chat payload: ', payload);

    this.server.to(client.data.room).emit('chat', {
      id: client.data.userId,
      nickname: client.data.nickname,
      message: payload.message
    });
    return payload;
  }

  getViewers(room: string) {
    return this.server.of(room).sockets.size;
  }
}
