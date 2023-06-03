import {
  ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
   
  @WebSocketGateway({cors: "*:*"})
  export class ChatGateway{
    @WebSocketServer()
    server: Server;
   
    constructor(
      private readonly chatService: ChatService
    ) {
    }

    afterInit() {
      console.log('WebSocket server initialized');
    }
  
    @SubscribeMessage('message')
    handleMessage(client: any, payload: any) {
      this.server.emit('message', payload); 
    }

    async sendInfo(
      data: string
    ) {
        this.chatService.saveMessage(data)
        this.server.emit('send_info', data);
    }
  }