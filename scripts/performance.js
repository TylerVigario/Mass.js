/* eslint no-console: 0 */

var microtime = require('microtime');
var mass = require('../dist/mass');
var Mass = new mass();

//
// Performance
//

// parse
test('parse', () => {
    Mass.parse('12 pounds  8oz');
});

// format
test('format', () => {
    Mass.format(12.5);
});

//
console.log();

/**
 * Function to run performance test
 *
 * @param {string} name - Name of test.
 * @param {function} test - Callback function with test procedure.
 * @param {number} [rounds = 1000000] - Number of times to perform test.
 */
function test(name, test, rounds = 1000000) {
    let time = microtime.now();

    for (let i = rounds; i > 0; i = i - 1) {
        test();
    }

    time = microtime.now() - time;

    time = time / 1000;

    console.log(`${name}: ${Math.round(rounds / time).toLocaleString()}  op/s`);
}