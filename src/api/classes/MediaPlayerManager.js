const videoManager = require("./VideoManager");
const clearSurroundings = require("../functions/clearSurroundings");
const addKeyListeners = require("../functions/addKeyListeners");
const debug = require("../functions/debug");

/**
 * {@link MediaPlayerManager}
 * Class controlling the media player
 */
class MediaPlayerManager {
    constructor() {
        this.mediaPlayer = null;
        this.menu = null;
        this.hidden = false;
        this.fullscreen = false;
    }

    /**
     * Create the media player with the DOM
     * @param {boolean=} clearElementsOnVideoLoad
     * @returns {void}
     */
    create(clearElementsOnVideoLoad = true) {
        this.mediaPlayer = document.createElement("div");

        // Video

        const video = document.createElement("video");

        // For opacity change when pausing
        this.mediaPlayer.backgroundColor = "black";

        video.style.position = "fixed";
        video.style.right = 0;
        video.style.bottom = 0;
        video.style.width = "100%";
        video.style.height = "100%";

        videoManager.video = video;
        this.mediaPlayer.appendChild(video);

        // Event icons

        const icon = document.createElement("img");

        icon.style.display = "flex";
        icon.style.marginTop = "20px";
        icon.style.marginLeft = "auto";
        icon.style.marginRight = "20px";

        icon.id = "icon";
        this.mediaPlayer.appendChild(icon);

        // Loading UI

        this.mediaPlayer.className = "media-player";
        document.body.appendChild(this.mediaPlayer);

        addEventListener(
            "videoload",
            () => {
                if (clearElementsOnVideoLoad) {
                    clearSurroundings(this.mediaPlayer);
                }

                this.loadVideoMenu();
            },
            {
                once: true,
            }
        );

        debug("Media player created.");
    }

    /**
     * Load the media player menu with the DOM
     * @returns {void}
     */
    loadVideoMenu() {
        this.menu = document.createElement("div");
        const durationBar = document.createElement("div");

        this.menu.style.display = "none";
        this.menu.style.position = "absolute";
        this.menu.style.bottom = 0;
        this.menu.style.left = 0;
        this.menu.style.width = "100%";
        this.menu.style.height = "3vw";
        this.menu.style.backgroundColor = "black";
        this.menu.style.opacity = 0.8;
        this.menu.style.fontSize = "20px";

        durationBar.style.lineHeight = this.menu.style.height;
        durationBar.style.margin = "0px 20px";

        setInterval(() => {
            // Check a video is loaded before setting the duration
            if (!videoManager.videoLoaded) return;

            const durationDate = new Date(0);
            const currTimeDate = new Date(0);
            durationDate.setSeconds(videoManager.video.duration);

            currTimeDate.setSeconds(videoManager.video.currentTime);

            const durationTimeString = durationDate.toISOString().substr(11, 8);
            const currTimeString = currTimeDate.toISOString().substr(11, 8);

            durationBar.innerText = `${currTimeString}/${durationTimeString}`;
        }, 20);

        this.menu.appendChild(durationBar);
        this.mediaPlayer.appendChild(this.menu);

        this.registerEvents();

        debug("Video menu loaded.");
    }

    /**
     * Show media player menu
     * @returns {void}
     */
    showVideoMenu() {
        this.menu.style.display = "block";
    }

    /**
     * Hide media player menu
     * @returns {void}
     */
    hideVideoMenu() {
        this.menu.style.display = "none";
    }

    /**
     * Fades a given element
     * @param {string=} element
     * @param {number=} element
     * @returns {void}
     */
    fadeElement(el, fadeTime) {
        el.style.opacity -= 0.01;
        console.log(el)

        if (el.style.opacity > 0) {
            requestAnimationFrame(() => this.fadeElement(el))
        }
    };

    /**
     * Add event listeners
     * @returns {void}
     */
    registerEvents() {
        let previousMenuTimeout;

        addEventListener("videoplay", () => {
            const icon = document.getElementById("icon");
            icon.style.opacity = 1;
            icon.src = "../../views/standard/images/play.png";

            this.fadeElement(icon, 125)
        });

        addEventListener("videopause", () => {
            const icon = document.getElementById("icon");
            icon.style.opacity = 1;
            icon.src = "../../views/standard/images/pause.png";
        });

        addEventListener("mousemove", () => {
            this.showVideoMenu();

            if (previousMenuTimeout) clearTimeout(previousMenuTimeout);

            previousMenuTimeout = setTimeout(() => {
                this.hideVideoMenu();
            }, 3000);
        });

        addEventListener("videointeract", () => {
            this.showVideoMenu();

            if (previousMenuTimeout) clearTimeout(previousMenuTimeout);

            previousMenuTimeout = setTimeout(() => {
                this.hideVideoMenu();
            }, 3000);
        });

        addKeyListeners([
            ["h", () => this.toggleHide()],
            ["f", () => this.toggleFullscreen()],
        ]);

        debug("Media player events registered.");
    }

    /**
     * Toggles fullscreen for the media player
     * @returns {void}
     */
    toggleFullscreen() {
        if (this.fullscreen) {
            document.exitFullscreen();
        } else {
            this.mediaPlayer.requestFullscreen();
        }

        this.fullscreen = !this.fullscreen;

        debug("Fullscreen toggled.");
    }

    /**
     * Hides/unhides the media player and pauses the currently loaded video
     * @returns {void}
     */
    toggleHide() {
        if (this.hidden) {
            this.mediaPlayer.style.opacity = 1;
            videoManager.video.pause();
            this.hidden = false;
            videoManager.mediaPlayerHidden = false;
        } else {
            this.mediaPlayer.style.opacity = 0;
            videoManager.video.pause();
            this.hidden = true;
            videoManager.mediaPlayerHidden = true;
        }

        debug("Hide toggled.");
    }
}

const mediaPlayerManager = new MediaPlayerManager();
module.exports = mediaPlayerManager;
