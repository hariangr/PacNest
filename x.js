console.log('kkkk');

const { ipcRenderer } = require('electron')

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg) // prints "pong"
})

function clickerTekan(params) {
    console.log('mmm');
    ipcRenderer.send('hello', 'aaa');
}