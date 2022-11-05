const brightness = require('brightness');

const setBrightness = {
    func:
    /**
     * Sets monitor brightness to value
     * @param {number} value Number between 1 and 100
     */
        (value) => {
        brightness.set(value / 100);
    },
    funcNames: ['setBrightness', 'brightness', 'br'],
    funcParam: 1
}



module.exports = { setBrightness };