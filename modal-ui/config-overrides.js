const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  webpack: function (config, env) {
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false,
      },
    };
    config.output = {
      ...config.output, // copy all settings
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
    };
    config.optimization.runtimeChunk = false;

    //css
    config.plugins.push(new MiniCssExtractPlugin({ filename: 'main.css' }));
    return config;
  },
};
