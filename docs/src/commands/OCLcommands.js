const quit = () => {
    ipc.send('quit');
}

module.exports = { quit };