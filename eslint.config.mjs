import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    {
        ignores: ['dist/', 'node_modules/']
    },
    {
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            eslintConfigPrettier, // At the end
            eslintPluginPrettierRecommended
        ],
        plugins: {
            import: importPlugin
        },
        rules: {
            'prettier/prettier': 'error', // Agregamos la regla de Prettier,
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true }
                }
            ],
            'import/no-duplicates': 'error',
            'import/newline-after-import': ['error', { count: 1 }]
        }
    }
)
