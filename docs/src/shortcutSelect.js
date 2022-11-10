const ipc = require('electron').ipcRenderer;
const shortcutPlaceholder = document.getElementById('shortcutPlaceholder');
let shortcutKey = "";
let maxKeys = 3;

window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && shortcutKey !== "") {
        ipc.send('submit-shortcutKey', shortcutKey)
        return;
    }
    if (event.key === 'Backspace') {
        shortcutKey = "";
        shortcutPlaceholder.innerHTML = "Press key to set as Shortcut...";
        maxKeys = 3;
        return;
    }
    if (shortcutKey.toLowerCase().includes(event.key.toLowerCase())) { return; }
    switch (maxKeys) {
        case 0:
            return;
            break;

        case 2:
        case 1:
            shortcutKey += "+";
            break;
    }


    //TODO: fix 'DEAD' letter problem
    switch (event.key.toUpperCase()) {
        case 'DEAD':
            shortcutKey += '\\';
            break;
        default:
            shortcutKey += event.key.toUpperCase();
            break;
    }
    shortcutPlaceholder.innerText = shortcutKey;
    maxKeys--;
})