module.exports = {
    'env': {
        'browser': true
    },
    'rules': {
        'func-names': ['error', 'as-needed'],
        'comma-dangle': ['error', {
          'arrays': 'always-multiline',
          'objects': 'always-multiline',
          'imports': 'always-multiline',
          'exports': 'always-multiline',
          'functions': 'ignore'
        }],
        'key-spacing': ['error', { 'align': 'value' }],
        'no-multi-spaces': ['error', { 'exceptions': { 'VariableDeclarator': true } }],
        'jsx-quotes': ['error', 'prefer-single'],
        'react/jsx-filename-extension': [1, { 'extensions': ['.js'] }],
        'react/jsx-curly-spacing': [2, 'always'],
        'react/jsx-first-prop-new-line': ['error', 'never'],
        'react/jsx-closing-bracket-location': ['error', 'after-props'],
        'react/prop-types': ['error', {
          ignore: ['className'],
          customValidators: [],
          skipUndeclared: false
        }],
        'semi': ['warn', 'always'],
        'import/first': 'off',
        'import/prefer-default-export': 'off',
    },
    'extends': 'airbnb',
    'parser': 'babel-eslint'
};
