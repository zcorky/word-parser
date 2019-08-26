# words-parser

[![NPM version](https://img.shields.io/npm/v/@zcorky/words-parser.svg?style=flat)](https://www.npmjs.com/package/@zcorky/words-parser)
[![NPM quality](http://npm.packagequality.com/shield/%40zcorky%2Fwords-parser.svg)](http://packagequality.com/#?package=@zcorky/words-parser)
[![Coverage Status](https://codecov.io/gh/zcorky/words-parser/branch/master/graph/badge.svg)](https://codecov.io/gh/zcorky/words-parser)
[![Dependencies](https://img.shields.io/david/zcorky/words-parser.svg?style=flat-square)](https://david-dm.org/zcorky/words-parser)
[![Build Status](https://travis-ci.com/zcorky/words-parser.svg?branch=master)](https://travis-ci.com/zcorky/words-parser)
[![Known Vulnerabilities](https://snyk.io/test/npm/@zcorky/words-parser/badge.svg?style=flat-square)](https://snyk.io/test/npm/@zcorky/words-parser)
[![NPM download](https://img.shields.io/npm/dm/@zcorky/words-parser.svg?style=flat-square)](https://www.npmjs.com/package/@zcorky/words-parser)
![license](https://img.shields.io/github/license/zcorky/words-parser.svg)
[![issues](https://img.shields.io/github/issues/zcorky/words-parser.svg)](https://github.com/zcorky/words-parser/issues)

> Parse and transform word in text, use custom renderers for words.

* :sparkles: Support Chinese
* 🌐 Support English (WIP)

## Install

```
$ npm install @zcorky/words-parser
```

## Usage


```js
import * as parser from '@zcorky/words-parser';

type Args = {
  role: string;
};

const text: string = 'I am zero, who are you ?';
const words: parser.Words<Args> = [
  { text: 'zero', args: { role: 'hero' } },
  { text: 'you', args: { role: 'goodman' } },
];

const parsedToken = parser.parse(text, words);
// => [
//      { text: 'zero', args: { role: 'hero' }, start: 5, end: 9 },
//      { text: 'you', args: { role: 'goodman' }, start: 19, end: 22 },
//    ]

const transformedToken = parser.transform(text, parsedToken);
// => [
//      { type: 'TEXT', text: 'I\' am ', start: 0, end: 5 },
//      { type: 'CUSTOM', text: 'zero', args: { role: 'hero' }, start: 5, end: 9 },
//      { type: 'TEXT', text: ', who are ', start: 9, end: 19 },
//      { type: 'CUSTOM', text: 'you', args: { role: 'goodman' }, start: 19, end: 22 },
//      { type: 'TEXT', text: ', ' ?', start: 22, end: 24 },
//    ]

// Custom Renderer with React
const renderers: parser.Renderers<Args, ReactNode> = {
  TEXT(word) {
    return <span>{word.text}</span>;
  },
  CUSTOM(word) {
    return <Keyword text={word.text} />;
  },
};
```

### API
* See the detailed [API Reference](./docs).

## License

MIT © [Moeover](https://moeover.com)
