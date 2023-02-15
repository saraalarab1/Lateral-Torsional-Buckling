const path = require('path');

module.exports = {
  mode: "development",
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    https: true,
    host: '0.0.0.0',
    overlay: {
      warnings: false,
      errors: true
    }
  },
};