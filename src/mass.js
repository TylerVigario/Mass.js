import MassJS from './MassJS';

// US Mass units
var Mass = new MassJS([{
    name: 'ton',
    value: 2000,
    display: {
        singular: 'ton',
        plural: 'tons',
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
    display: {
        singular: 'lb',
        plural: 'lbs'
    },
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