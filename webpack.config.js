const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = (env, argv) => {
  return {
    mode: argv.mode !== 'production' ? 'development' : 'production',
    devtool: argv.mode !== 'production' ? 'source-map' : undefined,

    context: path.resolve(__dirname, 'src'),

    entry: {
      main: [
//        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './index.js'
      ]
    },

    output: {
      path: __dirname,
      filename: './dist/bundle.js'
    },

    resolve: {
      extensions: ['.js', '.json', '.jsx']
    },

    module: {
      rules: [{
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: 'body'
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]
  };
};

module.exports = config;