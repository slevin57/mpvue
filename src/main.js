import Vue from 'vue'
import App from './App'
import store from './store'
import utils from './utils'

Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'

let Fly = require("flyio/dist/npm/wx") 
let fly = new Fly;
fly.interceptors.request.use((config, promise) => {
    //给所有请求添加自定义header
    config.headers["X-Tag"] = "flyio";
    return config;
})
const BASE_API = process.env.NODE_ENV == 'development' ? 'https://test2.laihua.com/' : 'https://wbapi4.laihua.com/'
fly.config.baseURL = BASE_API;
Vue.prototype.$http = fly //将fly实例挂在vue原型上

Vue.prototype.$ = utils;

const app = new Vue(App)
app.$mount()

export default {
    config : {
        pages:[
            // // 带有^符号的路径表示为首页
            // '^pages/index/main',
            // "pages/list/main"
        ],
        // widow: {
        //     "backgroundTextStyle": "light",
        //     "navigationBarBackgroundColor": "#fff",
        //     "navigationBarTitleText": "bbb",
        //     "navigationBarTextStyle": "black"
        // }
    }
}