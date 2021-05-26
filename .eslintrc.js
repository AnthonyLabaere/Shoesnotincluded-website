module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
      {
        usePrettierrc: true,
      },
    ],
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // Allow to use destructutring assignment like { foo, ...rest } = data
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    // It is very handy to use any sometimes. But no abuse please !
    '@typescript-eslint/no-explicit-any': 'off',
    // forbids unescape entities only for > and }. We allow quote " and single quote ' to be unescape
    'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
    // Needed when we want to declare 'inline' component'. i.e. in fields.tsx
    'react/display-name': 'off',
    // This rule is really revelant if developping an API.
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // We sometimes need empty arrow functions for mock or init values
    '@typescript-eslint/no-empty-function': ['warn', { allow: ['arrowFunctions'] }],
  },
};
