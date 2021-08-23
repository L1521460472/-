<template>
  <div id="header" v-loading="loading" element-loading-text="loading">
    <div class="header">
      <div class="title">我的机器人</div>
      <div class="container">
        <div class="headerBtn">
          <div class="headerBtnLeft">
            <el-button class="addBtn" style="border-radius: 4px 0 0 4px;" type="primary" size="small" @click="getTableList">
              <i class="iconfont iconshuaxin"></i>
            </el-button>
            <el-button class="addBtn" type="primary" size="small" @click="getTableList(1)">
              <i class="iconfont iconguanbi"></i>
            </el-button>
            <el-input v-model="value" size="small" maxlength="50" placeholder="名称">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="getTableList" style="cursor:pointer"></i>
            </el-input>
          </div>
          <div class="headerBtnRight">
            <el-button type="primary" size="small" @click="handleAdd" v-has="'robotAdd'">
              <i class="iconfont iconxinzeng"></i>
              创建机器人
            </el-button>
            <el-button class="iconBtn" :class="{ 'active': !isDisable }" size="small" :disabled="isDisable" @click="handleDeleteAll" v-has="'robotDelete'">
              <i class="iconfont iconshanchu"></i>
              删除
            </el-button>
          </div>
        </div>
        <el-table border :header-cell-style="{background:'#F4F4F4',color:'#333333'}" size="small" :data="tableData" @selection-change="handleSelectionChange" style="width: 100%;"
          :style="{ color: '#333', 'min-height': tableHeight + 'px' }">
          <el-table-column type="selection" align="center" width="60"></el-table-column>
          <el-table-column prop="name" label="名称"  show-overflow-tooltip></el-table-column>
          <el-table-column prop="appName" label="应用"  show-overflow-tooltip></el-table-column>
          <el-table-column prop="description" label="描述"  show-overflow-tooltip></el-table-column>
          <el-table-column prop="createTime" label="创建时间"  show-overflow-tooltip></el-table-column>
          <el-table-column prop="expireTime" label="过期时间"  show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <!-- <el-tooltip class="item" effect="dark" content="修改" placement="bottom" v-has="'robotUpdate'">
                <img class="operation" @click="handleEdit(scope.row)" src="../../assets/svg/edit_icon.svg">
              </el-tooltip> -->
              <span class="operation" @click="handleEdit(scope.row)" v-has="'robotUpdate'">修改</span>
              <!-- <el-tooltip class="item" effect="dark" content="删除" placement="bottom"> -->
                <el-popover placement="bottom" width="200" :ref="`deleteVideo-${scope.$index}`" trigger="click" v-has="'robotDelete'">
                  <span style="padding: 30px">是否删除该机器人？</span>
                  <div class="group-footer">
                    <el-button size="mini" type="primary" @click="handleDelete(scope.row, scope)">确定</el-button>
                    <el-button size="mini" @click="cancleDeleteVideoFile(scope)">取消</el-button>
                  </div>
                  <!-- <el-button type="text" style="padding: 0" slot="reference" v-has="'messageMouldDeleteById'">
                    <img src="../../assets/svg/delete_icon.svg" />
                  </el-button> -->
                  <span class="operation" v-has="'messageMouldDeleteById'" slot="reference">删除</span>
                </el-popover>
              <!-- </el-tooltip> -->
            </template>
          </el-table-column>
        </el-table>
        <div class="footer_page">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" :pager-count="5"
            layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
        </div>
      </div>
    </div>
    <!-- 新增/编辑机器人 -->
    <el-drawer :title="drawerTitle" :visible.sync="drawer" :before-close="handleClose" :modal-append-to-body="true" :wrapperClosable="false" size="500px" direction="rtl">
      <el-form class="drawerContent" ref="form" :model="form" :rules="rules" label-width="100px" label-position="right">
        <el-form-item prop="name" label="机器人名称:">
          <el-input size="small" v-model="form.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="app" label="应用:">
          <el-select v-model="form.app" clearable size="small" placeholder="请选择应用">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="content" label="分组描述:">
          <el-input size="small" type="textarea" placeholder="请输入" v-model="form.desc" style="width: 260px" show-word-limit maxlength="200" :autosize="{ minRows: 10, maxRows: 15 }"></el-input>
        </el-form-item>
        <el-form-item prop="parmentDepartment" label="">
          <el-button type="primary" size="small" @click="confirmAdd" :disabled="isConfirmAdd">确 定</el-button>
          <el-button size="small" @click="drawer = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import {
  tableList,
  enterpriseApplist,
  robotAdd,
  robotUpdate,
  robotDelete,
} from '@/api/robot/myrobot'
import {getButtonList} from '@/public'
export default {
  name: 'myrobot',
  props:{
    authorityBttonList:{
      type:Array
    },
  },
  data() {
    return {
      loading: false,
      value: '',
      tableData: [],
      form: {
        id: '',
        name: '',
        app: '',
        desc: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入机器人名称', trigger: 'blur' },
        ],
        app: [{ required: true, message: '请输入应用', trigger: 'change' }],
      },
      options: [],
      multipleSelection: [],
      // addBtn:false,//新增按钮
      // deleteBtn:false,//删除按钮
      // updatedBtn:false,//修改按钮
      total: 0,
      pageSize: 10,
      currentPage: 1,
      isDisable: true,
      isConfirmAdd:false,
      drawer: false,
      text: '新增',
      drawerTitle: '新增机器人',
      tableHeight: window.innerHeight - 304 + '',
    }
  },
  methods: {
    handleAdd() {
      this.drawer = true
      this.text = '新增'
      this.drawerTitle = '新增机器人'
      this.form.app = ''
      this.form.desc = ''
      this.form.name = ''
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getTableList()
    },
    //选择页数
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTableList()
    },
    //关闭弹框之前
    handleClose(done) {
      done()
    },
    //确定新增修改
    confirmAdd() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.isConfirmAdd = true;
          if (this.text == '新增') {
            robotAdd({
              appId: this.form.app,
              description: this.form.desc,
              name: this.form.name,
            })
              .then((res) => {
                if (res.data.status == 0) {
                  this.isConfirmAdd = false;
                  this.$message.success({
                    message: '新增成功',
                    center: true,
                  })
                  this.drawer = false
                  this.getTableList()
                }else{
                    this.isConfirmAdd = false;
                    this.$message.error({
                        message: res.data.message,
                        center: true,
                    })
                }
              })
              .catch(error=> {
                this.$message.error({
                  message: error,
                  center: true,
                })
              })
          } else {
            robotUpdate({
              id: this.form.id,
              appId: this.form.app,
              description: this.form.desc,
              name: this.form.name,
            })
              .then((res) => {
                if (res.data.status == 0) {
                  this.isConfirmAdd = false;
                  this.$message.success({
                    message: '修改成功',
                    center: true,
                  })
                  this.drawer = false
                  this.getTableList()
                }else{
                    this.$message.error({
                        message: res.data.message,
                        center: true,
                    })
                }
              })
              .catch((error) => {
                this.$message.error({
                  message: error,
                  center: true,
                })
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleEdit(row) {
      this.drawer = true
      this.text = '修改'
      this.drawerTitle = '修改机器人'
      this.form.id = row.id
      this.form.app = row.appId
      this.form.desc = row.description
      this.form.name = row.name
    },
    handleDeleteAll() {
      this.$confirm('确定删除选中的机器人吗？', {
        cancelButtonText: '取 消',
        confirmButtonText: '确 定',
        confirmButtonClass: 'btn-custom-confirm',
        center: true,
      })
        .then(() => {
          let ids = []
          this.multipleSelection.forEach((item) => {
            ids.push(item.id)
          })
          ids = ids.join()
          robotDelete({ ids: ids })
            .then((res) => {
              if (res.data.status == 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功！',
                  center: true,
                })
                this.getTableList()
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.message,
                  center: true,
                })
              }
            })
            .catch((error) => {
              this.$message({
                type: 'error',
                message: error,
                center: true,
              })
            })
        })
        .catch()
    },
    handleDelete(row, scope) {
      robotDelete({
        ids: row.id,
      })
        .then((res) => {
          if (res.data.status == 0) {
            scope._self.$refs[`deleteVideo-${scope.$index}`].doClose()
            this.$message.success({
              message: '删除成功',
              center: true,
            })
            this.getTableList()
          }
        })
        .catch((error) => {
          this.$message.error({
            message: error,
            center: true,
          })
        })
    },
    // 取消删除
    cancleDeleteVideoFile(scope) {
      scope._self.$refs[`deleteVideo-${scope.$index}`].doClose()
    },
    handleSelectionChange(val) {
      this.isDisable = val.length > 0 ? false : true
      this.multipleSelection = val
    },
    getTableList(val) {
      if (val == 1) {
        this.value = ''
        this.currentPage = 1
      }
      if (this.value !== '') {
        this.currentPage = 1
      }
      tableList({
        enterpriseId: 0,
        name: this.value,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      })
        .then((res) => {
          this.tableData = res.data.data.records
          this.total = res.data.data.total
        })
        .catch((error) => {
          this.$message.error({
            message: error,
            center: true,
          })
        })
    },
    keyDown(e) {
      if (e.keyCode == 13) {
        this.getTableList()
      }
    },
  },
  mounted() {
    this.getTableList()
    enterpriseApplist().then((res) => {
      this.options = res.data.data
    })
    window.addEventListener('keydown', this.keyDown) //绑定监听事件
  },
  // watch: {
  //   authorityBttonList:{
  //     handler(data) {
  //         let btns = getButtonList(data,'/myrobot')
  //         btns.map(item=>{
  //             if(item.code == "robotAdd") this.addBtn = true
  //             if(item.code == "robotUpdate") this.updatedBtn = true
  //             if(item.code == "robotDelete") this.deleteBtn = true
  //         })
  //     },
  //     immediate: true,
  //     deep: true,
  //   }
  // },
  destroyed() {
    window.removeEventListener('keydown', this.keyDown, false) //移除监听事件
  },
}
</script>
<style lang="less" scoped>
#header {
  width: 100%;
  height: 100%;
  color: #333;
  .header {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-size: 14px;
    padding: 0 70px;
  }
  .title {
    height: 90px;
    font-size: 20px;
    line-height: 80px;
    box-sizing: border-box;
    padding-top: 10px;
  }
  .container {
    width: 100%;
    height: calc(100%-90px);
    // height: calc(100% - 96px);
    // overflow: hidden;
    .headerBtn {
      height: 64px;
      .headerBtnLeft {
        float: left;
        display: flex;
        align-items: center;
        .el-button + .el-button {
          margin-left: 0px;
          margin-right: 10px;
          border-radius: 0 4px 4px 0;
          border-left-color: rgba(255, 255, 255, 0.5);
        }
        .el-input {
          width: 160px;
        }
      }
      .headerBtnRight {
        float: right;
        display: flex;
        align-items: center;
        .iconBtn.active {
          color: #368cfe !important;
          border-radius: 4px;
          border: 1px solid rgba(54, 140, 254, 0.5);
        }
        .iconBtn.active:hover {
          color: #368cfe !important;
          border-radius: 4px;
          border: 1px solid rgba(54, 140, 254, 0.5);
          background-color: #ecf5ff !important;
        }
        .iconBtn.el-button:focus {
          background-color: #fff;
        }
      }
    }
    .el-table .item {
      width: 24px;
      height: 26px;
      line-height: 26px;
      float: left;
      padding: 0;
      margin-right: 6px;
    }
    .footer_page {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      //   border-top: 1px solid #dee4f0;
      box-sizing: border-box;
    }
    .operation{
      margin-left: 10px;
      display: block;
      float: left;
      cursor: pointer;
      color: #409eff;
    }
  }
}
</style>
