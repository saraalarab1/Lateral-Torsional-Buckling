const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    // Page-specific JS
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    // Use absolute paths for assets
    publicPath: '/',
  },
  module: {
      rules: [
        {
          test: /\.html$/,
          use: ["html-loader"],
 
        },
        {
          test: /\.(jpe?g|png|mp3|wav)$/,
          use: ["file-loader"],
        },
      ]
  },
  plugins: [
    // Clean dist/ on each build
    new CleanWebpackPlugin(),
    // Add HtmlWebpackPlugin entries to build individual HTML pages
    new HtmlWebpackPlugin({
      // Input path
      template: 'src/index.html',
      // Output (within dist/)
      filename: 'index.html',
      // Inject compiled JS into <head> (as per A-Frame docs)
      inject: 'head',
      // Specify which JS files, by key in `entry`, should be injected into the page
      chunks: ['index'],
    }),
  ],
  // Settings for webpack-dev-server
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
};