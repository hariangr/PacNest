import { NestFactory } from '@nestjs/core';
import { WsAdapter } from "@nestjs/platform-ws";
import { AppModule } from './app.module';

export async function bootstrap() {
    const nestApp = await NestFactory.create(AppModule);
    nestApp.useWebSocketAdapter(new WsAdapter(nestApp));
    await nestApp.listen(3000);
}