/**
 * Created on 2019/11/6.
 * app.js 为通用入口
 */

'use strict';
const Vue = require('vue')

/**
 * 暴露一个可以重复执行的工厂函数, 为每个请求创建一个新的根 Vue 实例
 * @param context
 */
modules.exports = function createApp(context) {
  return new Vue({
    data: {
      url: context.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })

}
