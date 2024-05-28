import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettylint from 'eslint-plugin-prettier/recommended';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config({
    files: ['**/*.ts'],
    extends: [
        eslint.configs.recommended,
        ...tseslint.configs.recommended,
        prettylint.configs,
        prettierConfig,
    ],
    rules: {
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
    },
});
