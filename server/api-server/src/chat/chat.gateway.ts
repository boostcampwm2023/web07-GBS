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

@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_ORIGIN,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server = new Server();
  private readonly logger = new Logger(ChatGateway.name);

  handleConnection(client: Socket) {
    // TODO: 세션 정보 가져오기
    client.data.userId = 'kkg';
    client.data.nickname = '김경근';

    this.logger.debug('Socket Connected');
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

    this.server.to(client.data.room).emit('chat', payload);
    return payload;
  }

  getViewers(room: string) {
    return this.server.of(room).sockets.size;
  }
}
