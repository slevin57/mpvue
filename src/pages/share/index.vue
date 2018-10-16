<template>
    <div class="page-share">
        <section class="video-wrapper">
            <video src="https://resources.laihua.com/web4/homeindexvideo.mp4"></video>
        </section>
        <section class="info-wrapper">
            <div class="user-info">
                <img src="https://www.laihua.com/_nuxt/img/defaulthead.e73fb97.jpg" alt="" class="avanta">
                <span class="id">ID</span>
            </div>
            <div class="share">分享</div>
        </section>
        <section class="ad-wrapper">
            d
        </section>
    </div>
</template>
<script>
    export default {

    }
</script>

<style scoped lang="scss">
.page-share{
    display: flex;
    flex-direction: column;
    width: 750rpx;
}
.video-wrapper{
    font-size: 14px;
    box-sizing: border-box;
    width: 750rpx;
    height: 504rpx;
    video{
        object-fit: fill;
        width: 100%;
        height: 100%;
    }
}
.info-wrapper{
    height: 107rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 26rpx;
    background-color: #151515;
    color: #fff;
    .user-info{
        width: 166rpx;
        height: 75rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        img{
            display: inline-block;
            border-radius: 50%;
            width: 75rpx;
            height: 75rpx;
        }
    }
}
.ad-wrapper{
    width: 100%;
    flex: 1;
    // background-color:red;
    height: 681rpx;
}
</style>
