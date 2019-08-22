import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'tls';
import * as fs from "fs";

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;
  private logger: Logger = new Logger('AppGateway');
  private connections: Array<any> = [];
  private curSession: String;

  handleDisconnect(client: any) {
    this.logger.log("Someone logout")
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log("Someone login");
    this.connections.push(client);
    // client.send({"event": "logined", "data": "ur"});
  }

  afterInit(server: any) {
    this.logger.log('Awal');
  }

  @SubscribeMessage('cheese')
  handleMessage(client: any, payload: any) {
    this.logger.log('everybody cheese')
    // client.send(payload);

    this.connections.forEach(client => {
      client.send(JSON.stringify({ "event": "cheese" }));
    });
  }

  @SubscribeMessage('save')
  savePic(client: any, payload: any) {
    let fileName = payload.filename;
    let encoded = payload.encoded;

    let pathDir = `/Users/hariangr/Documents/Developer/Pacamera/saver/${this.curSession}`

    fs.mkdirSync(pathDir);
    fs.writeFileSync(`/Users/hariangr/Documents/Developer/Pacamera/saver/${this.curSession}/${fileName}.jpg`, encoded, 'base64');

    this.logger.log(`Picture taken: ${fileName}`)
  }

  @SubscribeMessage('ping')
  amIConnected(client: any, payload: any) {
    client.send(JSON.stringify({ "event": "ping" }));
  }

  @SubscribeMessage('new')
  nextOne(client: any, payload: any) {
    this.logger.log('New session')
    this.curSession = payload;
    return this.curSession;
  }
}
