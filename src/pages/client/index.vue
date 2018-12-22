<template>
    <div class="page-client">
        <div class="userinfo">
            <div class="left">
                <img class="avanta" :src="userInfo.avatarUrl" alt="">
            </div>
            <div class="right">
                <p class="name">昵称：{{userInfo.nickName}}</p>
                <p class="identify">用户身份：借款人</p>
            </div>
        </div>
        <div class="phone-box">
            <div class="phone-num">
                手机号：<input v-model="phone" type="number">
            </div>
            <div class="btn" @click="changePhone()"> 修改 </div>
        </div>
        <div class="userplan">
            <div class="title-box">
                <span class="title">还款计划</span>
                <!-- <span class="detail">
                    总计借款20w，共计6期还清
                </span> -->
            </div>
            <div class="table">
                <div class="tr">
                    <div class="th"> 总期数 </div>
                    <div class="th"> 时间 </div>
                    <div class="th"> 金额 </div>
                    <div class="th"> 还款状态 </div>
                </div>
                <div class="tr" v-for="(item,index) in list" :key="index">
                    <div class="td">第{{item.index+1}}期</div>
                    <div class="td">{{item.repay_date}}</div>
                    <div class="td">{{item.repay_num}}</div>
                    <div v-if="item.status" class="td payed">已还</div>
                    <div v-else class="td unpayed">未还</div>
                </div>
            </div>
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
                clientId: 2,
                list: [],
                phone: 110,
            }
        },
        computed : {
            ...mapGetters(["userInfo"])
        },
        mounted () {
            this.fetchData();
        },
        methods :{
            fetchData () {
                this.$http.get(`/api/client_repayments/${this.clientId}`).then(({data}) => {
                    this.list = data;
                })
            },
            changePhone () {
                console.log(`this.phone:`,this.phone);
                wx.showToast({
                    title:'修改成功',
                    icon: 'none',
                    duration: 1000,
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
        .userinfo{
            width: 100%;
            height: 130rpx;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            border-top: 2px solid #e3e3e3;
            border-bottom: 2px solid #e3e3e3;
            box-sizing: border-box;
            .left{
                width: 110rpx;
                height: 110rpx;
                margin-left: 20rpx;
                margin-right: 40rpx;
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
        .phone-box{
            padding: 20rpx;
            display: flex;
            justify-content: space-between;
            .phone-num{
                display: flex;
                align-items: center;
            }
            .btn{
                background-color: #4aa143;
                color: #fff;
                padding: 5rpx 15rpx;
                border-radius: 5px;
                cursor: pointer;
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