/**
 * Provides a single, consistent place for js files to get
 * relevant paths, globs, etc pertaining to the project structure.
 */

// node imports
var path = require('path')

// directory structure
var rootDir = path.join(__dirname, '..')
var configDir = path.join(rootDir, 'config')
var buildDir = path.join(rootDir, 'build')
var sourceDir = path.join(rootDir, 'src')
var clientDir = path.join(sourceDir, 'client')
var serverDir = path.join(sourceDir, 'server')
var viewsDir = path.join(serverDir, 'views')

// build inputs
var webpackDir = path.join(configDir, 'webpack')
var clientEntry = path.join(clientDir, 'index.js')
var serverEntry = path.join(serverDir, 'index.js')

// build artifacts
var clientBuild = path.join(buildDir, 'client.js')
var serverBuild = path.join(buildDir, 'server.js')

module.exports = {
  // directories
  rootDir,
  sourceDir,
  buildDir,
  serverDir,
  viewsDir,

  // entry points
  clientEntry,
  serverEntry,
  // built files
  clientBuild,
  serverBuild,

  // globs
  clientBuildGlob: clientBuild,
  serverBuildGlob: serverBuild,
  clientTestGlob: path.join(rootDir, 'src', 'client', '**', '*.test.js'),
  serverTestGlob: path.join(rootDir, 'src', 'server', '**', '*.test.js'),

  // configuration files
  eslintConfig: path.join(configDir, 'eslint.js'),
  babelConfig: path.join(configDir, 'babelrc'),
  webpackBaseConfig: path.join(webpackDir, 'base.js'),
  webpackClientConfig: path.join(webpackDir, 'client.js'),
  webpackServerConfig: path.join(webpackDir, 'server.js'),
  webpackTestConfig: path.join(webpackDir, 'test.js'),
}
