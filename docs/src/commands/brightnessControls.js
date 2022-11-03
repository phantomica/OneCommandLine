const brightness = require('brightness');

/**
 * Sets monitor brightness to value
 * @param {number} value Number between 1 and 100
 */
const setBrightness = (value) => {
    brightness.set(value / 100);
}

module.exports = { setBrightness };