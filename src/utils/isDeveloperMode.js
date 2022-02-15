const fs = require("fs/promises");

/**
 * @returns {boolean} Whether the application is in developer mode or not
 */
const isDeveloperMode = async () => {
    const settingsRAW = await fs.readFile("settings.json", "utf8");
    const settings = JSON.parse(settingsRAW);
    return settings.developerMode;
};

module.exports = isDeveloperMode;
