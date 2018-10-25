// 单页面分享页，不用处理swiper与video兼容问题
<template>
<div>
    <div v-if="direction==1" class="page-share-horizental">
        <!-- <div class="video-wrapper" :style="{height:videoHeight}"> -->
        <div class="video-wrapper">
            <video id="miniVideo" 
                :src="videoUrl" 
                :show-center-play-btn="false"
                @pause="videoPause()"></video>
            <cover-image v-if="!isPlaying" class="play-icon" src="/static/images/play.png" @click="playVideo()" />
        </div>
        <div class="info-wrapper">
            <div class="info">
                <div class="user-info">
                    <img :src="headImgUrl" alt="" class="avanta">
                    <span class="id">@{{userName}}</span>
                </div>
                <button open-type="share" class="share-img">
                    <img src="/static/images/share@2x.png" alt="">
                </button>
            </div>
        </div>
        <div class="ad-wrapper">
            <img class="bg" :src="attachUrl || '/static/images/bg@2x.png'" alt="">
            <div class="ad-container">
                <img src="/static/images/logo@2x.png" class="logo-img" alt="">
                <p class="slogan">像做PPT一样做动画视频</p>
                <div class="options">
                    <!-- <div class="option home"><img src="/static/images/home@2x.png" class="option-icon home-icon">首页</div> -->
                    <button v-if="canOpenApp" class="option app" open-type="launchApp" @error="launchAppError()"><img src="/static/images/app@2x.png" class="option-icon app-icon">APP</button>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="page-share-vertical">
        <div class="video-wrapper">
            <video id="miniVideo" 
                :src="videoUrl" 
                :show-center-play-btn="false"
                @pause="videoPause()"></video>
            <cover-image v-if="!isPlaying" class="play-icon" src="/static/images/play.png" @click="playVideo()" />
        </div>
        <div class="info-wrapper">
            <div class="info">
                <div class="user-info">
                    <img :src="headImgUrl" alt="" class="avanta">
                    <span class="id">@{{userName}}</span>
                </div>
                <button open-type="share" class="share-img">
                    <img src="/static/images/share@2x.png" alt="">
                </button>
            </div>
        </div>
        <div class="ad-wrapper">
            <img class="bg" :src="attachUrl || '/static/images/bg@2x.png'" alt="">
            <div class="ad-container">
                <img src="/static/images/logo@2x.png" class="logo-img" alt="">
                <p class="slogan">像做PPT一样做动画视频</p>
                <div class="options">
                    <!-- <div class="option home"><img src="/static/images/home@2x.png" class="option-icon home-icon">首页</div> -->
                    <button v-if="canOpenApp" class="option app" open-type="launchApp" @error="launchAppError()"><img src="/static/images/app@2x.png" class="option-icon app-icon">APP</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
    export default {
        data () {
            return {
                isPlaying: false,
                videoContxt: {},
                videoUrl:'',
                headImgUrl: '',
                userName: '',
                title:'',//视频标题
                thumbnailUrl: '',//视频封面
                attachUrl: '',//广告图片
                direction: 2,//1横屏视频2竖屏
            }
        },
        computed : {
            ...mapGetters([
                'options'
            ]),
            canOpenApp () {
                if ([1036,1069].indexOf(this.options.scene) != -1){
                    return true;
                } else {
                    return false;
                }
            },
            videoHeight () {
                if (this.direction===1){
                    return 421+'rpx'
                } else {
                    return 693+'rpx'
                }
            }
        },
        mounted () {
            this.videoContxt = wx.createVideoContext('miniVideo');
        },
        onLoad (e) {
            if(!/^[0-9]*$/.test(e.vid)) {
                this.$http.get(`/common/material?type=1&id=${e.vid}&share=1`).then(({data}) => {
                    console.log(`data:`,data);
                    if (data.code==200 && data.data){
                        this.direction = data.data.direction;
                        this.videoUrl = this.$.handleAssetsUrl(data.data.url);
                        this.headImgUrl = this.$.handleAssetsUrl(data.data.headImage);
                        this.title = data.data.title;
                        this.userName = data.data.author;
                    } else {
                        wx.showToast({
                            icon:'none',
                            title:'没有视频id',
                            duration: 2000,
                        })                        
                    }
                })
             } else {
                this.$http.get(`/share/video?id=${e.vid}`).then(({data}) => {
                    console.log(`data:`,data);
                    if (data.code==200 && data.data){
                        this.direction = data.data.direction;
                        this.videoUrl = this.$.handleAssetsUrl(data.data.url);
                        this.headImgUrl = this.$.handleAssetsUrl(data.data.headImage);
                        this.userName = data.data.author;
                        this.title = data.data.title;
                        this.thumbnailUrl = this.$.handleAssetsUrl(data.data.thumbnailUrl);
                        this.attachUrl = data.data.attachUrl ? this.$.handleAssetsUrl(data.data.attachUrl) : '';
                    } else {
                        wx.showToast({
                            icon:'none',
                            title:'没有视频id',
                            duration: 2000,
                        })
                    }
                })
             }
        },
        onShow () {
            console.log(`mpvue特有的在小程序onShow周期内获取url参数方法:`,this.$root.$mp.query);
        },
        onShareAppMessage (e) {
            let imageUrl = e.target===undefined ? '' : this.thumbnailUrl ;
            return {
                title: this.title,
                path: '/pages/sharesingle/main',
                imageUrl,
            }
        },
        methods:{
            playVideo () {
                this.videoContxt.play();
                this.isPlaying = true;
            },
            videoPause () {
                this.isPlaying = false;
            },
            launchAppError (e) {
                wx.showToast({
                    title:'未找到相关应用,请前往应用商店下载最新版来画视频APP,发挥您的创意',
                    icon:'none',
                    duration: 2500,
                    mask: true,
                })
            }
        }
    }
</script>

<style scoped lang="scss">
.page-share-horizental{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    // -webkit-box-orient:vertical;
    .video-wrapper{
        font-size: 14px;
        box-sizing: border-box;
        width: 750rpx;
        height: 421rpx;
        // height: 710rpx;
        position: relative;
        video{
            object-fit: fill;
            width: 100%;
            height: 100%;
        }
        .play-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 152rpx;
            height: 152rpx;
            display: inline-block;
        }
    }
    .info-wrapper{
        height: 107rpx;
        width: 100%;
        .info{
            width: 100%;
            height:100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            text-align: center;
            background-color: #151515;
            color: #fff;
            float: left;
            .user-info{
                height: 75rpx;
                display: flex;
                align-items: center;
                justify-content: space-between;
                img{
                    display: inline-block;
                    border-radius: 50%;
                    width: 75rpx;
                    height: 75rpx;
                    margin-right: 30rpx;
                }
            }
            .share-img{
                width: 42rpx;
                height: 44rpx;
                margin-right: 26rpx;
                position: relative;
                background-color: #151515;
                img{
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }
        }
    }
    .ad-wrapper{
        width: 100%;
        position: relative;
        flex: 1;
        flex-shrink: 1;
        // display:-webkit-box;
        .bg{
            display: block;
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
.page-share-vertical{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    // -webkit-box-orient:vertical;
    .video-wrapper{
        font-size: 14px;
        box-sizing: border-box;
        width: 750rpx;
        // height: 421rpx;
        height: 710rpx;
        position: relative;
        video{
            object-fit: fill;
            width: 100%;
            height: 100%;
        }
        .play-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 152rpx;
            height: 152rpx;
            display: inline-block;
        }
    }
    .info-wrapper{
        height: 107rpx;
        width: 100%;
        .info{
            width: 100%;
            height:100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            text-align: center;
            background-color: #151515;
            color: #fff;
            float: left;
            .user-info{
                height: 75rpx;
                display: flex;
                align-items: center;
                justify-content: space-between;
                img{
                    display: inline-block;
                    border-radius: 50%;
                    width: 75rpx;
                    height: 75rpx;
                    margin-right: 30rpx;
                }
            }
            .share-img{
                width: 42rpx;
                height: 44rpx;
                margin-right: 26rpx;
                position: relative;
                background-color: #151515;
                img{
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }
        }
    }
    .ad-wrapper{
        width: 100%;
        position: relative;
        flex: 1;
        flex-shrink: 1;
        // display:-webkit-box;
        .bg{
            display: block;
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
                width: 266rpx;
                height: 150rpx;
                margin-bottom: 40rpx;
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
</style>
