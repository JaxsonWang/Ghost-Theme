import js from '@eslint/js'
import { defineFlatConfig } from 'eslint-define-config'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import prettierRule from './prettier.config.mjs'

export default defineFlatConfig([
  {
    ...js.configs.recommended,
    ignores: ['src/css', 'public', 'dist'],
    plugins: {},
    rules: {
      'prettier/prettier': ['error', prettierRule],
      semi: ['error', 'never']
    }
  },
  eslintPluginPrettierRecommended
])
