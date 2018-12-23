<template>
    <div class="page-client">
        <div class="btns">
            <span class="btn" :class="currentTab==1 ? 'btn-active' : ''" @click="toggleTab(1)">提交资料</span>
            <span class="btn" :class="currentTab==2 ? 'btn-active' : ''" @click="toggleTab(2)">个人中心</span>
        </div>
        <div v-if="currentTab==1" class="sales-index">
            <section class="sec sec-basic ">
                <h4 class="title title-basic">
                    基本资料
                </h4>
                <div class="row">
                    <input v-model="form.prepare_amount" 
                        class="item nr nb item1" type="number" placeholder="借款金额">
                    <input v-model="form.service_type" 
                        class="item nb item2" type="number" placeholder="业务类型">
                </div>
                <div class="row">
                    <input v-model="form.charge" 
                        class="item nb nr item1" type="number" placeholder="收费">
                    <input v-model="form.returnfee" 
                        class="item nb item2" type="number" placeholder="返费">
                </div>
                <div class="row">
                    <input v-model="form.assess_source" 
                        class="item nr item1" type="txt" placeholder="评估来源">
                    <input v-model="form.assess_unit_price" 
                        class="item nr item1" type="number" placeholder="评估单价">
                    <input v-model="form.assess_gross_amount" 
                        class="item item1" type="number" placeholder="评估总额">
                </div>
            </section>
            <section class="sec sec-basic ">
                <h4 class="title title-basic">
                    借款人资料
                </h4>
                <div class="row">
                    <input v-model="form.name" 
                        class="item nb nr item1" type="txt" placeholder="借款人姓名">
                    <picker @change="genderChange" v-model="form.gender" :range="genderList" 
                        class="item nb nr item2 gender-picker">
                        <view class="picker">性别：{{genderList[form.gender]}}</view>
                    </picker>
                    <input v-model="form.age" 
                        class="item nb nr item3" type="number" placeholder="借款人年龄">
                </div>
                <div class="row">
                    <input v-model="form.idcard" 
                        class="item nb item1" type="number" placeholder="借款人身份证号">
                </div>
                <div class="row">
                    <input v-model="form.tel" 
                        class="item item1" type="number" placeholder="借款人电话">
                </div>
                <radio-group class="row radio-group" @change="maritalChange">
                    <label class="item radio" v-for="(item, index) in maritalList" :key="item.status">
                        <radio :value="item.value" :checked="item.checked"/> {{item.status}}
                    </label>
                </radio-group>
            </section>
            <section class="sec sec-basic ">
                <h4 class="title title-basic"> 共借人信息 </h4>
                <div class="row">
                    <input v-model="form.coborrower_name" 
                        class="item nr nb item1" type="txt" placeholder="共借人姓名">
                    <picker @change="coborrowerChange" v-model="form.coborrower_gender" :range="genderList" 
                        class="item nr nb item2 gender-picker">
                        <view class="picker">性别：{{genderList[form.coborrower_gender]}}</view>
                    </picker>
                    <input v-model="form.coborrower_relation" 
                        class="item nb item1" type="txt" placeholder="关系">
                </div>
                <div class="row">
                    <input v-model="form.coborrower_idcard" 
                        class="item nb item1" type="number" placeholder="共借人身份证号">
                </div>
                <div class="row">
                    <input v-model="form.coborrower_tel" 
                        class="item item1" type="number" placeholder="共借人电话">
                </div>
            </section>
            <section class="sec sec-credit ">
                <h4 class="title title-credit"> 信用记录 
                    <div class="switch">
                        是否空白<switch @change="switchChange" />
                    </div>
                </h4>
                <radio-group v-if="form.credit_record==1" class="row radio-group" @change="recordChange">
                    <label class="item  nb radio" v-for="(item, index) in recordList" :key="item.status">
                        <radio :value="item.value" :checked="item.checked"/> {{item.status}}
                    </label>
                </radio-group>
                <div class="row" v-if="form.credit_record==1">
                    <textarea v-model="form.overdue" class="item nt" auto-height placeholder="逾期记录" />
                </div>
            </section>
            <section class="sec sec-house ">
                <h4 class="title title-basic"> 抵押物资料 </h4>
                <div class="row">
                    <input v-model="form.house_type" 
                        class="item nr item1" type="txt" placeholder="房产类型">
                    <input v-model="form.house_owner_certificate" 
                        class="item item1" type="number" placeholder="权属证明编号">
                </div>
                <div class="row">
                    <input v-model="house_owner" 
                        class="item nb nt nr item1" type="txt" placeholder="产权人">
                    <radio-group  class="row nb radio-group" @change="houseOwnerChange">
                        <label class="item nb radio" v-for="(item, index) in ownerTypeList" :key="item.status">
                            <radio :value="item.value" :checked="item.checked"/> {{item.status}}
                        </label>
                    </radio-group>
                </div>
                <div class="row">
                    <textarea v-model="form.house_address" class="item" auto-height placeholder="房产登记地址" />
                </div>
            </section>
            <section class="sec sec-pics">
                <h4 class="title title-pics"> 附件资料 </h4>
                <div class="row">
                    <div class="item">
                        <p class="item-name">身份证正方面</p>
                        <div class="pics" @click="upload(0)"> + </div>
                    </div>
                    <div class="item">
                        <p class="item-name">户口本</p>
                        <div class="pics" @click="upload(1)"> + </div>
                    </div>
                    <div class="item">
                        <p class="item-name">婚姻证明</p>
                        <div class="pics" @click="upload(2)"> + </div>
                    </div>
                </div>   
                <div class="row">
                    <div class="item">
                        <p class="item-name">征信记录</p>
                        <div class="pics" @click="upload(3)"> + </div>
                    </div>
                    <div class="item">
                        <p class="item-name">房产证</p>
                        <div class="pics" @click="upload(4)"> + </div>
                    </div>
                    <div class="item">
                        <p class="item-name">营业执照或工作证明</p>
                        <div class="pics" @click="upload(5)"> + </div>
                    </div>
                </div> 
                <div class="row">
                    <div class="item">
                        <p class="item-name">银行流水</p>
                        <div class="pics" @click="upload(6)"> + </div>
                    </div>
                    <div class="item">
                        <p class="item-name">评估截图</p>
                        <div class="pics" @click="upload(7)"> + </div>
                    </div>
                    <div class="item">
                        <p class="item-name">其他补充资料</p>
                        <div class="pics" @click="upload(8)"> + </div>
                    </div>
                </div>              
            </section>
            <div class="btn" @click="submit()">
                确认提交
            </div>
        </div>
        <div v-if="currentTab==2" class="sales-center">
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
                        <div class="td" v-if="item.status==1">新订单</div>
                        <div class="td" v-if="item.status==2">其他</div>
                        <div class="td" v-if="item.status==3">已通过</div>
                        <div class="td payed" v-if="item.status==1" @click="toForm(item)">提交资料</div>
                        <div class="td unpayed" v-else>不可修改</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="footer">
            广东双赢信息科技有限公司
        </div> -->
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
                phone: 110,
                genderList:['未知','男','女'],
                maritalList:[
                    {status: '未婚', value: 0},
                    {status: '已婚', value: 1, checked: 'true'},
                    {status: '离异', value: 2},
                ],
                recordList:[
                    {status: '止付', value: 0},
                    {status: '冻结', value: 1, checked: 'true'},
                    {status: '呆账', value: 2},
                ],
                ownerTypeList:[
                    {status: '未知', value: 0},
                    {status: '单独', value: 1, checked: 'true'},
                    {status: '共同', value: 2},
                ],
                form:{
                    id:'',
                    agent_id:'',
                    prepare_amount:'',
                    service_type:'',
                    charge:'',
                    returnfee:'',
                    assess_source:'',
                    assess_unit_price:'',
                    assess_gross_amount:'',
                    name:'',
                    age:'',
                    gender:0,
                    idcard:'',
                    tel:'',
                    marital_status: 0,
                    coborrower_name:'',
                    coborrower_relation:'',
                    coborrower_gender:0,
                    coborrower_idcard:'',
                    coborrower_tel:'',
                    credit_record: 1,
                    credit_record_status:'',
                    overdue:'',
                    house_type:'',
                    house_owner_certificate:'',
                    house_owner:'',
                    owner_type:'',
                    house_address:'',
                },
                fileList:[],
                order_id:'',
            }
        },
        computed : {
            ...mapGetters(["userInfo"])
        },
        watch : {
            // userInfo () {
            //     this.clientId = this.userInfo.client_id;
            //     this.fetchData();
            // }
        },
        onLoad (opt) {
            this.order_id = opt.order_id ? opt.order_id : '';
        },
        mounted () {
            this.clientId = this.userInfo.client_id;
            this.fetchData();
            this.initForm();
            this.fetchPhone();
        },
        methods :{
            toggleTab (tab) {
                this.currentTab = tab;
                if (tab == 1){
                    this.initForm();
                }
            },
            fetchData () {
                this.$http.get(`/api/agent_orders/${this.clientId}`).then(res => {
                    console.log(`resd:`,res);
                    this.dataList = res.data;
                })
            },
            genderChange (e){
                this.form.gender = e.mp.detail.value;
            },
            maritalChange (e) {
                this.form.marital_status = e.mp.detail.value;
            },
            coborrowerChange (e){
                this.form.coborrower_gender = e.mp.detail.value;
            },
            switchChange (e){
                this.form.credit_record = e.mp.detail.value ? 0 : 1;
            },
            recordChange (e) {
                this.form.credit_record_status = e.mp.detail.value;
            },
            houseOwnerChange (e) {
                this.form.owner_type = e.mp.detail.value;
            },
            toForm (item) {
                this.order_id = item.id;
                this.currentTab = 1;
            },
            upload (type) {
                const self = this;
                const file_desc = this.type2desc(type);
                const file = {
                    order_id: this.order_id,
                    url:'',
                    file_type:'',
                    file_desc,
                }
                wx.chooseImage({
                    success(res) {
                        const tempFilePaths = res.tempFilePaths
                        wx.uploadFile({
                            url: 'https://www.shuangwin.com/api/upload_image', 
                            filePath: tempFilePaths[0],
                            name: 'file',
                            success(res) {
                                file.file_type = type;
                                file.url = res.data && JSON.parse(res.data);
                                self.fileList.push(file);
                                wx.showToast({
                                    title: '上传成功',
                                    icon:'none',
                                    duration: 1000,
                                })
                            },
                            fail (err) {
                                wx.showToast({
                                    title:'上传失败'+err,
                                    icon:'none',
                                    duration: 1000,
                                })
                            }
                        })
                    }
                })
            },
            submit () {
                if (this.fileList.length == 0) {
                    wx.showToast({
                        title:'请填写完整',
                        icon:'none',
                        duration: 1000,
                    })
                    return;
                }
                this.form.agent_id = this.userInfo.client_id;
                this.form.id = this.order_id;
                let data = [];
                data.push(this.form);
                data.push(this.fileList);
                this.$http.post('api/update_orders',{
                    data
                }).then(res => {
                    if (res.data == 200 ){
                        this.initForm();
                        wx.showToast({
                            title: '提交成功',
                            icon: 'nonne',
                            duration: 2000,
                        })
                    }
                })
            },
            // 文件类型转描述
            type2desc (type) {
                let file_desc = '';
                switch (type) {
                    case 0:
                        file_desc = '身份证';
                        break;
                    case 1:
                        file_desc = '户口本';
                        break;
                    case 2:
                        file_desc = '婚姻证明';
                        break;
                    case 3:
                        file_desc = '征信记录';
                        break;
                    case 4:
                        file_desc = '房产证';
                        break;
                    case 5:
                        file_desc = '营业执照或工作证明';
                        break;
                    case 6:
                        file_desc = '流水私发';
                        break;
                    case 7:
                        file_desc = '评估截图';
                        break;
                    case 8:
                        file_desc = '其他补充资料';
                        break;
                }
                return file_desc;
            },
            // 表格初始化
            initForm () {
                this.form.id = '';
                this.form.agent_id = '';
                this.form.prepare_amount = '';
                this.form.service_type = '';
                this.form.charge = '';
                this.form.returnfee = '';
                this.form.assess_source = '';
                this.form.assess_unit_price = '';
                this.form.assess_gross_amount = '';
                this.form.name = '';
                this.form.age = '';
                this.form.gender = 0;
                this.form.idcard = '';
                this.form.tel = '';
                this.form.marital_status =  0;
                this.form.coborrower_name = '';
                this.form.coborrower_relation = '';
                this.form.coborrower_gender = 0;
                this.form.coborrower_idcard = '';
                this.form.coborrower_tel = '';
                this.form.credit_record =  1;
                this.form.credit_record_status = '';
                this.form.overdue = '';
                this.form.house_type = '';
                this.form.house_owner_certificate = '';
                this.form.house_owner = '';
                this.form.owner_type = '';
                this.form.house_address = '';
                this.fileList = [];
            },
            fetchPhone () {
                this.$http.post('/api/getUserInfo',{
                    userId: this.userInfo.client_id,
                    status: this.userInfo.status,
                }).then(res => {
                    console.log(`resf:`,res);
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
        font-size: 12px;
        color: #474261;
        // font-size: 16px;
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
        .sales-index {
            padding: 0 20rpx;
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
                    textarea {
                        min-height: 80rpx;
                    }
                    .nb{
                        border-bottom: none;
                    }
                    .nt{
                        border-top: none;
                    }
                    .nr {
                        border-right: none;
                    }
                }
                .gender-picker{
                    display: flex;
                    align-items: center;
                    .picker{
                        color: #474261;
                    }
                }
                .radio-group {
                    justify-content: space-around;
                    border: 1px solid #e3e3e3;
                    border-top: none;
                    .radio {
                        border: none;
                    }
                }
            }
            .sec-credit{
                .title-credit{
                    display: flex;
                    justify-content: space-between;
                    .switch{
                        color: #e3e3e3;
                        margin-left: 5rpx;
                    }
                }
                .radio-group{
                    border-top: 1px solid #e3e3e3;
                }
            }
            .sec-pics {
                margin-bottom: 50rpx;
                .row {
                    .item {
                        display: flex;
                        flex-direction: column;
                        .pics {
                            margin: 15rpx 0 20rpx;
                            display: flex;
                            justify-content: center;
                            font-size: 25px;
                            font-weight: bold;
                            .pic {
                                width: 75rpx;
                                height: 50rpx;
                                img{
                                    display: block;
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            .pic-left {
                                margin-right: 15rpx;
                            }
                        }
                    }
                }
            }
            .btn{
                width: 70%;
                height: 80rpx;
                background-color:#259b24;
                color: #fff; 
                margin: 0 auto 80rpx;
                border-radius: 4px;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
        .sales-center{
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
            .phone-box{
                padding: 20rpx;
                display: flex;
                justify-content: space-between;
                .phone-num{
                    display: flex;
                    align-items: center;
                    input {
                        border-bottom: 1px solid #e3e3e3;
                    }
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
        }
        .footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            text-align: center;            
        }
    }
</style>