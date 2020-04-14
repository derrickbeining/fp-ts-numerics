module.exports = {
  extends: [
    'react-app',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: ['simple-import-sort'],

  rules: {
    'simple-import-sort/sort': 'error',
  },

  settings: {
    react: {
      version: '999.999.999',
    },
  },
}
