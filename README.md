# Benchmark of DOM insert methods: innerHTML, appendChild, insertAdjacentHTML and DocumentFragments

## Why?
We [are told](https://coderwall.com/p/o9ws2g/why-you-should-always-append-dom-elements-using-documentfragments) that it's best to use DocumentFragments to insert multiple nodes. However, the referenced benchmarks on [JSPerf](https://jsperf.com) are currently unavaliable because of [this bug](https://github.com/jsperf/jsperf.com/issues/436). So, let's bench this again and see...

## Install

```shell
$ cd bench-dom-insert-nodes
$ yarn
$ yarn global add parcel-bundler
$ yarn global add http-server
$ yarn build
$ yarn start
```

## Result Analysis

TODO

### Sample results - Chrome 63 on macOS

```Starting tests, inserting 50 dummy p elements per cycle.
innerHTML x 194 ops/sec ±2.10% (55 runs sampled)
insertAdjacentHTML x 6,546 ops/sec ±2.11% (37 runs sampled)
appendChild x 13,477 ops/sec ±2.59% (55 runs sampled)
DocumentFragments x 12,800 ops/sec ±1.71% (52 runs sampled)
Fastest is appendChild
```

`appendChild` tends to do slightly better than `DocumentFragments` which is surprising - maybe it's optimised by the browser or is that the DOM in this case is simple? As well I expected `insertAdjacentHTML` to do really well as it should not cause multiple DOM repaints - yet it doesn't.

### Sample results - Firefox 57 on macOS

```innerHTML x 151 ops/sec ±14.23% (42 runs sampled)
insertAdjacentHTML x 4,099 ops/sec ±39.45% (23 runs sampled)
appendChild x 5,231 ops/sec ±3.19% (28 runs sampled)
DocumentFragments x 3,918 ops/sec ±72.85% (23 runs sampled)
Fastest is appendChild,insertAdjacentHTML
```

### Sample results - Safari 11.0.1 on macOS

```innerHTML x 262 ops/sec ±1.67% (56 runs sampled)
insertAdjacentHTML x 7,749 ops/sec ±0.72% (63 runs sampled)
appendChild x 18,616 ops/sec ±3.77% (52 runs sampled)
DocumentFragments x 16,785 ops/sec ±3.83% (55 runs sampled)
Fastest is appendChild
```

Fastest browser in this scenario.

## Feedback
If you feel that something here is misleading or outright wrong - please log an issue.