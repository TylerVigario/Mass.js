[![Coverage Status](https://coveralls.io/repos/github/MeekLogic/Mass.js/badge.svg?branch=master)](https://coveralls.io/github/MeekLogic/Mass.js?branch=master) [![Build Status](https://travis-ci.com/MeekLogic/Mass.js.svg?branch=master)](https://travis-ci.com/MeekLogic/Mass.js) ![npm](https://img.shields.io/npm/dm/mass.js)

Mass.js
=======
JavaScript library for parsing and formatting mass units.

**[Demo](https://tylervigario.com/mass/)**

Install
-------
```javascript
npm install mass.js
```

Usage
-----
```javascript
import Mass from 'mass.js';

let value = Mass.parse('5 lbs 8 oz'); // Parse string for mass

value += 5.5; // Add 5.5 pounds

Mass.format(value); // Format total: "11 lb"

Mass.format(value, { written: true }); // Written format: "eleven pounds"
```

Units
-----
Default system for units of mass is **U.S. customary** but can be changed by requiring an alternative entry point (*US*, *UK*, or *SI*).

```javascript
import Mass from 'mass.js/src/US'; // U.S. customary (default)
import Mass from 'mass.js/src/UK'; // Imperial
import Mass from 'mass.js/src/SI'; // International System of Units (unfinished)
```

Methods
-------
### .parse(text)

Parse string for mass.

**text:** `string` The string to parse.

Returns mass value as `number`, or if invalid `text` or negative values, `false`.

------------

### .format(value, options = {})

Format number as string.

**value:** `number` The number to format (must be positive).

**options:** `Object` The formatting options.
- **unit:** `(number|string)` Base unit value or string for lookup (default: 1).
- **written:** `(Object|string|boolean)` [js-written-number](https://github.com/yamadapc/js-written-number#options) options or language identifier (as string), otherwise boolean (default: false).

Returns `value` formatted as `string`, or if unit lookup fails, `undefined`.

**Examples:**
```javascript
Mass.format(11, {
	unit: 1,
	written: false
});

Mass.format(176, {
	unit: 'oz',
	written: true
});
```

------------

### .lookup(signifier)

Lookup string signifier.

**signifier:** `string` The string to lookup.

Returns matching unit `Object` if found, otherwise `undefined`.