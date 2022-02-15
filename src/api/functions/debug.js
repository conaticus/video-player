/**
 * Logs debug output if in developer mode
 * This should have types if needed, in future
 * @param {string} message Debug message
 * @returns {void}
 */
const debug = (message) => {
    if (!isDeveloperMode()) return;
    console.log(`%c[DEBUG]: %c${message}`, "color:#6493E1", "color:white");
};

module.exports = debug;
