# Mass.js

![Node CI](https://github.com/MeekLogic/Mass.js/workflows/Node%20CI/badge.svg) [![Coverage Status](https://coveralls.io/repos/github/MeekLogic/Mass.js/badge.svg?branch=master)](https://coveralls.io/github/MeekLogic/Mass.js?branch=master) [![npm](https://img.shields.io/npm/dm/mass.js)](https://www.npmjs.com/package/mass.js)

ES Module for parsing and formatting mass units.

**[Demo](https://mass.tylervigario.com) | [Demo Source](https://github.com/MeekLogic/Mass.js-Demo)**

## Install

```sh
npm install mass.js
```

## Usage

```javascript
import Mass from 'mass.js';

let value = Mass.parse('5 lbs 8 oz');  // Parse string for mass
value += 5.5;                          // Add 5.5 pounds
Mass.format(value);                    // Format total: "11 lb"
```

## Units

Default system for units of mass is **U.S. customary** but can be changed by requiring an alternative entry point (*US*, *UK*, or *SI*).

```javascript
import Mass from 'mass.js/entry/US'; // U.S. customary (default)
import Mass from 'mass.js/entry/UK'; // Imperial
import Mass from 'mass.js/entry/SI'; // International System of Units (unfinished)
```

## Methods

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

Returns `value` formatted as `string`, or if unit lookup fails, `undefined`.

**Examples:**

```javascript
Mass.format(11);
```

------------

### .parseSet(value, signifier)

Parse value with value signifier.

**value:** `number` The number to format (must be positive).


------------

### .lookup(signifier)

Lookup string signifier.

**signifier:** `string` The string to lookup.

Returns matching unit `Object` if found, otherwise `undefined`.
