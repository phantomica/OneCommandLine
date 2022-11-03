/**
 * Returns the value of an element as string. Used to pass as command to an command handler.
 * @param {string} elementId ID of the element
 * @returns {string} Value of the element
 */
const getCommand = (elementId) => {
    const commandInput = document.getElementById(elementId);
    const command = commandInput.value;
    return command
}

/**
 * Empties the elements value attribute.
 * @param {string} elementId ID of the element
 */
const clearInput = (elementId) => {
    const element = document.getElementById(elementId);
    element.value = "";
}

/**
 * Splits command into name, value and properties for the commandHandler function.
 * @param {string} command 
 * @returns {object} command split into name, value and properties
 */
const splitCommand = (command) => {
    let commandSplit = command.split(" ");

    let commandName = commandSplit[0];
    let commandValue = commandSplit[1];

    let commandProperties = "";
    for (let i = 2; i < commandSplit.length; i++) {
        commandProperties += commandSplit[i];
    }

    return {
        name: commandName,
        value: commandValue,
        properties: commandProperties
    }
}

/**
 * Executes the given command if it exists within commandList.
 * @param {string} input command
 * @returns {boolean} command was successfully executed ?
 */
const commandHandler = (input) => {
    let commandExecuted = false;
    let command = splitCommand(input);

    for (i in commandList) {
        if (commandList[i].func.name !== command.name) { continue }
        if (commandList[i].funcProperties) { commandList[i].func(command.value, command.properties); return commandExecuted = true; }
        if (commandList[i].funcParam) { commandList[i].func(command.value); return commandExecuted = true; }
        commandList[i].func();
        return commandExecuted = true;
    }
    return commandExecuted;
}