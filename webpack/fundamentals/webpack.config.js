const path = require('path')

let production = process.env.NODE_ENV === 'production'

let config = {
  entry: ['./src/index', './src/home'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    port: 3000,
    static: './dist',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
}

if (production) {
  config.mode = 'production'
  config.devtool = 'inline-source-map'
}

module.exports = config
