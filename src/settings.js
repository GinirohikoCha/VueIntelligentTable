module.exports = {
  // 页面主标题
  title: 'Cha Intelligent Table',
  // 部署应用包时的基本 URL
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/',
  // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'static',
  // 前端服务端口
  // 如果使用的是80端口需要以管理员身份运行
  // 运行时选择端口可以使用下面的指令
  // port = 9527 npm run dev 或 npm run dev --port = 9527
  port: 8996,
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  // boolean | 'warning' | 'default' | 'error'
  lintOnSave: true
}
