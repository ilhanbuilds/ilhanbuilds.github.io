import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const paths = process.argv.slice(2);
assert.ok(paths.length, 'Provide the Lighthouse JSON reports to check.');
for (const path of paths) {
  const report = JSON.parse(await readFile(path, 'utf8'));
  const scores = Object.fromEntries(
    ['performance', 'accessibility', 'best-practices', 'seo'].map((key) => [
      key,
      Math.round(report.categories[key].score * 100),
    ]),
  );
  assert.ok(
    scores.performance >= 90,
    `${path}: performance ${scores.performance} < 90`,
  );
  for (const key of ['accessibility', 'best-practices', 'seo'])
    assert.equal(scores[key], 100, `${path}: ${key}`);
  const cls = report.audits['cumulative-layout-shift'].numericValue;
  assert.ok(cls < 0.1, `${path}: CLS ${cls} >= 0.1`);
  assert.equal(report.runtimeError, undefined, `${path}: runtime error`);
  console.log(`${path}: ${JSON.stringify(scores)}, CLS ${cls}`);
}
