const quit = {
    func: () => {
        ipc.send('quit');
    },
    funcNames: ['quit', 'exit'],
    funcParam: false,
    funcProperties: false,
}

module.exports = { quit };