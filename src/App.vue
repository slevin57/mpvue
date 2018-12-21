<script>
import {mapMutations} from 'vuex'
export default {
    created () {
    },
    onLaunch () {
        let self = this;
        wx.getUserInfo({
            success(res) {
                let { encryptedData,userInfo,iv } = res;

                wx.login({
                    success(res) {
                        if (res.code) {
                            self.$http.post('/api/getWxUserInfo',{
                                code: res.code,
                                encryptedData,
                                iv,
                            }).then(res => {
                                userInfo.client_id = res.data.openId;
                                self.changeStatus(userInfo);
                            })
                        } else {
                            console.log('登录失败！' + res.errMsg)
                        }
                    }
                })
            }
        }) 

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