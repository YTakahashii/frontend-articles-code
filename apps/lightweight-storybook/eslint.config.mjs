import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default tseslint.config(
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
  {
    files: ['**/*.{js,ts,mts,jsx,tsx}'],
  },
  {
    ignores: [
      '.next/*',
      './node_modules/*',
      './dist/*',
      'src/@types/*',
      'eslint.config.mjs',
      'next.config.mjs',
      '.env.example',
      '.prettierrc.mjs',
      '.storybook/*',
      'vite.config.ts',
      'postcss.config.cjs',
      'storybook-static/*',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...tseslint.configs.strictTypeChecked,
  {
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            arguments: false,
            attributes: false,
            properties: false,
          },
        },
      ],
    },
  },
  eslintConfigPrettier,
  {
    plugins: {
      react: reactPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    plugins: {
      'react-hooks': hooksPlugin,
    },
    rules: hooksPlugin.configs.recommended.rules,
  },
  ...compat.config({
    extends: ['plugin:storybook/recommended'],
    ignorePatterns: ['!.stories.tsx'],
  }),
);
