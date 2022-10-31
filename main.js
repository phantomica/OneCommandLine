const { app, BrowserWindow, Tray, Menu, screen, globalShortcut } = require('electron');
const ipc = require('electron').ipcMain; // reciever
const path = require('path');

let window = null;
let tray = null;

const createWindow = () => {
    // get Screen Dimensions
    const mainScreen = screen.getPrimaryDisplay();
    const dimensions = mainScreen.size;

    // create Window
    window = new BrowserWindow({
        // dimensions
        width: dimensions.width,
        height: 60,
        resizable: false,
        // offset
        x: 0,
        y: 0,
        // frameless
        autoHideMenuBar: true,
        frame: false,
        // display options
        alwaysOnTop: true,
        show: false,
        // allow nodejs usage
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    // load html index file into the window
    window.loadFile(path.join(__dirname, './docs/index.html'));

    // create windows system tray with 'Quit' option
    tray = new Tray('D:\\Programmierung\\Visual Studio\\C#\\Shadow\\shadow\\shadow\\shadow.ico');
    const contextMenu = Menu.buildFromTemplate([{
        label: 'Quit',
        click: () => {
            app.quit();
        }
    }])
    tray.setToolTip('OneCommandLine')
    tray.setContextMenu(contextMenu)

    // shortcut to open window
    globalShortcut.register("\\", () => {
        window.show();
    })

}

app.on('ready', createWindow)

// hide window on focus lose
app.on('browser-window-blur', () => {
    window.hide();
})

// hide window on enter press
ipc.on('command-submit', () => {
    window.hide();
})

ipc.on('quit', () => {
    app.quit();
})