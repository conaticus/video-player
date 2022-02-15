const { app, BrowserWindow } = require("electron");
const path = require("path");
const attatchIpcListeners = require("./utils/attatchIpcListeners");
const getCurrentViewPath = require("./utils/getCurrentViewPath");
const isDeveloperMode = require("./utils/isDeveloperMode");

// no risk in doing so as the application won't be loading any remote sources by default
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

/**
 * Create electron window and load all neccesary data
 * @returns {Promise<void>}
 */
const createWindow = async () => {
    const win = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "./preload/main/preload.js"),
        },
        icon: "./logo.png"
    });

    win.maximize();

    attatchIpcListeners();
    const currentViewPath = await getCurrentViewPath();

    win.loadFile(currentViewPath + "/index.html");
    win.setTitle("Video Player");

    if (!isDeveloperMode()) win.removeMenu();
    else win.setMenuBarVisibility(false);

    win.on("close", () => app.quit());
};

app.on("ready", createWindow);

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
