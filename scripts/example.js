import Mass from '../src/US';

//
// Example
//

// Parse string for mass
let value = Mass.parse('10 ounces');

console.log(value); // 0.625

// Add 10 pounds
value += 10;

console.log(value); // 10.625

// Format total for human-readable string
console.log(Mass.format(value)); // "10 lb 10 oz"

console.log();
