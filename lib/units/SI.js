/**
 * International System of Units `Mass` unit definition objects.
 * @author Tyler Vigario (MeekLogic)
 * @license MIT
 * @version 1.3.0
 */
export default [{
  name: 'ton',
  value: 1000,
  display: {
    symbol: 't',
    exclusive: true,
    rounding: 2,
  },
  signifiers: [
    't',
    'ton',
    'tons',
    'tonne',
    'tonnes',
  ],
}, {
  name: 'kilogram',
  value: 1,
  display: 'kg',
  signifiers: [
    'kg',
    'kgs',
    'kilogram',
    'kilograms',
  ],
}, {
  name: 'gram',
  value: 0.001,
  display: 'g',
  signifiers: [
    'g',
    'gs',
    'gram',
    'grams',
  ],
}];
