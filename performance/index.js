import fs from 'fs';
import microtime from 'microtime';
import { EOL } from 'os';

import Mass from '../src/US';

//
// Performance
//
let writeStream = fs.createWriteStream('./performance/data/' + timeStamp() + '.log');

test('.parse("12 lbs")', () => {
    Mass.parse('12 lbs');
});

test('.parse("12 lbs 8 oz")', () => {
    Mass.parse('12 lbs 8 oz');
});

test('.parse("12 pounds 8 ounces")', () => {
    Mass.parse('12 pounds 8 ounces');
});

addBlankLine();

test('.format(12)', () => {
    Mass.format(12);
});

test('.format(12.5)', () => {
    Mass.format(12.5);
});

test('.format(200, { unit: 0.0625 })', () => {
    Mass.format(200, { unit: 0.0625 });
});

test('.format(200, { unit: "oz" })', () => {
    Mass.format(200, { unit: 'oz' });
});

addBlankLine();

test('.lookup("gr")', () => {
    Mass.lookup('gr');
});

test('.lookup("t")', () => {
    Mass.lookup('t');
});

console.log('');

/**
 * Function to run performance test
 *
 * @param {string} name - Name of test.
 * @param {function} test - Callback function with test procedure.
 * @param {number} [rounds = 1000000] - Number of times to perform test.
 */
function test(name, testMethod, rounds = 1000000) {
    // Store start microtime
    let time = microtime.now();

    // Run test for as many rounds as specified
    for (let i = rounds; i > 0; i--) {
        testMethod();
    }

    // Subtract start from end (now) microtime
    time = microtime.now() - time;

    // Convert to seconds
    time = time / 1000;

    // Calculate operations per second
    let ops = Math.round(rounds / time).toLocaleString();

    // Basic pretty formatting
    let output = '';

    // Add spaces to the front if less than 6 characters
    for (let i = 6 - ops.length; i > 0; i--) {
        output += ' ';
    }

    output += `${ops} op/s | ${name}`;

    // Output to console
    console.log(output);

    // Output to file
    writeStream.write(output + EOL, 'UTF-8');
}

/**
 * Return a file name friendly timestamp.
 * 
 * @return {string}
 */
function timeStamp() {
    // Create a date object with the current time
    let now = new Date();

    // Create an array with the current month, day and time
    let date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];
    
    // Create an array with the current hour, minute and second
    let time = [now.getHours(), now.getMinutes(), now.getSeconds()];
    
    // If seconds, minutes, or hours are less than 10, prefix with a zero
    for (let i = 0; i < 3; i++) {
        if (time[i] < 10) {
            time[i] = '0' + time[i];
        }
    }
    
    // Return the formatted string
    return date.join('-') + '_' + time.join('-');
}

/**
 * Add blank line to outputs
 */
function addBlankLine() {
    console.log('');
    writeStream.write('' + EOL, 'UTF-8');
}