/**
 * Created on 2019/11/6.
 * 服务器代码
 */

'use strict';

const path = require('path')
const fs = require('fs')
const server = require('express')()
// const createApp = require('./dist/bundle.server.js')
const filePath = path.join(__dirname, './dist/bundle.server.js')
const code = fs.readFileSync(filePath, 'utf8')
const renderer = require('vue-server-renderer').createBundleRenderer(code)

server.get('*', (req, res) => {
  const context = { url: req.url }
  renderer.renderToString((err, html) => {
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found')
      } else {
        res.status(500).end('Internal Server Error')
      }
    } else {
      console.log(html)
      res.end(html)
    }
  })
})

server.listen(8080, () => {
    console.log('服务器已启动')
})