import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { JoinPayload } from './dto/join-payload.dto';
import { ChatPayload } from './dto/chat-payload';

@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_ORIGIN,
  },
})
export class ChatGateway {
  @WebSocketServer() server: Server = new Server();

  @SubscribeMessage('join')
  async handleSetClientDataEvent(
    @MessageBody()
    payload: JoinPayload,
  ) {
    this.server.socketsJoin(payload.room);
  }

  @SubscribeMessage('chat')
  async handleChatEvent(
    @MessageBody()
    payload: ChatPayload,
  ): Promise<ChatPayload> {
    this.server.to(payload.room).emit('chat', payload);
    return payload;
  }
}
