/**
 * Generate file name timestamp.
 *
 * @return {string} Return current date & time as `string`.
 */
export function timeStamp() {
  // Create a date object with the current time
  const now = new Date();

  // Create an array with the current month, day and time
  const date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];

  // Create an array with the current hour, minute and second
  const time = [now.getHours(), now.getMinutes(), now.getSeconds()];

  // If seconds, minutes, or hours are less than 10, prefix with a zero
  for (let i = 0; i < 3; i++) {
    if (time[i] < 10) {
      time[i] = '0' + time[i];
    }
  }

  // Return the formatted string
  return date.join('-') + '_' + time.join('-');
}
