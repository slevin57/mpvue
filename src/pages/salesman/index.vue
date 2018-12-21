<template>
    <div class="page-client">
        <div class="btns">
            <span class="btn" :class="currentTab==1 ? 'btn-active' : ''" @click="toggleTab(1)">提交资料</span>
            <span class="btn" :class="currentTab==2 ? 'btn-active' : ''" @click="toggleTab(2)">个人中心</span>
        </div>
        <div class="userinfo">
            <div class="left">
                <img class="avanta" :src="userInfo.avatarUrl" alt="">
            </div>
            <div class="right">
                <p class="name">昵称：{{userInfo.nickName}}</p>
                <p class="identify">用户身份：借款人</p>
            </div>
        </div>
        <div class="userplan">
            <div class="title-box">
                <span class="title">历史提交</span>
                <span class="detail">
                    总计提交10，待提交2
                </span>
            </div>
            <div class="table">
                <div class="tr">
                    <div class="th"> 编号 </div>
                    <div class="th"> 提交日期 </div>
                    <div class="th"> 状态 </div>
                    <div class="th"> 操作 </div>
                </div>
                <div class="tr" v-for="(item,index) in dataList" :key="index">
                    <div class="td">{{index+1}}</div>
                    <div class="td">{{item.updated_at}}</div>
                    <div class="td" v-if="item.status==1">提交中</div>
                    <div class="td" v-if="item.status==2">其他</div>
                    <div class="td" v-if="item.status==3">已通过</div>
                    <div class="td payed" v-if="item.status==1">可修改</div>
                    <div class="td unpayed" v-else>不可修改</div>
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
        mounted () {

        },
        methods :{
            toggleTab (tab) {
                this.currentTab = tab;
            },
            fetchData () {
                this.$http.get(`/api/agent_orders/${this.clientId}`).then(res => {
                    this.dataList = res.data;
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