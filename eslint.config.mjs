import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginNext from 'eslint-plugin-next';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        React: 'writable', // Fix 'React' is not defined
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: pluginReact,
      prettier: pluginPrettier,
      next: pluginNext,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      ...pluginNext.configs.recommended.rules,
      'prettier/prettier': ['warn'],
      '@typescript-eslint/no-explicit-any': 'warn', // Warn instead of error
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-require-imports': 'warn', // Warn for require()
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 'off', // Disable unescaped entities
      'react/no-unknown-property': ['error', { ignore: ['jsx', 'global'] }], // Ignore styled-jsx props
      '@typescript-eslint/triple-slash-reference': 'warn', // Warn for triple-slash
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
