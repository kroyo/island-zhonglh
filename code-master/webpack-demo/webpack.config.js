const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',  //production
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        include: path.join(__dirname, 'src'),
        exclude: /node_modlues/
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html'
    })
  ],
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, 'dist')
  }
}