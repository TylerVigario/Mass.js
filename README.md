[![BCH compliance](https://bettercodehub.com/edge/badge/MeekLogic/Mass.js?branch=master)](https://bettercodehub.com/) [![Build Status](https://travis-ci.com/MeekLogic/Mass.js.svg?branch=master)](https://travis-ci.com/MeekLogic/Mass.js) [![Coverage Status](https://coveralls.io/repos/github/MeekLogic/Mass.js/badge.svg?branch=master)](https://coveralls.io/github/MeekLogic/Mass.js?branch=master) [![Depfu](https://badges.depfu.com/badges/0bab67be6f5f0504604c811ca37b2ce5/overview.svg)](https://depfu.com/github/MeekLogic/Mass.js?project_id=9832)

Mass.js
=========
JavaScript library for parsing and formatting mass units.

**[Documentation](https://meeklogic.github.io/Mass.js/)**

Install
-------
```javascript
npm install Mass.js
```

Usage
-----
**ES6**
```javascript
import {Mass as mass} from 'Mass.js/src/mass';
var Mass = new mass();
```

**CommonJS**
```javascript
var mass = require('Mass.js');
var Mass = new mass();
```

Example
-------
```javascript
// Parse string for ounces
let pounds = Mass.parse('5lbs  4 oz');

console.log(pounds); // 5.25

// Add 12 ounces
pounds += (12 / 16);

console.log(pounds); // 6

// Verify total is 90 ounces
if (pounds === 6) {
    // Format total for human-readable string
    console.log(Mass.format(pounds)); // "6 lbs"
} else {
    console.error('Did we forget to run our tests?');
}
```