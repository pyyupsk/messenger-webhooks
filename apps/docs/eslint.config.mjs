import { FlatCompat } from '@eslint/eslintrc';
import baseConfig from '@repo/eslint-config/base.js';

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
});

export default [
    ...compat.config({
        extends: ['next/core-web-vitals', 'next/typescript'],
    }),
    ...baseConfig,
];
