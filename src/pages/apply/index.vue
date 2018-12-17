
<template>
<div class="apply-page">
    <div v-if="!apply" class="form">
        <form action="">
            <div class="row">
                <p class="title name">姓名：</p>
                <input class='input' type="text">
            </div>
            <div class="row">
                <p class="title name">手机号：</p>
                <input class='input' type="text">
            </div>
            <div class="row">
                <p class="title name">身份证号：</p>
                <input class='input' type="text">
            </div>
            <div class="row">
                <p class="title name">借款金额：</p>
                <input class='input' type="text">
            </div>
            <div class="row">
                <p class="title name">备注：</p>
                <input class='input' type="text">
            </div>
        </form>
        <button class="btn">提交</button>
    </div>
    <div v-if="!apply" class="footer">
        广东双赢信息科技有限公司
    </div>
    <div v-else class="applied">
        <div class="row">您的申请已提交</div>
        <div class="row">请等待业务员联系您</div>
        <button class="row btn">返回</button>
    </div>
</div>
</template>
<script>
export default {
    data () {
        return {
            apply: true,
        }
    },
    mounted () {
        this.$http.post('/api/apply_order',{
            client_id:343,
            name:'jack',
            tel: 34434,
            idcard: 3434,
            apply_amount: 3434,
        }).then((({data}) => {
            console.log(`data:`,data);
        }))
    },
    methods:{
        
    }
}
</script>

<style scoped lang="scss">
.apply-page{
    width: 80%;
    height: 95vh;
    margin: 40rpx auto 40rpx;
    position: relative;
    .form{
        .title{
            margin:20rpx 0 35rpx;
        }
        .input{
            height: 41rpx;
            border-bottom: 1px solid #000;
        }
        .btn{
            width: 70%;
            height: 100rpx;
            background-color:#259b24;
            color: #fff; 
            margin: 0 auto 80rpx;
            border-radius: 4px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 50rpx;
        }
    }

    .footer{
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: center;
    }

    .applied{
        height: 100%;
        display: flex;
        font-size: 40rpx;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .row {
            margin: 60rpx 0;
        }
        .btn{
            width: 70%;
            height: 100rpx;
            background-color:#259b24;
            color: #fff; 
            margin: 0 auto 80rpx;
            border-radius: 4px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 50rpx;
        }
    }
}
</style>
