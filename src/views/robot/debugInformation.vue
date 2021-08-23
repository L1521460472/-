<template>
  <div id="header" v-loading="loading" element-loading-text="loading">
    <div class="header">
      <div class="title">调试信息</div>
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
            <el-input v-model="contentValue" size="small" maxlength="50" placeholder="内容">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="getTableList"></i>
            </el-input>
          </div>
          <div class="headerBtnRight">
            <el-button class="iconBtn" :class="{ 'active': !isDisable }" size="small" :disabled="isDisable" @click="handleDeleteAll" v-has="'debugInfoDelete'">
              <i class="iconfont iconshanchu"></i>
              删除
            </el-button>
          </div>
        </div>
        <el-table border :header-cell-style="{background:'#F4F4F4',color:'#333333'}" size="small" :data="tableData" @selection-change="handleSelectionChange" style="width: 100%;"
          :style="{ color: '#333', 'min-height': tableHeight + 'px' }">
          <el-table-column type="expand" align="center">
            <template slot-scope="props">
              <span>{{props.row.content}}</span>
            </template>
          </el-table-column>
          <el-table-column type="selection" align="center" width="60"></el-table-column>
          <el-table-column prop="appName" label="应用"  show-overflow-tooltip></el-table-column>
          <el-table-column prop="robotName" label="机器人"  show-overflow-tooltip></el-table-column>
          <el-table-column prop="type" label="类型" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.type == 0">遗漏意图</span>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="内容" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createTime" label="创建时间"  show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <!-- <el-tooltip class="item" effect="dark" content="删除" placement="bottom" v-has="'debugInfoDelete'"> -->
                <el-popover placement="bottom" width="200" :ref="`deleteVideo-${scope.$index}`" trigger="click">
                  <span style="padding: 30px">是否删除该调试信息？</span>
                  <div class="group-footer">
                    <el-button size="mini" type="primary" @click="handleDelete(scope.row, scope)">确定</el-button>
                    <el-button size="mini" @click="cancleDeleteVideoFile(scope)">取消</el-button>
                  </div>
                  <!-- <el-button type="text" style="padding: 0" slot="reference" v-has="'messageMouldDeleteById'">
                    <img src="../../assets/svg/delete_icon.svg" />
                  </el-button> -->
                  <span class="operation" slot="reference" v-has="'messageMouldDeleteById'"></span>
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
  </div>
</template>
<script>
import {
  tableList,
  appList,
  debugInfoDelete,
} from '@/api/robot/debugInformation'
export default {
  name: 'debugInformation',
  data() {
    return {
      loading: false,
      contentValue: '',
      value: '',
      tableData: [],
      options: [],
      multipleSelection: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      isDisable: true,
      tableHeight: window.innerHeight - 304 + '',
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.getTableList()
    },
    //选择页数
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTableList()
    },
    handleSelectionChange(val) {
      this.isDisable = val.length > 0 ? false : true
      this.multipleSelection = val
    },
    handleDeleteAll() {
      this.$confirm('确定删除选中的调试信息吗？', {
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
          debugInfoDelete({ ids: ids })
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
      debugInfoDelete({
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
    isShowSelectOptions(isShowSelectOptions){
      if(!isShowSelectOptions) this.$refs.searchSelect.blur();
    },
    keyDown(e) {
      if (e.keyCode == 13) {
        this.getTableList()
      }
    },
    getTableList(val) {
      if (val == -1) {
        this.value = ''
        this.contentValue = ''
        this.currentPage = 1
      }
      if (this.value !== '' || this.appValue !== '') {
        this.currentPage = 1
      }
      tableList({
        content: this.contentValue,
        appId: this.value,
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
  },
  mounted() {
    this.getTableList()
    appList()
      .then((res) => {
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
      margin-left:10px;
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
