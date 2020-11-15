module.exports = [
  // 选择ui框架
  {
    name: 'ui-framework',
    type: 'list',
    message: 'Please Choose UI Framework',
    choices: [
      {
        name: 'Element UI',
        value: 'element-ui',
      },
      {
        name: 'Ant Design Vue',
        value: 'ant-design-vue',
      },
    ],
    default: 'element-ui',
  },
  // 是否使用echarts
  {
    name: 'echarts',
    type: 'confirm',
    message: `Install Echarts ?`,
    default: true,
  },
]
