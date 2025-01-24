module.exports = {
  ...require('@dropbox/eslint-config/react-internal'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json'
  },
  ignorePatterns: ['*.json'],
  }