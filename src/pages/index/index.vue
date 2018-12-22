
<template>
<div class="index-page">
    <sectionn v-if="!canGetInfo" class="sec-mask">
        <button v-show="!loading" type="primary" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfoClick">获取权限</button>
        <div v-if="newClient">
            填写手机号：<input type="number" v-model="phone">
            <div class="save-phone" @click="savePhone()">
                保存手机号
            </div>
        </div>
    </sectionn>
    <section class="sec swiper-sec">
        <swiper
        class="swiper"
        :indicator-dots="true"
        :autoplay="true"
        :interval="interval"
        :duration="duration" >
            <block v-for="(item,index) in imgs" :key="index">
                <swiper-item>
                    <image :src="item.url" class="slide-image" mode="aspectFit" />
                </swiper-item>
            </block>
        </swiper>
    </section>
    <section class="sec sec2">
        <!-- <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfoClick">获取权限</button> -->
        <navigator url="/pages/apply/main" class="btn" >房抵申请</navigator >
        <navigator url="/pages/about/main" class="btn" >关于双赢</navigator >
        <navigator url="/pages/client/main" class="btn" >个人中心</navigator >
        <p class="comp-name">广东双盈科技信息有限公司</p>
    </section>
</div>
</template>
<script>
import {mapMutations} from 'vuex'

// serId 就是那个相对应的client_id 或 agent_id 或 capital_id
export default {
    data () {
        return {
            imgs: [
                {
                    url:'/static/images/test.jpg',
                },
                {
                    url:'/static/images/test.jpg',
                },
            ],
            phone: '',
            indicatorDots: false,
            autoplay: false,
            interval: 5000,
            duration: 1000,
            canGetInfo: false, //授权状态，能否获取用户信息
            code: '',//wx.login拿回来的code
            loading: true,
            newClient: false,//新用户
        }
    },
    onLoad (){

    },
    mounted (){
        this.loading = true;
        this.canGetInfo = false;
        const self = this;
        wx.showLoading({
            title: '请求授权中...',
        })
        wx.login({
            success (res) {
                if (res.code){
                    self.code = res.code;
                    self.wxGetUserInfo(res.code);
                }
            },
            fail (err) {
                console.log(`wx.login失败:`,err);
                wx.hideLoading();
                wx.showToast({
                    title: 'wx.login失败'+err,
                    icon: 'none',
                    duration: 1000
                })                
            }
        })  
    },
    methods:{
        ...mapMutations(['changeStatus']),
        wxGetUserInfo (code) {
            const self = this;
            wx.getUserInfo({
                withCredentials: true,
                success (res) {
                    let { encryptedData,userInfo,iv } = res;
                    self.$http.post('/api/getWxUserInfo',{
                        code,
                        encryptedData,
                        iv,
                    }).then(res => {
                        console.log(`后台交互拿回数据:`,res);
                        userInfo.client_id = res.data.userId;
                        userInfo.status = res.data.status;
                        self.changeStatus(userInfo);
                        wx.hideLoading();
                        // self.canGetInfo = true;
                        let first = true;
                        if (first) {
                            self.newClient = true;
                        } else {
                            self.canGetInfo = true;
                            // 根据身份跳转
                            self.matchPage(res.data.status);
                        }
                    }).catch(err => {
                        console.log(`自动请求api失败 err:`,err);
                        wx.hideLoading();
                        self.loading = false;
                    })  
                },
                fail (err) {
                    console.log('自动wx.getUserInfo失败:',err);
                    self.loading = false;
                    wx.hideLoading();
                }
            })
        },
        getUserInfoClick(){
            // console.log('click事件首先触发')
            this.loading = true;
            wx.showLoading({
                title: '请求授权中...',
            })
            // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
            // console.log(wx.canIUse('button.open-type.getUserInfo'))
            // if(wx.canIUse('button.open-type.getUserInfo')){
            //     // 用户版本可用
            //     console.log('当前版本open-type.getUserInfo可用:',);
            // }else{
            //     console.log('请升级微信版本')
            // }
        },
        bindGetUserInfo(e) {
            console.log(`bindGetUserInfo:`,e);
            const self = this;
            if (e.mp.detail.userInfo){
                console.log('用户按了允许授权按钮')
                let { encryptedData,userInfo,iv } = e.mp.detail;
                self.$http.post('/api/getWxUserInfo',{
                    code:self.code,
                    encryptedData,
                    iv,
                }).then(res => {
                    console.log(`后台交互拿回数据:`,res);
                    userInfo.client_id = res.data.userId;
                    userInfo.status = res.data.status;
                    self.changeStatus(userInfo);
                    self.canGetInfo = true;
                    self.loading = false;
                    wx.hideLoading();
                    // 这里做用户跳转
                    self.matchPage(res.data.status);
                }).catch(err => {
                    self.loading = false;
                    wx.hideLoading();
                    console.log(`api请求出错:`,err);
                })  
            } else {
                //用户按了拒绝按钮
                console.log('用户按了拒绝按钮');
                self.loading = false;
                wx.hideLoading();
            }
        },
        getSetting(){
            const self = this;
            wx.getSetting({
                success: function(res){
                    if (res.authSetting['scope.userInfo']) {
                        self.canGetInfo = true;
                        wx.getUserInfo({
                            success: function(res) {
                                //用户已经授权过
                                console.log('用户已经授权过')
                            }
                        })
                    }else{
                        console.log('用户还未授权过')
                    }
                },
                fail (err) {
                    console.log(`未授权 err:`,err);
                }
            })

        },
        // 根据用户身份跳转不同页面
        // status=0:普通用户; status=1:业务员; status=2:资金方
        matchPage (status) {
            switch (status) {
                case 0:                              
                    break;
                case 1:
                    wx.redirectTo({ url: '/pages/salesman/main' })   
                    break;
                case 2:
                    wx.redirectTo({ url: '/pages/investman/main' })   
                    break;
            }
        },
        savePhone () {

        }
    }
}
</script>

<style scoped lang="scss">
.index-page{
    display: flex;
    flex-direction: column;
}
.swiper-sec{
    height: 400rpx;
    .swiper{
        height: 100%;
    }
}
.sec2{
    flex:1;
    padding-top: 200rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .btn{
        width: 70%;
        height: 100rpx;
        background-color:#259b24;
        color: #fff; 
        margin: 0 auto 80rpx;
        border-radius: 4px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .comp-name{
        position: fixed;
        width: 100%;
        text-align: center;
        bottom: 50rpx;
    }
}
.slide-image{
    display: inline-block;
    width: 100%;
    height: 100%;
}
.sec-mask {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 1;
    button {
        width: 50%;
    }
}
</style>
