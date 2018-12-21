<template>
    <div class="page-formshow">
        <section class="tip">
            由于资料数据过大，此处仅做统计展示，详细资料可发至您的邮箱
        </section>
        <button class="btnn" @click="chooseImg()">资料提交</button>
        <section class="sec sec-basic ">
            <h4 class="title title-basic">
                基本资料
            </h4>
            <div class="row">
                <div class="item item1">100万</div>
                <div class="item item2">房抵</div>
            </div>
            <div class="row">
                <div class="item item1">2万</div>
                <div class="item item2">12万</div>
            </div>
            <div class="row">
                <div class="item item1">xx</div>
                <div class="item item2">12</div>
                <div class="item item2">34</div>
            </div>
        </section>
        <section class="sec sec-basic ">
            <h4 class="title title-basic">
                借款人资料
            </h4>
            <div class="row">
                <div class="item item1">100万</div>
                <div class="item item2">房抵</div>
                <div class="item item2">房抵</div>
            </div>
            <div class="row">
                <div class="item item1">100万</div>
            </div>
            <div class="row">
                <div class="item item1">100万</div>
            </div>
            <div class="row">
                <div class="item item1"><radio value="1" :checked="true" disabled/></div>
                <div class="item item1"><radio value="1" :checked="false" disabled/></div>
                <div class="item item1"><radio value="1" :checked="false" disabled/></div>
            </div>
        </section>
        <section class="sec sec-basic ">
            <h4 class="title title-basic"> 共借人信息 </h4>
            <div class="row">
                <div class="item item1">100万</div>
                <div class="item item2">房抵</div>
                <div class="item item2">房抵</div>
            </div>
            <div class="row">
                <div class="item item1">100万</div>
            </div>
            <div class="row">
                <div class="item item1">100万</div>
            </div> 
        </section>
        <section class="sec sec-basic ">
            <h4 class="title title-basic"> 信用记录 </h4>
            <div class="row">
                <div class="item item1"><radio value="1" :checked="true" disabled/></div>
                <div class="item item1"><radio value="1" :checked="false" disabled/></div>
                <div class="item item1"><radio value="1" :checked="false" disabled/></div>
            </div>
            <div class="row">
                <div class="item item1">逾期记录</div>
            </div>
        </section>
        <section class="sec sec-basic ">
            <h4 class="title title-basic"> 抵押物资料 </h4>
            <div class="row">
                <div class="item item1">逾期记录</div>
                <div class="item item1">逾期记录</div>
            </div>
            <div class="row">
                <div class="item item1">逾期记录</div>
                <div class="item item1">逾期记录</div>
            </div>
            <div class="row">
                <div class="item item1">逾期记录</div>
            </div>
        </section>
        <section class="sec sec-pics ">
            <h4 class="title title-basic"> 附件资料 </h4>
            <div class="row">
                <div class="item">
                    <p class="item-name">身份证正反面</p>
                    <div class="pics">
                        <div class="pic pic-left">d</div>
                        <div class="pic">d</div>
                    </div>
                </div>
                <div class="item">
                    <p class="item-name">身份证正反面</p>
                    <div class="pics">
                        <div class="pic pic-left">d</div>
                        <div class="pic">d</div>
                    </div>
                </div>
                <div class="item">
                    <p class="item-name">身份证正反面</p>
                    <div class="pics">
                        <div class="pic pic-left">d</div>
                        <div class="pic">d</div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="item">
                    <p class="item-name">身份证正反面</p>
                    <div class="pics">
                        <div class="pic pic-left">d</div>
                        <div class="pic">d</div>
                    </div>
                </div>
                <div class="item">
                    <p class="item-name">身份证正反面</p>
                    <div class="pics">
                        <div class="pic pic-left">d</div>
                        <div class="pic">d</div>
                    </div>
                </div>
                <div class="item">
                    <p class="item-name">身份证正反面</p>
                    <div class="pics">
                        <div class="pic pic-left">d</div>
                        <div class="pic">d</div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="item">
                    <p class="item-name">身份证正反面</p>
                    <div class="pics">
                        <div class="pic pic-left">d</div>
                        <div class="pic">d</div>
                    </div>
                </div>
                <div class="item">
                    <p class="item-name">身份证正反面</p>
                    <div class="pics">
                        <div class="pic pic-left">d</div>
                        <div class="pic">d</div>
                    </div>
                </div>
                <div class="item">
                    <p class="item-name">身份证正反面</p>
                    <div class="pics">
                        <div class="pic pic-left">d</div>
                        <div class="pic">d</div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        methods :{
            chooseImg () {
                wx.chooseImage({
                    success(res) {
                        const tempFilePaths = res.tempFilePaths
                        wx.uploadFile({
                            url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
                            filePath: tempFilePaths[0],
                            name: 'file',
                            formData: {
                                user: 'test'
                            },
                            success(res) {
                                const data = res.data
                                // do something
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
.page-formshow {
    font-size: 12px;
    color: #e3e3e3;
    padding: 20rpx;
    .tip{
        width: 95%;
        margin: 0 auto;
        border: 1px solid #e3e3e3;
        color: #e3e3e3;
        text-align: center;
        // height: 40rpx;
    }
    .sec {
        margin-top: 30rpx;
        .title{
            font-weight: bold;
            color: #000;
            margin-bottom: 5rpx;
        }
        .row {
            display: flex;
            // height: 40rpx;
            .item {
                flex: 1;
                border: 1px solid #e3e3e3;
                padding: 5rpx 20rpx;
            }
        }
    }
    .sec-pics {
        .row {
            .item {
                display: flex;
                flex-direction: column;
                .item-title{

                }
                .pics {
                    margin: 15rpx 0 20rpx;
                    display: flex;
                    justify-content: center;
                    .pic {
                        width: 75rpx;
                        height: 50rpx;
                        border: 1px solid red;
                    }
                    .pic-left {
                        margin-right: 15rpx;
                    }
                }
            }
        }
    }
}
</style>