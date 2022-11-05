const quit = {
    func: () => {
        ipc.send('quit');
    },
    funcNames: ['quit', 'exit'],
    funcParam: 0
}

module.exports = { quit };