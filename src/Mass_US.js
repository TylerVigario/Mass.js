/** 
 * Entry-point containing U.S. customary units of mass.
 *
 * @author Tyler Vigario (MeekLogic)
 * @license GPL-3.0-only
 * @version 1.0.1
 */

import MassJS from './MassJS';

var Mass = new MassJS([{
    name: 'ton',
    value: 2000,
    display: {
        symbol: 't',
        rounding: 2,
        exclusive: true
    },
    signifiers: [
        't',
        'ton',
        'tons'
    ]
},{
    name: 'hundredweight',
    value: 100,
    signifiers: [
        'cwt',
        'hundredweight'
    ]
},{
    name: 'quarter',
    value: 25,
    signifiers: [
        'qr',
        'qtr',
        'quarter',
        'quarters'
    ]
},{
    name: 'pound',
    value: 1,
    display: 'lb',
    signifiers: [
        'lb',
        'lbs',
        'pound',
        'pounds'
    ]
},{
    name: 'ounce',
    value: 0.0625,
    display: 'oz',
    signifiers: [
        'oz',
        'ounce',
        'ounces'
    ]
},{
    name: 'dram',
    value: 0.00390625,
    signifiers: [
        'dr',
        'dram',
        'drams'
    ]
},{
    name: 'grain',
    value: 1.4285714285714285714285714285714e-4,
    signifiers: [
        'gr',
        'grain',
        'grains'
    ]
}]);

export default Mass;