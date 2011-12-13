# CTLR-Sync

Synchronization/scheduling/similar utilities for RingoJS.

## Usage

### Example

```javascript
// Use async thread as an Iterator:
var push_blocker = require("ctlr-sync/push-blocker");

// This function works in parallel to the main thread:
setTimeout(function() {
    while (true) {
        push_blocker.push(new Date());
    }
}, 0);

// Request values every 2s from the parallel thread:
for each (var value in push_blocker.iterate()) {
    print(value);
    java.lang.Thread.sleep(2000); // wait 2s
}
```

### API summary

#### ctlr-sync/push-blocker

<table><tbody>
<tr><td align="right">void</td>
    <td><b>push</b> (value)</td>
    <td>Takes a value and blocks on next request until the value is pulled.</td></tr>
<tr><td align="right">mixed</td>
    <td><b>pull</b> ()</td>
    <td>Blocks until a value is pushed, then returns the value.</td></tr>
<tr><td align="right"><a href="https://developer.mozilla.org/en/JavaScript/Guide/Iterators_and_Generators">Iterator</a></td>
    <td><b>iterate</b> ()</td>
    <td>Generates an Iterator that goes over pushed values. To end iteration push a StopIteration as a value.</td></tr>
</tbody></table>

### Requirements

- [RingoJS](http://ringojs.org/) v0.8

## About

### License

This is free software, and you are welcome to redistribute it under certain conditions; see LICENSE.txt for details.

### Author contact

Emilis Dambauskas <emilis.d@gmail.com>, <http://emilis.github.com/>
