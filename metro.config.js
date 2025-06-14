// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const config = getDefaultConfig(__dirname);

// fix the export default issue/error
// allow .cjs imports
config.resolver.sourceExts.push("cjs");
// <-- this line is the key fix
config.resolver.unstable_enablePackageExports = false;

module.exports = config;

const { withNativeWind } = require("nativewind/metro");

module.exports = withNativeWind(config, { input: "./global.css" });
