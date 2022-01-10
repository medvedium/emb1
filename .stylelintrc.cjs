module.exports = {
	customSyntax: 'postcss-scss',
	extends: ['stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-prettier/recommended'],
	plugins: ['stylelint-order', 'stylelint-scss'],
	rules: {
		'selector-class-pattern': null,
		'no-invalid-position-at-import-rule': null,
		'at-rule-no-unknown': null
	}
}
