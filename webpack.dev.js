const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  optimization: {
    usedExports: true
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    injectClient: false // this setting solved the issue
    // described here https://github.com/webpack/webpack-dev-server/issues/2484
  }
})
