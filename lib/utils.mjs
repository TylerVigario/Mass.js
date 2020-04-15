/**
 * Checks if `value` is the type `Object` excluding `Function` and `null`
 *
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 */
export function isObject(value) {
  return (Object.prototype.toString.call(value) === '[object Object]');
}
