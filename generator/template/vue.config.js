// import { Configuration } from 'webpack' // NOTE: 编写 webpack 配置时开启, 项目运行记得注释
// 配置参考: https://cli.vuejs.org/zh/config/#%E5%85%A8%E5%B1%80-cli-%E9%85%8D%E7%BD%AE

// 生产环境构建输出文件的目录
const outputDir = 'dist'
// 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
const assetsDir = 'assets'
// 针对前端单独部署时的情况，非部署到java容器中
const publicPath = './' // 默认为 / 表示服务器根路径

const Webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)

/**
 * @type { Configuration }
 */
module.exports = {
  outputDir,
  assetsDir,
  publicPath,

  devServer: {
    open: true,

    // 添加代理
    // proxy: {
    // '/api': {
    //   target: 'http://example.com',
    //   changeOrigin: true,
    //   ws: false,
    //   secure: false,
    //   pathRewrite: {
    //     '^/api': '',
    //   },
    // },
    // },
  },

  productionSourceMap: false, // 不需要生产环境 sourceMap

  configureWebpack: () => {
    if (process.env.NODE_ENV === 'development') {
      plugins: [
        // 效果等同于 cheap-module-eval-souce-map - vue-cli 默认使用模式
        new Webpack.EvalSourceMapDevToolPlugin({
          exclude: /node_modules/,
          module: true,
          columns: false,
        }),
      ]
    } else {
      plugins: [new CleanWebpackPlugin()]
    }
  },

  chainWebpack: (config) => {
    // 修复HMR
    config.resolve.symlinks(true)

    // 配置别名
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@style', resolve('src/style'))
      .set('@components', resolve('src/components'))
      .set('@utils', resolve('src/utils'))
      .set('@views', resolve('src/views'))
      .set('@router', resolve('src/router'))
      .set('@store', resolve('src/store'))

    // 修改 html-webpack-plugin 插件选项
    config.plugin('html').tap((args) => {
      args[0].title = 'vue cli preset for vue2.x @RenXusheng233'
      return args
    })

    // 修改 copy-webpack-plugin 插件选项 - 添加 /static 静态资源
    config.plugin('copy').tap((args) => {
      args[0].push({
        from: path.resolve(__dirname, 'static'),
        to: path.resolve(__dirname, 'dist', 'static'),
        toType: 'dir',
      })
      return args
    })
  },

  // 第三方插件选项
  pluginOptions: {},
}
