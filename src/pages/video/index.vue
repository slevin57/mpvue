// 全屏视频测试页
<template>
  <!-- <div class="container" @click="clickHandle">
    <div class="message">{{msg}}</div>
    <click-counter :init-num="10" @clicknum="handleClickNum" />
    <a href="/pages/share/main" class="counter">页面跳转</a>
    <button @click="changeStatus(false)">增加</button>{{status}}
  </div> -->
    <div class="outer">
        <div class="wrapper">
            <video class="sss" id="fullVideo" src="https://resources.laihua.com/web4/homeindexvideo.mp4" controls ></video>
        </div>
    </div>
</template>

<script>
import ClickCounter from "@/components/click-counter";
import {mapGetters,mapMutations} from 'vuex'

export default {
  components: { ClickCounter },

  data() {
    return {
      msg: "Hello"
    };
  },
  computed : {
    ...mapGetters([
        'status'
    ])
  },

  created () {
      console.log(`this:`,this.$store);
  },

  methods: {
    ...mapMutations(['changeStatus']),
    clickHandle() {
      this.msg = "Clicked!!!!!!";
    },
    handleClickNum(data) {
      console.log(">>>>>>", data.num);
    }
  }
};
</script>

<style scoped lang="scss">
.message {
  color: red;
  padding: 10px;
  text-align: center;
}
.outer {
    height: 100vh;
    width: 100vw;
    .wrapper{
        position: fixed;
        // left: 50%;
        // top: 50%;
        // transform: rotate(90deg) translateX(-50%) translateY(-50%);
        transform: rotate(90deg);
        background-color: pink;
        padding: 20px;
    }
    video{
        display: block;
        // width: 100%;
        // height: 100%;
        object-fit: fill;
    }
}
</style>
