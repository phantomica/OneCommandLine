const findProcess = require('find-process');

/**
 * Sends exit signal to given process.
 * @param {string} processName name of an active process
 */
const killProcess = (processName) => {
    findProcess('name', processName).then((foundProcess) => {
        if (foundProcess[0] === undefined || null) { console.error("Process not found"); return; }
        process.kill(foundProcess[0].pid);
    }, function(err) {
        console.log(err.stack || err);
    });
}

module.exports = { killProcess }