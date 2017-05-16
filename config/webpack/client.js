const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
// local imports
var projectPaths = require('../projectPaths')

// parse the output target
var outputTarget = path.parse(projectPaths.clientBuild)

const vendor_libs = [
  'react', 'react-apollo', 'babel-polyfill', 'react-dom', 'react-router-dom'
]

// Set up plugins that will be run in dev and prod environments
let plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest']
  }),
  new WebpackMd5Hash(),
  new HtmlWebpackPlugin({
    template: path.join(projectPaths.serverDir, 'views/index.html'),
    hash: true,
    inject: true,
  }),
]

let devtool = ''
let entry = ['babel-polyfill']

if (process.env.NODE_ENV === 'production') {
  plugins = [...plugins,
             new webpack.DefinePlugin({
               'process.env': {
                 NODE_ENV: JSON.stringify('production')
               }
             }),
             new webpack.LoaderOptionsPlugin({
               minimize: true,
               debug: false
             })]
} else {
  // use source maps
  devtool = 'inline-source-map'
  entry = [...entry,
           'react-hot-loader/patch',
           'webpack-dev-server/client?http://localhost:8080',
           'webpack/hot/only-dev-server'
  ]
}

module.exports = {
  entry: {
    bundle: [...entry, projectPaths.clientEntry],
    vendor: vendor_libs
  },
  output: {
    path: outputTarget.dir,
    filename: '[hash].[id].[name].js',
    publicPath: '/build/'
  },
  plugins: plugins,
  devtool: devtool,
  devServer: {
    hot: true,
    historyApiFallback: true,
    contentBase: outputTarget.dir,
    publicPath: '/build/'
  },
  module: {
    rules: [
      // this has to come first
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: projectPaths.sourceDir,
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?modules'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|ttf)$/,
        loader: 'url-loader',
        query: { limit: 10000000 },
        exclude: /node_modules/
      },
      {
        test: /\.svg/,
        use: ['svg-inline-loader'],
        exclude: /node_modules/
      },
    ]
  }
}



