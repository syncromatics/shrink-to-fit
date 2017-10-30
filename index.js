'use strict';

module.exports = shrinkToFit;

/**
 * Finds a font size where the specified text can fit in an area of the specified width on
 * a maximum number of lines.  Useful if you want to start with font size X, then scale down
 * to size Y to try to get the font to stay on 2 lines.
 * @param {string} text The text to wrap
 * @param {Object} settings Settings object to override default settings:
 * @param {number} [settings.width=400] Width (in px) to which text should wrap.
 * @param {number} [settings.maxLines=2] Maximum number of lines to which text should wrap.
 * @param {string} [settings.fontFamily="'Avenir Next W01', sans serif"] Font family to use.
 * @param {number} [settings.startingSize=90] Starting font size (in px) to use.
 * @param {number} [settings.minSize=30] Minimum font size (in px) to drop to.  Takes higher priority
 * than maxLines -- i.e. if text can't fit on maxLines lines at minSize, it'll return at minSize anyway.
 * @returns {number} The font size (in px) to display.
 */
function shrinkToFit(text, settings) {
    var defaults = {
        width: 400,
        maxLines: 2,
        fontFamily: "'Avenir Next W01', sans-serif",
        startingSize: 90,
        minSize: 30
    };
    var settings = Object.assign({}, defaults, settings);

    // intentionally matching on \s and not on \b because we want non-whitespace word
    // boundaries to stay on the same line as the previous word.
    var words = text.split(/\s+/g),
        canvas = document.createElement('canvas'),
        canvasContext = canvas.getContext('2d');
    fontSizeLoop:
    for (var fontSize = settings.startingSize; fontSize > settings.minSize; fontSize--) {
        var numLines = 1;
        canvasContext.font = fontSize + 'px ' + settings.fontFamily;
        var textBuffer = "";
        lineWrapLoop:
        for (var wordIndex = 0; wordIndex < words.length; wordIndex++) {
            textBuffer += " " + words[wordIndex];
            var bufferWidth = canvasContext.measureText(textBuffer.trim()).width;
            if (bufferWidth > settings.width) {
                numLines++;
                if (numLines > settings.maxLines) {
                    continue fontSizeLoop;
                }
                // wrap this word to the next line since it didn't fit.
                textBuffer = words[wordIndex];
            }
        }
        return fontSize;
    }
    // font size values > minSize exhausted.
    return settings.minSize;
}
