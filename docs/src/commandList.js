const commandList = [];

const quit = () => {
    ipc.send('quit');
}