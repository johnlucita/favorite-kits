module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true,
        'jquery': true,
        'jasmine': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'rules': {
        'prettier/prettier': 'off',
        'arrow-parens': 'off',
        'space-before-function-paren': 'error',
        'array-bracket-spacing': ['error', 'never'],
        'template-curly-spacing': ['error', 'never'],
        'object-curly-spacing': 'off',
        'quote-props': 'off',
        'eol-last': ['error', 'always'],
        'generator-star-spacing': 'off',
        'no-prototype-builtins': 'off',
        'no-unused-vars': ['error', { args: 'none' }],
        semi: ['error', 'never'],
        'quotes': ['error', 'single'],
        'linebreak-style': ['error', 'windows'],
        'no-extra-semi': 'error',
        'no-irregular-whitespace': 'error',
        'spaced-comment': ['error', 'always'],
        indent: ['error', 4, { SwitchCase: 1 }],
        'computed-property-spacing': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'keyword-spacing': ['error', { before: true, after: true }],
        'comma-dangle': ['error', {
            'arrays': 'never',
            'objects': 'never',
            'imports': 'never',
            'exports': 'never',
            'functions': 'never'
        }]
    }
}
