const fs = require("fs/promises");

/**
 * Include all of the plugin scripts to the head element\
 * All plugins will use the `defer` attribute
 * @returns {Promise<void>}
 */
const includePlugins = async () => {
    const settings = JSON.parse(await fs.readFile("./settings.json", "utf8"));

    const viewConfig = require(`../views/${settings.views.currentView}/miru.config.js`);

    if (viewConfig.useApi !== false) {
        const apiScript = document.createElement("script");
        apiScript.defer = true;
        apiScript.src = "./api.min.js";

        document.head.appendChild(apiScript);
    }

    viewConfig.srcFiles.forEach((srcFile) => {
        const script = document.createElement("script");
        script.defer = true;
        script.src = srcFile;

        document.head.appendChild(script);
    });

    const enabledPlugins = [];

    settings.plugins.forEach((plugin) => {
        if (plugin.enabled) enabledPlugins.push(plugin);
    });

    enabledPlugins.forEach((plugin) => {
        const script = document.createElement("script");
        script.defer = true;
        script.src = `../../plugins/${plugin.name}/index.js`;

        document.head.appendChild(script);
    });
};

module.exports = includePlugins;
