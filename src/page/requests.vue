<script>
import utils from '@/common/lib/utils'
import axios from '@/common/ajax/ajax'

export default {
  data () {
    return {
      requests: {
        // 获取列表
        getList: (...params) => axios.ajax('Player/Index/query', 'get', ...params),
        // 新增球员
        addPlayer: (...params) => axios.ajax('Player/Index/add', 'post', ...params),
        // 删除球员
        delPlayer: (id) => axios.ajax('Player/Index/del?id=' + id, 'get'),
        // 更新球员信息
        updatePlayer: (...params) => axios.ajax('Player/Index/edit', 'post', ...params),
        // 获取作品列表
        getWorkList: () => axios.ajax('Homepage/Index/work_list', 'get')
      }
    }
  },
  methods: {
    utils () {
      return utils
    }
  }
}
</script>
