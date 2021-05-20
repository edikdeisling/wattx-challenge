module.exports = {
	extends: ['stylelint-prettier/recommended', 'stylelint-config-rational-order'],
	rules: {
		'comment-empty-line-before': null, // allow not empty line before comment
		'rule-empty-line-before': ['always', { ignore: [ 'first-nested' ] }], // empty lines before css rules
		'max-nesting-depth': [
			3, // max css nesting depth
			{
				ignore: ['pseudo-classes'],
				ignoreAtRules: ['mixin', 'keyframes'],
			},
		],
		'length-zero-no-unit': true, // prefer 0. Not 0px
		'declaration-block-no-duplicate-properties': true, // no css rule duplicates
		'declaration-empty-line-before': [
			'always', // add empty line before css classes
			{
				ignore: ['after-comment', 'after-declaration', 'first-nested'],
			},
		],
		'order/order': ['custom-properties', 'declarations'], // order. custom-props first
	},
};
