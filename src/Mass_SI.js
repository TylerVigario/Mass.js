/** 
 * Entry-point containing International System of Units units of mass.
 *
 * @author Tyler Vigario (MeekLogic)
 * @license GPL-3.0-only
 * @version 1.0.0
 */

import MassJS from './MassJS';

/**
 * International System of Units units of mass
 */
var Units = [{
    name: 'ton',
    value: 1000,
    display: {
        symbol: 't',
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

var Mass = new MassJS(Units);

export {
    //Units,
    Mass as default
};