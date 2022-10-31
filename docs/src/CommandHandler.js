/**
 * Returns the value of an element as string. Used to pass as command to an command handler
 * @param {string} elementId ID of the element
 * @returns {string} Value of the element
 */
const getCommand = (elementId) => {
    const commandInput = document.getElementById(elementId);
    const command = commandInput.value;
    return command
}

const clearInput = (elementId) => {
    const element = document.getElementById(elementId);
    element.value = "";
}

// const markInput = (elementId) => {
//     const element = document.getElementById(elementId);
//     element.
// }

const commandHandler = (command) => {
    let commandExecuted = false;
    for (i in commandList) {
        if (commandList[i].name === command) {
            commandList[i]();
            return commandExecuted = true;
        }
    }
    return commandExecuted;
}