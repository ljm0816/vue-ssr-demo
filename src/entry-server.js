/**
 * Created on 2019/11/6.
 * 服务器 entry 使用 default export 导出函数，并在每次渲染中重复调用此函数
 */

'use strict';
import { createApp } from './app'

export default (context) => {
    // const { app } = createApp()
    // return app

    return new Promise ((resolve, reject) => {
        const { app, router } = createApp()

        // 设置服务器端router的位置
      console.log('context::', context)
      // router.push(context.url)
      // const { url } = context
      // const { fullPath } = router.resolve(url).route
      // console.log('context.url::', url, fullPath)
      //
      // if (fullPath !== url) {
      //   // return reject({ url: fullPath })
      // }
      // // set router's location
      // router.push(url)

        // 等到router将可能的异步组件和钩子函数解析完
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            // 匹配不到的路由，执行reject函数，并返回 404
            if (!matchedComponents.length) {
                return reject({code: 404})
            }
            // Promise 应该resolve 应用程序实例， 以便它可以渲染
            resolve(app)
        }, reject)
    })
}