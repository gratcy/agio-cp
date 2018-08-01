module.exports = {
  root: true,
  parserOptions: {
    "parser": "babel-eslint",
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    'plugin:vue/essential'
  ],
  // required to lint *.vue files
  // add your custom rules here
  'env': {
    'browser': true,
    'node': true
  },
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 0 : 0
  }
}
