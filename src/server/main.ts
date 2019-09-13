import { NestFactory } from '@nestjs/core';
import { WsAdapter } from "@nestjs/platform-ws";
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { BrowserWindow } from 'electron';

let nestApp: INestApplication;

export let browserWin: BrowserWindow;

export async function bootstrap(b: BrowserWindow) {
    browserWin = b;
    
    nestApp = await NestFactory.create(AppModule);
    nestApp.useWebSocketAdapter(new WsAdapter(nestApp));
    await nestApp.listen(3000);
}

export async function closeNest() {
    nestApp.close();
}