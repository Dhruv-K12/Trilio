const { getDefaultConfig } = require("@expo/metro-config");
const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push("cjs");
config.resolver.unstable_enablePackageExports = false;
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");
module.exports = wrapWithReanimatedMetroConfig(config);
