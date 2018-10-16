import Vue from 'vue'
import App from './App'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'

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