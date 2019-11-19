const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const base = require('./webpack.base.config')

module.exports = merge(base, {
  entry: {
    server: path.resolve(__dirname, '../src/entry-server.js')
  },
  output: {
    libraryTarget: 'commonjs2' // 使用 Node 风格导出模块(Node-style exports)
  },
  // 这允许 webpack 以 Node 适用方式处理动态导入(dynamic import)，
  // 并且还会在编译 Vue 组件时，告知 `vue-loader` 输送面向服务器代码。
  target: 'node',
  devtool: 'source-map', // 对 bundle renderer 提供 source map 支持
  // 因为是服务端引用模块，所以不需要打包node_modules中的依赖，直接在代码中require引用就好，生成较小的bundle文件
  externals: [nodeExternals({
    // 不要外置化 webpack 需要处理的依赖模块。
    // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
    // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
    whitelist: /\.css$/
  })],
  plugins: [
    new VueSSRServerPlugin() // 打包成 vue-ssr-server-bundle.json
  ]
})
