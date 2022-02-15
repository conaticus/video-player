const { contextBridge, ipcRenderer } = require("electron");
const includePlugins = require("../../utils/includePlugins");
const fs = require("fs/promises");
const isDeveloperMode = require("../../utils/isDeveloperMode");

// Needs access to the head, which is only loaded on this event
addEventListener("DOMContentLoaded", () => {
    includePlugins();
    // Remove ability to select elements
    document.body.style.userSelect = "none";
});

contextBridge.exposeInMainWorld("ipcRequestDialog", (supportedExtensions) =>
    ipcRenderer.invoke("dialog-request", supportedExtensions)
);

contextBridge.exposeInMainWorld("ipcSettingsOpen", () =>
    ipcRenderer.send("settings-open")
);

contextBridge.exposeInMainWorld("fs", { readdir: fs.readdir });

contextBridge.exposeInMainWorld("isDeveloperMode", isDeveloperMode);
