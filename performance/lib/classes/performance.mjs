import microtime from 'microtime';
import fs from 'fs';
import {timeStamp} from '../utils/index.mjs';

/**
 * Performance Testing Library
 */
export default class {
  /**
   * Setup logging
   */
  constructor() {
    this.saveFile = './performance/data/' + timeStamp() + '.json';

    this.testResults = {};
  }

  /**
   *
   *
   * @param {Function} testMethod The function containing the testing procedure.
   * @param {number} rounds The number of times to perform `testMethod`.
   * @return {object} Operations per second.
   */
  runTest(testMethod, rounds) {
    // Record test data
    const data = {
      rounds: rounds,
      totalExecutionTime: 0,
    };

    let roundStartTime;

    // Run test for as many rounds as specified
    for (let i = rounds; i > 0; i--) {
      roundStartTime = microtime.now();

      Promise.resolve(testMethod());

      data.totalExecutionTime += microtime.now() - roundStartTime;
    }

    // Calculate time per round
    data.timePerRound = data.totalExecutionTime / rounds;

    // Calculate operations per second
    data.operationsPerSecond = 1000 / data.timePerRound;

    return data;
  }

  /**
   *
   * @param {string} name
   * @param {object} data
   */
  storeResults(name, data) {
    this.testResults[name] = data;
  }

  /**
   *
   * @param {string} name
   * @param {object} data
   */
  outputResults(name, data) {
    // Basic pretty formatting
    let output = Math.round(data.operationsPerSecond).toLocaleString();

    // Add spaces to the front if less than 6 characters
    for (let i = 6 - output.length; i > 0; i--) {
      output = ' ' + output;
    }

    // Output to console
    console.log(`${output} op/s | ${name}`);
  }

  /**
   * Save results in JSON asynchronously to a file.
   */
  saveResults() {
    fs.writeFile(this.saveFile, JSON.stringify(this.testResults, null, 2), (err) => {
      if (err) {
        console.error(err);
        throw err;
      }

      console.info(`Saved to: ${this.saveFile}`);
    });
  }
}
