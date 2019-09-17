console.log('kkkk');

const { ipcRenderer } = require('electron')

ipcRenderer.on('log', (event, arg) => {
    console.log(arg) // prints "pong"
})
ipcRenderer.on('logger', (event, arg) => {
    console.log('aaaaaaaaazxx');
    
    console.log(arg);
})

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg) // prints "pong"
})

function startServer(params) {
    ipcRenderer.send('enableServer', Date.now());
}

function closeServer(params) {
    ipcRenderer.send('disableServer', Date.now());
}