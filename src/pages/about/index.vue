
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
    <section class="sec sec2">
        <h2 class="sec2-title">企业简介</h2>
        <p class="content">企业简介企业简介企业简介企业简介企业简介企业简介企业简介企业简介企业简介企业简介</p>
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
    methods:{
        
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
    padding-top: 100rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .sec2-title{
        font-size: 50rpx;
        text-align: center;
    }
    .content{
        padding: 40rpx;

    }
}
.slide-image{
    display: inline-block;
    width: 100%;
    height: 100%;
}
</style>
