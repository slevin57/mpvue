
<template>
<div class="apply-page">
    <div v-if="!apply" class="form">
        <form action="">
            <div class="row">
                <p class="title name">姓名：</p>
                <input class='input' type="text" v-model="name">
            </div>
            <div class="row">
                <p class="title name">手机号：</p>
                <input class='input' type="number" v-model="tel">
            </div>
            <div class="row">
                <p class="title name">身份证号：</p>
                <input class='input' type="number" v-model="idcard">
            </div>
            <div class="row">
                <p class="title name">借款金额：</p>
                <input class='input' type="number" v-model="apply_amount">
            </div>
            <div class="row">
                <p class="title name">备注：</p>
                <input class='input' type="text" v-model="client_remark">
            </div>
        </form>
        <button class="btn" @click="submit()">提交</button>
    </div>
    <div v-if="!apply" class="footer">
        广东双盈科技信息有限公司
    </div>
    <div v-else class="applied">
        <div class="row">您的申请已提交</div>
        <div class="row">请等待业务员联系您</div>
        <navigator open-type="redirect" url="/pages/index/main" class="row btn" >返回</navigator >
    </div>
</div>
</template>
<script>
export default {
    data () {
        return {
            apply: false,
            name:'',
            client_id: 2,
            tel:'',
            idcard:'',
            apply_amount:'',
            client_remark:'',
        }
    },
    mounted () {
        console.log(`44:`,44);
        this.apply = false;
    },
    methods:{
        submit() {
            if (!this.tel || !this.idcard || !this.name){
                wx.showToast({
                    title: '请填写完整',
                    icon: 'none',
                    duration: 2000
                })
                return;
            }
            this.$http.post('/api/apply_order',{
                client_id: this.client_id,
                name:this.name,
                tel:this.tel,
                idcard:this.idcard,
                apply_amount:this.apply_amount,
                client_remark: this.client_remark,
            }).then((res => {
                if (res.data == 200) {
                    this.apply = true;
        this.client_id = '';
        this.name = '';
        this.tel = '';
        this.idcard = '';
        this.apply_amount = '';
        this.client_remark = '';
                } else {
                    wx.showToast({
                        title: '请求失败',
                        icon: 'none',
                        duration: 2000
                    })
                }
            }))
        }
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
