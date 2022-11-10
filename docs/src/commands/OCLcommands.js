const ipc = require('electron').ipcRenderer;

const quit = {
    func:
    /**
     * Send 'quit' signal to ipcMain to quit process
     */
        () => {
        ipc.send('quit');
    },
    funcNames: ['quit', 'exit'],
    funcParam: 0
}

const settings = {
    func:
    /**
     * Send 'open-setting' signal to ipcMain to open OCL settings
     */
        () => {
        ipc.send('open-settings');
    },
    funcNames: ['settings'],
    funcParam: 0
}

module.exports = { quit, settings };