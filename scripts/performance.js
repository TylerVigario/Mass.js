/* eslint no-console: 0 */

var microtime = require('microtime');
var Mass = require('../dist/mass');

//
// Performance
//

// parse-single
test('parse-single', () => {
    Mass.parse('12 lbs');
});

// parse-double
test('parse-double-short', () => {
    Mass.parse('12 lbs  8 oz');
});

// parse-double
test('parse-double-long', () => {
    Mass.parse('12 pounds  8 ounces');
});

console.log();

// format-single
test('format-single', () => {
    Mass.format(12);
});

// format-double
test('format-double', () => {
    Mass.format(12.5);
});

// format-double
test('format-double-with-convert', () => {
    Mass.format(200, 0.0625);
});

// format-double-with-lookup
test('format-double-with-lookup', () => {
    Mass.format(200, 'oz');
});

console.log();

// lookup-grain
test('lookup-grain', () => {
    Mass.lookup('gr');
});

// lookup-ton
test('lookup-ton', () => {
    Mass.lookup('t');
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

    for (let i = rounds; i > 0; i--) {
        test();
    }

    time = microtime.now() - time;

    time = time / 1000;

    console.log(`${name}: ${Math.round(rounds / time).toLocaleString()}  op/s`);
}