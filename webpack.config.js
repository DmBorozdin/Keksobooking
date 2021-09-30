const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './source/js/main.js',
  devtool: 'source-map',
  output: {
    filename: 'js/main.bundle.js',
    path: path.resolve(__dirname, 'build'),
    assetModuleFilename: 'img/[name][ext]'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ico$|\.svg$/,
        type: 'asset/resource'
      }
    ],
  },
};
