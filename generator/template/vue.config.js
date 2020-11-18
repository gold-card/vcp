const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  devServer: {
    open: true,
    hot: true,
  },

  // vue-cli 默认 开发环境下使用cheap-module-eval-source-map, 生产环境下不开启sourceMap
  // configureWebpack: {
  //   devtool: false,
  // },

  // configureWebpack: () => {
  //   if (process.env.NODE_ENV === 'development') {
  //     plugins: [
  //       // 效果等同于 cheap-module-cheap-souce-map
  //       new Webpack.EvalSourceMapDevToolPlugin({
  //         exclude: /node_modules/,
  //         module: true,
  //         columns: false,
  //       }),
  //     ]
  //   }
  // },

  configureWebpack: () => {
    if (process.env.NODE_ENV === 'development') {
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          title: 'vue cli preset for vue2.x',
          template: './public/index.html',
        }),
        // 需要拷贝的目录或路径
        new CopyWebpackPlugin(['static']),
      ]
    }
  },
}
