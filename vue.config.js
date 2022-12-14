const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
module.exports = {
  // webpack devServer 提供了代理的功能
  devServer: {
    port: 8888,
    proxy: {
      // 当地址中包含 /api的时候
      '/api': {
        target: 'https://api.imooc-admin.lgdsunday.club/',
        changeOrigin: true // 是否跨域
      }
    }
  },
  chainWebpack (config) {
    // 设置 svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config.module
      .rule('element-plus-2')
      .test(/\.mjs$/)
      .type('javascript/auto')
      .include.add(/node_modules/)
      .end()
  }
}
