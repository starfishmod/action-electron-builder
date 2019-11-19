const baseRules = require("./rules/base");
const reactRules = require("./rules/react");
const typescriptRules = require("./rules/typescript");

const parser = "@typescript-eslint/parser";

const configs = [
	"airbnb",
	"plugin:@typescript-eslint/recommended",
	"plugin:import/typescript",
	// Disable rules which might conflict with Prettier
	"prettier",
	"prettier/@typescript-eslint",
	"prettier/react",
];

const plugins = ["simple-import-sort"];

module.exports = {
	parser,
	extends: configs,
	plugins,
	rules: {
		...baseRules,
		...reactRules,
		...typescriptRules,
	},
};
