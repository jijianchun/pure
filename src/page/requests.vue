<script>
import utils from '@/common/lib/utils'
import axios from '@/common/ajax/ajax'

export default {
  data () {
    return {
      requests: {
        // 获取列表
        getList: (...params) => axios.ajax('Index/query', 'get', ...params)
      }
    }
  },
  created () {
  },
  methods: {
    utils () {
      return utils
    }
  }
}
</script>
