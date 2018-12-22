<template>
    <div class="page-formshow">
        <section class="tip">
            由于资料数据过大，此处仅做统计展示，详细资料可发至您的邮箱
        </section>
        <section class="sec sec-basic ">
            <h4 class="title title-basic">
                基本资料
            </h4>
            <div class="row">
                <div class="item item1">{{dataInfo.apply_amount}}</div>
                <div class="item item2">{{dataInfo.service_type}}</div>
            </div>
            <!-- <div class="row">
                <div class="item item1">{{dataInfo.charge}}</div>
                <div class="item item2">{{dataInfo.returnfee}}</div>
            </div> -->
            <div class="row">
                <div class="item item1">{{dataInfo.assess_source}}</div>
                <div class="item item2">{{dataInfo.assess_unit_price}}</div>
                <div class="item item2">{{dataInfo.assess_gross_amount}}</div>
            </div>
        </section>
        <section class="sec sec-basic ">
            <h4 class="title title-basic">
                借款人资料
            </h4>
            <div class="row">
                <div class="item item1">{{dataInfo.name}}</div>
                <div class="item item2" v-if="dataInfo.gender==0">未知</div>
                <div class="item item2" v-if="dataInfo.gender==1">男</div>
                <div class="item item2" v-if="dataInfo.gender==2">女</div>
                <div class="item item2">{{dataInfo.age}}</div>
            </div>
            <div class="row">
                <div class="item item1">{{dataInfo.idcard}}</div>
            </div>
            <div class="row">
                <div class="item item1">{{dataInfo.tel}}</div>
            </div>
            <div class="row">
                <div class="item item1" v-if="dataInfo.marital_status==0">未婚</div>
                <div class="item item1" v-if="dataInfo.marital_status==1">已婚</div>
                <div class="item item1" v-if="dataInfo.marital_status==2">离异</div>
            </div>
        </section>
        <section class="sec sec-basic ">
            <h4 class="title title-basic"> 共借人信息 </h4>
            <div class="row">
                <div class="item item1">{{dataInfo.coborrower_name}}</div>
                <div class="item item2" v-if="dataInfo.coborrower_gender==1">男</div>
                <div class="item item2" v-if="dataInfo.coborrower_gender==2">女</div>
                <div class="item item2" v-if="dataInfo.coborrower_gender==0">未知</div>
                <div class="item item2">{{dataInfo.coborrower_relation}}</div>
            </div>
            <div class="row">
                <div class="item item1">{{dataInfo.coborrower_idcard}}</div>
            </div>
            <div class="row">
                <div class="item item1">{{dataInfo.coborrower_tel}}</div>
            </div> 
        </section>
        <section class="sec sec-basic ">
            <h4 class="title title-basic"> 信用记录 </h4>
            <div class="row">
                <div class="item item1" v-if="dataInfo.credit_record_status==0">止付</div>
                <div class="item item1" v-if="dataInfo.credit_record_status==1">冻结</div>
                <div class="item item1" v-if="dataInfo.credit_record_status==2">呆账</div>
            </div>
            <div class="row">
                <div class="item item1">{{dataInfo.client_remark}}</div>
            </div>
        </section>
        <section class="sec sec-basic ">
            <h4 class="title title-basic"> 抵押物资料 </h4>
            <div class="row">
                <div class="item item1">{{dataInfo.house_type}}</div>
                <div class="item item1">{{dataInfo.house_address}}</div>
            </div>
            <div class="row">
                <div class="item item1">{{dataInfo.house_owner}}</div>
                <div class="item item1" v-if="dataInfo.owner_type==0">未知</div>
                <div class="item item1" v-if="dataInfo.owner_type==1">单独拥有</div>
                <div class="item item1" v-if="dataInfo.owner_type==2">共同拥有</div>
            </div>
            <div class="row">
                <div class="item item1">{{dataInfo.house_owner_certificate}}</div>
            </div>
        </section>
        <section class="sec sec-pics ">
            <h4 class="title title-basic"> 附件资料 </h4>
            <div class="row">
                <div class="item" v-for="item in test">
                    <p class="item-name" v-if="item.file_type=='0'">身份证正反面</p>
                    <p class="item-name" v-if="item.file_type=='1'">户口本</p>
                    <p class="item-name" v-if="item.file_type=='2'">婚姻证明</p>
                    <p class="item-name" v-if="item.file_type=='3'">征信记录</p>
                    <p class="item-name" v-if="item.file_type=='4'">房产证</p>
                    <p class="item-name" v-if="item.file_type=='5'">执照或工作证明</p>
                    <p class="item-name" v-if="item.file_type=='6'">银行流水</p>
                    <p class="item-name" v-if="item.file_type=='7'">评估截图</p>
                    <p class="item-name" v-if="item.file_type=='8'">其他补充资料</p>
                    <div class="pics">
                        <!-- <div class="pic pic-left"><img :src="item.url"></img></div> -->
                        <!-- <div class="pic"><img :src="item.url"></img></div> -->
                    </div>
                </div>
                <!-- <div class="item">
                    <p class="item-name">户口本</p>
                    <div class="pics">
                        <div class="pic pic-left"><img :src="files[1].url"></img></div>
                        <div class="pic"><img :src="files[1].url"></img></div>
                    </div>
                </div>
                <div class="item">
                    <p class="item-name">婚姻证明</p>
                    <div class="pics">
                        <div class="pic pic-left"><img :src="files[2].url"></img></div>
                        <div class="pic"><img :src="files[2].url"></img></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="item">
                    <p class="item-name">征信记录</p>
                    <div class="pics">
                        <div class="pic pic-left"><img :src="files[3].url"></img></div>
                        <div class="pic"><img :src="files[3].url"></img></div>
                    </div>
                </div>
                <div class="item">
                    <p class="item-name">房产证</p>
                    <div class="pics">
                        <div class="pic pic-left"><img :src="files[4].url"></img></div>
                        <div class="pic"><img :src="files[4].url"></img></div>
                    </div>
                </div>
                <div class="item">
                    <p class="item-name">执照或工作证明</p>
                    <div class="pics">
                        <div class="pic pic-left"><img :src="files[5].url"></img></div>
                        <div class="pic"><img :src="files[5].url"></img></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="item">
                    <p class="item-name">银行流水</p>
                    <div class="pics">
                        <div class="pic pic-left"><img :src="files[6].url"></img></div>
                        <div class="pic"><img :src="files[6].url"></div>
                    </div>
                </div>
                <div class="item">
                    <p class="item-name">评估截图</p>
                    <div class="pics">
                        <div class="pic pic-left"><img :src="files[7].url"></div>
                        <div class="pic"><img :src="files[7].url"></div>
                    </div>
                </div>
                <div class="item">
                    <p class="item-name">其他补充资料</p>
                    <div class="pics">
                        <div class="pic pic-left"><img :src="files[8].url"></div>
                        <div class="pic"><img :src="files[8].url"></div>
                    </div>
                </div> -->
            </div>
        </section>
        <button @click="upload">shangchuan</button>
        <navigator open-type="redirect" url="/pages/index/main" class="btn" >返回首页</navigator >
    </div>
</template>

<script>
    export default {
        data () {
            return {
                dataInfo:{},
                id: '',
                test:[
                    {
                        file_type: 0,
                        url: 'fdfdf',
                        title:'证面'
                    },
                    {
                        file_type: 0,
                        url: 'fdfdf',
                        title:'反面'
                    },
                    {
                        file_type: 1,
                        url: 'fdfdf',
                        title:'户口本'
                    }
                ]
            }
        },
        onLoad (opt) {
            this.id = opt.id;
        },
        watch:{
            id () {
                if (this.id) {
                    this.fetchData(this.id);
                }
            }
        },
        mounted (){
            let types = [];
            let list = [];
            for (let i = 0; i < this.test.length; i++) {
                console.log(`this.test[i]:`,types.indexOf(this.test[i].file_type));
                // if (types.indexOf(this.test[i].file_type) == -1){
                //     types.push(this.test[i].file_type);
                //     list.push(this.types[i]);
                // } else {
                //     console.log(`types.indexOf(this.test[i].file_type):`,types.indexOf(this.test[i].file_type));
                // }
                
            }

            // this.test.forEach(file => {
            //     if (types.indexOf(file.file_type) == -1) {

            //     }
            // });
        },
        methods :{
            fetchData (id) {
                this.$http.get(`/api/order_detail/${id}`).then( res => {
                    console.log(`res:`,res);
                    this.dataInfo = res.data[0];
                    let files = res.data[0];
                })
            },
            upload () {
                const self = this;
                wx.chooseImage({
                    success(res) {
                        const tempFilePaths = res.tempFilePaths
                        wx.uploadFile({
                            url: 'https://www.shuangwin.com/api/upload_image', 
                            filePath: tempFilePaths[0],
                            name: 'file',
                            success(res) {
                                const data = res.data
                                console.log(`res:`,res);
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
.page-formshow {
    font-size: 12px;
    color: #474261;
    padding: 20rpx;
    .tip{
        width: 95%;
        margin: 0 auto;
        border: 1px solid #e3e3e3;
        color: #e3e3e3;
        text-align: center;
        // height: 40rpx;
    }
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
        }
    }
    .sec-pics {
        margin-bottom: 50rpx;
        .row {
            .item {
                display: flex;
                flex-direction: column;
                // .item-title{

                // }
                .pics {
                    margin: 15rpx 0 20rpx;
                    display: flex;
                    justify-content: center;
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
</style>