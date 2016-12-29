# devtools-timeline-model-browser

[![GitHub version](https://badge.fury.io/gh/addyosmani%2Fdevtools-timeline-model-browser.svg)](https://badge.fury.io/gh/addyosmani%2Fdevtools-timeline-model-browser)
[![npm version](https://badge.fury.io/js/devtools-timeline-model-browser.svg)](https://badge.fury.io/js/devtools-timeline-model-browser)
[![Dependency Status](https://david-dm.org/addyosmani/devtools-timeline-model-browser.svg)](https://david-dm.org/addyosmani/devtools-timeline-model-browser)

Browser-friendly library for parsing DevTools Timeline traces into structured profiling data models.
Heavily inspired by [devtools-timeline-model](https://github.com/paulirish/devtools-timeline-model). 
Should work in any modern browser.

<img src='https://i.imgur.com/MpnWZea.jpg' width='80%'/>

## Develop

```sh
$ git clone https://github.com/addyosmani/devtools-timeline-model-browser
$ cd devtools-timeline-model-browser
$ npm install
# or $ yarn if you have yarn installed
```

To build the source run `webpack` or `npm run build`.

## Usage

`dist` contains a globals-friendly `timeline-model-browser.js` build that can be dropped into any page. e.g:

```html
<script src='dist/timeline-modal-browser.js'></script>
```

From there, you'll have access to a new global, `TimelineModelBrowser` that can be passed the contents of any
valid trace file.

```js
const traceFileContents = '...'; // Let's pretend you've fetched a trace file
const model = new TimelineModelBrowser(traceFileContents);
```

You'll now have access to the same helpers available in the [devtools-timeline-model](https://github.com/paulirish/devtools-timeline-model) package:

```js
// tracing model
model.tracingModel()
// timeline model, all events
model.timelineModel()
// interaction model, incl scroll, click, animations
model.interactionModel()
// frame model, incl frame durations
model.frameModel()
// filmstrip model, incl screenshots
model.filmStripModel()

// topdown tree
model.topDown()
// bottom up tree
model.bottomUp()
// bottom up tree, grouped by URL
model.bottomUpGroupBy('URL') // accepts: None Category Subdomain Domain URL EventName
```

## Demo

A demo that uses the `dist` build is available in the `demo` directory. Fire up a local server in the repo root,
then navigate to `/demo/` to try it out.

Note: Your browser will need to support the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for the
demo to correctly work. This should include browsers like Chrome, Opera, Firefox and the Safari Tech Preview.

## Why

#### Is this useful?

The Chrome DevTools [Timeline](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool) allows you to save traces by
right-clicking on the Timeline waterfall. The trace format of these files can be dense, but contains detailed information useful for anyone building
web performance tooling. The goal of this module is to bring the benefits of the devtools-timeline-model package to the browser so folks can easily build
tools that consume and reuse this data outside of writing a DevTools extension or using Node.

#### This package?

[devtools-timeline-model](https://github.com/paulirish/devtools-timeline-model) is an excellent package if you're trying
to build tools targeting a Node environment that want to parse DevTools traces into an easy to reason about model. A few
assumptions are built into that package, including use of Node built-ins, such as `fs`, `resolve` and so on.

I found that shimming these with `browserify-fs` and the `brfs` transforms were not sufficient to create a browser-friendly
version of that package, so this is a complimentary repo that lets you easily reuse that work in the browser.

## License

Apache © [Addy Osmani](https://github.com/addyosmani/)