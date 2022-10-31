const quit = () => {
    ipc.send('quit');
}
const exit = () => {
    ipc.send('quit');
}

module.exports = { quit, exit };