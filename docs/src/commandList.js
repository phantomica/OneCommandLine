const { quit } = require('./src/commands/OCLcommands.js');
const { killProcess } = require('./src/commands/processControls.js');
const { setBrightness } = require('./src/commands/brightnessControls.js');

const commandList = []

//* OCLcommands
commandList.push({
    func: quit,
    funcNames: ['quit', 'exit'],
    funcParam: false,
    funcProperties: false,
})

//* processControls
commandList.push({
    func: killProcess,
    funcNames: ['killProcess', 'exitProcess', 'killPr', 'exitPr'],
    funcParam: true,
    funcProperties: false,
})

//* brightnessControls
commandList.push({
    func: setBrightness,
    funcNames: ['setBrightness', 'brightness', 'br'],
    funcParam: true,
    funcProperties: false,
})