/**
 * U.S. customary `Mass` unit definition objects.
 *
 * @author Tyler Vigario (MeekLogic)
 * @license GPL-3.0-only
 * @version 1.2.0
 */
export default [{
  name: 'ton',
  value: 2000,
  display: {
    exclusive: true,
    rounding: 2,
    symbol: 't',
    written: 'ton',
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
  display: {
    symbol: 'lb',
    written: 'pound',
  },
  signifiers: [
    'lb',
    'lbs',
    'pound',
    'pounds',
  ],
}, {
  name: 'ounce',
  value: 0.0625,
  display: {
    symbol: 'oz',
    written: 'ounce',
  },
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
  value: 1.4285714285714285714285714285714e-4,
  signifiers: [
    'gr',
    'grain',
    'grains',
  ],
}];
