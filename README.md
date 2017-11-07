# shrink-to-fit

Have you ever recoiled in terror when a designer has asked you to make text fit on a maximum of two
lines?  Just shrink the font size if you need to, that's simple, right?

With shrink-to-fit, it is!


![Short demonstration][demo]

## Quickstart

Add the `shrink-to-fit` package to your project:

```bash
$ npm install --save shrink-to-fit
```

Then use it to determine font size:

```js
import shrinkToFit from 'shrink-to-fit';


const target = document.getElementById('text-container');
const widthPx = target.clientWidth;

const text = "I am the very model of a modern Major-General. " +
             "I've information vegetable, animal, and mineral.";
const fittingFontSize = shrinkToFit(text, widthPx);

target.style.fontSize = `${fittingFontSize}px`;
target.innerText = text;
```

## Reference

The `shrinkToFit` function accepts two required arguments: `text` and `widthPx`.  `text` is a string
representing the text you want to display.  `widthPx` is the width, in pixels, of the box in which
you'd like the text to fit.

`shrinkToFit` also accepts a `settings` object as an optional third parameter.  You can specify any
combination of the following properties of the `settings` object to change the library's behavior,
or omit the object entirely to accept the defaults:

 * `settings.maxLines` (number) Maximum number of lines to which text should wrap.  Defaults to `2`.
 * `settings.fontFamily` (string) Font face/family to use.  Defaults to `sans-serif`.
 * `settings.startingSizePx` (number) Starting font size (in px) to use.  Defaults to `90`.
 * `settings.minSizePx` (number) Minimum font size (in px) to drop to.  Takes higher priority
   than maxLines -- i.e. if text can't fit on maxLines lines at minSize, it'll return at minSize
   anyway.  Defaults to `30`.

For example, to specify that the text's width should be calculated using the font face Helvetica
and contain at most three lines:

```js
const text = "I know the kings of England, and I quote the fights historical " +
             "from Marathon to Waterloo, in order categorical. ";
const widthPx = 400;
const settings = { fontFamily: "Helvetica", maxLines: 3 };
const fittingFontSize = shrinkToFit(text, widthPx, settings);
```

## Code of Conduct

We are committed to fostering an open and welcoming environment. Please read our [code of conduct](CODE_OF_CONDUCT.md) before participating in or contributing to this project.

## Contributing

We welcome contributions and collaboration on this project. Please read our [contributor's guide](CONTRIBUTING.md) to understand how best to work with us.

## License and Authors

[![Syncromatics Engineering logo](https://en.gravatar.com/userimage/100017782/89bdc96d68ad4b23998e3cdabdeb6e13.png?size=16) Syncromatics Engineering](https://github.com/syncromatics)

[![license](https://img.shields.io/github/license/syncromatics/shrink-to-fit.svg)](https://github.com/syncromatics/shrink-to-fit/blob/master/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/syncromatics/shrink-to-fit.svg)](https://github.com/syncromatics/shrink-to-fit/graphs/contributors)

This software is made available by Syncromatics Engineering under the MIT license.

[demo]: demo.gif "Short demonstration of shrink-to-fit"
