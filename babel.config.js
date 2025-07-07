module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"], // or any other valid preset
    plugins: [], // remove 'babel-plugin-r' if it’s here
  };
};
