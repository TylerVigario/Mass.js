import test from 'ava';
import Mass from '../src/US';

//
// Tests
//

var problems = [{
    question: '1 pound',
    answer: '1 lb',
    value: 1
},{
    question: '8lb 36oz',
    answer: '10 lb 4 oz',
    value: 10.25
},{
    question: '169oz',
    answer: '10 lb 9 oz',
    value: 10.5625
},{
    question: '10lbs',
    answer: '10 lb',
    value: 10
},{
    question: '2lbs ,  17oz',
    answer: '3 lb 1 oz',
    value: 3.0625
},{
    question: '17 lb 14 oz',
    answer: '17 lb 14 oz',
    value: 17.875
},{
    question: '3lbs4oz',
    answer: '3 lb 4 oz',
    value: 3.25
},{
    question: '4 oz',
    answer: '4 oz',
    value: 0.25
},{
    question: '16oz4lb',
    answer: '5 lb',
    value: 5
},{
    question: '20  lb, 20 o z ',
    answer: '21 lb 4 oz',
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
    answer: '25 lb',
    value: 25
},{
    question: '2 hundredweight',
    answer: '200 lb',
    value: 200
},{
    question: '65 hundredweight',
    answer: '3.25 t',
    value: 6500
},{
    question: '3.5t',
    answer: '3.50 t',
    value: 7000
}];

var invalidWeights = [
    'not,a,weight',
    '165 pounds 24',
    '25 metric tons',
    '95gallons',
    'pounds 6',
    '78 pnds, 4 ounce',
    '-45pounds',
    '-12 lbs 4 oz',
    '@$#/|'
];

test('Parse tests', (t) => {
    // Validate Mass.parse()
    problems.forEach((problem) => {
        try {
            let value = Mass.parse(problem.question);

            t.is(value, problem.value, problem.question);
        } catch (e) {
            t.fail('Error during parse.');
        }
    });
});

test('Format tests', (t) => {
    // Validate Mass.format()
    problems.forEach((problem) => {
        try {
            let text = Mass.format(problem.value);

            t.is(text, problem.answer, text);
        } catch (e) {
            t.fail('Error during parse.');
        }
    });
});

test('Invalid parse tests', (t) => {
    // Mass.parse() invalid weight handling
    invalidWeights.forEach((weight) => {
        try {
            let value = Mass.parse(weight);

            t.false(value, weight);
        } catch (e) {
            t.fail('Error during parse.');
        }
    });
});