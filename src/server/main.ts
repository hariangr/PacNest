import { NestFactory } from '@nestjs/core';
import { WsAdapter } from "@nestjs/platform-ws";
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { BrowserWindow } from 'electron';

let nestApp: INestApplication;

export async function bootstrap(port: number) {
    nestApp = await NestFactory.create(AppModule);
    nestApp.useWebSocketAdapter(new WsAdapter(nestApp));
    await nestApp.listen(port != null ? port : 3000);
}

export async function closeNest() {
    nestApp.close();
}