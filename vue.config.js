'use strict'
const Settings = require('./src/settings')

const resolve = dir => require('path').join(__dirname, dir)

// https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: Settings.publicPath,
  outputDir: Settings.outputDir,
  assetsDir: Settings.assetsDir,
  lintOnSave: Settings.lintOnSave,
  productionSourceMap: false,
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    port: process.env.port || process.env.npm_config_port || Settings.port || 8996,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://localhost:8080', // 后端服务器地址
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: Settings.title || 'Cha Intelligent Table',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
