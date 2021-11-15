/* eslint-disable */
module.exports = {
    root: true,
    env: {
        browser: true, // browser global variables
        es2021: true, // adds all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12.
    },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'comma-dangle': ['error', 'always-multiline'],
    },
};
