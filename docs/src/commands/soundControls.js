const loudness = require('loudness');

const setVolume = {
    func:
    /**
     * Sets the sound volume to value
     * @param {Number} value 1-100
     */
        (value) => {
        if (isNaN(value)) { return console.error('Command: setVolume, Value must be a number'); }
        if (0 > parseInt(value) || parseInt(value) > 100) { return console.error('Command: setVolume, Value must be between 1 and 100') }
        loudness.setVolume(parseInt(value));
    },
    funcNames: ['setVolume', 'volume', 'vol'],
    funcParam: 1
}

// TODO: support microphone mute

const muteVolume = {
    func:
    /**
     * Mutes system volume
     */
        () => {

        loudness.setMuted(true);
    },
    funcNames: ['muteVolume', 'mute'],
    funcParam: 0
}

// TODO: support microphone unmute

const unmuteVolume = {
    func:
    /**
     * Unmutes system volume
     */
        () => {

        loudness.setMuted(false);
    },
    funcNames: ['unmuteVolume', 'unmute'],
    funcParam: 0
}

module.exports = { setVolume, muteVolume, unmuteVolume }