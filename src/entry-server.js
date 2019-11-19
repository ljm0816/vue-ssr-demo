/**
 * Created on 2019/11/6.
 * 服务器 entry 使用 default export 导出函数，并在每次渲染中重复调用此函数
 */

'use strict';
import { createApp } from './app.js'

export default (context) => {
    // const { app } = createApp()
    // return app
  return new Promise ((resolve, reject) => {
    const { app, router } = createApp()
    // 设置服务器端router的位置
    console.log('context::', context)
    // 根据匹配到的路径进行路由跳转
    router.push(context.url)

    // 等到router将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      // 查找匹配到的组件
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行reject函数，并返回 404
      if (!matchedComponents.length) {
        return reject({
          code: 404,
          msg: '未找到页面'
        })
      }
      // Promise 应该resolve 应用程序实例， 以便它可以渲染
      resolve(app)
    }, reject)
  })
}