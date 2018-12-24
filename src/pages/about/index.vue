
<template>
<div class="index-page">
    <section class="sec swiper-sec">
        <swiper
        class="swiper"
        :indicator-dots="true"
        :autoplay="true"
        :interval="interval"
        :duration="duration" >
            <block v-for="(item,index) in banner" :key="index">
                <swiper-item>
                    <image :src="item.pic" class="slide-image" mode="aspectFit" />
                </swiper-item>
            </block>
        </swiper>
    </section>
    <section class="sec sec2">
        <h2 class="sec2-title">企业简介</h2>
        <div class="row desc">{{brief.desc}}</div>
        <div class="row addr">公司地址：<span>{{brief.addr}}</span></div>
        <div class="row email">公司邮箱：<span>{{brief.mail}}</span></div>
        <div class="row linkman">联系人：<span>{{brief.linkman}}</span></div>
        <div class="row tel">公司电话：<span>{{brief.tel}}</span></div>
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
            duration: 1000,
            brief: {},
            banner:[],
        }
    },
    mounted () {
        this.fetchBrief();
        this.fetchBanner();
    },
    methods:{
        fetchBrief () {
            this.$http.get('/api/get_introduction').then(res => {
                this.brief = res.data;
            })
        },
        fetchBanner () {
            this.$http.get('/api/get_intro_pic').then(res => {
                this.banner = res.data;
            })
        }
    }
}
</script>

<style scoped lang="scss">
.index-page{
    display: flex;
    flex-direction: column;
    font-size: 14px;
}
.swiper-sec{
    height: 400rpx;
    .swiper{
        height: 100%;
    }
}
.sec2{
    flex:1;
    padding-top: 100rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .row {
        padding: 10rpx 30rpx;
    }
    .sec2-title{
        font-size: 50rpx;
        text-align: center;
    }
}
.slide-image{
    display: inline-block;
    width: 100%;
    height: 100%;
}
</style>
