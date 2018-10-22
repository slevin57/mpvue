<template>
    <div class="page-share">
        <swiper vertical :indicator-dots="indicatorDots" :duration="duration" :current="current" style="height:100vh;">
            <swiper-item class="first-page">
                <div class="video-wrapper">
                    <div v-if="!playing" class="poster">
                        <img class="thumbnail" src="https://www.laihua.com/_nuxt/img/defaulthead.e73fb97.jpg">
                        <img class="play-icon" src="/static/images/play.png"  @click="toggleVideo" alt="">    
                    </div>
                    <video v-else id="miniVideo" src="https://resources.laihua.com/web4/homeindexvideo.mp4" controls 
                        @pause="pauseHandler"></video>
                </div>
                <div class="info-wrapper">
                    <div class="user-info">
                        <img src="https://www.laihua.com/_nuxt/img/defaulthead.e73fb97.jpg" alt="" class="avanta">
                        <span class="id">ID</span>
                    </div>
                    <img class="share-img" src="/static/images/share@2x.png" alt="">
                </div>
                <div class="ad-wrapper">
                    <img class="bg" src="/static/images/bg@2x.png" alt="">
                    <div class="ad-container">
                        <img src="/static/images/logo@2x.png" class="logo-img" alt="">
                        <p class="slogan">像做PPT一样做动画视频</p>
                        <img src="/static/images/next@2x.png" class="next-img" alt="" @click="nextPage()">
                        <a href="/pages/video/main">全屏视频测试页</a>
                        <a href="/pages/sharesingle/main">单页面分享测试页</a>
                        <div class="options">
                            <div class="option home"><img src="/static/images/home@2x.png" class="option-icon home-icon">首页</div>
                            <div class="option app"><img src="/static/images/app@2x.png" class="option-icon app-icon">APP</div>
                        </div>
                    </div>
                </div>
            </swiper-item>
            <swiper-item class="second-page">
                <div class="outer">
                    <video class="sss" id="fullVideo" src="https://resources.laihua.com/web4/homeindexvideo.mp4" controls ></video>
                </div>
            </swiper-item>
        </swiper>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                indicatorDots: false,
                duration: 500,
                current: 0,
                playing: false,
                videoContxt: {},
                fullVideo: {},
            }
        },
        mounted () {
            this.videoContxt = wx.createVideoContext('miniVideo');
            this.fullVideo = wx.createVideoContext('fullVideo');
            // this.fullVideo.requestFullScreen(90);
        },
        methods:{
            toggleVideo () {
                this.playing = true;
                this.videoContxt.play();
            },
            pauseHandler () {
                this.videoContxt.stop();
                this.playing = false;
            },
            nextPage () {
                this.current = 1;
            }
        }
    }
</script>

<style scoped lang="scss">
.first-page{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    .video-wrapper{
        font-size: 14px;
        box-sizing: border-box;
        width: 750rpx;
        height: 504rpx;
        position: relative;
        .poster {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            .thumbnail{
                width: 100%;
                height: 100%;
            }
            .play-icon{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 152rpx;
                height: 152rpx;
                display: inline-block;
            }
        }
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
        .share-img{
            width: 42rpx;
            height: 44rpx;
            margin-right: 26rpx;
        }
    }
    .ad-wrapper{
        width: 100%;
        flex: 1;
        position: relative;
        .bg{
            display: inline-block;
            width: 100%;
            height: 100%;
        }
        .ad-container{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .logo-img{
                display: inline-block;
                width: 281rpx;
                height: 150rpx;
                margin-bottom: 59rpx;
            }
            .slogan{
                font-size: 16px;
                color: #bebebe;
            }
            .next-img{
                width: 33rpx;
                height: 36rpx;
                position: fixed;
                bottom: 49rpx;
            }
            .options {
                position: fixed;
                right: 0;
                bottom: 121rpx;
                .option{
                    width: 180rpx;
                    height: 77rpx;
                    margin-bottom: 31rpx;
                    background: #ececec;
                    color: #5287ff;
                    border-radius:39rpx 0 0 39rpx ;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .home-icon{
                    width: 47rpx;
                    height: 40rpx;
                    margin-right: 20rpx;
                }
                .app-icon{
                    width: 26rpx;
                    height: 42rpx;
                    margin-right: 20rpx;
                }
            }
        }
    }
}
.second-page{
    background-color: pink;
    .outer{
        width: 100wh;
        height: 100vh;
        position: relative;
    }
    .sss{
        // transform: rotate(-90deg);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

</style>
