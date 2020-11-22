module.exports = (api, opts, rootOpts) => {
  // npm 命令
  api.extendPackage({
    scripts: {
      serve: 'vue-cli-service serve',
      build: 'vue-cli-service build --silent',
      lint: 'vue-cli-service lint',
    },
  })

  // 开发依赖包
  api.extendPackage({
    devDependencies: {
      'clean-webpack-plugin': '^3.0.0',
      'copy-webpack-plugin': '^6.3.2',
    },
  })

  // 项目依赖
  api.extendPackage({
    dependencies: {
      'vue-router': '^3.4.9',
      vuex: '^3.5.1',
      axios: '^0.21.0',
      [opts['ui-framework']]:
        opts['ui-framework'] === 'element-ui' ? '^2.14.1' : '^1.7.2',
    },
  })

  // 安装 echarts
  if (opts.echarts) {
    api.extendPackage({
      dependencies: {
        echarts: '^4.9.0',
      },
    })
  }

  // 删除 vue-cli3 默认目录 src
  api.render((files) => {
    Object.keys(files)
      .filter((path) => path.startsWith('src/'))
      .forEach((path) => delete files[path])
  })

  // 删除 vue-cli3 默认目录 tests
  api.render((files) => {
    Object.keys(files)
      .filter((path) => path.startsWith('tests/'))
      .forEach((path) => delete files[path])
  })

  // 渲染配置文件
  api.render('./template')

  // 屏蔽 generator 之后的文件写入操作
  api.onCreateComplete(() => {
    process.env.VUE_CLI_SKIP_WRITE = true
  })
}
