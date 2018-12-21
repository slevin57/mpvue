<template>
    <div class="page-client">
        <div class="btns">
            <span class="btn" :class="currentTab==1 ? 'btn-active' : ''" @click="toggleTab(1)">首页</span>
            <span class="btn" :class="currentTab==2 ? 'btn-active' : ''" @click="toggleTab(2)">我的</span>
        </div>
        <div class="userinfo">
            <div class="left">
                <img class="avanta" :src="userInfo.avatarUrl" alt="">
            </div>
            <div class="right">
                <p class="name">昵称：{{userInfo.nickName}}</p>
                <p class="identify">用户身份：投资方</p>
            </div>
            <div class="sum">
                投资战报：您总计投资38笔，其中待还18，已还10.
            </div>
        </div>
        <div class="invest-box">
            <ul class="invests">
                <li class="invest" v-for="(item,index) in dataList" :key="index">
                    <div class="left">
                        <p class="number">借款编号：{{item.id}}</p>
                        <p class="sum">借款金额：{{item.approve_amount}}</p>
                        <p class="date">还款日期：fdf</p>
                    </div>
                    <div class="right unback" v-if="item.repay_status==0">
                        <span class="status">还款中</span>
                    </div>
                    <div class="right back" v-if="item.repay_status==1">
                        <span class="status">已收回</span>
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
import { mapGetters } from 'vuex'
    export default {
        data () {
            return {
                currentTab: 1,
                clientId: 3,
                dataList:[],
            }
        },
        computed : {
            ...mapGetters(["userInfo"])
        },
        watch : {
            userInfo () {
                this.clientId = this.userInfo.client_id;
                this.fetchData();
            }
        },
        methods :{
            toggleTab (tab) {
                this.currentTab = tab;
            },
            fetchData () {
                this.$http.get(`/api/capital_orders/${this.clientId}`).then(res => {
                    this.dataList = res.data;
                    console.log(`this.dataList:`,this.dataList);
                })
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
            position: relative;
            padding-bottom: 44rpx;
            box-sizing: content-box;
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
            .sum {
                border-top: 1px solid #e3e3e3;
                font-size: 14px;
                text-align: center;
                padding: 5rpx 0;
                position: absolute;
                bottom: 0;
                width: 100%;
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
                    }
                    .unback{
                        background-color: red;
                    }
                    .back {
                        background-color: green;
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