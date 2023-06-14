import test from 'ava';

import Mass from '../lib/mass.js';
import US from '../lib/units/US.js';
import UK from '../lib/units/UK.js';
import SI from '../lib/units/SI.js';

const MassJS = {
  'US': new Mass(US),
  'UK': new Mass(UK),
  'SI': new Mass(SI),
};

const problems = {
  US: [{
    question: '1 pound',
    answer: '1 lb',
    value: 1,
  }, {
    question: '8lb 36oz',
    answer: '10 lb 4 oz',
    value: 10.25,
  }, {
    question: '169oz',
    answer: '10 lb 9 oz',
    value: 10.5625,
  }, {
    question: '10lbs',
    answer: '10 lb',
    value: 10,
  }, {
    question: '2lbs ,  17oz',
    answer: '3 lb 1 oz',
    value: 3.0625,
  }, {
    question: '17 lb and 14 oz',
    answer: '17 lb 14 oz',
    value: 17.875,
  }, {
    question: '3lbs4oz',
    answer: '3 lb 4 oz',
    value: 3.25,
  }, {
    question: '4 oz',
    answer: '4 oz',
    value: 0.25,
  }, {
    question: '16oz4lb',
    answer: '5 lb',
    value: 5,
  }, {
    question: '20  lb, 20 o z ',
    answer: '21 lb 4 oz',
    value: 21.25,
  }, {
    question: '7000 grains',
    answer: '1 lb',
    value: 1,
  }, {
    question: '256dr',
    answer: '1 lb',
    value: 1,
  }, {
    question: '1 qtr',
    answer: '25 lb',
    value: 25,
  }, {
    question: '2 hundredweight',
    answer: '200 lb',
    value: 200,
  }, {
    question: '65 hundredweight',
    answer: '3.25 t',
    value: 6500,
  }, {
    question: '3.5t',
    answer: '3.50 t',
    value: 7000,
  }],
};

const invalidStrings = [
  'not,a,weight',
  '165 pounds 24',
  '25 metric tons',
  '95gallons',
  'pounds 6',
  '78 pnds, 4 ounce',
  '-45pounds',
  '-12 lbs 4 oz',
  '@$#/|',
];

Object.keys(MassJS).forEach((unitName) => {
  // Invalid arguments
  test(`${unitName}: Invalid .parse() arguments`, (t) => {
    // Mass.parse(string)
    t.throws(() => {
      MassJS[unitName].parse(null);
    }, {instanceOf: TypeError});
    t.throws(() => {
      MassJS[unitName].parse(true);
    }, {instanceOf: TypeError});
    t.throws(() => {
      MassJS[unitName].parse(45);
    }, {instanceOf: TypeError});
    t.throws(() => {
      MassJS[unitName].parse({value: 45});
    }, {instanceOf: TypeError});
  });

  test(`${unitName}: Invalid .format() arguments`, (t) => {
    // Mass.format(number, number|string)
    t.throws(() => {
      MassJS[unitName].format(null);
    }, {instanceOf: TypeError});
    t.throws(() => {
      MassJS[unitName].format(true);
    }, {instanceOf: TypeError});
    t.throws(() => {
      MassJS[unitName].format(-45);
    }, {instanceOf: Error});
    t.throws(() => {
      MassJS[unitName].format('45');
    }, {instanceOf: TypeError});
    t.throws(() => {
      MassJS[unitName].format({value: 45});
    }, {instanceOf: TypeError});
    //
    t.throws(() => {
      MassJS[unitName].format(45, null);
    }, {instanceOf: TypeError});
    t.throws(() => {
      MassJS[unitName].format(45, true);
    }, {instanceOf: TypeError});
    t.throws(() => {
      MassJS[unitName].format(45, -1);
    }, {instanceOf: Error});
    t.throws(() => {
      MassJS[unitName].format(45, '45');
    }, {instanceOf: TypeError});
  });

  test(`${unitName}: Invalid .lookup() arguments`, (t) => {
    // Mass.lookup(string)
    t.throws(() => {
      MassJS[unitName].lookup(null);
    }, {instanceOf: TypeError});
    t.throws(() => {
      MassJS[unitName].lookup(true);
    }, {instanceOf: TypeError});
    t.throws(() => {
      MassJS[unitName].lookup(1);
    }, {instanceOf: TypeError});
    t.is(MassJS[unitName].lookup('null'), undefined, '.lookup("null")');
    t.throws(() => {
      MassJS[unitName].lookup({value: 'lb'});
    }, {instanceOf: TypeError});
  });

  test(`${unitName}: Invalid mass string tests`, (t) => {
    // Validate Mass.parse() invalid mass string
    invalidStrings.forEach((weight) => {
      const value = MassJS[unitName].parse(weight);

      t.false(value, weight);
    });
  });

  // Main tests
  if (Object.keys(problems).includes(unitName)) {
    test(`${unitName}: Parse tests`, (t) => {
      // Validate Mass.parse()
      problems[unitName].forEach((problem) => {
        const value = MassJS[unitName].parse(problem.question);

        t.is(value, problem.value, problem.question);
      });
    });

    test(`${unitName}: Format tests`, (t) => {
      // Validate Mass.format()
      problems[unitName].forEach((problem) => {
        const text = MassJS[unitName].format(problem.value);

        t.is(text, problem.answer, text);
      });

      t.is(MassJS[unitName].format(64, {unit: 'oz'}), '4 lb', '64');
    });
  }
});
