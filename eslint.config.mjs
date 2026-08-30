import { config } from './eslint-config/library.js'

export default [
  ...config,
  {
    ignores: ['skills/**', 'node_modules/**'],
  },
  {
    rules: {
      'turbo/no-undeclared-env-vars': 'off',
    },
  },
]
