const path = require('path')

let production = process.env.NODE_ENV === 'production'

let config = {
  entry: ['./src/index', './src/home'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env'],
      //     },
      //   },
      // },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    static: './dist',
  },
}
if (production) {
  config.mode = 'production'
  config.devtool = 'inline-source-map'
}

module.exports = config
