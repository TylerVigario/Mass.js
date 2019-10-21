/* eslint no-console: 0 */

var test = require('tape');
var mass = require('../dist/mass');
var Mass = new mass();

//
// Tests
//

var problems = [{
    question: '1 pound',
    answer: '1 lb',
    value: 1
},{
    question: '8lb 36oz',
    answer: '10 lbs 4 oz',
    value: 10.25
},{
    question: '169oz',
    answer: '10 lbs 9 oz',
    value: 10.5625
},{
    question: '10lbs',
    answer: '10 lbs',
    value: 10
},{
    question: '2lbs ,  17oz',
    answer: '3 lbs 1 oz',
    value: 3.0625
},{
    question: 3,
    answer: '3 lbs',
    value: 3
},{
    question: '17 lb 14 oz',
    answer: '17 lbs 14 oz',
    value: 17.875
},{
    question: '3lbs4oz',
    answer: '3 lbs 4 oz',
    value: 3.25
},{
    question: '4 oz',
    answer: '4 oz',
    value: 0.25
},{
    question: '16oz4lb',
    answer: '5 lbs',
    value: 5
},{
    question: -45,
    answer: '0',
    value: 0
},{
    question: '  ',
    answer: '0',
    value: 0
},{
    question: '20  lb, 20 o z ',
    answer: '21 lbs 4 oz',
    value: 21.25
},{
    question: '7000 grains',
    answer: '1 lb',
    value: 1
},{
    question: '256dr',
    answer: '1 lb',
    value: 1
},{
    question: '1 qtr',
    answer: '25 lbs',
    value: 25
},{
    question: '2 hundredweight',
    answer: '200 lbs',
    value: 200
},{
    question: '65 hundredweight',
    answer: '3.25 tons',
    value: 6500
},{
    question: '3.5t',
    answer: '3.50 tons',
    value: 7000
}];

var invalidWeights = [
    'not,a,weight',
    '165 pounds 24',
    '25 metric tons',
    '95gallons',
    'pounds 6',
    '78 pnds, 4 ounce'
];

test('Parse tests', function (t) {
    t.plan(problems.length);

    // Validate Mass.parse()
    problems.forEach((problem) => {
        let value = Mass.parse(problem.question);

        if (typeof value !== 'number') {
            t.error(value, 'Error during parse.');
        }

        t.equal(value, problem.value, problem.question);
    });
});

test('Format tests', function (t) {
    t.plan(problems.length);

    // Validate Mass.format()
    problems.forEach((problem) => {
        let value = Mass.parse(problem.question);
        let text = Mass.format(value);

        t.equal(text, problem.answer, text);
    });
});

test('Invalid parse tests', function (t) {
    t.plan(invalidWeights.length);

    // Mass.parse() invalid weight handling
    invalidWeights.forEach((weight) => {
        let value = Mass.parse(weight);

        t.equal(value, false, weight);
    });
});
