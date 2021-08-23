<template>
  <div id="header" v-loading="loading" element-loading-text="loading">
    <div class="header">
      <div class="title">实体管理</div>
      <div class="container">
        <div class="headerBtn">
          <div class="headerBtnLeft">
            <el-button class="addBtn" style="border-radius: 4px 0 0 4px;" type="primary" size="small" @click="getTableList">
              <i class="iconfont iconshuaxin"></i>
            </el-button>
            <el-button class="addBtn" type="primary" size="small" @click="getTableList(-1)">
              <i class="iconfont iconguanbi"></i>
            </el-button>
            <el-select v-model="appValue" ref="searchSelect"  @visible-change="isShowSelectOptions" @change="getTableList" clearable size="small" placeholder="全部" style="width:160px;margin-right:10px;">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
            <el-input v-model="value" size="small" maxlength="50" placeholder="名称">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="getTableList" style="cursor:pointer"></i>
            </el-input>
          </div>
          <div class="headerBtnRight">
            <el-button type="primary" size="small" @click="handleAdd" v-has="'entityAdd'">
              <i class="iconfont iconxinzeng"></i>
              新增实体
            </el-button>
            <el-button class="iconBtn" :class="{ 'active': !isDisable }" size="small" :disabled="isDisable" @click="handleDeleteAll" v-has="'entityDelete'">
              <i class="iconfont iconshanchu"></i>
              删除
            </el-button>
          </div>
        </div>
        <el-table border :header-cell-style="{background:'#F4F4F4',color:'#333333'}" size="small" :data="tableData" @selection-change="handleSelectionChange" style="width: 100%;"
          :style="{ color: '#333', 'min-height': tableHeight + 'px' }">
          <el-table-column type="expand" align="center">
            <template slot-scope="props">
              <span v-html="props.row.content"></span>
            </template>
          </el-table-column>
          <el-table-column type="selection" align="center" width="60"></el-table-column>
          <el-table-column prop="robotName" label="机器人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="name" label="名称"  show-overflow-tooltip></el-table-column>
          <el-table-column prop="typeStr" label="类型"  show-overflow-tooltip></el-table-column>
          <el-table-column prop="item" label="条目"  show-overflow-tooltip></el-table-column>
          <el-table-column prop="createTime" label="创建时间"  show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <!-- <el-tooltip class="item" effect="dark" content="修改" placement="bottom" v-has="'entityUpdate'">
                <img class="operation" @click="handleEdit(scope.row)" src="../../assets/svg/edit_icon.svg">
              </el-tooltip> -->
              <span class="operation"  v-has="'entityUpdate'" @click="handleEdit(scope.row)">修改</span>
              <!-- <el-tooltip class="item" effect="dark" content="删除" placement="bottom" v-has="'entityDelete'"> -->
                <el-popover placement="bottom" width="200" :ref="`deleteVideo-${scope.$index}`" trigger="click">
                  <span style="padding: 30px">是否删除该实体？</span>
                  <div class="group-footer">
                    <el-button size="mini" type="primary" @click="handleDelete(scope.row, scope)">确定</el-button>
                    <el-button size="mini" @click="cancleDeleteVideoFile(scope)">取消</el-button>
                  </div>
                  <!-- <el-button type="text" style="padding: 0" slot="reference" v-has="'messageMouldDeleteById'">
                    <img src="../../assets/svg/delete_icon.svg" />
                  </el-button> -->
                  <span class="operation" slot="reference" v-has="'messageMouldDeleteById'">删除</span>
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
        <el-form-item prop="name" label="实体名称:">
          <el-input size="small" v-model="form.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="robot" label="机器人:">
          <el-select v-model="form.robot" clearable size="small" placeholder="请选择机器人">
            <el-option v-for="item in robotOptions" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="" label="实体类型:">
          <el-radio v-model="radio" label="0">匹配类型</el-radio>
          <el-radio v-model="radio" label="1">选项类型</el-radio>
        </el-form-item>
        <el-form-item prop="desc" label="实体内容:">
          <el-input size="small" type="textarea" placeholder="每行输入一个实体" v-model="form.desc" style="width: 260px" show-word-limit maxlength="300" :autosize="{ minRows: 10, maxRows: 15 }"></el-input>
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
  robotList,
  entityAdd,
  entityUpdate,
  entityGetDetail,
  entityDelete,
} from '@/api/robot/entityManagement'
import {getButtonList} from '@/public'
export default {
  name: 'entityManagement',
  props:{
    authorityBttonList:{
      type:Array
    },
  },
  data() {
    return {
      loading: false,
      appValue: '',
      value: '',
      radio: '0',
      tableData: [],
      form: {
        id: '',
        name: '',
        robot: '',
        desc: '',
      },
      rules: {
        name: [{ required: true, message: '请输入实体名称', trigger: 'blur' }],
        // robot: [{ required: true, message: '请输入应用', trigger: 'change' }],
        desc: [
          { required: true, message: '请输入实体内容', trigger: 'change' },
        ],
      },
      options: [],
      robotOptions: [],
      multipleSelection: [],
      // addBtn:false,//新增按钮
      // deleteBtn:false,//删除按钮
      // updatedBtn:false,//修改按钮
      total: 0,
      pageSize: 10,
      currentPage: 1,
      isDisable: true,
      drawer: false,
      isConfirmAdd:false,
      text: '新建',
      drawerTitle: '创建实体',
      tableHeight: window.innerHeight - 304 + '',
    }
  },
  methods: {
    handleAdd() {
      this.drawer = true
      this.text = '新增'
      this.drawerTitle = '创建实体'
      this.form.robot = ''
      this.form.desc = ''
      this.form.name = ''
      this.radio = '0'
    },
    handleEdit(row) {
      this.drawer = true
      this.text = '修改'
      this.drawerTitle = '修改实体'
      entityGetDetail({ id: row.id })
        .then((res) => {
          this.form.id = res.data.data.id
          this.form.robot = res.data.data.robotId
          this.form.desc = res.data.data.content
          this.form.name = res.data.data.name
          this.radio = res.data.data.type.toString()
        })
        .catch((error) => {
          this.$message.error({
            message: error,
            center: true,
          })
        })
    },
    handleDeleteAll() {
      this.$confirm('确定删除选中的实体吗？', {
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
          entityDelete({ ids: ids })
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
      entityDelete({
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
    //确定新增
    confirmAdd() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.isConfirmAdd = true;
          if (this.text == '新增') {
            entityAdd({
              content: this.form.desc,
              name: this.form.name,
              robotId: this.form.robot,
              type: this.radio,
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
              .catch((error) => {
                this.$message.error({
                  message: error,
                  center: true,
                })
              })
          } else {
            entityUpdate({
              content: this.form.desc,
              id: this.form.id,
              name: this.form.name,
              robotId: this.form.robot,
              type: this.radio,
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
                    this.isConfirmAdd = false;
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
    getTableList(val) {
      if (val == -1) {
        this.value = ''
        this.appValue = ''
        this.currentPage = 1
      }
      if (this.value !== '' || this.appValue !== '') {
        this.currentPage = 1
      }
      tableList({
        robotId: this.appValue,
        name: this.value,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      })
        .then((res) => {
          this.tableData = res.data.data.records
          this.total = res.data.data.total
          this.tableData.map((item) => {
            if (item.content.indexOf('\n') > 0) {
              item.content = item.content.replace(/\n/g, '<br/><br/>')
            }
          })
        })
        .catch((error) => {
          this.$message.error({
            message: error,
            center: true,
          })
        })
    },
    handleSelectionChange(val) {
      this.isDisable = val.length > 0 ? false : true
      this.multipleSelection = val
    },
    // 头部搜索下拉框选中后失焦防止回车触发下拉框
    isShowSelectOptions(isShowSelectOptions){
      if(!isShowSelectOptions) this.$refs.searchSelect.blur();
    },
    keyDown(e) {
      if (e.keyCode == 13) {
        this.getTableList()
      }
    },
  },
  mounted() {
    this.getTableList()
    robotList()
      .then((res) => {
        this.robotOptions = res.data.data
        this.options = res.data.data
      })
      .catch((error) => {
        this.$message.error({
          message: error,
          center: true,
        })
      })
    window.addEventListener('keydown', this.keyDown) //绑定监听事件
  },
  // watch: {
  //   authorityBttonList:{
  //     handler(data) {
  //         let btns = getButtonList(data,'/entityManagement')
  //         btns.map(item=>{
  //             if(item.code == "entityAdd") this.addBtn = true
  //             if(item.code == "entityUpdate") this.updatedBtn = true
  //             if(item.code == "entityDelete") this.deleteBtn = true
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
        /deep/ .el-button + .el-button {
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
    /deep/ .el-table__expanded-cell[class*='cell'] {
      background: #f8f8fb;
    }
    /deep/ .el-table__expanded-cell[class*='cell']:hover {
      background: #f8f8fb !important;
    }
    /deep/ .el-table__row td:nth-child(1) div {
      display: flex;
      justify-content: center;
      align-items: center;
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
