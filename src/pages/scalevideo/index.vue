<template>
<div class="page">
    <!-- <div class="video" style="height:100vh"> -->
        <video src="https://resources.laihua.com/2018-10-26/2f7761b0-d8c5-11e8-83ec-13730645ec8d.mp4" 
        objectFit="contain" :style="{height:h+'rpx'}"></video>
    <!-- </div> -->
    <div class="scroll">
        test1
    </div>
</div>
</template>


<script>
    export default {
        data () {
            return {
                h: 710
            }
        },
        onPageScroll (e) {
            console.log(`e:`,e);
            this.h = this.h - e.scrollTop;
        },
        methods:{
            
        }
    }
</script>
<style scoped lang="scss">
.page{
    width: 100wh;
    height: 100vh;
}
.video{
    width: 100%;
    // height: 80%;
    position: fixed;
    left: 0;
    top: 0;
    background: pink;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}
video{
    position: fixed;
    left: 0;
    top: 0;
    // height: 710rpx;
    width: 100%;
}
.scroll{
    height: 100vh;
    margin-top: 710rpx;
    box-sizing: border-box;
}
</style>
