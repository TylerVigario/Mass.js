import {isObject} from './utils.mjs';
import i18n from 'i18n';
import n2words from 'n2words/src/n2words.mjs';

i18n.configure({
  defaultLocale: 'en',
  directory: './lib/locales',
  updateFiles: false,
});

/**
 * Required due to issue with i18n.__n()
 *
 * @see https://github.com/mashpie/i18n-node/issues/429
 */
i18n.setLocale('en');

/**
 * Parsing and formatting mass units.
 *
 * @author Tyler Vigario (MeekLogic)
 * @license MIT
 * @version 1.3.3
 */
export default class {
  /**
   * @param {Array} units The array of `Mass` unit definition objects to use.
   */
  constructor(units) {
    this.units = units;
  }

  /**
   * Get current `Mass` unit definition objects.
   *
   * @return {Array} Returns currently used `Mass` unit definition objects.
   */
  get units() {
    return this._units;
  }

  /**
   * Set current `Mass` unit definition objects.
   *
   * @param {Array} units The Array of `Mass` unit definition objects to use.
   */
  set units(units) {
    if (!Array.isArray(units)) {
      throw new TypeError(i18n.__('error.type', 'units', 'array'));
    }

    /**
     * Internal array of units
     *
     * @type {array}
     * @private
     */
    this._units = units;
  }

  /**
   * Parse string for mass.
   *
   * @param {string} text The string to parse.
   * @return {(number|boolean)} Returns mass as a `number`, unless invalid or
   *                            any value is negative, then `false`.
   */
  parse(text) {
    // Validate text argument
    if (typeof text !== 'string') {
      throw new TypeError(i18n.__('error.type', 'text', 'string'));
    }

    // Remove possible case sensitivity
    text = text.toLowerCase();

    // Replace special words with symbols
    text = text.replace(i18n.__('and'), '&');

    // Remove non alphanumeric Unicode characters except "." and "-"
    text = text.replace(/[^\p{Nd}\p{Ll}\u{002D}.]/gu, '');

    // Is string empty?
    if (text.length === 0) {
      return false;
    }

    // Linear char parsing
    let value = '';
    let signifier = '';
    let unit;
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

        signifier += char;
      } else {
        // Check if this is next unit pair (value,signifier|value,signifier|...)
        if (signifier.length > 0) {
          // Convert string to number
          const v = parseFloat(value);

          // Mass cannot be negative
          if (v < 0) {
            return false;
          }

          // Lookup unit signifier
          unit = this.lookup(signifier);

          // Does signifier not match?
          if (unit === undefined) {
            // If we cannot reliably match this signifier to a unit
            return false;
          }

          // Convert to base unit value and add to total
          total += v * unit.value;

          // Reset storage variables
          value = '';
          signifier = '';
        }

        value += char;
      }
    }

    // Convert to string to number
    const v = parseFloat(value);

    // Mass cannot be negative
    if (v < 0) {
      return false;
    }

    // Lookup unit signifier
    unit = this.lookup(signifier);

    // Does signifier not match?
    if (unit === undefined) {
      // If we cannot reliably match this signifier to a unit
      return false;
    }

    // Convert to base unit value and add to total
    total += v * unit.value;

    // Return total mass (as base unit)
    return total;
  }

  /**
   * Format number as string.
   *
   * @param {number} value The number to format (must be positive).
   * @param {Object} [options = {}] The formatting options.
   * @return {(string|undefined)} Returns `value` formatted as `string`, or
   *                              if unit lookup fails, `undefined`.
   * @throws {Error} Throws an error if `value` or `options.unit` is a
   *                 negative number.
   */
  format(value, options = {}) {
    // Validate value argument
    if (typeof value !== 'number') {
      throw new TypeError(i18n.__('error.type', 'value', 'number'));
    }

    // Accepts any positive number
    if (value < 0) {
      throw new Error(i18n.__('error.negative_number', 'value'));
    }

    // Validate options argument
    if (!isObject(options)) {
      throw new TypeError(i18n.__('error.type', 'options', 'object'));
    }

    // Valdidate options.unit
    if (options.unit) {
      let unitValue;

      switch (typeof options.unit) {
        case 'number': {
          // Validate number
          if (options.unit < 0) {
            throw new Error(i18n.__('error.negative_number', 'options.unit'));
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
          throw new TypeError(i18n.__('error.type', 'options.unit', '"number" or "string"'));
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
            formatted += i18n.__('and') + ' ';
          }
        }

        // Add formatted value
        if (options.written) {
          if (isObject(options.written)) {
            formatted += n2words(q, options.written);
          } else if (typeof options.written === 'string') {
            formatted += n2words(q, {
              lang: options.written,
            });
          } else if (options.written === true) {
            formatted += n2words(q);
          } else {
            throw new TypeError(i18n.__('error.type', 'options.written', '"boolean", "string", or "object"'));
          }
        } else {
          formatted += q.toFixed(unit.display.rounding ? unit.display.rounding : 0);
        }

        // Add space between unit value and signifier
        formatted += ' ';

        // Add unit signifier
        if (options.written) {
          formatted += i18n.__n(unit.name, q);
        } else {
          formatted += unit.display.symbol ? unit.display.symbol : unit.display;
        }

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
   *
   * @param {string} signifier The string to lookup.
   * @return {(Object|undefined)} Returns matching unit `Object` if found,
   *                              otherwise `undefined`.
   */
  lookup(signifier) {
    // Validate signifier argument type
    if (typeof signifier !== 'string') {
      throw new TypeError(i18n.__('error.type', 'signifier', 'string'));
    }

    // Search through units
    return this.units.find((unit) => {
      // Search for matching signifier within unit
      return unit.signifiers.includes(signifier);
    });
  }
}
