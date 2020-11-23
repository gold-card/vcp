// import { Configuration } from 'webpack' // NOTE: 编写 webpack 配置时开启, 项目运行记得注释

// 生产环境构建输出文件的目录
const outputDir = 'dist'
// 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
const assetsDir = 'assets'
// 针对前端单独部署时的情况，非部署到java容器中
const publicPath = './' // 默认为 / 表示服务器根路径

const Webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

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

  // vue-cli 默认 开发环境下使用cheap-module-eval-source-map, 生产环境下不开启sourceMap
  configureWebpack: {
    devtool: false,
  },

  configureWebpack: () => {
    if (process.env.NODE_ENV === 'development') {
      plugins: [
        // 效果等同于 cheap-module-eval-souce-map
        new Webpack.EvalSourceMapDevToolPlugin({
          exclude: /node_modules/,
          module: true,
          columns: false,
        }),
      ]
    } else {
      plugins: [
        new CleanWebpackPlugin(),
        // 需要拷贝的目录或路径
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, 'static'),
              to: path.resolve(__dirname, 'dist', 'static'),
            },
          ],
        }),
      ]
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
  },
}
