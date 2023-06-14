/**
 * U.S. customary `Mass` unit definition objects.
 * @author Tyler Vigario (MeekLogic)
 * @license MIT
 * @version 1.3.3
 */
export default [{
  name: 'ton',
  value: 2000,
  display: {
    exclusive: true,
    rounding: 2,
    symbol: 't',
  },
  signifiers: [
    't',
    'ton',
    'tons',
  ],
}, {
  name: 'hundredweight',
  value: 100,
  signifiers: [
    'cwt',
    'hundredweight',
  ],
}, {
  name: 'quarter',
  value: 25,
  signifiers: [
    'qr',
    'qtr',
    'quarter',
    'quarters',
  ],
}, {
  name: 'pound',
  value: 1,
  display: 'lb',
  signifiers: [
    'lb',
    'lbs',
    'pound',
    'pounds',
  ],
}, {
  name: 'ounce',
  value: 0.0625,
  display: 'oz',
  signifiers: [
    'oz',
    'ounce',
    'ounces',
  ],
}, {
  name: 'dram',
  value: 0.00390625,
  signifiers: [
    'dr',
    'dram',
    'drams',
  ],
}, {
  name: 'grain',
  value: 0.00014285714,
  signifiers: [
    'gr',
    'grain',
    'grains',
  ],
}];
