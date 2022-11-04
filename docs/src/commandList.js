const fs = require('fs');
const path = require('path');
/*
 0 => directory path for fs
 1 => directory path for require
*/
const commandsDir = ['./docs/src/commands/', './src/commands/'];
const loadedModules = [];
const commandList = [];

/*
import all modules from commands folder
=> modules are stored in loadedModules
=> objects from loadedModules are stored in commandList
*/
fs.readdir(commandsDir[0], (err, files) => {
    for (let i = 0; i < files.length; i++) {
        loadedModules.push(require(path.join(__dirname, commandsDir[1], files[i])));
        for (obj in loadedModules[i]) {
            commandList.push(loadedModules[i][obj]);
        }
    }
})