const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = {
  entry:
    "./src/index.js"
  ,
  output: {
    path: path.join(__dirname, './public'),
    filename: './bundle.js',
    publicPath: '/'
  },
  resolve: {
    modules: ['node_modules', 'node_modules'],
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
        'react-native': 'react-native-web'
    },
    plugins: [
        new ModuleScopePlugin(path.join(__dirname, './src')),
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        exclude: [
            /\.html$/,
            /\.(js|jsx)$/,
            /\.css$/,
            /\.json$/,
            /\.bmp$/,
            /\.gif$/,
            /\.jpe?g$/,
            /\.png$/,
        ],
        loader: require.resolve('file-loader'),
        options: {
            name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, './src'),
        loader: require.resolve('babel-loader'),
        options: {
          presets: ['es2015', 'react', 'env'],
          plugins: [ "transform-object-rest-spread",
              "transform-class-properties",
              "emotion"
          ],
          compact: true,
        },
      },
      {
        test: /\.css$/,
        use: [
            require.resolve('style-loader'),
            {
                loader: require.resolve('css-loader'),
                options: {
                    importLoaders: 1,
                },
            },
            {
                loader: require.resolve('postcss-loader'),
                options: {
                    plugins: () => [
                        require('postcss-flexbugs-fixes'),
                        autoprefixer({
                            browsers: [
                                '>1%',
                                'last 4 versions',
                                'Firefox ESR',
                                'not ie < 9',
                            ],
                            flexbox: 'no-2009',
                        }),
                    ],
                },
            },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        inject: true,
        template: './public/index.html',
    }),
    new webpack.NamedModulesPlugin(),
    new CaseSensitivePathsPlugin(),
  ],
  target: 'node'
};