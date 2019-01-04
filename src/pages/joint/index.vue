<template >
<view class="_div data-v-084b32bf apply-page">
    <view class="_div data-v-084b32bf form">
        <form action class="_form data-v-084b32bf" :report-submit="true" @submit="present">
            <view class="_div data-v-084b32bf row">
                <view class="_p data-v-084b32bf title name">姓名： </view> 
                <input class="_input data-v-084b32bf input" type="text" v-model="form.name"/>
            </view> 
            <view class="_div data-v-084b32bf row">
                <view class="_p data-v-084b32bf title name">手机号： </view> 
                <input class="_input data-v-084b32bf input" type="number" v-model="form.tel"/>
            </view> 
            <view class="_div data-v-084b32bf row">
                <view class="_p data-v-084b32bf title name">合作意向：
                    <radio-group class="radio-group"  @change="identityChange">
                        <label class="radio" v-for="item in items" :key="item">
                            <radio :value="item.value" :checked="item.value == form.identity" />
                            {{item.title}}
                        </label>
                    </radio-group>
                </view> 
            </view>
            <button class="_button data-v-084b32bf btn" form-type="submit">提交申请</button>
        </form> 
        <!-- <button class="_button data-v-084b32bf btn" @click="present()">提交申请 </button> -->
    </view> 
    <view class="_div data-v-084b32bf footer">
            广东双盈科技信息有限公司
    </view>
    <view class="_div data-v-084b32bf applied">
    <!-- <view class="_div data-v-084b32bf row">您的申请已提交</view> 
    <view class="_div data-v-084b32bf row">请等待后台审核</view>  -->
    <!-- <navigator open-type="redirect" url="/pages/index/main" class="_navigator data-v-084b32bf row btn">返回</navigator> -->
    </view>
</view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            form :{
                client_id:'',
                name:'',
                tel:'',
                identity: 1,
            },
            items: [
                { name: 'SAL', title: '业务方',value: 1 },
                { name: 'INV', title: '资金方',value: 2 },
                // { name: 'OTH', title: '其他' },
            ]
        }
    },
    computed : {
        ...mapGetters(["userInfo"])
    },
    mounted () {
        console.log(`this.userInfo:`,this.userInfo);
        this.initForm();
    },
    methods:{
        identityChange (e) {
            this.form.identity = e.mp.detail.value;
        },
        present (e){
            if (!this.form.name || !this.form.tel){
                wx.showToast({
                    title:'请填写完整',
                    icon: 'none',
                    duration: 2000,
                })
                return;
            }
            this.form.formId = e.mp.detail.formId;
            const self = this;
            wx.showLoading({title:'表单提交中'});
            this.$http.post('/api/apply_identity',this.form).then(res => {
                wx.hideLoading();
                if (res.data == 200){
                    wx.showToast({
                        title:'表单提交成功',
                        icon:'none',
                        duration:2000,
                        // success: function () {
                        //     // wx.navigateTo({url: `/pages/index/main`});
                        //     wx.navigateBack({ delta: 1 })
                        // }
                    })
                    self.initForm();
                } else {
                    wx.showToast({
                        title:'请求出错',
                        icon:'none',
                        duration:1500,
                    })                    
                }
            })
        },
        initForm () {
            this.form.name = '';
            this.form.tel = '';
            this.form.identity = 1;
            this.form.client_id = this.userInfo.client_id;
        }
    }
}
</script>

<style lang="scss" scoped>
.apply-page.data-v-084b32bf{width:80%;height:95vh;margin:40rpx auto;position:relative}.apply-page .form .title.data-v-084b32bf{margin:20rpx 0 35rpx}.apply-page .form .input.data-v-084b32bf{height:41rpx;border-bottom:2rpx solid #000}.apply-page .form .btn.data-v-084b32bf{width:70%;height:100rpx;background-color:#259b24;color:#fff;margin:0 auto 80rpx;border-radius:8rpx;text-align:center;display:flex;align-items:center;justify-content:center;margin-top:50rpx}.apply-page .footer.data-v-084b32bf{position:absolute;bottom:0;width:100%;text-align:center}.apply-page .applied.data-v-084b32bf{height:100%;display:flex;font-size:40rpx;flex-direction:column;justify-content:center;align-items:center}.apply-page .applied .row.data-v-084b32bf{margin:60rpx 0}.apply-page .applied .btn.data-v-084b32bf{width:70%;height:100rpx;background-color:#259b24;color:#fff;margin:0 auto 80rpx;border-radius:8rpx;text-align:center;display:flex;align-items:center;justify-content:center;margin-top:50rpx}
</style>