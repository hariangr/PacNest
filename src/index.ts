import { app, BrowserWindow } from "electron";
import * as path from "path";
import { bootstrap } from "./server/main";

// In main process.
const { ipcMain } = require('electron')
ipcMain.on('hello', (event, arg) => {
  console.log(arg) // prints "ping"
  console.log('aaaa');

  event.reply('asynchronous-reply', 'pong')
})


function createWindow() {
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

  bootstrap();
}

app.on('ready', createWindow)
