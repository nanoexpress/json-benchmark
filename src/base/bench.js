// Native benchmark runner (no test framework needed).
// Same measurement shape as before: warmup, then N timed iterations.
import { performance } from 'node:perf_hooks';

/**
 * DO NOT TOUCH
 * THIS IS TESTING CONSTANT
 */
export const globalBenchConfig = {
  iterations: 2_000,
  warmupIterations: 5
};

export function bench(
  name,
  fn,
  { iterations, warmupIterations } = globalBenchConfig
) {
  for (let i = 0; i < warmupIterations; i++) {
    fn();
  }
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const elapsed = performance.now() - start;
  return { name, ops: (iterations / elapsed) * 1000 };
}

export function report(title, results) {
  const fastest = Math.max(...results.map(({ ops }) => ops));
  console.log(`\n${title}`);
  for (const { name, ops } of results) {
    const opsStr = ops.toLocaleString('en-US', { maximumFractionDigits: 2 });
    const relative = (ops / fastest).toFixed(2);
    console.log(
      `  ${name.padEnd(34)} ${opsStr.padStart(15)} ops/s  ${relative}x`
    );
  }
}
