module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    // "plugin:react/jsx-runtime",
    'standard-with-typescript',
    'prettier'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    // ecmaFeatures: {
    //   jsx: true,
    // },
    sourceType: 'module',
    project: ['tsconfig.json']
  },
  plugins: ['react', 'simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error'
  },
  ignorePatterns: ['build/*', 'node_modules/*', 'third-party/*', '**/*.js', '**/*.d.ts'],
  settings: {
    react: {
      version: 'detect'
    }
  }
};
