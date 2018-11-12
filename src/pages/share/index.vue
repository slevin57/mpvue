// 单页面分享页，不用处理swiper与video兼容问题
<template>
<div>
    <div :class="[direction==1 ? 'page-share-horizental' : 'page-share-vertical']">
        <div class="video-wrapper" :style="{height:videoHeight}">
            <video 
                id="miniVideo" 
                :src="videoUrl" 
                :poster="thumbnailUrl"
                :show-center-play-btn="true"
                @pause="videoPauseHdl()"
                @play="videoPlayHdl()"
                @ended="videoEndHdl()"></video>
            <!-- <cover-image v-if="!isPlaying" class="play-icon" src="/static/images/play.png" @click="playVideo()" /> -->
        </div>
        <div class="info-wrapper" :style="{height:infoHeight}">
            <div class="info">
                <div class="user-info">
                    <img :src="headImgUrl" alt="" class="avanta">
                    <span class="username">@{{userName}}</span>
                </div>
                <div v-if="direction==2 && upiconVisible" class="up-icon"><img src="/static/images/up-icon.png" alt=""> </div>
                <div class="share-img-box">
                    <button open-type="share" class="share-img">
                        <img src="/static/images/share@2x.png" alt="">
                    </button>
                </div>
            </div>
        </div>
        <div class="ad-wrapper" id="adWrapper">
            <div class="img-container">
                <image class="bg" v-if="direction==1" :src="attachUrl || 'https://resources.laihua.com/miniapp/bg-horizon.png'" mode="scaleToFill"></image>
                <image class="bg" v-if="direction==2" :src="attachUrl || 'https://resources.laihua.com/miniapp/bg-vertical.png'" mode="scaleToFill"></image>
            </div>
            <div class="ad-container">
                <div class="logo-box" v-if="isCustom && watermarkUrl" :class="['logo-img',direction==1 ? 'logo-h' : 'logo-v']">
                    <image class="pic" :src="watermarkUrl" mode="aspectFit" style="width:100%;height:100%;"></image>
                </div>
                <div class="logo-box" v-else-if="!isCustom" :class="['logo-img',direction==1 ? 'logo-h' : 'logo-v']">
                    <image class="pic" :src="logoUrl" mode="aspectFit" style="width:100%;height:100%;"></image>
                </div>
                <p v-if="slogan" class="slogan" :style="{color:sloganColor}">{{slogan}}</p>
                <div class="options">
                    <!-- <div class="option home">
                        <img src="/static/images/home@2x.png" class="option-icon home-icon">
                        <span>首页</span>
                    </div> -->
                    <!-- <button v-if="canOpenApp" class="option app" open-type="launchApp" @error="launchAppError()"> -->
                    <button v-if="canOpenApp" class="option app" open-type="launchApp" @error="launchAppError()">
                        <div class="option-icon app-icon">
                            <img src="/static/images/app@2x.png" >
                        </div>
                        <span class="name">APP</span>
                    </button>
                    <div v-if="!isCustom" class="option code" @click="showGuide(true)">
                        <div class="option-icon code-icon">
                            <img src="/static/images/code@2x.png" >
                        </div>
                        <span class="name">公众号</span>
                    </div>
                </div>
                <!-- <a style="position:absolute;bottom:0;left:0;" href="/pages/testlist/main">test list</a> -->
            </div>
        </div>
        <cover-view class="guide" v-if="guideVisible" @click="showGuide(false)">
            <cover-image src="https://resources.laihua.com/miniapp/guide.png"  />
        </cover-view>
    </div>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
// 竖版视频测试地址:https://resources.laihua.com/2018-10-26/2f7761b0-d8c5-11e8-83ec-13730645ec8d.mp4
    export default {
        data () {
            return {
                id:'',//视频id
                source: '',// 小程序来源，vid是app，scene是web和uwp
                type: '', //类型，作品还是模板
                isCustom: false,//是否为自定义分享
                isPlaying: false,
                videoContxt: {},
                direction: 1,//1横屏视频2竖屏
                title: '分享页', //视频标题
                videoUrl:'',
                thumbnailUrl: '',//视频封面
                headImgUrl: '',
                userName: '',
                attachUrl: '',//个性化分享广告图片
                logoUrl:'',
                watermarkUrl: '',//自定义的水印链接
                slogan: '像做PPT一样做动画视频',//个性化分享slogan
                sloganColor:'#fff',
                imgHeight: 1,
                guideVisible: false,
                platform: '', // 设备操作系统
                windowHeight:0,//屏幕可视高度
                upiconVisible: true,
                saveIsPlaying: false,
            }
        },
        computed : {
            ...mapGetters([
                'options'
            ]),
            canOpenApp () {
                if ([1036,1069].indexOf(this.options.scene) != -1 && this.platform!='android'){
                    return true;
                } else {
                    return false;
                }
            },
            videoHeight () {
                return this.direction==2 ? `${this.windowHeight*.9}px` : ''
            },
            infoHeight () {
                return this.direction==2 ? `${this.windowHeight*.1}px` : ''
            }
        },
        mounted () {
            this.videoContxt = wx.createVideoContext('miniVideo');
        },
        onLoad (query) {
            this.setNavigationBarColor();
            let self = this;
            wx.getSystemInfo({
                success (system) {
                    self.platform = system.platform;
                    self.windowHeight = system.windowHeight;
                }
            })
        },
        onShow () {
            console.log(`mpvue特有的在小程序onShow周期内获取url参数方法:`,this.$root.$mp.query);
            let query = this.$root.$mp.query;
            if (query.vid){//app分享出来的卡片进入
                this.source = 'vid';
                this.id = query.vid;
                this.type = query.type;
                this.isCustom = /^[0-9]*$/.test(this.id) ? true : false;
                
            } else if(query.scene){//web端扫小程序码进入
                this.source = 'scene';
                this.id = decodeURIComponent(query.scene);
                //根据id长度区分普通分享与自定义分享：大于10的为自定义分享，小于10为普通分享
                this.isCustom = this.id.length>10 ? true : false;
            } else {
                // 默认web的普通分享视频id
                this.source = 'scene';
                this.id = '135385';
                this.isCustom = false;
            }
            console.log(`query:`,query);
            console.log(`this.source:`,this.source);
            console.log(`this.isCustom:`,this.isCustom);
            console.log(`this.type:`,this.type);
            console.log(`this.type=='8':`,this.type==8);
            if (this.type && this.type == '8'){ //模板
                this.$http.get(`/common/material?type=8&share=1&id=${this.id}`)
                .then(({data}) => {
                    console.log(`模板数据:`,data);
                    let video = data.data[0];
                    this.setNavigationBarTitle(video.title);
                    this.title = video.title;
                    this.direction = video.direction;
                    this.videoUrl = this.$.handleAssetsUrl(video.videoUrl);
                    let screen = video.screen && video.screen;
                    let thumbnail = video.thumbnailUrl.split(',')[0];
                    this.thumbnailUrl = this.$.handleAssetsUrl(screen || video.thumbnailUrl);
                    this.headImgUrl = this.$.handleAssetsUrl(video.userInfo.headImgUrl);
                    this.userName = video.userInfo.nickname;
                    this.logoUrl = this.direction==1 ? 'https://resources.laihua.com/miniapp/logo-h.png' : 'https://resources.laihua.com/miniapp/logo-v.png';
                    this.attachUrl = '';
                    this.slogan ='像做PPT一样做动画视频';
                    this.sloganColor = '#fff';                    
                })
                .catch(({data}) => {
                    console.log(`data:`,data);
                })
                return;
            }

            if(this.isCustom) {
                //  自定义分享
                this.$http.get(`/share/video?id=${this.id}`).then(({data}) => {
                    console.log(`自定义分享data:`,data);
                    if (data.code==200 && data.data){

                        this.setNavigationBarTitle(data.data.title);
                        this.direction = data.data.direction;
                        this.title = data.data.title;
                        this.videoUrl = this.$.handleAssetsUrl(data.data.url);
                        this.headImgUrl = this.$.handleAssetsUrl(data.data.headImage);
                        this.userName = data.data.author;
                        let screen = data.data.screen;
                        let thumbnail = data.data.thumbnailUrl;
                        this.thumbnailUrl = this.$.handleAssetsUrl(screen || data.data.thumbnailUrl);
                        this.attachUrl = data.data.attachUrl ? this.$.handleAssetsUrl(data.data.attachUrl) : '';
                        if(data.data.watermark){
                            this.watermarkUrl = this.$.handleAssetsUrl(data.data.watermark);
                        } else {
                            this.watermarkUrl = '';
                        }
                        let sloganObj = data.data.slogan && JSON.parse(data.data.slogan);
                        this.slogan = sloganObj && sloganObj.description && sloganObj.description;
                        this.sloganColor = sloganObj && sloganObj.color && sloganObj.color;

                        // console.log(`this.attachUrl:`,this.attachUrl);
                    } else {
                        wx.showToast({
                            icon:'none',
                            title:'返回数据错误',
                            duration: 2000,
                        })
                    }
                })
             } else {
                // 普通分享
                this.$http.get(`/common/material?type=1&share=1&id=${this.id}`).then(({data}) => {
                    console.log(`普通分享data:`,data);
                    if (data.code==200 && data.data && data.data.length){
                        let video = data.data[0];
                        this.setNavigationBarTitle(video.title);
                        this.title = video.title;
                        this.direction = video.direction;
                        this.videoUrl = this.$.handleAssetsUrl(video.url);
                        let screen = video.screen && video.screen;
                        let thumbnail = video.thumbnailUrl.split(',')[0];
                        this.thumbnailUrl = this.$.handleAssetsUrl(screen || video.thumbnailUrl);
                        this.headImgUrl = this.$.handleAssetsUrl(video.userInfo.headImgUrl);
                        this.userName = video.userInfo.nickname;
                        this.logoUrl = this.direction==1 ? 'https://resources.laihua.com/miniapp/logo-h.png' : 'https://resources.laihua.com/miniapp/logo-v.png';
                        this.attachUrl = '';
                        this.slogan ='像做PPT一样做动画视频';
                        this.sloganColor = '#fff';
                        console.log(`this.attachUrl:`,this.attachUrl);
                    } else {
                        wx.showToast({
                            icon:'none',
                            title:'返回数据错误',
                            duration: 2000,
                        })                        
                    }
                })
             }
        },
        onHide() {
            // 页面隐藏到后台时清除缓存数据
            // wx.clearStorage();
            // this.direction = 1;
            // this.videoUrl = '';
            // this.thumbnailUrl = '';
            // this.headImgUrl = '';
            // this.userName = '';
            // this.logoUrl = '';
            // this.slogan = '';
            // this.attachUrl = '';
            // this.guideVisible = false;
        },
        onPageScroll (e) {
            this.upiconVisible = e.scrollTop > 10 ? false : true;
        },
        onShareAppMessage (e) {
            let self = this;
            if (this.isPlaying){
                let videoPlaying = true;
                this.videoContxt.pause();
            }
            let imageUrl = e.target===undefined ? '' : this.thumbnailUrl ;

            return {
                title: this.title,
                path: `/pages/share/main?${this.source}=${this.id}&type=${this.type}`,
                imageUrl,
                success (res) {
                    if (videoPlaying){
                        self.videoContxt.play();
                    }
                },
                fail (res) {
                    if (videoPlaying){
                        self.videoContxt.play();
                    }
                },
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
            videoEndHdl () {
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
            // 动态设置当前页面导航栏title
            setNavigationBarTitle (title){
                wx.setNavigationBarTitle({
                    title,
                })
            },
            // 解决ios和android导航栏颜色不一样的问题；也可以用于动态设置当前页面导航栏颜色
            setNavigationBarColor (){
                wx.setNavigationBarColor({
                    frontColor: '#000000',
                    backgroundColor: '#ffffff',
                    animation: {
                        duration: 400,
                        timingFunc: 'easeIn'
                    }
                })                
            },
            // 查询节点信息，id为带#的字符串，如：'#id'
            createSelectorQuery (id){
                let query = wx.createSelectorQuery();
                query.select(id).boundingClientRect();
                query.exec((res) => {
                    console.log(`res=======:`,res);
                })
            },
            showGuide (val) {
                this.guideVisible = val;
                if (val){
                    this.videoContxt.pause();
                } else {
                    this.videoContxt.play();
                }
            }
        }
    }
</script>

<style scoped lang="scss">
// 横版视频样式
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
            .share-img-box{
                width: 42rpx;
                height: 44rpx;
                margin-right: 26rpx;
                background-color: #151515;
            }
            .share-img{
                display:inline-box;
                background-color:#151515;
                width: 100%;
                height: 100%;
                padding:0;
                margin:0;
                position: relative;
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
        .img-container{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            .bg{
                display: inline-block;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                bottom: 0;
            }
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
                display: flex;
                align-items: center;
                margin-bottom: 59rpx;
                // img {
                //     object-fit: cover;
                // }
            }
            .logo-h{
                width: 281rpx;
                height: 171rpx;
                    .pic{
                        width: 100%;
                    }
            }
            .logo-v{
                width: 244rpx;
                height: 141rpx;
                    .pic{
                        width:100%;
                    }
            }
            .slogan{
                font-size: 18px;
                color: #fff;
                font-weight: bold;
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
                    color: rgb(198,35,32);
                    border-radius:39rpx 0 0 39rpx ;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    // padding-left: 20rpx;
                    // box-sizing: border-box;
                    padding:0;
                    font-size: 16px;
                    &:hover{
                        .option-icon{
                            opacity: 1;
                        }
                        .name{
                            opacity: 1;
                        }
                    }
                }
                .option-icon{
                    margin-right: 10rpx;
                    opacity: .7;
                    margin-left: 15px;
                }
                .home-icon{
                    width: 47rpx;
                    height: 40rpx;
                }
                .app-icon{
                    width:40rpx;
                    height: 42rpx;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img{
                        height: 42rpx;
                        width: 26rpx;
                    }
                }
                .code-icon{
                    width: 40rpx;
                    height: 40rpx;
                    img{
                        width: 40rpx;
                        height: 40rpx;
                    }
                }
                .name{
                    flex:1;
                    text-align: center;
                    opacity: .7;
                }
            }
        }
    }
    .guide{
        background-color: #fff;
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
    }
}
// 竖版视频样式
.page-share-vertical{
    width: 100%;
    display: flex;
    flex-direction: column;
    // -webkit-box-orient:vertical;
    .video-wrapper{
        font-size: 14px;
        box-sizing: border-box;
        width: 750rpx;
        // height: 421rpx;
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
        // height: 107rpx;
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
            position: relative;
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
            .up-icon{
                width: 33rpx;
                height: 36rpx;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translateX(-50%);
                transform: translateY(-50%);
                -webkit-animation: up 1.5s infinite ease-in-out;
                animation: up 1.5s infinite ease-in-out;
                img{
                    width: 100%;
                    height: 100%;
                }
            }

            @keyframes up {
                0% {
                    // opacity: 0;
                    transform: translate(0, 0);
                }
                50% {
                    // opacity: .5;
                    transform: translate(0, -15rpx);
                }
                100% {
                    // opacity: 1;
                    transform: translate(0, 0);
                }
            }
            .share-img-box{
                width: 42rpx;
                height: 44rpx;
                margin-right: 26rpx;
                background-color: #151515;
            }
            .share-img{
                display:inline-box;
                background-color:#151515;
                width: 100%;
                height: 100%;
                padding:0;
                margin:0;
                position: relative;
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
        // flex: 1;
        height: 452rpx;
        .img-container{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            .bg{
                display: inline-block;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                bottom: 0;
            }
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
                margin-bottom: 59rpx;
                display: flex;
                align-items: center;
                // img {
                //     object-fit: cover;
                // }
            }
            .logo-h{
                width: 281rpx;
                height: 171rpx;
                    .pic{
                        width: 100%;
                    }
            }
            .logo-v{
                width: 244rpx;
                height: 141rpx;
                    .pic{
                        width:100%;
                    }
            }
            .slogan{
                font-size: 18px;
                color: #fff;
                font-weight: bold;
            }
            .next-img{
                width: 33rpx;
                height: 36rpx;
                position: fixed;
                bottom: 49rpx;
            }
            .options {
                position: absolute;
                right: 0;
                bottom: 121rpx;
                .option{
                    width: 180rpx;
                    height: 77rpx;
                    margin-bottom: 31rpx;
                    background: #ececec;
                    color: rgb(198,35,32);
                    border-radius:39rpx 0 0 39rpx ;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    // padding-left: 20rpx;
                    // box-sizing: border-box;
                    padding:0;
                    font-size: 16px;
                    &:hover{
                        .option-icon{
                            opacity: 1;
                        }
                        .name{
                            opacity: 1;
                        }
                    }
                }
                .option-icon{
                    margin-right: 10rpx;
                    opacity: .7;
                    margin-left: 15px;
                }
                .home-icon{
                    width: 47rpx;
                    height: 40rpx;
                }
                .app-icon{
                    width:40rpx;
                    height: 42rpx;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img{
                        height: 42rpx;
                        width: 26rpx;
                    }
                }
                .code-icon{
                    width: 40rpx;
                    height: 40rpx;
                    img{
                        width: 40rpx;
                        height: 40rpx;
                    }
                }
                .name{
                    flex:1;
                    text-align: center;
                    opacity: .7;
                }
            }
        }
    }
    .guide{
        background-color: #fff;
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
    }
}
</style>
