# shrink-to-fit

Have you ever recoiled in terror when a designer has asked you to make text fit on a maximum of two
lines?  Just shrink the font size if you need to, that's simple, right?

With shrink-to-fit, it is!

_Consider a spiffy animated GIF or screenshot here_

## Quickstart

Add the `shrink-to-fit` package to your project:

```bash
$ npm install --save shrink-to-fit
```

Then use it to determine font size:

```js
import shrinkToFit from 'shrink-to-fit';

const text = "I am the very model of a modern Major-General. " + \
             "I've information vegetable, animal, and mineral.";
const fittingFontSize = shrinkToFit(text);

document.getElementById('text-container').style.fontSize = `${fittingFontSize}px`;
```

### Settings

Available information about the `settings` object would go here.

## Building

[![Travis](https://img.shields.io/travis/syncromatics/shrink-to-fit.svg)](https://travis-ci.org/syncromatics/shrink-to-fit)
[![npm](https://img.shields.io/npm/v/shrink-to-fit.svg)](https://www.npmjs.com/package/shrink-to-fit)

## Code of Conduct

We are committed to fostering an open and welcoming environment. Please read our [code of conduct](CODE_OF_CONDUCT.md) before participating in or contributing to this project.

## Contributing

We welcome contributions and collaboration on this project. Please read our [contributor's guide](CONTRIBUTING.md) to understand how best to work with us.

## License and Authors

[![Syncromatics Engineering logo](https://en.gravatar.com/userimage/100017782/89bdc96d68ad4b23998e3cdabdeb6e13.png?size=16) Syncromatics Engineering](https://github.com/syncromatics)

[![license](https://img.shields.io/github/license/syncromatics/shrink-to-fit.svg)](https://github.com/syncromatics/shrink-to-fit/blob/master/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/syncromatics/shrink-to-fit.svg)](https://github.com/syncromatics/shrink-to-fit/graphs/contributors)

This software is made available by Syncromatics Engineering under the MIT license.
