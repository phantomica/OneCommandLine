const fs = require("fs");
const path = require("path");
/*
 0 => directory path for fs
 1 => directory path for require
*/
const commandsDir = ['./docs/src/commands/', './src/commands/'];
const loadedModules = {}
const commandList = []

/**
 * Checks whether imported command has the valid object properties.
 * @param {object} command imported command to check
 * @returns true for valid command syntax, false for invalid command syntax
 */
const checkCommandImport = (command) => {
    return 'func' in command && typeof command['func'] === 'function' &&
        'funcNames' in command && Array.isArray(command['funcNames']) && typeof command.funcNames[0] === 'string' &&
        'funcParam' in command && typeof command['funcParam'] === 'number';
};

/**
 * TODO: Improve error message
 * Checks if a command name is already used
 * @param {object} command import command to check
 * @param {string} fileName name of file containing the command
 * @returns true for duplicate import, false for unique import
 */
const checkDuplicateImport = (command, fileName) => {
    // looks for duplicate names
    let foundDuplicate = commandList.some(element => element.funcNames.some(str => command.funcNames.includes(str)));
    if (foundDuplicate) { console.error("A command object in module " + fileName + " contains a duplicate command name. One of the following names is already in use: " + command.funcNames); return true; }
    return false;
}


/**
 * import all modules from commands folder
 * => modules are stored in loadedModules
 * => objects from loadedModules are stored in commandList
 * => duplicates are filtered out
 */
fs.readdir(commandsDir[0], (err, files) => {
    for (let i = 0; i < files.length; i++) {
        const fileName = files[i];
        loadedModules[fileName] = require(path.join(__dirname, commandsDir[1], fileName));
        for (let obj in loadedModules[fileName]) {
            const command = loadedModules[fileName][obj];
            if (!checkCommandImport(command)) { continue }
            if (checkDuplicateImport(command, fileName)) { continue }
            commandList.push(command);
        }
    }
});