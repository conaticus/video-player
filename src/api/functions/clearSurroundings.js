const mediaPlayerManager = require("../classes/MediaPlayerManager");

/**
 * Removes all body elements except for the media player\
 * Returns a function that adds the elements back
 * @param {Object} mediaPlayer
 */
const clearSurroundings = (mediaPlayer = mediaPlayerManager.mediaPlayer) => {
    if (!mediaPlayer)
        throw new Error("No media player element found or provided.");

    // Remove all elements and add media player
    document.body.textContent = "";
    document.body.appendChild(mediaPlayer);
};

module.exports = clearSurroundings;
