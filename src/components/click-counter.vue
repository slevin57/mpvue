<template>
  <div class="click-counter">
    <div class="counter-num">次数：{{num}}</div>
    <button class="counter-btn" @click="handleClick">点我呀！</button>
    <button class="counter-reset-btn" @click="handleResetClick">清零</button>
  </div>
</template>

<script>
export default {
  // 增加一个可从外部传入的属性initNum
  props: {
    initNum: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      num: this.initNum //使用传入的initNum值作为初始的点击数
    };
  },

  methods: {
    handleClick() {
      this.num += 1;
      this.notifyNum();
    },
    handleResetClick() {
      this.num = 0;
      this.notifyNum();
    },
    notifyNum() {
      //触发自定义事件 clicknum
      this.$emit("clicknum", {
        num: this.num
      });
    }
  }
};
</script>

<style scoped>
.click-counter {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
  background-color: #ffffff;
  padding: 10px;
}

.counter-num,
.counter-btn,
.counter-reset-btn {
  flex: 1;
  margin: 3px;
}
</style>