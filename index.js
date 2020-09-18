module.exports = shrinkToFit;

/**
 * Finds a font size where the specified text can fit in an area of the specified width on
 * a maximum number of lines.  Useful if you want to start with font size X, then scale down
 * to size Y to try to get the font to stay on 2 lines.
 * @param {string} text The text to wrap
 * @param {number} widthPx Width (in px) at which the text will wrap.
 * @param {Object} settings Settings object to override default settings:
 * @param {number} [settings.maxLines=2] Maximum number of lines to which text should wrap.
 * @param {string} [settings.fontFamily="sans serif"] Font face/family to use.
 * @param {number} [settings.startingSizePx=90] Starting font size (in px) to use.
 * @param {number} [settings.minSizePx=30] Minimum font size (in px) to drop to.  Takes higher priority than maxLines -- i.e. if text can't fit on maxLines lines at minSize, it'll return at minSize anyway.
 * @param {bool} [settings.oneWordLineCheck=false] In some cases, where width is particularly small, it is necessary to account for the size of the largest word in the entire text string. This is a performance hit.
 * @param {number} [settings.heightPx=0] In some cases, where width is particularly small, and height is limited, there can be top or bottom overflow. Setting a height here will limit maximun returned height to (heightPx / word count)
 * @returns {number} The font size (in px) to display.
 */
function shrinkToFit(text, widthPx, settings) {
  const defaults = {
    maxLines: 2,
    fontFamily: 'sans-serif',
    startingSizePx: 90,
    minSizePx: 30,
    oneWordLineCheck: false,
    heightPx: 0,
  };
  const { startingSizePx, fontFamily, minSizePx, maxLines, oneWordLineCheck, heightPx } = {
    ...defaults,
    ...settings,
  };

  if (!text || !text.length) return text;
  if (!widthPx) return startingSizePx;

  // intentionally matching on \s and not on \b because we want non-whitespace word
  // boundaries to stay on the same line as the previous word.
  const words = text.trim().split(/\s+/g);
  const canvas = document.createElement('canvas');
  const canvasContext = canvas.getContext('2d');

  let fontSizeMaximum = 1000;
  if (oneWordLineCheck)
    words.forEach((word) => {
      if (word.length > 0) {
        let i = 0;
        do {
          i += 1;
          canvasContext.font = `${i}px ${fontFamily}`;
        } while (canvasContext.measureText(word.trim()).width < widthPx);
        if (i < fontSizeMaximum) fontSizeMaximum = i;
      }
    });

  function checkHeight(size) {
    let heightMax = size;
    for (let i = 2; i < words.length + 1; i += 1)
      if (words.every((w) => w.length) && words.length === i && size * i > heightPx)
        heightMax = heightPx / i;
    return heightMax;
  }

  fontSizeLoop: for (let fontSize = startingSizePx; fontSize > minSizePx; fontSize -= 1) {
    let numLines = 1;
    canvasContext.font = `${fontSize}px ${fontFamily}`;
    let textBuffer = '';
    for (let wordIndex = 0; wordIndex < words.length; wordIndex += 1) {
      textBuffer += ` ${words[wordIndex]}`;
      const bufferWidth = canvasContext.measureText(textBuffer.trim()).width;
      if (bufferWidth > widthPx) {
        numLines += 1;
        if (numLines > maxLines) continue fontSizeLoop;
        // wrap this word to the next line since it didn't fit.
        textBuffer = words[wordIndex];
      }
    }
    const finalSize = Math.min(fontSize, fontSizeMaximum);
    return heightPx !== 0 ? checkHeight(finalSize) : finalSize;
  }
  // font size values > minSize exhausted.
  return minSizePx;
}
