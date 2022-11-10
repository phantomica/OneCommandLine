const { app, BrowserWindow, Tray, Menu, screen, globalShortcut } = require('electron');
const ipc = require('electron').ipcMain; // receiver
const path = require('path');
const fs = require('fs');
const jsonFiles = {
    settings: './docs/settings.json'
}
const htmlFiles = {
    index: './docs/index.html',
    settings: './docs/settings.html',
    shortcutSelect: './docs/shortcutSelect.html'
}

let mainWindow = null;
let settingsWin = null;
let shortcutSelectWin = null;
let tray = null;

const createWindow = () => {
    // get Screen Dimensions
    const mainScreen = screen.getPrimaryDisplay();
    const dimensions = mainScreen.size;

    // create Window
    mainWindow = new BrowserWindow({
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

    // hide window on focus lose
    app.on('browser-window-blur', () => {
        mainWindow.hide();
    })

    // hide window on enter press
    ipc.on('command-submit', () => {
        mainWindow.hide();
    })

    // quit process when quit command is received
    ipc.on('quit', () => {
        app.quit();
    })

    // open up OCL settings when settings command is received
    ipc.on('open-settings', createSettingsWindow)

    // load html index file into the window
    mainWindow.loadFile(path.join(__dirname, htmlFiles.index));

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

    // reads existing shortcutKey || opens window to set shortcutKey
    readShortcutKey();

    ipc.on('open-shortcut-select', shortcutSelectWindow);
}


const createSettingsWindow = () => {
    settingsWin = new BrowserWindow({
        // dimensions
        width: 400,
        height: 300,
        resizable: false,
        // frameless
        autoHideMenuBar: true,
        frame: true,
        // display options
        alwaysOnTop: false,
        show: true,
        // allow nodejs usage
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    // load html index file into the window
    settingsWin.loadFile(path.join(__dirname, htmlFiles.settings));

    try {
        ipc.on('close-settings', () => {
            settingsWin.destroy();
        })
    } catch (error) {}
}

/**
 * BrowserWindow in which you can set a key and return the 'submit-shortcutKey' event
 * Used to set new shortcutKey for opening OCL
 */
const shortcutSelectWindow = () => {
    // window settings
    shortcutSelectWin = new BrowserWindow({
        // dimensions
        width: 400,
        height: 300,
        resizable: false,
        // frameless
        autoHideMenuBar: true,
        frame: true,
        // display options
        alwaysOnTop: false,
        show: true,
        // allow nodejs usage
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    // load html file
    shortcutSelectWin.loadFile(path.join(__dirname, htmlFiles.shortcutSelect));

    // handle event from shortcutSelect.html
    ipc.on('submit-shortcutKey', (event, shortcutKey) => {
        setShortcutKey(shortcutKey);
        shortcutSelectWin.destroy();
    })

}

/**
 * Gets and sets the opening shortcut key from settings.json
 */
const readShortcutKey = () => {
    // read settings.json for existing shortcut
    const rawSettingsJson = fs.readFileSync(jsonFiles.settings);
    const settingsJson = JSON.parse(rawSettingsJson);
    // if shortcut does not exist open shortcutSelectWindow
    // else register shortcut
    if (settingsJson.shortcutKey === undefined || null) {
        shortcutSelectWindow();
    } else {
        globalShortcut.register(settingsJson.shortcutKey, () => {
            mainWindow.show();
        });
    }
}

/**
 * Sets shortcutKey for opening OCL to 'key'
 * @param {string} key key that exists on keyboard 
 */
const setShortcutKey = (key) => {
    const rawSettingsJson = fs.readFileSync(jsonFiles.settings);
    let settingsJson = JSON.parse(rawSettingsJson);
    // unregister old shortcut
    if (settingsJson.shortcutKey !== undefined || null) {
        globalShortcut.unregister(settingsJson.shortcutKey);
    }
    // register new shortcut
    globalShortcut.register(key, () => {
        mainWindow.show();
    });
    // set new shortcut key
    settingsJson.shortcutKey = key;
    fs.writeFileSync(jsonFiles.settings, JSON.stringify(settingsJson, null, 2));

    if (settingsWin !== undefined || null) {
        settingsWin.webContents.send('set-shortcutKey');
    }
}




app.on('ready', createWindow)