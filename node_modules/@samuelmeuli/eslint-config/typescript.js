const baseRules = require("./rules/base");
const typescriptRules = require("./rules/typescript");

const parser = "@typescript-eslint/parser";

const configs = [
	"airbnb-base",
	"plugin:@typescript-eslint/recommended",
	"plugin:import/typescript",
	// Disable rules which might conflict with Prettier
	"prettier",
	"prettier/@typescript-eslint",
];

const plugins = ["simple-import-sort"];

module.exports = {
	parser,
	extends: configs,
	plugins,
	rules: {
		...baseRules,
		...typescriptRules,
	},
};
