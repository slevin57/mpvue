<script>
import {mapMutations} from 'vuex'
export default {
    created () {
    },
    onLaunch () {
        
    },
    mounted () {
        // wx.checkSession({
        //     success() {
        //         // session_key 未过期，并且在本生命周期一直有效
        //     wx.login({
        //         success (res) {
        //             if (res.code){
        //                 self.code = res.code;
        //                 self.wxGetUserInfo(res.code);
        //             }
        //         },
        //         fail (err) {
        //             console.log(`wx.login失败:`,err);
        //             wx.hideLoading();
        //             wx.showToast({
        //                 title: 'wx.login失败'+err,
        //                 icon: 'none',
        //                 duration: 1000
        //             })                
        //         }
        //     })  
        //     },
        //     fail() {
        //         // session_key 已经失效，需要重新执行登录流程
        //         wx.redirectTo({ url: '/pages/index/main' })   
        //     }
        // })
    },
    onShow (opts) {
    },
    onHide () {
    },
    methods:{
        ...mapMutations(['changeStatus']),
    }
}
</script>

<style>
.container {
  background-color: #cccccc;
}
</style>