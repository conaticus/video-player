const addKeyListeners = require("../functions/addKeyListeners");
const { supportedExtensions } = require("../config");
const debug = require("../functions/debug");

/**
 * Class managing the video element
 */
class VideoManager {
    constructor() {
        this.video = null;
        this.videoLoaded = false;
        this.eventsRegistered = false;
        this.queue = [];
        this.queuePostion = 0;
        this.queueLoop = false;
        this.loopCurrentVideo = false;
        this.mediaPlayerHidden = false;
    }

    /**
     * Open a video from file dialog
     * @returns {void}
     */
    async openVideo() {
        const dialogChoice = await ipcRequestDialog({
            properties: ["openFile"],
            filters: [
                {
                    name: "Videos",
                    extensions: supportedExtensions,
                },
            ],
        });

        if (dialogChoice.canceled) return;

        const src = dialogChoice.filePaths[0];
        if (!this.video.src) this.video.src = src;

        this.queue.push(src);
        this.queueLoad(this.queuePostion);

        debug(`Video '${src}' opened from dialog.`);
    }

    /**
     * Gets the file dialog from the main process\
     * Changes the video src to the chosen file
     * @returns {void}
     */
    async loadVideo(src) {
        this.video.src = src;

        // Ideally this should be executed somewhere else
        this.video.onloadeddata = () => {
            this.registerEvents();
            this.videoLoaded = true;
            this.play();
            dispatchEvent(new Event("videoload"));
        };

        debug(`Video '${src}' loaded.`);
        
        document.title = "\u3053\u306A\u3053\u306A\u898B\u308B - " + src; // FIXME: hacky unicode characters for "こなこな見る" because windows didn't decode them correctly when changing the title.
    }

    /**
     * Play the current video
     * @returns {void}
     */
    play() {
        if (this.mediaPlayerHidden) return;
        this.video.play();
        this.video.style.opacity = 1;

        dispatchEvent(new Event("videointeract"));
        dispatchEvent(new Event("videoplay"));

        debug("Video playing.");
    }

    /**
     * Pause the current video
     * @returns {void}
     */
    pause() {
        this.video.pause();
        this.video.style.opacity = 0.5;

        dispatchEvent(new Event("videointeract"));
        dispatchEvent(new Event("videopause"));

        debug("Video paused.");
    }

    /**
     * Play or pause the current video depending on if it is playing or not
     * @returns {void}
     */
    togglePlay() {
        if (this.video.paused) this.play();
        else this.pause();
    }

    /**
     * Skip the video forwards or backwards in seconds
     * @param {number} seconds
     * @returns {void}
     */
    skip(seconds) {
        this.video.currentTime += seconds;
        this.play();
        dispatchEvent(new Event("videointeract"));

        debug(`Video skipped ${seconds} seconds.`);
    }

    /**
     * @returns {boolean} If at the end of the queue
     */
    get endOfQueue() {
        return this.queuePostion === this.queue.length - 1;
    }

    /**
     * @returns {boolean} If at the start of the queue
     */
    get startOfQueue() {
        return this.queuePostion === 0;
    }

    /**
     * Loads the next video in the queue
     * @returns {void}
     */
    queueNext() {
        if (this.loopCurrentVideo) {
            this.video.currentTime = 0;
            this.play();
            return;
        }

        if (this.endOfQueue) {
            if (this.queueLoop) this.queueStart();
            return;
        }

        this.videoLoaded = false;
        this.queuePostion++;
        this.queueLoad(this.queuePostion);

        debug("Next video in the queue loaded.");
    }

    /**
     * Loads the previous video in the queue
     * @returns {void}
     */
    queuePrevious() {
        if (this.startOfQueue) return;

        this.videoLoaded = false;
        this.queuePostion--;
        this.queueLoad(this.queuePostion);

        debug("Previous video in the queue loaded.");
    }

    /**
     * Goes to the start of the queue loop
     * @returns {void}
     */
    queueStart() {
        if (this.startOfQueue) {
            this.video.currentTime = 0;
            return;
        }

        this.videoLoaded = false;
        this.queuePostion = 0;
        this.queueLoad(this.queuePostion);

        debug("First video in the queue loaded.");
    }

    /**
     * Loads a specific video in the queue
     * @param {number} index
     * @returns {void}
     */
    queueLoad(index) {
        this.loadVideo(this.queue[index]);
    }

    /**
     * Register events for the video manager
     * Events are loaded here because we don't want some events firing before the video is loaded
     * @returns {void}
     */
    registerEvents() {
        if (this.eventsRegistered) return; // prevents events from being loaded twice when loading multiple videos

        if (!this.video)
            throw new Error("No video element found in the video manager.");

        this.video.onended = () => this.queueNext();

        addKeyListeners([
            [[" ", "p"], () => this.togglePlay()],
            ["ArrowRight", () => this.skip(5)],
            ["ArrowLeft", () => this.skip(-5)],
            ["ArrowRight", () => this.skip(15), { requireControl: true }],
            ["ArrowLeft", () => this.skip(-15), { requireControl: true }],
            ["m", () => this.toggleMute()],
            ["n", () => this.queueNext(), { requireControl: true }],
            ["p", () => this.queuePrevious(), { requireControl: true }],
            [
                "r",
                () => (this.queueLoop = !this.queueLoop),
                { requireShift: true },
            ],
            [
                "l",
                () => (this.loopCurrentVideo = !this.loopCurrentVideo),
                { requireShift: true },
            ],
        ]);

        this.eventsRegistered = true;

        debug("Video manager events registered.");
    }

    /**
     * Opens a specified folder and adds the videos in it to the queue
     * @returns {void}
     */
    async openFolder() {
        const dialogChoice = await ipcRequestDialog({
            properties: ["openDirectory"],
        });

        if (dialogChoice.canceled) return;

        const directoryPath = dialogChoice.filePaths[0];
        const directoryContents = await fs.readdir(directoryPath, {
            withFileTypes: true,
        });

        const videoFiles = this.filterVideoFiles(
            directoryPath,
            directoryContents
        );
        this.queue = videoFiles;
        this.queuePostion = 0;
        this.queueLoad(this.queuePostion);

        debug(`Folder '${directoryPath}' loaded.`);
    }

    /**
     * Gets all the supported videos in a directory
     * @returns {string[]} Paths of all the videos
     */
    filterVideoFiles(dirPath, dirents) {
        const filtered = dirents.filter((dirent) => {
            let isVideoFile = false;

            supportedExtensions.forEach((ext) => {
                if (dirent.name.endsWith(ext)) isVideoFile = true;
            });

            return !dirent.isDirectory && isVideoFile;
        });

        const videoFiles = [];
        filtered.forEach((dirent) =>
            videoFiles.push(dirPath + "/" + dirent.name)
        );

        return videoFiles;
    }

    /**
     * Mutes/unmutes the video
     * @returns {void}
     */
    toggleMute() {
        this.video.muted = !this.video.muted;

        debug("Video mute toggled.");
    }
}

const videoManager = new VideoManager();
module.exports = videoManager;
