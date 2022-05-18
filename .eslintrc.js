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
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  /**
   * 在使用vue的时候，使用一个全局变量，ESLint的语法会出现ESLint: 'VANTA' is not defined. (no-undef)，说变量未定义
   * 这时我们可以添加配置，取消这个校验。
   */
  globals: {
    VANTA: true
  }
}
