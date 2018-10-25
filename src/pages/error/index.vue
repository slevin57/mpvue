<template>
    <div class="error-page">
        <div class="hint" @click="navigateBack()">
            抱歉，找不到当前视频。
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {

        }
    },
    methods :{
        navigateBack () {
            wx.navigateBack({
                delta: 1
            })
        }
    }
}

</script>

<style lang="scss" scoped>
.error-page{
    width: 100wh;
    height: 100vh;
    background-color: #151515;
    display: flex;
    justify-content: center;
    align-items: center;
    .hint{
        width: 80%;
        height: 120rpx;
        // border: 5rpx solid red;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>

