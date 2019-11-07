/**
 * Created on 2019/11/6.
 * 服务器代码
 */

'use strict';

const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()
const creatApp = require('./src/app')

server.get('*', (req, res) => {
  const context = { url: req.url }
  const app = creatApp(context)

  renderer.renderToString(app, (err, html) => {
      // 处理错误……
      res.end(html)
  })
})

server.listen(8080, () => {
  console.log('服务器已启动')
})