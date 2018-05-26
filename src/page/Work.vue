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
      <el-table-column prop="name" label="缩略图">
        <template slot-scope="scope">
            <img style="max-width:100px;max-height:100px;" :src="scope.row.thumb_img_url" />
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
            name="thumb_url"
      			action="http://api.jameschun.cc/index.php/Homepage/Index/upload"
      			:show-file-list="false"
      			:on-success="handleAvatarSuccess">
      			<img v-if="imageUrl" :src="imageUrl" class="avatar">
      			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
    		  </el-upload>
        </el-form-item>
        <el-form-item label="大图：">
          <el-upload
      			class="avatar-uploader"
            name="detail_url"
      			action="http://api.jameschun.cc/index.php/Homepage/Index/detail_upload"
      			:show-file-list="false"
      			:on-success="handleDetailSuccess">
      			<img v-if="detailImageUrl" :src="detailImageUrl" class="avatar">
      			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
    		  </el-upload>
        </el-form-item>
        <el-form-item label="详情">
          <el-input type="textarea" v-model="addForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAdd">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 编辑信息弹框 -->
    <el-dialog
      title="编辑作品"
      :visible.sync="editDialogVisible"
      width="400px"
      @close="editHandleClose">
      <el-form :model="editForm" size="small" label-width="100px">
        <el-form-item label="作品名称：" >
          <el-input v-model="editForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="缩略图：">
          <el-upload
      			class="avatar-uploader"
            name="thumb_url"
      			action="http://api.jameschun.cc/index.php/Homepage/Index/upload"
      			:show-file-list="false"
      			:on-success="handleEditAvatarSuccess">
      			<img v-if="imageUrlEdit" :src="imageUrlEdit" class="avatar">
      			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
    		  </el-upload>
        </el-form-item>
        <el-form-item label="大图：">
          <el-upload
      			class="avatar-uploader"
            name="detail_url"
      			action="http://api.jameschun.cc/index.php/Homepage/Index/detail_upload"
      			:show-file-list="false"
      			:on-success="handleEditDetailSuccess">
      			<img v-if="detailImageUrlEdit" :src="detailImageUrlEdit" class="avatar">
      			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
    		  </el-upload>
        </el-form-item>
        <el-form-item label="详情">
          <el-input type="textarea" v-model="editForm.description"></el-input>
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
      imageUrlEdit: '',
      detailImageUrlEdit: '',
      dialogVisible: false, // 是否显示添加弹框
      editDialogVisible: false, // 是否显示编辑弹框
      addForm: { // 添加字段
        name: '',
        thumb_url_id: '',
        description: '',
        detail_url_id: ''
      },
      editForm: { // 编辑字段
        id: '',
        name: '',
        thumb_url_id: '',
        description: '',
        detail_url_id: ''
      },
      tableData: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 上传成功
  	handleAvatarSuccess(res, file) {
  		this.imageUrl = URL.createObjectURL(file.raw);
      this.addForm.thumb_url_id = res.img_id
  	},
    handleDetailSuccess(res, file) {
  		this.detailImageUrl = URL.createObjectURL(file.raw);
      this.addForm.detail_url_id = res.img_id
  	},
    // 编辑上传成功
    handleEditAvatarSuccess(res, file) {
  		this.imageUrlEdit = URL.createObjectURL(file.raw);
      this.editForm.thumb_url_id = res.img_id
  	},
    handleEditDetailSuccess(res, file) {
  		this.detailImageUrlEdit = URL.createObjectURL(file.raw);
      this.editForm.detail_url_id = res.img_id
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
    // 新增
    add () {
      this.dialogVisible = true
    },
    // 去保存
    saveAdd () {
  	  let params = {
  	    name: this.addForm.name,
  	    thumb_url_id: this.addForm.thumb_url_id,
  	    description: this.addForm.description,
  	    detail_url_id: this.addForm.detail_url_id
  	  }
  	  this.requests.addWork(params).then((res) => {
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
        thumb_url_id: item.thumb_url_id,
        description: item.description,
        detail_url_id: item.detail_url_id
      }
      this.imageUrlEdit = item.thumb_img_url
      this.detailImageUrlEdit = item.detail_img_url
    },
    // 去更新
    saveEdit () {
      let params = {
        id: this.editForm.id,
        name: this.editForm.name,
        thumb_url_id: this.editForm.thumb_url_id,
        description: this.editForm.description,
        detail_url_id: this.editForm.detail_url_id
      }
      this.requests.updateWork(params).then((res) => {
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
        thumb_url_id: '',
        description: '',
        detail_url_id: ''
      }
      this.imageUrl = ''
      this.detailImageUrl = ''
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
.avatar {
  max-width: 100%;
  max-height: 200px;
}

</style>
