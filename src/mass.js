  
/** 
 * Parsing and formatting mass units.
 *
 * @author Tyler Vigario (MeekLogic)
 * @license GPL-3.0-only
 * @version 1.0.0
 */

/**
 * Class for working with string representations of mass.
 */
export default class Mass
{
    /**
     * Creates an instance of Mass.
     */
    constructor(units = null)
    {
        if (units === null) {
            units = [{
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
            }];
        }

        this.Units = units;
    }

    /**
     * Parse variable for Mass.
     * 
     * @param {(number|string)} text - Variable to parse for mass.
     * @returns {(number|false)} Returns mass represented in it's base mass unit or false.
     */
    parse(text)
    {
        if (typeof text === 'number') {
            // Value cannot be lower than zero
            if (text < 0) {
                text = 0;
            }
            
            return text;
        }
        // We expect to parse a string
        else if (typeof text !== 'string') {
            return false;
        }

        // Remove possible case sensitivity
        text = text.toLowerCase();

        // Remove non alphanumeric characters except periods
        text = text.replace(/[^0-9a-z.]/gi, '');

        // Is string empty?
        if (text.length === 0) {
            return 0;
        }

        // Linear char parser
        let value = '';
        let signifier = '';
        let pairs = [];

        // Loop through each character of string
        for (let i = 0; i < text.length; i++) {
            // Get current char
            const char = text.charAt(i);

            // Check for alphabet letter (a-z,0-9|a-z,0-9|...) [comma = separator between value and signifier, | = separator between pairs]
            if (char.match(/[a-z]/i)) {
                // Catch the case where they supply text prior to the value
                if (value.length === 0) {
                    return false;
                }

                signifier += char;
            } else {
                // Check if this is next unit pair (i.e. value,signifier|value,signifier|...)
                if (signifier.length > 0) {
                    // Add pair to list of found pairs
                    pairs.push({
                        value: value,
                        signifier: signifier
                    });

                    // Reset storage variables
                    value = '';
                    signifier = '';
                }

                value += char;
            }
        }

        // Make sure we found both a value and a unit signifier
        if (value.length === 0 || signifier.length === 0) {
            return false;
        }

        // Add final pair
        pairs.push({
            value: value,
            signifier: signifier
        });

        // Calculate total
        let total = 0;

        // Loop through each pair
        for (let pair of pairs) {
            let found = false;

            // Loop through each Unit
            for (let unit of this.Units) {
                // Check if signifier matches Unit
                if (unit.signifiers.includes(pair.signifier)) {
                    found = true;

                    // Convert to base unit value and add to total
                    total += pair.value * unit.value;

                    // No need to keep searching
                    break;
                }
            }

            // Did we find a matching unit signifier
            if (!found) {
                // Return false
                return false;
            }
        }

        // Return total mass (as base unit)
        return total;
    }

    /**
     * Format mass as text.
     * 
     * @param {number} value - Value to format.
     * @param {number} [unitValue = 1] - Value of unit.
     * @param {(boolean|number)} [spaces = true] - Truthy values will add space between value and signifier.
     * @returns {string} Formatted mass string.
     */
    format(value, unitValue = 1, spaces = true)
    {
        let formatted = '';

        // We can't assign a value of zero to any unit
        if (value <= 0) {
            return '0';
        }
        
        // Did they supply custom unit value ratio?
        if (unitValue !== 1) {
            // Validate number
            if (typeof unitValue !== 'number' || unitValue < 0) {
                return false;
            }

            // Convert value to base unit value
            value = value * unitValue;
        }

        // Loop through Units
        for (let unit of this.Units) {
            // Check if Unit is displaying and value is greater than unit value
            if (unit.display && value >= unit.value) {
                // Calculate quantity of unit
                let q = value / unit.value;

                // Exclusive means it will display the whole value under its sole unit
                // Here we check to make sure it isn't exclusive so we can remove the change from value and make it whole
                if (!unit.display.exclusive) {
                    // Whole unit quantity
                    q = Math.floor(q);

                    // Subtract change from total
                    value -= q * unit.value;
                }

                // Add space if text has content already
                if (formatted.length > 0) {
                    formatted += ' ';
                }

                // Add formatted value
                formatted += q.toFixed(unit.display.rounding ? unit.display.rounding : 0);

                // Add spaces (if applicable)
                if (spaces) {
                    formatted += ' ';
                }

                // Add unit signifier
                if (typeof unit.display === 'object') {
                    formatted += (q === 1 ? unit.display.singular : unit.display.plural);
                } else {
                    formatted += unit.display;
                }

                // Is unit exclusive or is there no longer any value to format?
                if (unit.display.exclusive || value === 0) {
                    break;
                }
            }
        }

        return formatted;
    }
}