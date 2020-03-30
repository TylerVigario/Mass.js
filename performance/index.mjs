import Performance from '@tylervigario/performance';

import Mass from '../lib/entries/US.mjs';

const performance = new Performance();

performance.test('.parse("12 lbs")', () => Mass.parse('12 lbs'));

performance.test('.parse("12 lbs 8 oz")', () => Mass.parse('12 lbs 8 oz'));

performance.test('.parse("12 pounds 8 ounces")', () => Mass.parse('12 pounds 8 ounces'));

performance.test('.format(12)', () => Mass.format(12));

performance.test('.format(12.5)', () => Mass.format(12.5));

performance.test('.format(200, { unit: 0.0625 })', () => Mass.format(200, {unit: 0.0625}));

performance.test('.format(200, { unit: "oz" })', () => Mass.format(200, {unit: 'oz'}));

performance.test('.format(200, { written: true })', () => Mass.format(200, {written: true}), {rounds: 100000});

performance.test('.lookup("gr")', () => Mass.lookup('gr'));

performance.test('.lookup("t")', () => Mass.lookup('t'));

performance.output();

performance.save('./performance/performance.json');
