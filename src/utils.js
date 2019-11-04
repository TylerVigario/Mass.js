/**
 * Check if variable is an array.
 *
 * @param {*} arg
 * @returns {boolean} True if var is an array or false if not.
 */
export function isArray(arg) {
    return (Object.prototype.toString.call(arg) === '[object Array]');
}

/**
 * Check if variable is an object.
 *
 * @param {*} arg
 * @returns {boolean} True if var is an object or false if not.
 */
export function isObject(arg) {
    return (Object.prototype.toString.call(arg) === '[object Object]');
}