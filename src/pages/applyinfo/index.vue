<template>
    <div class="page-client">
        <div class="btns">
            <span class="btn" :class="currentTab==1 ? 'btn-active' : ''" @click="toggleTab(1)">申请汇总</span>
            <span class="btn" :class="currentTab==2 ? 'btn-active' : ''" @click="toggleTab(2)">个人中心</span>
        </div>
        <div class="invest-box">
            <ul class="invests">
                <li class="invest">
                    <div class="left">
                        <p class="number">订单编号：dfdf</p>
                        <p class="sum">借款人：sdfsd</p>
                        <p class="date">借款金额：fdf</p>
                        <p class="date">申请日期：fdf</p>
                    </div>
                    <div class="right back">
                        <span class="status">匹配中</span>
                        <span class="check">查看</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="footer">
            广东双赢信息科技有限公司
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                currentTab: 1,
            }
        },
        methods :{
            toggleTab (tab) {
                this.currentTab = tab;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page-client {
        font-size: 16px;
        margin: 20rpx 0 0rpx;
        height: 95vh;
        position: relative;
        box-sizing: content-box;
        .btns {
            // height: 60rpx;
            border: 1px solid #e3e3e3;
            width: 60%;
            margin: 10rpx auto 20rpx;
            display: flex;
            .btn{
                cursor: pointer;
                font-size: 17px;
                flex: 1;
                text-align: center;
                padding: 10rpx 0;
            }
            .btn-active {
                background-color: #4aa143;

            }
        }
        .invest-box{
            max-height: 800rpx;
            overflow: scroll;
            padding: 40rpx 30rpx 0;
            .invests{
                .invest{
                    display: flex;
                    border: 1px solid #e3e3e3;
                    width: 100%;
                    margin-bottom: 30rpx;
                    .left{
                        padding: 10rpx 0 10rpx 30rpx;
                        width: 70%;
                        span{
                            font-size: 14px;
                            padding: 10rpx 0;
                        }
                    }
                    .right {
                        width: 30%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        display: flex;
                        flex-direction: column;
                        span {
                            flex: 1;
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        .status {
                            background-color: red;
                        }
                        .check {
                            background-color: green;
                        }
                    }
                }
            }
        }
        .footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            text-align: center;            
        }
    }
</style>