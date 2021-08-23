<template>
  <div id="header" v-loading="loading" element-loading-text="loading">
    <div class="header">
      <div class="title">意图管理</div>
      <div class="container">
        <div class="headerBtn">
          <div class="headerBtnLeft">
            <el-button class="addBtn" style="border-radius: 4px 0 0 4px;" type="primary" size="small" @click="getTableList">
              <i class="iconfont iconshuaxin"></i>
            </el-button>
            <el-button class="addBtn" type="primary" size="small" @click="getTableList(-1)">
              <i class="iconfont iconguanbi"></i>
            </el-button>
            <el-select v-model="value" ref="searchSelect"  @visible-change="isShowSelectOptions" @change="getTableList" clearable size="small" placeholder="全部" style="width:160px;margin-right:10px;">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
            <el-input v-model="name" size="small" maxlength="50" placeholder="名称">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="getTableList" style="cursor:pointer"></i>
            </el-input>
          </div>
          <div class="headerBtnRight">
            <el-button type="primary" size="small" @click.stop="handleAdd" v-has="'intentionAdd'">
              <i class="iconfont iconxinzeng"></i>
              新增意图
            </el-button>
            <el-button class="iconBtn" :class="{ 'active': !isDisable }" size="small" :disabled="isDisable" @click="handleDeleteAll" v-has="'intentionDelete'">
              <i class="iconfont iconshanchu"></i>
              删除
            </el-button>
            <div class="addMsg" v-if="isShow">
              <div @click="handleAnswers">
                问答型
              </div>
              <div @click="handleTask">
                任务型
              </div>
            </div>
          </div>
        </div>
        <el-table border :header-cell-style="{background:'#F4F4F4',color:'#333333'}" size="small" :data="tableData" @selection-change="handleSelectionChange" style="width: 100%;"
          :style="{ color: '#333', 'min-height': tableHeight + 'px' }">
          <el-table-column type="expand" align="center">
            <template slot-scope="props">
              <span v-if="props.row.type == 0">语料：<br><br></span>
              <span v-if="props.row.type == 0" v-html="props.row.corpus"></span><br v-if="props.row.type == 0"><br v-if="props.row.type == 0">
              <span v-if="props.row.type == 0">回答：<br><br></span>
              <span v-if="props.row.type == 0">{{props.row.answer}}</span>
              <span v-if="props.row.type == 1" v-html="props.row.corpus"></span>
            </template>
          </el-table-column>
          <el-table-column type="selection" align="center" width="60"></el-table-column>
          <el-table-column prop="robotName" label="机器人"  show-overflow-tooltip></el-table-column>
          <el-table-column prop="name" label="名称"  show-overflow-tooltip></el-table-column>
          <el-table-column prop="keyWord" label="关键词"  show-overflow-tooltip></el-table-column>
          <el-table-column prop="corpusAmount" label="语料"  show-overflow-tooltip></el-table-column>
          <el-table-column prop="type" label="类型"  show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.type == 0">问答型</span>
              <span v-if="scope.row.type == 1">任务型</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态"  show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0">开启</span>
              <span v-if="scope.row.status == 1">停用</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间"  show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="160" show-overflow-tooltip>
            <template slot-scope="scope">
              <!-- <el-tooltip class="item" effect="dark" content="修改" placement="bottom" v-has="'intentionUpdate'">
                <img class="operation" @click="handleEdit(scope.row)" src="../../assets/svg/edit_icon.svg">
              </el-tooltip> -->
              <span class="operation" @click="handleEdit(scope.row)" v-has="'intentionUpdate'">修改</span>
              <!-- <el-tooltip class="item" effect="dark" content="禁用" placement="bottom" v-if="scope.row.status == 0" v-has="'intentionStatusUpdate'"> -->
                <el-popover placement="bottom" width="200" :ref="`statusVideo-${scope.$index}`" trigger="click">
                  <span style="padding: 30px">是否禁用意图？</span>
                  <div class="group-footer">
                    <el-button size="mini" type="primary" @click="handleDisabled(scope.row, scope)">确定</el-button>
                    <el-button size="mini" @click="cancleDeleteVideoFile1(scope)">取消</el-button>
                  </div>
                  <!-- <el-button type="text" style="padding: 0" slot="reference" v-has="'messageMouldDeleteById'">
                    <img src="../../assets/svg/icon_24px_禁用.svg" />
                  </el-button> -->
                  <span class="operation" slot="reference" v-has="'messageMouldDeleteById'">禁用</span>
                </el-popover>
              <!-- </el-tooltip> -->
              <!-- <el-tooltip class="item" effect="dark" content="启用" placement="bottom" v-if="scope.row.status == 1" v-has="'intentionStatusUpdate'"> -->
                <el-popover placement="bottom" width="200" :ref="`statusVideo-${scope.$index}`" trigger="click">
                  <span style="padding: 30px">是否启用意图？</span>
                  <div class="group-footer">
                    <el-button size="mini" type="primary" @click="handleDisabled(scope.row, scope)">确定</el-button>
                    <el-button size="mini" @click="cancleDeleteVideoFile1(scope)">取消</el-button>
                  </div>
                  <!-- <el-button type="text" style="padding: 0" slot="reference" v-has="'messageMouldDeleteById'">
                    <img src="../../assets/svg/icon_24px_启用.svg" />
                  </el-button> -->
                  <span class="operation" slot="reference" v-has="'messageMouldDeleteById'">启用</span>
                </el-popover>
              <!-- </el-tooltip> -->
              <!-- <el-tooltip class="item" effect="dark" content="删除" placement="bottom" v-has="'intentionDelete'"> -->
                <el-popover placement="bottom" width="200" :ref="`deleteVideo-${scope.$index}`" trigger="click">
                  <span style="padding: 30px">是否删除该意图？</span>
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
        <el-form-item prop="name" label="意图名称:">
          <el-input size="small" v-model="form.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item prop="robot" label="机器人:">
          <el-select v-model="form.robot" clearable size="small" placeholder="请选择机器人">
            <el-option v-for="item in robotOptions" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="corpus" label="语料:">
          <el-input size="small" type="textarea" placeholder="每行输入一个句子" v-model="form.corpus" style="width: 260px"></el-input>
        </el-form-item>
        <el-form-item v-show="type == 0" prop="" label="* 回答:">
          <el-input size="small" type="textarea" placeholder="每行输入一个句子" v-model="form.answer" style="width: 260px"></el-input>
        </el-form-item>
        <el-form-item prop="" label="关键词:">
          <el-input size="small" v-model="form.keyWord" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item v-show="type == 1" prop="" :label="domain.label" class="formItem" v-for="(domain, index) in form.domains" :key="index">
          <el-input size="small" v-model="domain.value"></el-input><img src="../../assets/svg/删除1.svg" style="margin:0 7px;cursor:pointer;" @click.prevent="removeDomain(domain)" alt=""><img
            style="cursor:pointer;" src="../../assets/svg/icon_14px_新建.svg" @click="addDomain" alt="">
        </el-form-item>
        <el-form-item prop="" label="是否启用:">
          <el-switch v-model="isSwitch">
          </el-switch>
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
  intentionAdd,
  intentionUpdate,
  intentionGetDetail,
  intentionStatusUpdate,
  intentionDelete,
} from '@/api/robot/intentionManagement'
import {getButtonList} from '@/public'
export default {
  name: 'intentionManagement',
  props:{
    authorityBttonList:{
      type:Array
    },
  },
  data() {
    return {
      loading: false,
      name: '',
      value: '',
      radio: '1',
      tableData: [],
      form: {
        id:'',
        name: '',
        robot: '',
        corpus: '',
        answer: '',
        keyWord: '',
        domains: [
          {
            id: Date.now(),
            value: '',
            label: '* 词槽:',
          },
        ],
      },
      rules: {
        name: [{ required: true, message: '请输入意图名称', trigger: 'blur' }],
        robot: [
          { required: true, message: '请选择机器人', trigger: 'change' },
        ],
        corpus: [{ required: true, message: '请输入语料', trigger: 'blur' }],
        answer: [{ required: true, message: '请输入回答', trigger: 'blur' }],

      },
      options: [],
      robotOptions: [],
      multipleSelection: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      isDisable: true,
      isConfirmAdd:false,
      isShow: false,
      drawer: false,
      isSwitch: true,
      type: 0, //类型: 0问答型 1任务型
      text: '新增',
      drawerTitle: '新增意图',
      tableHeight: window.innerHeight - 304 + '',
    }
  },
  methods: {
    handleAdd() {
      this.isShow = true
    },
    texts() {
      this.form.name = ''
      this.form.robot = ''
      this.form.corpus = ''
      this.form.answer = ''
      this.form.keyWord = ''
      this.form.domains.value = ''
    },
    handleAnswers() {
      this.drawer = true
      this.type = 0
      this.text = '新增'
      this.drawerTitle = '新建意图'
      this.texts()
    },
    handleTask() {
      this.drawer = true
      this.type = 1
      this.text = '新增'
      this.drawerTitle = '新建意图'
      this.texts()
    },
    handleEdit(row) {
      this.drawer = true
      this.text = '修改'
      this.drawerTitle = '修改意图'
      intentionGetDetail({ id: row.id })
        .then((res) => {
          if (res.data.data.type == 1) {
            this.type = 1
            if (res.data.data.wordSlotList.length > 0) {
              res.data.data.wordSlotList[0].label = '* 词槽:'
            }
            this.form.domains = res.data.data.wordSlotList
          } else {
            this.type = 0
            this.form.answer = res.data.data.answer
          }
          this.form.id = res.data.data.id
          this.form.name = res.data.data.name
          this.form.robot = res.data.data.robotId
          this.form.corpus = res.data.data.corpus
          this.form.keyWord = res.data.data.keyWord
        })
        .catch((error) => {
          this.$message.error({
            message: error,
            center: true,
          })
        })
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
            let arr = []
            this.form.domains.map((item) => {
              arr.push({ value: item.value })
            })
            intentionAdd({
              answer: this.form.answer,
              corpus: this.form.corpus,
              keyWord: this.form.keyWord,
              name: this.form.name,
              robotId: this.form.robot,
              status: this.isSwitch ? 0 : 1,
              type: this.type,
              wordSlotList: this.type == 0 ? [] : this.form.domains,
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
            intentionUpdate({
              answer: this.form.answer,
              corpus: this.form.corpus,
              keyWord: this.form.keyWord,
              id: this.form.id,
              name: this.form.name,
              robotId: this.form.robot,
              status: this.isSwitch ? 0 : 1,
              type: this.type,
              wordSlotList: this.type == 0 ? [] : this.form.domains,
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
    removeDomain(item) {
      var index = this.form.domains.indexOf(item)
      console.log('index: ', index)
      if (index == 0) {
        this.$message({
          type: 'warning',
          message: '第一个不能删除！',
          center: true,
        })
        return
      }
      if (index !== -1) {
        this.form.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.form.domains.push({
        id: Date.now(),
        value: '',
        label: '',
      })
    },
    handleDisabled(row, scope) {
      intentionStatusUpdate({ id: row.id })
        .then((res) => {
          scope._self.$refs[`statusVideo-${scope.$index}`].doClose()
          if (res.data.status == 0) {
            this.$message.success({
              message: row.type == 0 ? '禁用成功' : '启用成功',
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
    handleDeleteAll() {
      this.$confirm('确定删除选中的意图吗？', {
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
          intentionDelete({ ids: ids })
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
      intentionDelete({
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
    // 取消禁用启用
    cancleDeleteVideoFile1(scope) {
      scope._self.$refs[`statusVideo-${scope.$index}`].doClose()
    },
    handleSelectionChange(val) {
      this.isDisable = val.length > 0 ? false : true
      this.multipleSelection = val
    },
    handleBodyClick() {
      this.isShow = false
    },
    getTableList(val) {
      if (val == -1) {
        this.value = ''
        this.name = ''
        this.currentPage = 1
      }
      if (this.value !== '' || this.name !== '') {
        this.currentPage = 1
      }
      tableList({
        robotId: this.value,
        name: this.name,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      })
        .then((res) => {
          this.tableData = res.data.data.records
          this.total = res.data.data.total
          this.tableData.map((item) => {
            if (item.corpus.indexOf('\n') > 0) {
              item.corpus = item.corpus.replace(/\n/g, '<br/><br/>')
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
    this.$nextTick(() => {
      document.addEventListener('click', this.handleBodyClick)
    })
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
  destroyed() {
    document.removeEventListener('click', this.handleBodyClick)
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
        position: relative;
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
        .addMsg {
          width: 100px;
          height: 70px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          position: absolute;
          top: 50px;
          left: 0px;
          z-index: 999;
          border-radius: 4px;
          background: #ffffff;
          box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.15);
          div {
            width: 100%;
            height: 38px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            img {
              margin-right: 10px;
            }
          }
          div:hover {
            background: #f5f5f5;
          }
        }
      }
    }
    .operation{
      margin-left: 10px;
      display: block;
      float: left;
      cursor: pointer;
      color: #409eff;
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
  }
}
.el-textarea {
  /deep/ .el-textarea__inner {
    min-height: 80px !important;
  }
}
.formItem /deep/ .el-form-item__content {
  display: flex;
  align-items: center;
}
</style>
