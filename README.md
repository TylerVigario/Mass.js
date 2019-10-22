[![BCH compliance](https://bettercodehub.com/edge/badge/MeekLogic/Mass.js?branch=master)](https://bettercodehub.com/) [![Coverage Status](https://coveralls.io/repos/github/MeekLogic/Mass.js/badge.svg?branch=master)](https://coveralls.io/github/MeekLogic/Mass.js?branch=master) [![Build Status](https://travis-ci.com/MeekLogic/Mass.js.svg?branch=master)](https://travis-ci.com/MeekLogic/Mass.js)

Mass.js
=========
JavaScript library for parsing and formatting mass units.

**[Documentation](https://meeklogic.github.io/Mass.js/)**

Install
-------
```javascript
npm install mass.js
```

Usage
-----
**ES6**
```javascript
import Mass from 'mass.js/src/Mass_US';
```

**CommonJS**
```javascript
var Mass = require('mass.js');
```

System of Units
--------------
Default system for units of mass is **U.S. customary** but can be changed by requiring an alternative entry point (*Mass_US*, *Mass_UK*, or *Mass_SI*).

```javascript
var Mass = require('mass.js/dist/Mass_US'); // U.S. customary
var Mass = require('mass.js/dist/Mass_UK'); // Imperial
var Mass = require('mass.js/dist/Mass_SI'); // International System of Units (unfinished)
```

Example
-------
```javascript
// Parse string for mass
let value = Mass.parse('10 ounces');

console.log(value); // 0.625

// Add 10 pounds
value += 10;

console.log(value); // 10.625

// Format total for human-readable string
console.log(Mass.format(value)); // "10 lb 10 oz"
```
