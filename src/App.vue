<script>
import {mapMutations} from 'vuex'
export default {
  created () { },
  onShow (opts) {
      console.log(`opts:`,opts);
      this.changeOptions(opts);
  },
  onHide () {
    //   console.log(`22222:`,22222);
  },
  methods:{
      ...mapMutations(['changeOptions'])
  }
}
</script>

<style>
.container {
  background-color: #cccccc;
}
</style>