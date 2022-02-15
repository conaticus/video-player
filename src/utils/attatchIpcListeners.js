const { dialog, ipcMain, BrowserWindow } = require("electron");
const getCurrentViewPath = require("../utils/getCurrentViewPath");
const path = require("path");

/**
 * Attatch IPC listeners to the main process
 * @returns {void}
 */
const attachIpcListeners = () => {
    let settingsWindow = null;

    ipcMain.handle("dialog-request", async (_, options) => {
        const dialogChoice = await dialog.showOpenDialog(options);
        return dialogChoice;
    });

    ipcMain.on("settings-open", async () => {
        if (settingsWindow) return;

        settingsWindow = new BrowserWindow({
            webPreferences: {
                preload: path.join(__dirname, "../preload/settings/preload.js"),
            },
        });

        settingsWindow.setMenuBarVisibility(false);

        const currentViewPath = await getCurrentViewPath();
        settingsWindow.loadFile(currentViewPath + "/settings.html");
        settingsWindow.setTitle("Miru Settings");

        settingsWindow.on("close", () => (settingsWindow = null));
    });
};

module.exports = attachIpcListeners;
