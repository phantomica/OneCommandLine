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

const commandHandler = (command) => {}