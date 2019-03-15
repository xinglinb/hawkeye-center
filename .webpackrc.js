import path from 'path'

export default {
  // outputPath: '../../node/Hawkeye/app/public',
  entry: {
    hawkeye: './src/pages/hawkeye-manage/index.js',
    login: './src/pages/login/index.js'
  },
  alias: {
    ROOT: path.resolve(__dirname, 'src/'),
  },
  extraBabelPlugins: [
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": true // `style: true` 会加载 less 文件
    }]
  ],
  disableCSSModules: true,
  theme: {
    "primary-color": "#336696"
  }
}
