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
                <div class="item bottom-none ">{{dataInfo.apply_amount}}</div>
                <div class="item left-none bottom-none">{{dataInfo.service_type}}</div>
            </div>
            <!-- <div class="row">
                <div class="item item1">{{dataInfo.charge}}</div>
                <div class="item item2">{{dataInfo.returnfee}}</div>
            </div> -->
            <div class="row">
                <div class="item item1">{{dataInfo.assess_source}}</div>
                <div class="item item2 left-none">{{dataInfo.assess_unit_price}}</div>
                <div class="item item2 left-none">{{dataInfo.assess_gross_amount}}</div>
            </div>
        </section>
        <section class="sec sec-basic ">
            <h4 class="title title-basic">
                借款人资料
            </h4>
            <div class="row">
                <div class="item bottom-none item1">{{dataInfo.name}}</div>
                <div class="item bottom-none left-nonne item2" v-if="dataInfo.gender==0">未知</div>
                <div class="item bottom-none left-nonne item2" v-if="dataInfo.gender==1">男</div>
                <div class="item bottom-none left-nonne item2" v-if="dataInfo.gender==2">女</div>
                <div class="item bottom-none left-nonne item2">{{dataInfo.age}}</div>
            </div>
            <div class="row">
                <div class="item item1 bottom-none">{{dataInfo.idcard}}</div>
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
                <div class="item bottom-none item1">{{dataInfo.coborrower_name}}</div>
                <div class="item bottom-none left-none item2" v-if="dataInfo.coborrower_gender==1">男</div>
                <div class="item bottom-none left-none item2" v-if="dataInfo.coborrower_gender==2">女</div>
                <div class="item bottom-none left-none item2" v-if="dataInfo.coborrower_gender==0">未知</div>
                <div class="item bottom-none left-none item2">{{dataInfo.coborrower_relation}}</div>
            </div>
            <div class="row">
                <div class="item bottom-none item1">{{dataInfo.coborrower_idcard}}</div>
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
                <div class="item bottom-none item1">{{dataInfo.house_type}}</div>
                <div class="item bottom-none left-none item1">{{dataInfo.house_address}}</div>
            </div>
            <div class="row">
                <div class="item bottom-none item1">{{dataInfo.house_owner}}</div>
                <div class="item bottom-none left-none item1" v-if="dataInfo.owner_type==0">未知</div>
                <div class="item bottom-none left-none item1" v-if="dataInfo.owner_type==1">单独拥有</div>
                <div class="item bottom-none left-none item1" v-if="dataInfo.owner_type==2">共同拥有</div>
            </div>
            <div class="row">
                <div class="item item1">{{dataInfo.house_owner_certificate}}</div>
            </div>
        </section>
        <section class="sec sec-pics ">
            <h4 class="title title-basic"> 附件资料 </h4>
            <div class="row">
                <div class="item" v-for="(item,index) in fileList" :key="index">
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
                        <div class="pic pic-left" @click="preview(item.url)"><img :src="item.url"></img></div>
                        <div class="pic" v-if="item.url2" @click="preview(item.url2)"><img :src="item.url2"></img></div>
                    </div>
                </div>
            </div>
        </section>
        <navigator open-type="redirect" url="/pages/index/main" class="btn" >返回首页</navigator >
    </div>
</template>

<script>
    export default {
        data () {
            return {
                dataInfo:{},
                id: '',
                fileList: [],
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
            
        },
        methods :{
            fetchData (id) {
                this.$http.get(`/api/order_detail/${id}`).then( res => {
                    console.log(`res:`,res);
                    this.dataInfo = res.data[0];
                    let files = res.data[1];

                    let obj = {};
                    this.fileList = files.reduce((file,next)=>{
                        if (obj[next.file_type]){
                            obj[next.file_type].url2 = next.url
                        } else {
                            obj[next.file_type] = next ;
                            file.push(next)
                        }
                        return file;
                    },[])
                    console.log(`files:`,this.fileList);
                })
            },
            preview (url){
                wx.previewImage({
                    current: url, // 当前显示图片的http链接
                    urls: [url] // 需要预览的图片http链接列表
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
            textarea {
                min-height: 80rpx;
            }
            .item {
                flex: 1;
                border: 1px solid #e3e3e3;
                padding: 5rpx 20rpx;
            }
            .bottom-none {
                border-bottom: none;
            }
            .left-none {
                border-left: none;
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
                    width: 165rpx;
                    overflow: hidden;
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