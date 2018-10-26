// 单页面分享页，不用处理swiper与video兼容问题
<template>
<div>
    <div :class="[direction==1 ? 'page-share-horizental' : 'page-share-vertical']">
        <div class="video-wrapper">
            <video id="miniVideo" 
                :src="videoUrl" 
                :show-center-play-btn="false"
                @pause="videoPauseHdl()"
                @play="videoPlayHdl()"></video>
            <cover-image v-if="!isPlaying" class="play-icon" src="/static/images/play.png" @click="playVideo()" />
        </div>
        <div class="info-wrapper">
            <div class="info">
                <div class="user-info">
                    <img :src="headImgUrl" alt="" class="avanta">
                    <span class="username">@{{userName}}</span>
                    <a href="/pages/share/main?vid=0455981641153">自定义分享</a>
                    <!-- <a href="/pages/share/main?vid=41358">基础分享</a> -->
                </div>
                <button open-type="share" class="share-img">
                    <img src="/static/images/share@2x.png" alt="">
                </button>
            </div>
        </div>
        <div class="ad-wrapper">
            <img class="bg" :src="attachUrl || '/static/images/bg@2x.png'" alt="">
            <div class="ad-container">
                <img v-if="!isCustom" src="/static/images/logo@2x.png" class="logo-img" alt="">
                <p v-if="!isCustom" class="slogan">像做PPT一样做动画视频</p>
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
                id:'',//视频id
                source: '',// 小程序来源
                isCustom: false,//是否为自定义分享
                isPlaying: false,
                videoContxt: {},
                videoUrl:'',
                headImgUrl: '',
                userName: '',
                thumbnailUrl: '',//视频封面
                attachUrl: '',//广告图片
                direction: 1,//1横屏视频2竖屏
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
        },
        mounted () {
            this.videoContxt = wx.createVideoContext('miniVideo');
        },
        onLoad (query) {

        },
        onShow () {
            console.log(`mpvue特有的在小程序onShow周期内获取url参数方法:`,this.$root.$mp.query);
            let query = this.$root.$mp.query;
            if (query.vid){//app分享出来的卡片进入
                this.source = 'vid';
                this.id = query.vid;
                this.isCustom = /^[0-9]*$/.test(this.id) ? true : false;
                
            } else if(query.scene){//扫小程序码进入
                this.source = 'scene';
                this.id = decodeURIComponent(query.scene);
                //根据id长度区分普通分享与自定义分享：大于10的为自定义分享，小于10为普通分享
                this.isCustom = this.id.length>10 ? true : false;
            } else {
                wx.navigateTo({
                    url:'/pages/error/main'
                })
                return;
            }
            console.log(`query:`,query);
            console.log(`this.source:`,this.source);
            console.log(`this.isCustom:`,this.isCustom);
            if(this.isCustom) {
                //  自定义分享
                this.$http.get(`/share/video?id=${this.id}`).then(({data}) => {
                    console.log(`自定义分享data:`,data);
                    if (data.code==200 && data.data){

                        this.setNavigationBarTitle(data.data.title);
                        this.direction = data.data.direction;
                        this.videoUrl = this.$.handleAssetsUrl(data.data.url);
                        this.headImgUrl = this.$.handleAssetsUrl(data.data.headImage);
                        this.userName = data.data.author;
                        this.thumbnailUrl = this.$.handleAssetsUrl(data.data.thumbnailUrl);
                        this.attachUrl = data.data.attachUrl ? this.$.handleAssetsUrl(data.data.attachUrl) : '';
                    } else {
                        wx.showToast({
                            icon:'none',
                            title:'请求出错',
                            duration: 2000,
                        })
                    }
                })
             } else {
                // 普通分享
                this.$http.get(`/common/material?type=1&id=${this.id}&share=1`).then(({data}) => {
                    console.log(`普通分享data:`,data);
                    if (data.code==200 && data.data.length){
                        let video = data.data[0];
                        this.setNavigationBarTitle(video.title);
                        this.direction = video.direction;
                        this.videoUrl = this.$.handleAssetsUrl(video.url);
                        this.headImgUrl = this.$.handleAssetsUrl(video.userInfo.headImgUrl);
                        this.userName = video.userInfo.nickname;
                    } else {
                        wx.showToast({
                            icon:'none',
                            title:'请求出错',
                            duration: 2000,
                        })                        
                    }
                })
             }
        },
        onHide() {
            // 页面隐藏到后台时清除缓存数据
            wx.clearStorage();
        },
        onShareAppMessage (e) {
            let imageUrl = e.target===undefined ? '' : this.thumbnailUrl ;
            return {
                title: this.title,
                path: `/pages/share/main?${this.source}=${this.id}`,
                imageUrl,
            }
        },
        methods:{
            playVideo () {
                this.videoContxt.play();
                this.isPlaying = true;
            },
            videoPlayHdl () {
                this.isPlaying = true;
            },
            videoPauseHdl () {
                this.isPlaying = false;
            },
            launchAppError (e) {
                wx.showToast({
                    title:'未找到相关应用,请前往应用商店下载最新版来画视频APP,发挥您的创意',
                    icon:'none',
                    duration: 2500,
                    mask: true,
                })
            },
            // 动态设置当前页面title
            setNavigationBarTitle (title){
                wx.setNavigationBarTitle({
                    title,
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
                .avanta{
                    display: inline-block;
                    border-radius: 50%;
                    width: 75rpx;
                    height: 75rpx;
                    margin: 0 30rpx 0 24rpx;
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
                .avanta{
                    display: inline-block;
                    border-radius: 50%;
                    width: 75rpx;
                    height: 75rpx;
                    margin: 0 30rpx 0 24rpx;
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
