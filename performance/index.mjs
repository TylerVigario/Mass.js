import {test, save} from '@tylervigario/performance';

import Mass from '../lib/entries/US.mjs';

test('.parse("12 lbs")', () => Mass.parse('12 lbs'));

test('.parse("12 lbs 8 oz")', () => Mass.parse('12 lbs 8 oz'));

test('.parse("12 pounds 8 ounces")', () => Mass.parse('12 pounds 8 ounces'));

test('.format(12)', () => Mass.format(12));

test('.format(12.5)', () => Mass.format(12.5));

test('.format(200, { unit: 0.0625 })', () => Mass.format(200, {unit: 0.0625}));

test('.format(200, { unit: "oz" })', () => Mass.format(200, {unit: 'oz'}));

test('.format(200, { written: true })', () => Mass.format(200, {written: true}), {rounds: 100000});

test('.lookup("gr")', () => Mass.lookup('gr'));

test('.lookup("t")', () => Mass.lookup('t'));

save();
