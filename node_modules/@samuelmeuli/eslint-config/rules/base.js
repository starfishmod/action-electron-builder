/*
	Rules covered by eslint-config-prettier:

	// Tab indentation
	indent: ["error", "tab"],
	"no-tabs": "off",

	// Object spacing
	"object-curly-spacing": [
		"error",
		"always",
		{
			objectsInObjects: false,
		}
	},
*/

module.exports = {
	// Enforces no braces where they can be omitted
	// Source: https://github.com/airbnb/javascript/blob/64b965efe0355c8290996ff5a675cd8fb30bf843/packages/eslint-config-airbnb-base/rules/es6.js#L15-L20
	// Re-enabled because turned off by eslint-config-prettier
	"arrow-body-style": [
		"error",
		"as-needed",
		{
			requireReturnForObjectLiteral: false,
		},
	],

	// Suggest using arrow functions as callbacks
	// Source: https://github.com/airbnb/javascript/blob/64b965efe0355c8290996ff5a675cd8fb30bf843/packages/eslint-config-airbnb-base/rules/es6.js#L100-L104
	// Re-enabled because turned off by eslint-config-prettier
	"prefer-arrow-callback": [
		"error",
		{
			allowNamedFunctions: false,
			allowUnboundThis: true,
		},
	],

	// Require curly braces even if a block contains only a single statement
	curly: ["error", "all"],

	// Object spacing
	"object-curly-newline": "off",

	// Disallow console statements (except for console.error)
	"no-console": [
		"error",
		{
			allow: ["error"],
		},
	],

	// Allow for-of loops (but keep other settings for "no-restricted-syntax" rule)
	// Source: https://github.com/airbnb/javascript/blob/b85baeafed8b66fdd9756439a0b8774860147913/packages/eslint-config-airbnb-base/rules/style.js#L334-L352
	"no-restricted-syntax": [
		"error",
		{
			selector: "ForInStatement",
			message:
				"for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
		},
		{
			selector: "LabeledStatement",
			message:
				"Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
		},
		{
			selector: "WithStatement",
			message:
				"`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
		},
	],

	// Sort imports alphabetically within groups
	"sort-imports": "off",
	"import/order": "off",
	"simple-import-sort/sort": "error",
};
