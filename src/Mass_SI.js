import MassJS from './MassJS';

// US Mass units
var Mass = new MassJS([{
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
}]);

export default Mass;