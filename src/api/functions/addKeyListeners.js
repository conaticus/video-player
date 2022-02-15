/**
 * Register a key event
 * @returns {void}
 */
const registerKeyEvent = ([definedKey, callback, options = {}]) => {
    const { requireShift = false, requireControl = false } = options;

    addEventListener("keydown", ({ key, ctrlKey, shiftKey }) => {
        if (requireShift) {
            // toUpperCase() will cause some issues with arrow keys, it is fine for now.
            if (definedKey.toUpperCase() !== key) return;
        } else {
            if (definedKey !== key) return;
        }

        if (!requireControl && !requireShift && !ctrlKey && !shiftKey)
            callback();
        else if (requireControl && !requireShift && ctrlKey && !shiftKey)
            callback();
        else if (!requireControl && requireShift && !ctrlKey && shiftKey)
            callback();
        else if (requireControl && requireShift && ctrlKey && shiftKey)
            callback();
    });
};

/**
 * Register aliased key events
 * @returns {void}
 */
const registerKeyEvents = ([keys, callback, options]) => {
    keys.forEach((_, idx) => {
        registerKeyEvent([keys[idx], callback, options]);
    });
};

/**
 * Listen for key presses and run a function when pressed
 * @param {[string | string[], Function][]} keyListeners
 * @returns {void}
 */
const addKeyListeners = (keyListeners) => {
    keyListeners.forEach((listener) => {
        const [keys] = listener;

        if (typeof keys === "string") registerKeyEvent(listener);
        else if (typeof keys === "object") registerKeyEvents(listener);
    });
};

module.exports = addKeyListeners;
