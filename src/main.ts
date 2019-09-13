import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from "@nestjs/platform-ws";
import { app, BrowserWindow } from "electron";
import * as path from "path";

// In main process.
const { ipcMain } = require('electron')
ipcMain.on('hello', (event, arg) => {
  console.log(arg) // prints "ping"
  console.log('aaaa');
  
  event.reply('asynchronous-reply', 'pong')
})

async function bootstrap() {
  const nestApp = await NestFactory.create(AppModule);
  nestApp.useWebSocketAdapter(new WsAdapter(nestApp));
  await nestApp.listen(3000);
}

function createWindow() {
  bootstrap();
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.webContents.openDevTools();
  win.loadFile(path.join(__dirname, "../index.html"));

  setTimeout(() => {
    ipcMain.emit('asynchronous-reply', 'hhh');

  }, 1000);
}

app.on('ready', createWindow)
