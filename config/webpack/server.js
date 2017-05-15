const { parse } = require('path')
const nodeExternals = require('webpack-node-externals')
const projectPaths = require('../projectPaths')

// output target
const outputTarget = parse(projectPaths.serverBuild)

module.exports = {
  target: 'node',
  entry: ['babel-polyfill', projectPaths.serverEntry],
  externals: [nodeExternals()],
  output: {
    filename: outputTarget.base,
    path: outputTarget.dir
  },
  devtool: 'cheap-module-inline-source-map',
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/
      }
    ]
  }
}