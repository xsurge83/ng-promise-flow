const webpack = require('webpack');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

const config = {
  entry: {
    'ng-promise-flow' : './src/index',
    'demo-app' : './demo/src/app'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.ts', '.es6', '.js', '.json']
  },
  module: {
    preLoaders: [
      { test: /\.ts$/, exclude: /node_modules/, loader: 'tslint' }
    ],
    loaders: [
      { test: /\.ts$/, exclude: /node_modules/, loader: 'ts-loader' }
    ]
  }
};


if (!isProd) {
  config.devtool = 'source-map';
  config.plugins = [
    new webpack.DefinePlugin({
      'WEBPACK_ENV': '"dev"'
    })
  ]
} else {
  config.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      comments: false
    }),
    new webpack.DefinePlugin({
      'WEBPACK_ENV': '"production"'
    })
    // new CopyWebpackPlugin([{ from: './src/index.html' }], {})
  ];
}

module.exports = config;