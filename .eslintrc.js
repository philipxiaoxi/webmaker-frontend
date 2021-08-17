module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    camelcase: 0,
    "no-callback-literal": 0,
    "indent": [
      2,
      4
    ],
    "eqeqeq": "off",
    "space-before-function-paren": [
      2,
      "never"
    ],
    "promise/param-names": "off",
    "no-multiple-empty-lines": [
      2,
      {
        "max": 5,
        "maxBOF": 5
      }
    ]
  }
}
