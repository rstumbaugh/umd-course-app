const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig =  new HtmlWebpackPlugin({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject: 'body'
});

const config = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './js/app.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    alias: {
      styles: path.resolve(__dirname, './src/scss/'),
      images: path.resolve(__dirname, './src/img/'),
      components: path.resolve(__dirname, './src/js/components/'),
      pages: path.resolve(__dirname, './src/js/pages/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['react'] },
        }],
      }
      {
        test: /\.(sass|scss)$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: ['./scss']
          }
        }]
      },
      {
        test: /\.(png|svg|jpe?g)$/,
        use: 'file-loader'
      }
    ],
  },
  plugins: [ HtmlWebpackPluginConfig ],
  devServer: {
    contentBase: path.resolve(__dirname, './src'),
    historyApiFallback: true
  }
};

export default config;
