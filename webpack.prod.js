const path = require('path');
const commonConfig = require('./webpack.config');

module.exports = {
  ...commonConfig,
  mode: 'production',
  optimization: {
    chunkIds: 'named',
  },
  module: {
    rules: [
      ...commonConfig.module.rules,
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
