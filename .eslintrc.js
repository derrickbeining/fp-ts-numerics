module.exports = {
  extends: [
    // 'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: ['simple-import-sort', 'prettier', '@typescript-eslint'],
  root: true,
  rules: {
    'simple-import-sort/sort': 'error',
    'prettier/prettier': 'error',

    // '@typescript-eslint/explicit-function-return-type': 0,
    // '@typescript-eslint/no-empty-interface': 0,
  },
}
