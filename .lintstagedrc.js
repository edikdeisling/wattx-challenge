module.exports = {
	'*.{ts,js}': ['eslint --fix'],
	'*.css': ['prettier --write', 'stylelint --fix'],
	'*.{html,yml,yaml,json}': ['prettier --write'],
};
