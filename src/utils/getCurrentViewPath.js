const fs = require("fs/promises");

/**
 * Get the current view path from `settings.json`
 * @returns {Promise<string>} Current view path
 */
const getCurrentViewPath = async () => {
    const settingsRAW = await fs.readFile("settings.json", "utf8");
    const settings = JSON.parse(settingsRAW);
    return "./views/" + settings.views.currentView;
};

module.exports = getCurrentViewPath;
