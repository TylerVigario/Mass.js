import fs from 'fs';
import microtime from 'microtime';
import { EOL } from 'os';

import Mass from '../src/US';

//
// Performance
//
let writeStream = fs.createWriteStream('./performance/data-' + timeStamp() + '.txt');

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

console.log();

writeStream.end();

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

    let ops = Math.round(rounds / time).toLocaleString();

    console.log(`${name}: ${ops}  op/s`);

    writeStream.write(`${name}: ${ops}  op/s` + EOL, 'UTF-8');
}

/**
 * Return a file name friendly timestamp.
 * 
 * @return {string}
 */

function timeStamp() {
    // Create a date object with the current time
    var now = new Date();

    // Create an array with the current month, day and time
    var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
    
    // Create an array with the current hour, minute and second
    var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
    
    // If seconds and minutes are less than 10, add a zero
    for ( var i = 0; i < 3; i++ ) {
        if ( time[i] < 10 ) {
            time[i] = '0' + time[i];
        }
    }
    
    // Return the formatted string
    return date.join('-') + '_' + time.join('-');
}