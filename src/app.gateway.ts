import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'tls';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer() server;
  private logger: Logger = new Logger('AppGateway');
  private connections: Array<any> = [];


  handleConnection(client: any, ...args: any[]) {
    this.logger.log(client);
    this.connections.push(client);
  }

  afterInit(server: any) {
    this.logger.log('Awal');
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    this.logger.log('someone send something')
    client.send(payload);

    // return payload;
  }
}
