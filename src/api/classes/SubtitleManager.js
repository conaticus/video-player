/**
 * @see {@link SubtitleManager}
 * @see {@link https://docs.fileformat.com/video/srt}
 */
class SubtitleManager {
    /**
     * @param {string} raw - raw SRT subtitle string
     * @returns {Object} Array of subtitle objects
     */
    parseSrt(raw) {
        const subtitles = [];
        const rawSubtitles = [];
        let currRawSubtitle = [];

        // Grab each section of subtitles from the raw string\
        // Would turn rawSubtitles into a 2d array
        raw.split("\n").forEach((line) => {
            if (line.trim() === "") {
                rawSubtitles.push(currRawSubtitle);
                currRawSubtitle = [];
                return;
            }

            currRawSubtitle.push(line);
        });

        rawSubtitles.forEach((rawSubtitle) => {
            const subtitle = {
                number: null,
                duration: {},
                subtitle: null,
            };

            rawSubtitle.forEach((line, index) => {
                if (index === SRT.SubtitleType.Number) {
                    subtitle.number = parseInt(line);
                } else if (index === SRT.SubtitleType.Duration) {
                    const durations = line.split("-->");
                    subtitle.duration.start = this.parseDuration(durations[0]);
                    subtitle.duration.end = this.parseDuration(durations[1]);
                } else if (index === SRT.SubtitleType.Subtitle) {
                    subtitle.subtitle = line.trim();
                }
            });

            subtitles.push(subtitle);
        });

        return subtitles;
    }

    /**
     * Example input: `01:50:48,500`\
     * Format full: `hours:minutes:seconds,milleseconds`\
     * Format min: `hh:mm:ss,mmm`
     * @param {string} duration
     * @returns {Object} parsed duration object
     */
    parseDuration(duration) {
        const parsedDuration = {};

        parsedDuration.hours = parseInt(duration[0] + duration[1]);
        parsedDuration.minutes = parseInt(duration[3] + duration[4]);
        parsedDuration.seconds = parseInt(duration[6] + duration[7]);
        parsedDuration.milleseconds = parseInt(
            duration[9] + duration[10] + duration[11]
        );

        return parsedDuration;
    }
}

const subtitleManager = new SubtitleManager();
module.exports = subtitleManager;
