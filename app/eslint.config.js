import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
	prettier,
	{ ignores: ['dist'] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
		},
		rules: {
			'@typescript-eslint/no-unused-vars': 'warn',
			'@typescript-eslint/explicit-function-return-type': 'warn',
			'react-refresh/only-export-components': [
				'warn',
				{
					allowConstantExport: true
				}
			],
			'@typescript-eslint/no-empty-interface': [
				'error',
				{
					allowSingleExtends: true
				}
			],
			'@typescript-eslint/no-explicit-any': [
				'off',
				{
					ignoreRestArgs: true
				}
			],
			'prettier/prettier': [
				'warn',
				{
					printWidth: 145,
					useTabs: true,
					tabWidth: 4,
					bracketSpacing: true,
					semi: true,
					singleQuote: true,
					trailingComma: 'none',
					bracketSameLine: true,
					arrowParens: 'always',
					endOfLine: 'lf'
				}
			]
		}
	}
);
