# object-merge-advanced

<a href="https://github.com/feross/standard" style="float: right; padding: 0 0 20px 20px;"><img src="https://cdn.rawgit.com/feross/standard/master/sticker.svg" alt="Standard JavaScript" width="100" align="right"></a>

> Like .merge but an array in a key's value trumps a plain object and a plain object trumps a string. Works for nested objects as well.

[![Build Status][travis-img]][travis-url]
[![Coverage Status][cov-img]][cov-url]
[![bitHound Overall Score][overall-img]][overall-url]
[![bitHound Dependencies][deps-img]][deps-url]
[![bitHound Dev Dependencies][dev-img]][dev-url]
[![Downloads/Month][downloads-img]][downloads-url]

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Install](#install)
- [Purpose](#purpose)
- [In practice](#in-practice)
- [Use](#use)
- [API](#api)
  - [API - Input](#api---input)
- [Testing](#testing)
- [Contributing](#contributing)
- [Licence](#licence)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

```sh
$ npm install --save object-merge-advanced
```

## Purpose

It's like `_.merge` but it correctly merges different-type things and behaves well when it encounters _nested things_ (arrays or objects).

I was not happy with Lodash [_.merge](https://lodash.com/docs/#merge) because it gets stuck when it encounters mismatching values within plain objects. All I wanted is to merge two plain objects, retaining as much information as possible after the merging.

When this library merges two objects, it will check the types of their keys:

* If keys are unique, they go straight into the result object.
* If keys are present in both input arguments, they'll get "judged" depending on their type:
  * Any object trumps any string
  * Non-empty array trumps any object or string
  * Empty array trumps empty object, but doesn't trump non-empty object
  * Empty array won't trump non-empty string
  * If both key have plain object values, they'll get recursively fed back into the library again

We strive to retain as much info as possible after merging.

Basically, there are 81 possible combinations: 9 types of first input (object #1) and 9 types of second input (object #2): non-empty (full) object, empty object, non-empty array, empty array, non-empty string, empty string, boolean, undefined and null.

![matching algorithm](https://i.imgsafe.org/72ae7739f2.png)

In the diagram above, the squares show **which value wins**, first object's (marked `01`) or second one's (marked `02`). In other words, do we assign second object's value onto first, or the opposite.

In certain cases (marked red), there are custom actions needed: 1) passing value objects back into the main function _recursively_ (when both values are objects), 2) array concatenation, or 3) Boolean "and" composition (when both values are Boolean).

I challenge you to check `test.js` unit tests to see this library in action.

## In practice

In practice I needed this library to normalise JSON files — generate a "schema" object (a superset of all used keys) and fill any missing keys within all JSON files. Also, JSON files get their keys sorted. That library is used to keep us sane when using JSON to store content for email templates — it's enough to add one unique key in one JSON, and all other templates' content files get it added as well.

## Use

```js
var mergeAdvanced = require('object-merge-advanced')
```

## API

```js
mergeAdvanced(object1, object2)
```

### API - Input

Input argument           | Type           | Obligatory? | Description
-------------------------|----------------|-------------|-------------
`object1`                | Plain object   | yes         | Plain object. Can have nested values.
`object2`                | Plain object   | yes         | Another plain object. Can have nested values.

## Testing

```bash
$ npm test
```

For unit tests we use [AVA](https://github.com/avajs/ava), [Istanbul CLI](https://github.com/istanbuljs/nyc) and [JS Standard](https://github.com/feross/standard) notation.

## Contributing

All contributions are welcome. Please stick to [Standard JavaScript](https://github.com/feross/standard) notation and supplement the `test.js` with new unit tests covering your feature(s).

If you see anything incorrect whatsoever, do [raise an issue](https://github.com/code-and-send/object-merge-advanced/issues). If you file a pull request, I'll do my best to help you to get it merged in a timely manner. If you have any comments on the code, including ideas how to improve things, don't hesitate to contact me by email.

## Licence

> MIT License (MIT)

> Copyright (c) 2017 Code and Send Ltd, Roy Reveltas

> Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[travis-img]: https://travis-ci.org/code-and-send/object-merge-advanced.svg?branch=master
[travis-url]: https://travis-ci.org/code-and-send/object-merge-advanced

[cov-img]: https://coveralls.io/repos/github/code-and-send/object-merge-advanced/badge.svg?branch=master
[cov-url]: https://coveralls.io/github/code-and-send/object-merge-advanced?branch=master

[overall-img]: https://www.bithound.io/github/code-and-send/object-merge-advanced/badges/score.svg
[overall-url]: https://www.bithound.io/github/code-and-send/object-merge-advanced

[deps-img]: https://www.bithound.io/github/code-and-send/object-merge-advanced/badges/dependencies.svg
[deps-url]: https://www.bithound.io/github/code-and-send/object-merge-advanced/master/dependencies/npm

[dev-img]: https://www.bithound.io/github/code-and-send/object-merge-advanced/badges/devDependencies.svg
[dev-url]: https://www.bithound.io/github/code-and-send/object-merge-advanced/master/dependencies/npm

[downloads-img]: https://img.shields.io/npm/dm/object-merge-advanced.svg
[downloads-url]: https://www.npmjs.com/package/object-merge-advanced
