const path = require("path");
const fs = require("fs");

// would use view manager but need it to be syncronous for webpack
const settingsRAW = fs.readFileSync("settings.json");
const settings = JSON.parse(settingsRAW);
const viewPath = `./views/${settings.views.currentView}`;

module.exports = {
    mode: "development", // will need altering
    entry: "./api/index.js",
    output: {
        filename: "api.min.js",
        library: "api",
        path: path.resolve(__dirname, viewPath),
    },
};
