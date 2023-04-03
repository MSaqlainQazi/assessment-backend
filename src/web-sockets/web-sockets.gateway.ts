import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { WebSocketsService } from './web-sockets.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    orign: 'http://localhost:3000',
  },
})
export class WebSocketsGateway {
  constructor(private readonly webSocketsService: WebSocketsService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      console.log(socket.id, 'is connected');
    });
  }

  @SubscribeMessage('sendEventsForPerformingActions')
  handleEvents(@MessageBody() data: any) {
    return this.webSocketsService.event(this.server, data);
  }
}
