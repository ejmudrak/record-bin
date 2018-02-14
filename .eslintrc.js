module.exports = {
    "env": {
        "browser": true
    },
    "rules": {
        "comma-dangle": ["warn", "never"],
        "max-len": ['warn', 500],
        'react/prefer-stateless-function': ['warn', { ignorePureComponents: true }],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "import/prefer-default-export": 'off',
        'import/no-named-as-default-member': 'off',
        "no-case-declarations": 'off',
        'react/jsx-curly-spacing': [2, 'always'],
    },
    "extends": "airbnb"
};
