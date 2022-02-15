const addKeyListeners = require("./addKeyListeners");
const videoManager = require("../classes/VideoManager");

/**
 * Add all default key events
 * @returns {void}
 */
const registerKeyEvents = () => {
    addKeyListeners([
        ["o", () => videoManager.openVideo(), { requireControl: true }],
        [
            "o",
            () => videoManager.openFolder(),
            { requireControl: true, requireShift: true },
        ],
        ["s", () => ipcSettingsOpen(), { requireShift: true }],
    ]);
};

module.exports = registerKeyEvents;
