<script>
import {mapMutations} from 'vuex'
export default {
    created () {
    },
    onLaunch () {
    },
    mounted () {
    },
    onShow (opts) {
        this.changeOptions(opts);
    },
    onHide () {
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