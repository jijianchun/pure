<template>
  <div class="player">
    <p style="text-align:right;margin-right:20px;">
      <el-button type="primary" size="small" @click="add">新增</el-button>
    </p>
    <el-table
      stripe
      :data="tableData"
      style="width: 100%">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="thumb_url" label="缩略图">
      	<template slot-scope="scope">
            <el-tooltip placement="bottom" effect="light">
                <span slot="content">{{scope.row.thumb_url}}</span>
                <span>{{scope.row.thumb_url}}</span>
            </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="toEdit(scope.row)">编辑</el-button>
          <!-- <el-button type="text" size="mini" @click="toDel(scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加人员信息弹框 -->
    <el-dialog
      title="添加作品"
      :visible.sync="dialogVisible"
      width="400px"
      @close="handleClose">
      <el-form :model="addForm" size="small" label-width="100px">
        <el-form-item label="作品名称：" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="缩略图：">
          <el-upload
			class="avatar-uploader"
			action="https://jsonplaceholder.typicode.com/posts/"
			:show-file-list="false"
			:on-success="handleAvatarSuccess">
			<img v-if="imageUrl" :src="imageUrl" class="avatar">
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		  </el-upload>
        </el-form-item>
        <el-form-item label="大图：">
          <el-upload
			class="avatar-uploader"
			action="https://jsonplaceholder.typicode.com/posts/"
			:show-file-list="false"
			:on-success="handleAvatarSuccess">
			<img v-if="detailImageUrl" :src="detailImageUrl" class="avatar">
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		  </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAdd">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 编辑人员信息弹框 -->
    <el-dialog
      title="编辑球员"
      :visible.sync="editDialogVisible"
      width="400px"
      @close="editHandleClose">
      <el-form :model="editForm" size="small" label-width="100px">
        <el-form-item label="球员姓名：" prop="name">
          <el-input v-model="editForm.name" placeholder="请输入球员姓名"></el-input>
        </el-form-item>
        <el-form-item label="出生城市：" prop="city">
          <el-input v-model="editForm.city" placeholder="请输入出生城市"></el-input>
        </el-form-item>
        <el-form-item label="场上位置：" prop="location">
          <el-input v-model="editForm.location" placeholder="请输入场上位置"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import requests from '@/page/requests'
export default {
  extends: requests,
  data () {
    return {
      imageUrl: '',
      detailImageUrl: '',
      dialogVisible: false, // 是否显示添加弹框
      editDialogVisible: false, // 是否显示编辑弹框
      addForm: { // 添加字段
        name: '',
        city: '',
        location: ''
      },
      editForm: { // 编辑字段
        id: '',
        name: '',
        city: '',
        location: ''
      },
      tableData: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
  	handleAvatarSuccess(res, file) {
		this.imageUrl = URL.createObjectURL(file.raw);
	},
    // 查询列表
    getList () {
      this.requests.getWorkList().then((res) => {
        this.tableData = res.data
      })
    },
    // 点击删除按钮
    toDel (row) {
      let id = row.id
      this.requests.delPlayer(id).then((res) => {
        if (res.status) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 新增用户
    add () {
      this.dialogVisible = true
    },
    // 去保存
    saveAdd () {
	  let params = {
	    name: this.addForm.name,
	    city: this.addForm.city,
	    location: this.addForm.location
	  }
	  this.requests.addPlayer(params).then((res) => {
	    if (res.status) {
	      this.$message({
	        message: res.msg,
	        type: 'success'
	      })
	      this.dialogVisible = false
	      this.getList()
	    } else {
	      this.$message.error(res.msg)
	    }
	  })
    },
    // 点击编辑按钮
    toEdit (item) {
      this.editDialogVisible = true
      this.editForm = {
        id: item.id,
        name: item.name,
        city: item.city,
        location: item.location
      }
    },
    // 去更新
    saveEdit () {
      let params = {
        id: this.editForm.id,
        name: this.editForm.name,
        city: this.editForm.city,
        location: this.editForm.location
      }
      this.requests.updatePlayer(params).then((res) => {
        if (res.status) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.editDialogVisible = false
          this.getList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 关闭新增弹窗
    handleClose () {
      this.addForm = {
        name: '',
        city: '',
        location: ''
      }
    },
    // 关闭编辑弹窗
    editHandleClose () {
      this.editForm = {
        id: '',
        name: '',
        city: '',
        location: ''
      }
    }
  }
}
</script>

<style scoped="">
.player {
  padding: 50px 20px;
}
.pager {
  margin-top: 20px;
  text-align: right;
}
</style>
