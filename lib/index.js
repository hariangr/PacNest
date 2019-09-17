const { ipcRenderer } = require("electron");

console.log('aaaaxxa');


ipcRenderer.on('logger', (event, arg) => {
    console.log('aaaaaaaaazxx');

    console.log(arg);
})

function startServer(params) {
    ipcRenderer.send('enableServer', 3001);
}

function closeServer(params) {
    ipcRenderer.send('disableServer', Date.now());
}