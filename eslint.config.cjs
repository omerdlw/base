const { FlatCompat } = require("@eslint/eslintrc");
const legacy = require("./.eslintrc.json");

const compat = new FlatCompat({
  // preserve the default behavior
});

const extendsConfig = Array.isArray(legacy.extends)
  ? legacy.extends
  : legacy.extends
  ? [legacy.extends]
  : [];

const plugins = Array.isArray(legacy.plugins)
  ? legacy.plugins
  : legacy.plugins
  ? [legacy.plugins]
  : [];

module.exports = [
  // load extends from legacy config
  ...extendsConfig.flatMap((e) => compat.extends(e)),
  // load plugins from legacy config
  ...plugins.flatMap((p) => compat.plugins(p)),
  // finally apply the rules
  {
    rules: legacy.rules || {},
  },
];
