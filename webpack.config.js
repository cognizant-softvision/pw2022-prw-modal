const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    'modal': './src/webcomponents/modal/modal.js',
    'index': './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: [
          path.resolve(__dirname, './src/webcomponents/')
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader'
        ],
        exclude: [
          path.resolve(__dirname, './src/webcomponents/')
        ]
      },
      {
        test: /\.(html|css)$/,
        type: 'asset/source',
        include: [
          path.resolve(__dirname, './src/webcomponents')
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index'],
      template: './src/index.html'
    })
  ]
}