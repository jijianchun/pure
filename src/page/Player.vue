<template>
  <div class="player">
    <el-form ref="form" :model="searchForm" lable-width="80px" :inline="true" size="small">
      <el-form-item label="球员姓名：">
        <el-input v-model="searchForm.name" placeholder="请输入球员姓名"></el-input>
      </el-form-item>
      <el-form-item label="出生城市：">
        <el-input v-model="searchForm.city" placeholder="请输入出生城市"></el-input>
      </el-form-item>
      <el-form-item label="场上位置：">
        <el-input v-model="searchForm.location" placeholder="请输入场上位置"></el-input>
      </el-form-item>
    </el-form>
    <p style="text-align:right;margin-right:20px;">
      <el-button type="primary" size="small" @click="search">搜索</el-button>
      <el-button type="primary" size="small" @click="reset">重置</el-button>
      <el-button type="primary" size="small" @click="add">新增</el-button>
    </p>
    <el-table
      stripe
      :data="tableData"
      style="width: 100%">
      <el-table-column prop="id" label="球员编号"></el-table-column>
      <el-table-column prop="name" label="球员姓名"></el-table-column>
      <el-table-column prop="city" label="出生城市"></el-table-column>
      <el-table-column prop="location" label="场上位置"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="toEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="mini" @click="toDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pager"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10,25,50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>
    <!-- 添加人员信息弹框 -->
    <el-dialog
      title="添加球员"
      :visible.sync="dialogVisible"
      width="400px"
      @close="handleClose">
      <el-form :model="addForm" size="small" :rules="validAddForm" ref="validAddForm" label-width="100px">
        <el-form-item label="球员姓名：" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入球员姓名"></el-input>
        </el-form-item>
        <el-form-item label="出生城市：" prop="city">
          <el-input v-model="addForm.city" placeholder="请输入出生城市"></el-input>
        </el-form-item>
        <el-form-item label="场上位置：" prop="location">
          <el-input v-model="addForm.location" placeholder="请输入场上位置"></el-input>
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
      <el-form :model="editForm" size="small" :rules="validAddForm" ref="validEditForm" label-width="100px">
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
      dialogVisible: false, // 是否显示添加弹框
      editDialogVisible: false, // 是否显示编辑弹框
      currentPage: 1, // 当前页
      pageSize: 10, // 每页显示个数
      totalNum: 0, // 总数
      searchForm: { // 查询项
        name: '',
        city: '',
        location: ''
      },
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
      validAddForm: {
        name: [
          { required: true, message: '请输入球员姓名', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请输入出生城市', trigger: 'blur' }
        ],
        location: [
          { required: true, message: '请输入场上位置', trigger: 'blur' }
        ]
      },
      tableData: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 查询列表
    getList () {
      let pagerParams = {
        pageSize: this.pageSize,
        pageNo: this.currentPage
      }
      let params = {
        name: this.searchForm.name,
        city: this.searchForm.city,
        location: this.searchForm.location
      }
      let resParams = this.utils().handleGetAjaxParams(params, pagerParams)
      this.requests.getList(resParams).then((res) => {
        this.tableData = res.data
        this.totalNum = res.total
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
      this.$refs['validAddForm'].validate((valid) => {
        if (valid) {
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
      this.$refs['validEditForm'].validate((valid) => {
        if (valid) {
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
        }
      })
    },
    // 点击搜索
    search () {
      this.currentPage = 1
      this.getList()
    },
    // 重置
    reset () {
      this.currentPage = 1
      this.searchForm = {
        name: '',
        city: '',
        location: ''
      }
      this.getList()
    },
    /**
     * @description 监听每页展示条数改变
     */
    handleSizeChange (pagesize) {
      this.pageSize = pagesize
      this.getList()
    },
    /**
     * @description 监听当前页码改变
     */
    handleCurrentChange (currentpage) {
      this.currentPage = currentpage
      this.getList()
    },
    // 关闭新增弹窗
    handleClose () {
      this.$refs['validAddForm'].clearValidate()
      this.addForm = {
        name: '',
        city: '',
        location: ''
      }
    },
    // 关闭编辑弹窗
    editHandleClose () {
      this.$refs['validEditForm'].clearValidate()
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
