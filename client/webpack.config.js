const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'My TE App'
      }),

      new WebpackPwaManifest({
        name: 'My TE App',
        short_name: 'TE',
        description: 'A text editor app',
        background_color: '',
        theme_color: '',
        start_url: '/',
        publicPath: '/',
        icons: [
            {
                src: path.resolve('./src/images/logo.png'),
                sizes: [192],
                destination: path.join('icons', 'android'),
              },
              {
                src: path.resolve(',/src/images/logo.png'),
                sizes: [512],
                destination: path.join('icons', 'ios'),
              }
        ]
      }),

      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: './src-sw.js'
      })
    ],

    module: {
      rules: [
        // CSS Loader
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },

        // Babel Loader
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
