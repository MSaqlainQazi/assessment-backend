import { Injectable } from "@nestjs/common";
import { Server } from "socket.io";

@Injectable()
export class WebSocketsService {
  event(server: Server, data: any) {
    server.emit("emitEvents", {
      msg: "get socket events successfully",
      data: data,
    });
  }
}
