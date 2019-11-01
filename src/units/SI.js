/** 
 * International System of Units units of mass.
 *
 * @author Tyler Vigario (MeekLogic)
 * @license GPL-3.0-only
 * @version 1.2.0
 */

export default [{
    name: 'ton',
    value: 1000,
    display: {
        symbol: 't',
        written: 'tonne',
        exclusive: true,
        rounding: 2
    },
    signifiers: [
        't',
        'ton',
        'tons',
        'tonne',
        'tonnes'
    ]
},{
    name: 'kilogram',
    value: 1,
    display: 'kg',
    signifiers: [
        'kg',
        'kgs',
        'kilogram',
        'kilograms'
    ]
},{
    name: 'gram',
    value: 0.001,
    display: 'g',
    signifiers: [
        'g',
        'gs',
        'gram',
        'grams'
    ]
}];