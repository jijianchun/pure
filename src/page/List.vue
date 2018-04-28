<template>
  <div class="list">
    <el-row>
      <el-col :span="12">hello</el-col>
      <el-col :span="12">
        <el-switch
          v-model="value2"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-col>
    </el-row>
    <p style="text-align:right">
      <el-button type="primary" @click="search" size="small">查询</el-button>
      <el-button type="primary" @click="addShortDialog=true" size="small">新增short</el-button>
    </p>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="post_title"
            label="标题"
            width="300">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import requests from '@/page/requests'
export default {
  extends: requests,
  name: 'list',
  data () {
    return {
      value2: true,
      tableData: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.requests.getList().then((res) => {
        this.tableData = res
      })
    }
  }
}
</script>
<style>

</style>
