/**
 * Created on 2019/11/6.
 * 服务器代码
 */

'use strict';

const path = require('path')
const fs = require('fs')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()
const createApp = require('./dist/bundle.server.js')
const filePath = path.join(__dirname, './build/bundle.server.js')
const code = fs.readFileSync(filePath, 'utf8')
const bundleRenderer = vueServerRenderer.createBundleRenderer(code)
// const creatApp = require('./src/app')

// server.get('*', (req, res) => {
//   const context = { url: req.url }
//   const app = creatApp(context)
//
//   renderer.renderToString(app, (err, html) => {
//       // 处理错误……
//       res.end(html)
//   })
// })

server.get('*', (req, res) => {
    const context = { url: req.url }
    createApp(context).then(app => {
        renderer.renderToString(app, (err, html) => {
            if (err) {
                if (err.code === 404) {
                    res.status(404).end('Page not found')
                } else {
                    res.status(500).end('Internal Server Error')
                }
            } else {
                res.end(html)
            }
        })
    })
})

server.listen(8080, () => {
    console.log('服务器已启动')
})