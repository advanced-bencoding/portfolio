import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config({
    ignores: ['dist/**'],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    rules: {
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
    },
});
