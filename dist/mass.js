(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Mass.js"] = factory();
	else
		root["Mass.js"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Mass; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var Mass =
/*#__PURE__*/
function () {
  /**
   * Creates an instance of Mass.
   * 
   * @param {object} [units = null] - Object containing mass unit definitions.
   */
  function Mass() {
    var units = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, Mass);

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
        signifiers: ['t', 'ton', 'tons']
      }, {
        name: 'hundredweight',
        value: 100,
        signifiers: ['cwt', 'hundredweight']
      }, {
        name: 'quarter',
        value: 25,
        signifiers: ['qr', 'qtr', 'quarter', 'quarters']
      }, {
        name: 'pound',
        value: 1,
        display: {
          singular: 'lb',
          plural: 'lbs'
        },
        signifiers: ['lb', 'lbs', 'pound', 'pounds']
      }, {
        name: 'ounce',
        value: 0.0625,
        display: 'oz',
        signifiers: ['oz', 'ounce', 'ounces']
      }, {
        name: 'dram',
        value: 0.00390625,
        signifiers: ['dr', 'dram', 'drams']
      }, {
        name: 'grain',
        value: 1.4285714285714285714285714285714e-4,
        signifiers: ['gr', 'grain', 'grains']
      }];
    }

    if (_typeof(units) !== 'object') {
      throw new Error('Parameter "units" must be of type "object".');
    }

    this.Units = units;
  }
  /**
   * Parse variable for Mass.
   * 
   * @param {string} text - String to parse for mass.
   * @returns {(number|false)} Returns mass as it's base unit, if an invalid string for mass or any value is negative, false.
   */


  _createClass(Mass, [{
    key: "parse",
    value: function parse(text) {
      // Validate text parameter
      if (typeof text !== 'string') {
        throw new Error('Parameter "text" must be of type "string".');
      } // Remove possible case sensitivity


      text = text.toLowerCase(); // Remove non alphanumeric characters except periods

      text = text.replace(/[^0-9a-z.-]/gi, ''); // Is string empty?

      if (text.length === 0) {
        return false;
      } // Linear char parsing


      var value = '';
      var signifier = '';
      var unit;
      var total = 0; // Loop through each character of string

      for (var i = 0; i < text.length; i++) {
        // Get current char
        var _char = text.charAt(i); // Check for alphabet letter (a-z,0-9|a-z,0-9|...) [comma = separator between value and signifier, | = separator between pairs]


        if (_char.match(/[a-z]/i)) {
          // Catch the case where they supply text prior to the value
          if (value.length === 0) {
            return false;
          }

          signifier += _char;
        } else {
          // Check if this is next unit pair (i.e. value,signifier|value,signifier|...)
          if (signifier.length > 0) {
            // Convert to string to number
            var v = parseFloat(value); // Mass cannot be negative

            if (v < 0) {
              return false;
            } // Lookup unit signifier


            unit = this.lookup(signifier); // Does signifier not match?

            if (unit === false) {
              // If we cannot reliably match this signifier to a unit
              return false;
            } // Convert to base unit value and add to total


            total += v * unit.value; // Reset storage variables

            value = '';
            signifier = '';
          }

          value += _char;
        }
      }

      unit = this.lookup(signifier); // Does signifier not match?

      if (unit === false) {
        // If we cannot reliably match this signifier to a unit
        return false;
      } // Convert to base unit value and add to total


      total += value * unit.value; // Return total mass (as base unit)

      return total;
    }
    /**
     * Format mass as text.
     * 
     * @param {number} value - Value to format (must be a positive number).
     * @param {(number|string)} [unitValue = 1] - Value of unit or string mass unit signifier for lookup.
     * @param {(boolean|number)} [spaces = true] - Truthy values will add space between value and signifier.
     * @returns {(string|false)} Formatted mass string or, if value is negative or unit signifier lookup fails, false.
     */

  }, {
    key: "format",
    value: function format(value) {
      var unitValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var spaces = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var formatted = ''; // Validate value parameter

      if (typeof value !== 'number') {
        throw new Error('Parameter "value" must be of type "number".');
      } // Accepts any positive number


      if (value < 0) {
        return false;
      } // Did they supply custom unit ratio or signifier?


      if (unitValue !== 1) {
        if (typeof unitValue === 'number') {
          // Validate number
          if (unitValue < 0) {
            throw new Error('Parameter "unitValue" cannot be a negative number.');
          }
        } else if (typeof unitValue === 'string') {
          // Perform lookup using signifier
          unitValue = this.lookup(unitValue); // Validate Unit lookup

          if (unitValue === false) {
            return false;
          } // We want unit value


          unitValue = unitValue.value;
        } else {
          throw new Error('Parameter "unitValue" must be of type "number" or "string".');
        } // Convert value to base unit value


        value = value * unitValue;
      } // Loop through Units


      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.Units[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var unit = _step.value;

          // Check if Unit is displaying and value is greater than unit value
          if (unit.display && value >= unit.value) {
            // Calculate quantity of unit
            var q = value / unit.value; // Exclusive means it will display the whole value under its sole unit
            // Here we check to make sure it isn't exclusive so we can remove the change from value and make it whole

            if (!unit.display.exclusive) {
              // Whole unit quantity
              q = Math.floor(q); // Subtract change from total

              value -= q * unit.value;
            } // Add space if text has content already


            if (formatted.length > 0) {
              formatted += ' ';
            } // Add formatted value


            formatted += q.toFixed(unit.display.rounding ? unit.display.rounding : 0); // Add spaces (if applicable)

            if (spaces) {
              formatted += ' ';
            } // Add unit signifier


            if (_typeof(unit.display) === 'object') {
              formatted += q === 1 ? unit.display.singular : unit.display.plural;
            } else {
              formatted += unit.display;
            } // Is unit exclusive or is there no longer any value to format?


            if (unit.display.exclusive || value === 0) {
              break;
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return formatted;
    }
    /**
     * Lookup string with signifier returning matching Unit.
     * 
     * @param {string} signifier - Mass unit signifier string for lookup.
     * @return {(object|false)} Matching Unit object, if found, otherwise false.
     */

  }, {
    key: "lookup",
    value: function lookup(signifier) {
      // Validate signifier parameter type
      if (typeof signifier !== 'string') {
        throw new Error('Parameter "signifier" must be of type "string".');
      } // Loop through each Unit


      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.Units[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var unit = _step2.value;

          // Check if signifier matches Unit
          if (unit.signifiers.includes(signifier)) {
            // Return unit
            return unit;
          }
        } // No match found

      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return false;
    }
  }]);

  return Mass;
}();



/***/ })
/******/ ])["default"];
});