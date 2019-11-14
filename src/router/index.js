import Vue from 'vue'
import Router from 'vue-router'
// import Foo from './Foo.vue'
const Home = () => import('../component/home/index.vue')
Vue.use(Router)

export function createRouter() {
    return new Router({
        // 要记得增加mode属性，因为#后面的内容不会发送至服务器，服务器不知道请求的是哪一个路由
        mode: 'history',
        routes: [
            {
                path: '/home',
                name: 'Home',
                components: Home
            }
        ]
    })
}