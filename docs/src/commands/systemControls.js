const restart = {
    func:
    /**
     * Restarts the computer.
     */
        () => {
        const { exec } = require('child_process');
        exec('shutdown -r -t 00')
    },
    funcNames: ['restart'],
    funcParam: 0
}

const shutdown = {
    func:
    /**
     * Shuts the computer down.
     */
        () => {
        const { exec } = require('child_process');
        exec('shutdown -s -t 00');
    },
    funcNames: ['shutdown'],
    funcParam: 0
}

const sleepmode = {
    func:
    /**
     * Puts computer into sleep mode
     */
        () => {
        const { exec } = require('child_process');
        exec('rundll32.exe powrprof.dll, SetSuspendState Sleep');
    },
    funcNames: ['sleepmode', 'sleep'],
    funcParam: 0
}

module.exports = { restart, shutdown, sleepmode }