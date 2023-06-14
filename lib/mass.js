import {isObject} from './utils.js';

/**
 * Parsing and formatting mass units.
 * @author Tyler Vigario (MeekLogic)
 * @license MIT
 * @version 1.3.3
 */
export default class {
  /**
   * @param {Array} units Array of `Mass` unit definition objects to use.
   */
  constructor(units) {
    this.units = units;
  }

  /**
   * Get current `Mass` unit definition objects.
   * @returns {Array} Returns currently used `Mass` unit definition objects.
   */
  get units() {
    return this._units;
  }

  /**
   * Set current `Mass` unit definition objects.
   * @param {Array} units The Array of `Mass` unit definition objects to use.
   */
  set units(units) {
    if (!Array.isArray(units)) {
      throw new TypeError('Argument "units" must be of type "array".');
    }

    /**
     * Internal array of units
     * @type {Array}
     * @private
     */
    this._units = units;
  }

  /**
   * Parse string for mass.
   * @param {string} text The string to parse.
   * @returns {(number|boolean)} Returns mass as a `number`, unless invalid or
   *                             any value is negative, then `false`.
   */
  parse(text) {
    // Validate text argument
    if (typeof text !== 'string') {
      throw new TypeError('Argument "text" must be of type "string".');
    }

    // Remove possible case sensitivity
    text = text.toLowerCase();

    // Replace special words with symbols
    text = text.replace('and', '&');

    // Remove non alphanumeric Unicode characters except "." and "-"
    text = text.replace(/[^\p{Nd}\p{Ll}\u{002D}.]/gu, '');

    // Is string empty?
    if (text.length === 0) {
      return false;
    }

    // Linear char parsing
    let value = '';
    let signifier = '';
    let total = 0;

    // Loop through each character of string
    for (let i = 0; i < text.length; i++) {
      // Get current char
      const char = text.charAt(i);

      // Check for alphabet letter (a-z,0-9.-|a-z,0-9.-|...)
      if (char.match(/[a-z]/)) {
        // Catch the case where they supply text prior to the value
        if (value.length === 0) {
          return false;
        }

        // Add to signifier storage
        signifier += char;
      } else {
        // Check if this is next unit pair (value,signifier|value,signifier|...)
        if (signifier.length > 0) {
          let result = this.parseSet(value, signifier);

          if (result === false) {
            return false;
          }

          total += result;

          // Reset storage variables
          value = '';
          signifier = '';
        }

        // Add to value storage
        value += char;
      }
    }

    let result = this.parseSet(value, signifier);

    if (result === false) {
      return false;
    }

    total += result;

    // Return total mass (as base unit)
    return total;
  }

  /**
   * Parse number with known string signifier.
   * @param {number} value Number to parse.
   * @param {string} signifier Text signifier to parse.
   * @returns {number|boolean} Resuting value or false if negative or invalid signifier.
   */
  parseSet(value, signifier) {
    // Convert to string to number
    const v = parseFloat(value);

    // Mass cannot be negative
    if (v < 0) {
      return false;
    }

    // Lookup unit signifier
    let unit = this.lookup(signifier);

    // Does signifier not match?
    if (unit === undefined) {
      // If we cannot reliably match this signifier to a unit
      return false;
    }

    // Convert to base unit value and add to total
    return v * unit.value;
  }

  /**
   * Format number as string.
   * @param {number} value The number to format (must be positive).
   * @param {object} [options] The formatting options.
   * @returns {(string|undefined)} Returns `value` formatted as `string`, or
   *                               if unit lookup fails, `undefined`.
   * @throws {Error} Throws an error if `value` or `options.unit` is a
   *                 negative number.
   */
  format(value, options = {}) {
    // Validate value argument
    if (typeof value !== 'number') {
      throw new TypeError('Argument "value" must be of type "number".');
    }

    // Accepts any positive number
    if (value < 0) {
      throw new Error('Argument "value" cannot be a negative number.',);
    }

    // Validate options argument
    if (!isObject(options)) {
      throw new TypeError('Argument "options" must be of type "object".');
    }

    // Validate options.unit
    if (options.unit) {
      let unitValue;

      switch (typeof options.unit) {
        case 'number': {
          // Validate number
          if (options.unit < 0) {
            throw new Error('Argument "options.unit" cannot be a negative number.',);
          }

          unitValue = options.unit;

          break;
        }
        case 'string': {
          // Perform lookup using signifier
          unitValue = this.lookup(options.unit);

          // Validate Unit lookup
          if (unitValue === undefined) {
            return undefined;
          }

          // We want unit value
          unitValue = unitValue.value;

          break;
        }
        default: {
          throw new TypeError('Argument "options.unit" must be of type "number" or "string".');
        }
      }

      // Convert value to base unit value
      value = value * unitValue;
    }

    // Overwrite defaults with supplied options (if any)
    options = Object.assign({
      unit: 1,
      written: false,
    }, options);

    let formatted = '';

    // Loop through Units
    for (const unit of this.units) {
      // Check if Unit is displaying and value is greater than unit value
      if (unit.display && value >= unit.value) {
        // Calculate quantity of unit
        let q = value / unit.value;

        // Exclusive means it will display the whole value under its sole unit.
        // Here we check to make sure it isn't exclusive so we can remove the
        // change from value and make it whole.
        if (!unit.display.exclusive) {
          // Whole unit quantity
          q = Math.floor(q);

          // Subtract change from total
          value -= q * unit.value;
        }

        // Add space if text has content already
        if (formatted.length > 0) {
          formatted += ' ';

          // Add "and" for written format
          if (options.written) {
            formatted += 'and ';
          }
        }

        // Add formatted value
        formatted += q.toFixed(unit.display.rounding ? unit.display.rounding : 0);

        // Add space between unit value and signifier
        formatted += ' ';

        // Add unit signifier
        formatted += unit.display.symbol ? unit.display.symbol : unit.display;

        // Is unit exclusive or is there no longer any value to format?
        if (unit.display.exclusive || value === 0) {
          break;
        }
      }
    }

    return formatted;
  }

  /**
   * Lookup string signifier.
   * @param {string} signifier The string to lookup.
   * @returns {(object|undefined)} Returns matching unit `Object` if found,
   *                               otherwise `undefined`.
   */
  lookup(signifier) {
    // Validate signifier argument type
    if (typeof signifier !== 'string') {
      throw new TypeError('Argument "signifier" must be of type "string".');
    }

    // Search through units
    return this.units.find((unit) => {
      // Search for matching signifier within unit
      return unit.signifiers.includes(signifier);
    });
  }
}
