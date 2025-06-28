import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  formatters: true,
  rules: {
    // Vue specific rules
    'vue/max-attributes-per-line': ['error', {
      singleline: 3,
      multiline: 1,
    }],
    'vue/first-attribute-linebreak': ['error', {
      singleline: 'ignore',
      multiline: 'below',
    }],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'always',
    }],

    // TypeScript rules
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',

    // General rules
    'no-console': 'warn',
    'no-alert': 'error',
    'prefer-const': 'error',
    'no-var': 'error',

    // Import rules - disable conflicting rules
    'import/order': 'off',
    'perfectionist/sort-imports': ['error', {
      type: 'natural',
      order: 'asc',
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
      ],
      newlinesBetween: 'never',
    }],
  },
  ignores: [
    'dist',
    'node_modules',
    '*.d.ts',
  ],
})
