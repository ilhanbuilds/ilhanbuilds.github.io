import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  {
    ignores: [
      'dist/**',
      '.astro/**',
      '.tools/**',
      'playwright-report/**',
      'test-results/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ['**/*.mjs', '**/*.ts', '**/*.astro'],
    languageOptions: {
      globals: {
        process: 'readonly',
        Buffer: 'readonly',
        URL: 'readonly',
        console: 'readonly',
      },
    },
  },
);
