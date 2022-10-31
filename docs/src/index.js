const ipc = require('electron').ipcRenderer; // sender

// hide window on enter press
window.addEventListener('keypress', (event) => {
    if (event.key != 'Enter') { return }
    ipc.send('command-submit');
    commandHandler(getCommand('commandInput'));
})