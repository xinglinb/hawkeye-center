import path from 'path'

export default {
  // outputPath: '../../node/Hawkeye/app/public',
  entry: {
    index: './src/index.js',
    sdk: './sdk/index.js',
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
  theme: {
    // "primary-color": "#336696",
  },
  disableCSSModules: true,
}
