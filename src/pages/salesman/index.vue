<template>
    <div class="page-client">
        <div class="btns">
            <span class="btn" :class="currentTab==1 ? 'btn-active' : ''" @click="toggleTab(1)">提交资料</span>
            <span class="btn" :class="currentTab==2 ? 'btn-active' : ''" @click="toggleTab(2)">个人中心</span>
        </div>
        <div class="userinfo">
            <div class="left">
                <img class="avanta" src="" alt="">
            </div>
            <div class="right">
                <p class="name">昵称：张晓阳</p>
                <p class="identify">用户身份：借款人</p>
            </div>
        </div>
        <div class="userplan">
            <div class="title-box">
                <span class="title">还款计划</span>
                <span class="detail">
                    总计借款20w，共计6期还清
                </span>
            </div>
            <div class="table">
                <div class="tr">
                    <div class="th"> 总期数 </div>
                    <div class="th"> 时间 </div>
                    <div class="th"> 金额 </div>
                    <div class="th"> 还款状态 </div>
                </div>
                <div class="tr">
                    <div class="td">第一期</div>
                    <div class="td">2018.09.12</div>
                    <div class="td">12300</div>
                    <div class="td payed">已还</div>
                </div>
                <div class="tr">
                    <div class="td">第一期</div>
                    <div class="td">2018.09.12</div>
                    <div class="td">12300</div>
                    <div class="td unpayed">未还</div>
                </div>
            </div>
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
        .userinfo{
            width: 100%;
            height: 130rpx;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            // border: 1px solid red;
            border-top: 2px solid #e3e3e3;
            border-bottom: 2px solid #e3e3e3;
            box-sizing: border-box;
            .left{
                width: 110rpx;
                height: 110rpx;
                margin-left: 20rpx;
                margin-right: 40rpx;
                // border: 1px solid red;
                .avanta{
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                }
            }
            .right{
                flex: 1;
                margin-right: 20rpx;
                display: flex;
                flex-direction: column;
                height: 110rpx;
                justify-content: space-around;
                p{
                    // flex: 1;
                    vertical-align: bottom;
                }
                .name{
                    border-bottom: 1px solid #e3e3e3;
                }
            }
        }
        .userplan{
            margin-top: 30rpx;
            border-top: 1px solid #e3e3e3;
            .title-box{
                padding: 20rpx ;
                padding-left: 70rpx;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .title{
                    font-size: 18px;
                }
                .detail{
                    color: #e3e3e3;
                    font-size: 15px;
                }
            }
            .table{
                .tr{
                    display: flex;
                    .th{
                        padding: 15rpx 0;
                        flex: 1;
                        border: 1px solid #e3e3e3;
                        font-size: 16px;
                        text-align: center;
                        vertical-align: middle;
                    }
                    .td{
                        flex: 1;
                        padding: 15rpx 0;
                        font-size: 14px;
                        text-align: center;
                        border: 1px solid #e3e3e3;
                    }
                    .unpayed {
                        color: red;
                    }
                    .payed {
                        color: green;
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