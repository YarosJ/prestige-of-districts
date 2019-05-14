const typescriptEslintRecommended = require('@typescript-eslint/eslint-plugin').configs.recommended;

module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb",
  ],
  "plugins": ["eslint-plugin-babel"],
  "parserOptions": {
    "ecmaVersion": 2018,
  },
  "env": {
    "node": true,
    "mocha": true,
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: [ '@typescript-eslint' ],
      rules: Object.assign(typescriptEslintRecommended.rules, {
        '@typescript-eslint/indent': [2, 2],
      }),
    }
  ],
};
