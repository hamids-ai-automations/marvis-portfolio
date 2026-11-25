/**
 * Portable test runner.
 *
 * Node's `--test` directory/glob handling differs across versions (20 vs 21+),
 * so the file list is resolved here and passed explicitly to keep local Windows
 * runs and GitHub Actions identical.
 */
import { readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const files = readdirSync('tests')
  .filter((name) => name.endsWith('.test.js'))
  .sort()
  .map((name) => `tests/${name}`);

if (files.length === 0) {
  console.error('No test files found in tests/.');
  process.exit(1);
}

const result = spawnSync(process.execPath, ['--test', ...files], { stdio: 'inherit' });
process.exit(result.status ?? 1);
