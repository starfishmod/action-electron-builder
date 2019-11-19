const baseRules = require("./rules/base");

const configs = [
	"airbnb-base",
	// Disable rules which might conflict with Prettier
	"prettier",
];

const plugins = ["simple-import-sort"];

module.exports = {
	extends: configs,
	plugins,
	rules: baseRules,
};
