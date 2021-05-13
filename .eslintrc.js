module.exports = {
  globals: {
    __PATH_PREFIX__: true
  },
  extends: [
    'react-app',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:babel-eslint/recommended'
  ],
  plugins: ['jsx-a11y', 'babel-eslint'],
  rules: {}
}
