const path = require('path')
module.exports = {
    // 此处告知 server bundle 使用Node风格导出模块（Node-style exports）
    target: 'node',
    entry: {
        app: './src/entry-server.js'
    },
    output: {
      //指定libraryTarget的类型为commonjs2，用来指定代码export出去的入口的形式。
      // 在node.js中模块是module.exports = {...}，commonjs2打包出来的代码出口形式就类似于此。
      libraryTarget: 'commonjs2',
      path: path.resolve(__dirname, './dist'), // 打包出的路径
      filename: 'bundle.server.js' // 打包最终的文件名，这个文件是给 node 服务器使用的
    },
    module: {
      // 因为使用webpack2，这里必须是rules，如果使用use，
      // 会报个错：vue this._init is not a function
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: path.resolve(__dirname, ''),
          exclude: /node_modules/,
          options: {
            presets: ['es2015']
          }
        },
        {
          test: /\.less$/,
          loader: "style-loader!css-loader!less-loader"
        }
      ]
    },
    plugins: [],
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.runtime.esm.js'
      }
    }
}