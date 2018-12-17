
<template>
<div class="index-page">
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
    <button open-type="getUserInfo" bindgetuserinfo="getUserInfo">开始使用</button>
    <section class="sec sec2">
        <navigator url="/pages/about/main" class="btn" >房抵申请</navigator >
        <navigator url="/pages/apply/main" class="btn" >房抵申请</navigator >
        <p class="comp-name">广东双盈科技信息有限公司</p>
    </section>
</div>
</template>
<script>
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
            indicatorDots: false,
            autoplay: false,
            interval: 5000,
            duration: 1000
        }
    },
    onLoad (){
        wx.login({
            success : function (a) {
                console.log(`a:`,a);
            }
        })
        wx.getSetting({
            success (res){
                console.log(`res.authSetting:`,res.authSetting);
            }
        })
        wx.getUserInfo({
            success(res) {
                console.log(`res:`,res);
                const userInfo = res.userInfo
                const nickName = userInfo.nickName
                const avatarUrl = userInfo.avatarUrl
                const gender = userInfo.gender // 性别 0：未知、1：男、2：女
                const province = userInfo.province
                const city = userInfo.city
                const country = userInfo.country
            }
        })
    },
    methods:{
        getUserInfo: function(e) {
            console.log(`e:`,e);
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
</style>
