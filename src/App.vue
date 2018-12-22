<script>
import {mapMutations} from 'vuex'
export default {
    created () {
    },
    onLaunch () {

        // let self = this;
        // wx.login({
        //     success(logres) {
        //         if (logres.code) {
        //             console.log(`logres.code:`,logres.code);
        //             wx.getUserInfo({
        //                 success(getres) {
        //                     console.log(`getres:`,getres);
        //                     let { encryptedData,userInfo,iv } = getres;
        //                     self.$http.post('/api/getWxUserInfo',{
        //                         code: res.code,
        //                         encryptedData,
        //                         iv,
        //                     }).then(res => {
        //                         console.log(`res:`,res);
        //                         userInfo.client_id = res.data.openId;
        //                         self.changeStatus(userInfo);
        //                     })                            
        //                 }
        //             })
        //         } else {
        //             console.log('登录失败！' + res.errMsg)
        //         }
        //     }
        // })


        // wx.getUserInfo({
        //     success(res) {
        //         let { encryptedData,userInfo,iv } = res;

        //         wx.login({
        //             success(res) {
        //                 console.log(`res:`,res);
        //                 if (res.code) {
        //                     self.$http.post('/api/getWxUserInfo',{
        //                         code: res.code,
        //                         encryptedData,
        //                         iv,
        //                     }).then(res => {
        //                         userInfo.client_id = res.data.openId;
        //                         self.changeStatus(userInfo);
        //                     })
        //                 } else {
        //                     console.log('登录失败！' + res.errMsg)
        //                 }
        //             },
        //             fail (err) {
        //                 console.log(`err:`,err);
        //             }
        //         })
        //     }
        // }) 
    },
    mounted () {

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