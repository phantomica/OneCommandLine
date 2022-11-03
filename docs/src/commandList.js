const { quit, exit } = require('./src/commands/OCLcommands.js');
const { killProcess, exitProcess } = require('./src/commands/processControls.js');

const commandList = []

//* OCLcommands
commandList.push({
    func: quit,
    funcParam: false,
    funcProperties: false,
})
commandList.push({
    func: exit,
    funcParam: false,
    funcProperties: false,
});

//* processControls
commandList.push({
    func: killProcess,
    funcParam: true,
    funcProperties: false,
})
commandList.push({
    func: exitProcess,
    funcParam: true,
    funcProperties: false,
})