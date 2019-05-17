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
  es5ImcompatibleVersions: true,
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
  "proxy": {
    "/api": {
      "target": "http://127.0.0.1:3001",
      "changeOrigin": true,
    },
    "/user": {
      "target": "http://127.0.0.1:3001",
      "changeOrigin": true,
    },
  },
  disableCSSModules: true,
}
