import PerformanceFramework from './classes/performance.mjs';

const perf = new PerformanceFramework();

/**
 * Run performance test.
 *
 * @param {string} name The name of test.
 * @param {Function} testMethod The function containing the testing procedure.
 * @param {number} [rounds = 1000000] The number of times to perform `testMethod`.
 */
export function test(name, testMethod, rounds = 1000000) {
  const data = perf.runTest(testMethod, rounds);

  // Store results
  perf.storeResults(name, data);

  // Output results to console
  perf.outputResults(name, data);
}

/**
 * Save results to JSON file.
 */
export function save() {
  perf.saveResults();
}
