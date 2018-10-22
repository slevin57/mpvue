<script>
import {mapMutations} from 'vuex'
export default {
  created () { },
  onShow (opts) {
      this.changeOptions(opts);
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