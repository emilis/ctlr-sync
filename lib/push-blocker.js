/*
    Copyright 2011 Emilis Dambauskas

    This file is part of CTLR-Sync package.

    CTLR-Sync is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    CTLR-Sync is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with CTLR-Sync.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
    A module that lets other modules exchange values, blocking until a single 
    value is pushed and then pulled.

    You can use it to build Iterators from asynchronous threads:

        var push_blocker = require("ctlr-sync/push-blocker");

        setTimeout(function() {
            while (true) {
                push_blocker.push(new Date());
            }
        }, 0);

        for each (var value in push_blocker.iterate()) {
            print(value);
            java.lang.Thread.sleep(2000); // wait 2s
        }
*/

// Requirements:
var promise = require("ringo/promise");
var scheduler = require("ringo/scheduler");


/**
 * Deferreds that block push and pull operations.
 */
exports.pushblock = false;
exports.pullblock = false;


/**
 * Takes a value and blocks on next request until the value is pulled.
 */
exports.push = function(value) {

    this.pushblock && this.pushblock.promise.wait();
    this.pushblock = promise.defer();

    this.pullblock = this.pullblock || promise.defer();
    this.pullblock.resolve(value);

};


/**
 * Blocks until a value is pushed.
 */
exports.pull = function() {

    this.pullblock = this.pullblock || promise.defer();
    var value = this.pullblock.promise.wait();
    this.pullblock = promise.defer();

    this.pushblock && this.pushblock.resolve(true);

    return value;
};


/**
 * Generates an Iterator that goes over pushed values.
 * To end iteration push a StopIteration as a value.
 */
exports.iterate = function() {

    while (true) {
        var value = this.pull();
        if (value === StopIteration) {
            throw StopIteration;
        } else {
            yield value;
        }
    }
};
