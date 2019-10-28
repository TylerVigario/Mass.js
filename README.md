[![Coverage Status](https://coveralls.io/repos/github/MeekLogic/Mass.js/badge.svg?branch=master)](https://coveralls.io/github/MeekLogic/Mass.js?branch=master) [![Build Status](https://travis-ci.com/MeekLogic/Mass.js.svg?branch=master)](https://travis-ci.com/MeekLogic/Mass.js) ![npm](https://img.shields.io/npm/dm/mass.js)

Mass.js
=======
JavaScript library for parsing and formatting mass units.

**[Documentation](https://meeklogic.github.io/Mass.js/)**

Install
-------
```javascript
npm install mass.js
```

Usage
-----
```javascript
import Mass from 'mass.js';
```

Units
-----
Default system for units of mass is **U.S. customary** but can be changed by requiring an alternative entry point (*US*, *UK*, or *SI*).

```javascript
import Mass from 'mass.js/src/US'; // U.S. customary (default)
import Mass from 'mass.js/src/UK'; // Imperial
import Mass from 'mass.js/src/SI'; // International System of Units (unfinished)
```

Example
-------
```javascript
// Parse string for mass
let value = Mass.parse('5 lbs 8 oz');

console.log(value); // 5.5

// Add 5.5 pounds
value += 5.5;

console.log(value); // 11

// Format total for human-readable string
console.log(Mass.format(value)); // "11 lb"
```
