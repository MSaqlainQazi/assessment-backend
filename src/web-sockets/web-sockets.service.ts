import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class WebSocketsService {
  event(server: Server, data: any) {
    console.log(data);
    server.emit('emitEvents', {
      msg: 'get socket events successfully',
      data: data,
    });
  }
}
