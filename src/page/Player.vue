<template>
	<div class="player">
		<el-form ref="form" :model="searchForm" label-width="80px" :inline="true" size="small">
			<el-form-item label="姓名">
				<el-input v-model="searchForm.name" placeholder="请输入球员姓名"></el-input>
			</el-form-item>
      <el-form-item label="出生城市">
				<el-input v-model="searchForm.city" placeholder="请输入出生城市"></el-input>
			</el-form-item>
      <el-form-item label="场上位置">
				<el-input v-model="searchForm.location" placeholder="请输入场上位置"></el-input>
			</el-form-item>
		</el-form>
    <p style="text-align:right">
      <el-button type="primary" size="small" @click="search">搜索</el-button>
      <el-button type="primary" size="small" @click="add">增加</el-button>
    </p>
	</div>
</template>
<script>
import requests from '@/page/requests'
export default {
  extends: requests,
  name: 'player',
  data () {
    return {
      searchForm: {
        name: '',
        city: '',
        location: ''
      }
    }
  },
  methods: {
    search () {
      let params = {
        name: this.searchForm.name,
        city: this.searchForm.city,
        location: this.searchForm.location
      }
      this.requests.getList(params).then((res) => {
        console.log(res)
      })
    },
    add () {
    }
  }
}
</script>
<style>
</style>
