[![BCH compliance](https://bettercodehub.com/edge/badge/MeekLogic/Mass.js?branch=master)](https://bettercodehub.com/) [![Build Status](https://travis-ci.com/MeekLogic/Mass.js.svg?branch=master)](https://travis-ci.com/MeekLogic/Mass.js) [![Coverage Status](https://coveralls.io/repos/github/MeekLogic/Mass.js/badge.svg?branch=master)](https://coveralls.io/github/MeekLogic/Mass.js?branch=master)

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
import Mass from 'mass.js/src/Mass';
```

**CommonJS**
```javascript
var Mass = require('mass.js');
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

// Verify total is 6 pounds
if (pounds === 6) {
    // Format total for human-readable string
    console.log(Mass.format(pounds)); // "6 lbs"
} else {
    console.error('Did we forget to run our tests?');
}
```
