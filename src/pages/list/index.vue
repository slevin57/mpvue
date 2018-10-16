<template>
  <div class="container" @click="clickHandle">
    <div class="message">{{msg}}</div>
    <click-counter :init-num="10" @clicknum="handleClickNum" />
    <a href="/pages/share/main" class="counter">页面跳转</a>
    <button @click="changeStatus(false)">增加</button>{{status}}
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

<style scoped>
.message {
  color: red;
  padding: 10px;
  text-align: center;
}
</style>
