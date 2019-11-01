import test from 'ava';
import MassJS from '../src/mass';
import US from '../src/units/US';
import UK from '../src/units/US';
import SI from '../src/units/US';

var Mass = new MassJS(US);

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
    question: '17 lb and 14 oz',
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

var invalidStrings = [
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

// Invalid arguments
test('Invalid .parse() arguments', (t) => {
    // Mass.parse(string)
    t.throws(() => { Mass.parse(null); }, TypeError);
    t.throws(() => { Mass.parse(true); }, TypeError);
    t.throws(() => { Mass.parse(45); }, TypeError);
    t.throws(() => { Mass.parse({ value: 45 }); }, TypeError);
});

test('Invalid .format() arguments', (t) => {
    // Mass.format(number, number|string)
    t.throws(() => { Mass.format(null); }, TypeError);
    t.throws(() => { Mass.format(true); }, TypeError);
    t.throws(() => { Mass.format(-45); }, Error);
    t.throws(() => { Mass.format('45'); }, TypeError);
    t.throws(() => { Mass.format({ value: 45 }); }, TypeError);
    //
    t.throws(() => { Mass.format(45, null); }, TypeError);
    t.throws(() => { Mass.format(45, true); }, TypeError);
    t.throws(() => { Mass.format(45, -1); }, Error);
    t.throws(() => { Mass.format(45, '45'); }, TypeError);
});

test('Invalid .lookup() arguments', (t) => {
    // Mass.lookup(string)
    t.throws(() => { Mass.lookup(null); }, TypeError);
    t.throws(() => { Mass.lookup(true); }, TypeError);
    t.throws(() => { Mass.lookup(1); }, TypeError);
    t.is(Mass.lookup('null'), undefined, '.lookup("null")');
    t.throws(() => { Mass.lookup({ value: 'lb' }); }, TypeError);
});

// Assertions
test('Parse tests', (t) => {
    // Validate Mass.parse()
    problems.forEach((problem) => {
        let value = Mass.parse(problem.question);

        t.is(value, problem.value, problem.question);
    });
});

test('Format tests', (t) => {
    // Validate Mass.format()
    problems.forEach((problem) => {
        let text = Mass.format(problem.value);

        t.is(text, problem.answer, text);
    });

    t.is(Mass.format(64, { unit: 'oz' }), '4 lb', '64');
    
    t.is(Mass.format(64, {unit: 'oz', written: true}), 'four pounds', '64');
    t.is(Mass.format(1950, {written: true}), 'one thousand nine hundred and fifty pounds', '64');
});

test('Invalid mass string tests', (t) => {
    // Validate Mass.parse() invalid mass string
    invalidStrings.forEach((weight) => {
        let value = Mass.parse(weight);

        t.false(value, weight);
    });
});