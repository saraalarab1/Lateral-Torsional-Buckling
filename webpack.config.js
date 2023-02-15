const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Fix for the devtool property
  devtool: "source-map",
  // Fix for the node property
  node: {
    __dirname: true,
    __filename: true
  },
  mode: "development",
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    https: true,
    host: '0.0.0.0',
    client: {
      overlay: {
         warnings: false,
         errors: true
       }
   }
  },
  plugins: [new HtmlWebpackPlugin({ template: './dist/index.html' })],
  module: {
    rules: [
      {
        test: /\.html$/,
        // Exports HTML as string, require references to static resources
        use: ["html-loader"]
      }
    ]
  }
};