<template>
    <div class="page-client">
        <div class="btns">
            <span class="btn" :class="currentTab==1 ? 'btn-active' : ''" @click="toggleTab(1)">首页</span>
            <span class="btn" :class="currentTab==2 ? 'btn-active' : ''" @click="toggleTab(2)">我的</span>
        </div>
        <!-- 投资方首页 -->
        <div v-if="currentTab==1" class="investman-index">
            <div class="invest-box">
                <ul class="invests">
                    <li class="invest" v-for="(item,index) in approvedData" :key="index">
                        <div class="left">
                            <p class="number">订单编号：{{item.id}}</p>
                            <p class="sum">借款人：{{item.name}}</p>
                            <p class="date">借款金额：{{item.prepare_amount}}</p>
                            <p class="date">申请日期：{{item.created_at}}</p>
                        </div>
                        <div class="right back">
                            <span class="status ing" v-if="item.status == 2">匹配中</span>
                            <span class="status ok" v-if="item.status == 3">已批款</span>
                            <!-- <navigator class="check" :url="`/page/formShow/main?id=`+item.id">查看</navigator > -->
                            <!-- <a class="check" :href="`/page/formShow/main?id=${item.id}`">查看</a > -->
                            <span @click="navigateTo(item.id)" class="check">查看</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 投资方个人中心 -->
        <div v-if="currentTab==2" class="investman-center">
            <div class="userinfo">
                <div class="left">
                    <img class="avanta" :src="userInfo.avatarUrl" alt="">
                </div>
                <div class="right">
                    <p class="name">昵称：{{userInfo.nickName}}</p>
                    <p class="identify">用户身份：投资方</p>
                </div>
            </div>
            <div class="phone-box">
                <div class="phone-num">
                    手机号：<input v-model="phone" type="number" placeholder="请填写手机号">
                    <div class="btn" @click="changePhone()"> 修改 </div>
                </div>
                <span class="hint">点击上方电话可修改</span>
            </div>
            <div class="invest-box">
                <ul class="invests">
                    <li class="invest" v-for="(item,index) in dataList" :key="index">
                        <div class="left">
                            <p class="number">借款编号：{{item.id}}</p>
                            <p class="sum">借款金额：{{item.approve_amount}}</p>
                            <p class="date">借款人：{{item.name}}</p>
                        </div>
                        <div class="right unback" v-if="item.repay_status==0">
                            <span class="status">待收回</span>
                        </div>
                        <div class="right back" v-if="item.repay_status==1">
                            <span class="status">已收回</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer">
            广东双盈科技信息有限公司
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
                approvedData:[],
                phone: 110,
            }
        },
        computed : {
            ...mapGetters(["userInfo"])
        },
        watch : {
            userInfo () {
                // this.clientId = this.userInfo.client_id;
                // this.fetchInvestmanData();
                // this.fetchApprovedData();
            }
        },
        mounted () {
            this.clientId = this.userInfo.client_id;
            this.fetchInvestmanData();
            this.fetchApprovedData();
            this.fetchPhone();
        },
        methods :{
            toggleTab (tab) {
                this.currentTab = tab;
            },
            fetchApprovedData () {
                this.$http.get('/api/approved_orders').then( res => {
                    this.approvedData = res.data;
                })
            },
            fetchInvestmanData () {
                this.$http.get(`/api/capital_orders/${this.clientId}`).then(res => {
                    this.dataList = res.data;
                    console.log(`this.dataList:`,this.dataList);
                })
            },
            navigateTo (id) {
                wx.navigateTo({
                    url: `/pages/formshow/main?id=${id}`,
                })
            },
            fetchPhone () {
                this.$http.post('/api/getUserInfo',{
                    userId: this.userInfo.client_id,
                    status: this.userInfo.status,
                }).then(res => {
                    console.log(`res:`,res);
                    if (res.status == 200){
                        this.phone = res.data[0].tel;
                    } else {
                        wx.showToast({
                            title:'请求出错',
                            icon:'none',
                            duration:2000,
                        })
                    }
                }).catch(err => {
                    console.log(`出错:`,err);
                })
            },
            changePhone () {
                const self = this;
                if (!this.phone){
                    wx.showToast({
                        title:'请填写完整信息',
                        icon:'none',
                        duration:1000,
                    })
                    return;
                }
                wx.showLoading({title:'修改提交中'});
                this.$http.post('/api/changeUserInfo',{
                    name:this.userInfo.nickName,
                    tel:this.phone,
                    userId: this.userInfo.client_id,
                    status: this.userInfo.status,                    
                }).then(res => {
                    wx.hideLoading()
                    if (res.status == 200){
                        wx.showToast({
                            title: '修改成功',
                            icon:'success',
                            duration:1000,
                        })
                    } else {
                        wx.showToast({
                            title:'提交出错',
                            icon:'none',
                            duration:1000,
                        })                    
                    }
                }).catch(err => {
                    wx.hideLoading();
                    console.log(`提交手机出错:`,err);
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
        .investman-index{
            .invest-box{
                max-height:900rpx;
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
                                border: 1px solid #000;
                            }
                            .ing{
                                color: red;
                            }
                            .ok {
                                color: #4aa143;
                            }
                            .check {
                                border-top: none;
                            }
                        }
                    }
                }
            }
        }
        .investman-center{
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
                // padding-bottom: 44rpx;
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
            .phone-box{
                padding: 20rpx;
                display: flex;
                flex-direction: column;
                .phone-num{
                    display: flex;
                    align-items: center;
                    input {
                        border-bottom: 1px solid #e3e3e3;
                    }
                    .btn{
                        background-color: #4aa143;
                        color: #fff;
                        padding: 5rpx 15rpx;
                        border-radius: 5px;
                        cursor: pointer;
                        margin-left: 20rpx;
                    }
                }
                .hint {
                    margin-top: 10rpx;
                    color: #e3e3e3;
                    font-size: 12px;
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
                            // background-color: red;
                        }
                        .back {
                            // background-color: green;
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