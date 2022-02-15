const fs = require("fs/promises");

addEventListener("DOMContentLoaded", () => {
    document.body.style.userSelect = "none";
});

contextBridge.exposeInMainWorld("getSettings", async () =>
    JSON.parse(await fs.readFile("./settings.json", "utf8"))
);
