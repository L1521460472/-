<template>
  <div id="myApps">
    <div class="title">我的应用</div>
    <div class="container">
      <div class="headerBtn headerBtnRight">
        <el-button type="primary" size="small" v-has="'appAdd'"  @click="createAction">
          <i class="iconfont iconxinzeng"></i>
          创建应用
        </el-button>
        <el-button class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small" v-has="'appDelete'" @click="batchDelete" >
          <i class="iconfont iconshanchu"></i>
          删除
        </el-button>
      </div>
      <el-table
        border
        :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
        size="small"
        :data="tableData"
        @selection-change="handleSelectionChange"
        @expand-change="expandChange"
        v-loading="loading"
        :style="{'color':'#333','min-height':tableHeight + 'px'}"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="right" label-width="130px"  class="demo-table-expand">
              <el-form-item label="App ID：">
                <span>{{ props.row.appId }}</span>
              </el-form-item>
              <el-form-item label="App Secrect：">
                <span>{{ props.row.appSecrect }}</span>
              </el-form-item>
              <el-form-item label="业务权限：" class="form-center">
                <div v-for="(item, index) in props.row.temp2" :key="index">
                  {{item}}
                  <!-- <el-tree
                    :data="props.row.temp2"
                    show-checkbox
                    ref="tree"
                    getCheckedNodes
                    node-key="id"
                    style="background-color:#F8F8FB;"
                    :default-expand-all="false"
                    :default-checked-keys="props.row.checkedList"
                    :props="defaultProps">
                  </el-tree> -->
                </div>
              </el-form-item>
              <!-- <el-form-item label="签名：">
                <span>{{props.row.sign}}</span>
              </el-form-item> -->
              <el-form-item label="业务回调通知URL：">
                <span>{{props.row.enterpriseCallbackUrl || '未开启业务回调'}}</span>
              </el-form-item>
              <el-form-item label="消息上行推送URL：">
                <span>{{ props.row.enterpriseReceiveUpMessageUrl || '未开启上行推送'}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="selection" align="center" width="50"></el-table-column>
        <el-table-column label="应用ID" prop="appId" width="300" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name"  label="应用名称"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="description" label="应用描述"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" label="创建时间"  show-overflow-tooltip></el-table-column>
        <el-table-column  label="操作" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <!-- <el-tooltip class="item" effect="dark" content="修改" placement="top">
              <img class="operation" @click="editAction(scope.row)" src="../../assets/svg/edit_icon.svg" v-has="'appUpdate'">
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <img class="operation" @click="deleteAction(scope.row)"  src="../../assets/svg/delete_icon.svg" v-has="'appDelete'">
            </el-tooltip> -->
            <span class="operation" @click="editAction(scope.row)"  v-has="'appUpdate'">修改</span>
            <span class="operation" @click="deleteAction(scope.row)" v-has="'appDelete'">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="footer_page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          :pager-count="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div> -->
    </div>
    <!-- 新增编辑应用 -->
    <el-drawer
      :title="drawerTitle"
      :visible.sync="showDrawer"
      :before-close="closeDrawer"
      :modal-append-to-body="true"
      :wrapperClosable="false"
      size="500px"
      direction="rtl">
      <el-form
        class="drawerContent"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        label-position="right"
      >
        <el-form-item prop="applicationName" label="应用名称：">
          <el-input size="small" maxlength="20" v-model.trim="form.applicationName"></el-input>
        </el-form-item>
        <el-form-item prop="describe" label="应用描述：">
          <el-input
            type="textarea"
            placeholder="请输入应用描述"
            maxlength="50"
            style="width: 260px"
            :autosize="{ minRows: 8, maxRows: 10 }"
            show-word-limit
            v-model="form.describe"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="业务权限：" required>
          <el-tree
            :data="temp"
            show-checkbox
            ref="tree2"
            default-expand-all
            getCheckedNodes
            node-key="id"
            :default-checked-keys="checkedList"
            :props="defaultProps">
          </el-tree>
        </el-form-item> -->
        <el-form-item label="业务权限：" required>
          <el-select size="small" v-model="form.businessTypeIdList" multiple :disabled="disabledWhenEdit">
            <el-option v-for="(item,index) in authorityList" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="签名：" prop="sign" >
          <el-input size="small" v-model="form.sign" maxlength="20" show-word-limit :disabled="disabledWhenEdit"></el-input>
        </el-form-item> -->
        <el-form-item prop="url" label="回调地址：">
          <el-checkbox v-model="form.callbackFlag">开启业务回调通知</el-checkbox>
          <el-input size="small" v-show="form.callbackFlag" maxlength="256" v-model="form.enterpriseCallbackUrl"></el-input>
        </el-form-item>
        <el-form-item prop="url" label="推送地址：">
          <el-checkbox v-model="form.receiveUpMessageFlag">开启消息上行推送</el-checkbox>
          <el-input size="small" v-show="form.receiveUpMessageFlag" maxlength="256" v-model="form.enterpriseReceiveUpMessageUrl"></el-input>
        </el-form-item>
        <el-form-item prop="parmentDepartment" label="">
            <el-button  type="primary" size="small" v-if="drawerTitle === '创建应用'" @click="confirmAdd" :disabled="submitBtnDsiable">确 定</el-button>
            <el-button  type="primary" size="small" v-if="drawerTitle === '修改应用'" @click="confirmEdit" :disabled="submitBtnDsiable">确 定</el-button>
            <el-button  size="small" @click="closeDrawer">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

  </div>
</template>
<script>
import { getAppLists, editAppliction, addApplication, deleteAppliction, searchWhiteList, saveWhiteList, companyStatus, getAppType, getAppById } from '@/api/Develop/myapp'
import { getCookie } from '@/public'
export default {
  name:'myApps',
  data() {
    return {
      // currentPage: 1, //当前页数
      // pageSize: 10, //每页长度
      // total: 0, //数据总条数
      loading: false, // loing加载
      isEdit: false, // 判断是编辑还是新增
      tableData:[],
      showDrawer:false,//是否显示创建应用抽屉
      drawerTitle:'',//应用创建标题
      selectValue: '',
      form: {
        applicationName:'',//应用名称
        describe:'',//应用描述
        enterpriseCallbackUrl:'',//回调地址
        enterpriseReceiveUpMessageUrl: '', // 回调url
        enterpriseAccountAppId: '',  // 应用id
        // sign:null,
        callbackFlag: false, //  是否开启业务回调通知，0是，1否
        receiveUpMessageFlag: false, // 是否开启消息上行推送，0是，否
        businessTypeIdList: [], // 业务权限
      },
      rules: {
        applicationName: [{ required: true, message: "应用名称不能为空", trigger: "blur" }],
        // sign: [{ required: true, message: "签名不能为空", trigger: "blur" }],
        businessTypeIdList: [{required: true, message: "业务权限不能为空", trigger: "change"}]
      },
      isDisable:true,//是否禁用头部修改删除按钮
      tableHeight:window.innerHeight - 310 +'',
      treeData: [  // 业务权限
        {
          id: 1,
          label: '5G消息',
          children: [
            {
              id: 3,
              label: '5G行业消息'
            },
            {
              id: 4,
              label: 'chatbot消息'
            }
          ]
        },
        {
          id: 2,
          label: '2G消息',
          children: []
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      checkedList: [],  // 默认选中的节点
      temp: [],  // 抽屉里的树结构数据
      temp2: [],  // 表格行展开的树结构数据
      disabledWhenEdit: false,
      authorityList: [],
      tempResult: [],
      submitBtnDsiable: false
    };
  },
  methods: {
    // 创建应用
    createAction() {
      this.temp = []
      this.drawerTitle = '创建应用'
      this.form.applicationName = ''
      this.form.describe = ''
      this.form.enterpriseReceiveUpMessageUrl = ''
      this.form.enterpriseCallbackUrl = ''
      this.enterpriseAccountAppId = ''
      this.form.callbackFlag = false
      this.form.receiveUpMessageFlag = false
    //   this.form.sign = ''
      this.form.businessTypeIdList = []
      this.showDrawer = true
      this.isEdit = false
      this.disabledWhenEdit = false
      // this.getAppSet()
    },
    //   编辑应用
    editAction(row){
      this.temp = []
      this.drawerTitle = '修改应用'
      this.form.applicationName = row.name
      this.form.describe = row.description
      this.form.enterpriseCallbackUrl = row.enterpriseCallbackUrl
      this.form.enterpriseAccountAppId = row.id
    //   this.form.sign = row.sign
      // this.form.businessTypeIdList = this.tempResult
      // console.log(this.form.businessTypeIdList)
      this.showDrawer = true
      this.isEdit = true
      this.disabledWhenEdit = true
      this.getAppTypeSetting(row.id)
      // this.getAppDetailById(row.id)
    },
    // 删除应用
    deleteAction(row){
      this.$confirm("确定删除此应用么？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        center:true
      })
        .then(() => {
          const query = {
            enterpriseAccountAppIds: row.id
          }
          deleteAppliction(query).then(res => {
            if (res.data.status == 0) {
              this.$message({
                type: 'success',
                message: '删除成功！',
                center: true
              })
              this.getDataList()
            } else {
              this.$message({
                type: 'error',
                message: res.data.message,
                center: true
              })
            }
          }).catch(error => {
            this.$message({
                type: 'error',
                message: error,
                center: true
              })
          })
        })
        .catch(() => {

        });
    },
    // 批量删除
    batchDelete() {
      this.$confirm("确定删除选中的应用么？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        center:true
      })
      .then(() => {
        const arr = this.selectValue.map(item => {
          return item.id
        })
        const query = {
          enterpriseAccountAppIds: arr.join(',')
        }
        deleteAppliction(query).then(res => {
            if (res.data.status == 0) {
              this.$message({
                type: 'success',
                message: '删除成功！',
                center: true
              })
              this.getDataList()
            } else {
              this.$message({
                type: 'error',
                message: res.data.message,
                center: true
              })
            }
          }).catch(error => {
          this.$message({
              type: 'error',
              message: error,
              center: true
            })
        })
      })
      .catch()
    },
    // 确认创建
    confirmAdd(){
        this.$refs.form.validate((valid) => {
          if(valid) {
            if (this.form.applicationName.trim() == '' || this.form.applicationName.trim() == null) {
              this.$message({
                type: 'warning',
                message: '请输入应用名称!',
                center: true
              })
              return
            }
            if (this.form.receiveUpMessageFlag && this.form.enterpriseReceiveUpMessageUrl == '') {
              this.$message({
                type: 'warning',
                message: '请先填写推送地址！',
                center: true
              })
              return
            }
            if (this.form.callbackFlag && this.form.enterpriseCallbackUrl == '') {
              this.$message({
                type: 'warning',
                message: '请先填写回调地址！',
                center: true
              })
              return
            }
            if (this.form.businessTypeIdList.length == 0) {
              this.$message({
                type: 'warning',
                message: '请选择业务权限！',
                center: true
              })
              return
            }
            // console.log(this.form.businessTypeIdList)
            const temp = []
            this.form.businessTypeIdList.forEach(item => {
              const arr = item.split('-')
              const val = {}
              val.productTypeId = arr[0]
              val.businessTypeList = []
              const tempVal = {}
              tempVal.businessTypeId = arr[1]
              val.businessTypeList.push(tempVal)
              temp.push(val)
            })
            // return
            const query = {
              description: this.form.describe,
              enterpriseCallbackUrl: this.form.url,
              name: this.form.applicationName.trim(),
              callbackFlag: this.form.callbackFlag ? 0 : 1,
              receiveUpMessageFlag: this.form.receiveUpMessageFlag ? 0 : 1,
              enterpriseCallbackUrl: this.form.enterpriseCallbackUrl,
              enterpriseReceiveUpMessageUrl: this.form.enterpriseReceiveUpMessageUrl,
              // enterpriseAccountId: getCookie('enterpriseId'),
              productTypeList: temp,
            //   sign:this.form.sign
            }
            this.submitBtnDsiable = true
            addApplication(query).then(res => {
              if (res.data.status == 0) {
                this.$message({
                  type: 'success',
                  message: '新增成功！',
                  center: true
                })
                this.showDrawer = false
                this.getDataList()
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.message,
                  center: true
                })
                // this.showDrawer = false
              }
              this.submitBtnDsiable = false
            }).catch((error) => {
              this.$message({
                  type: 'error',
                  message: error,
                  center: true
                })
                this.submitBtnDsiable = false
            })
          } else {
            return false
          }
        })
    },
    // 确认编辑
    confirmEdit(){
      const temp = []
      this.form.businessTypeIdList.forEach(item => {
        const arr = item.split('-')
        const val = {}
        val.productTypeId = arr[0]
        val.businessTypeList = []
        const tempVal = {}
        tempVal.businessTypeId = arr[1]
        val.businessTypeList.push(tempVal)
        temp.push(val)
      })
      const query = {
        description: this.form.describe,
        enterpriseAccountAppId: this.form.enterpriseAccountAppId,
        enterpriseCallbackUrl: this.form.enterpriseCallbackUrl,
        enterpriseReceiveUpMessageUrl: this.form.enterpriseReceiveUpMessageUrl,
        name: this.form.applicationName,
        productTypeList: temp,
        callbackFlag: this.form.callbackFlag ? 0 : 1,
        receiveUpMessageFlag: this.form.receiveUpMessageFlag ? 0 : 1,
        // sign:this.form.sign
      }
      this.submitBtnDsiable = true
      editAppliction(query).then(res => {
        if(res.data.status == 0) {
          this.$message({
            type: 'success',
            message: '修改成功!',
            center: true
          })
          this.getDataList()
        } else {
          this.$message({
            type: 'error',
            message: res.data.message,
            center: true
          })
        }
        this.submitBtnDsiable = false
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
        this.submitBtnDsiable = false
      })
      this.showDrawer = false
    },
    // 表格选择
    handleSelectionChange(val){
      this.isDisable = val.length < 1 ? true : false
      this.selectValue = val
    },
    // //每页多少条
    // handleSizeChange(val) {
    //   this.pageSize = val;
    //   // this.getDataList()
    // },
    // //选择页数
    // handleCurrentChange(val) {
    //   this.currentPage = val;
    //   // this.getDataList()
    // },

    // 关闭新增/编辑部门抽屉前重置表单规则
    closeDrawer(){
      this.$nextTick(()=>{
        this.$refs.form.resetFields();
        this.showDrawer = false
      })
    },
    // 获取列表数据
    getDataList() {
      this.loading = true
      getAppLists().then(res => {
        if (res.data.status == 0) {
          const data = res.data.data
          data.map(item => {
            item.temp2 = []
            item.checkedList = []
            item.expend = false
          })
          this.tableData = res.data.data
        } else {
          this.$message.error({
            message:res.data.message,
            center:true
          })
        }
        this.loading = false
      }).catch(error => {
        this.loading = false
        this.$message.error({
          message:error,
          center:true
        })
      })
    },
    // 获取应用配置的产品业务类型
    getAppTypeSetting(val) {
      const query = {
        id: val
      }
      this.tempResult = []
      getAppType(query).then((res) => {
        if (res.data.status == 0) {
          // console.log(res.data.data)
          const data= res.data.data
          data.forEach(item => {
            if (item.checked) {
              item.businessTypeList.forEach(ele => {
                if (ele.checked) {
                  let value = item.productTypeId+'-'+ele.businessTypeId
                  this.tempResult.push(value)
                }
              })
            }
          })
          this.form.businessTypeIdList = this.tempResult
        } else {
          this.$message({
            type: 'error',
            message: res.data.message,
            center: true
          })
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
      })
    },
    // 获取全部的应用产品业务类型
    getAppSet(){
      getAppType().then((res) => {
        if (res.data.status == 0) {
          const data = res.data.data
          data.forEach(item => {
            const tempName = item.productTypeName
            if (item.businessTypeList.length > 0) {
              for (let i =0;i<item.businessTypeList.length;i++) {
                const val = {
                  label: tempName + "-" + item.businessTypeList[i].businessTypeName,
                  value: item.productTypeId + '-' + item.businessTypeList[i].businessTypeId,
                }
                this.authorityList.push(val)
              }
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.message,
            center: true
          })
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
      })
    },
    // 迭代对象，格式化数组
    formatArray(val, temp) {
      const that = this
      for(let i = 0; i < val.length; i++) {
        let temp1 = {}
        temp1.id = val[i].businessTypeId
        temp1.label = val[i].businessTypeName
        temp1.children = []
        if (val[i].businessTypeList && val[i].businessTypeList.length > 0) {
          this.formatArray(val[i].businessTypeList, temp1.children)
        }
        temp.push(temp1)
      }
      return temp
    },
    // 格式化列表展开数据
    formatTableExpend(val, temp) {
      const that = this
      for(let i = 0; i < val.length; i++) {
        let temp1 = {}
        temp1.id = val[i].productTypeId
        temp1.label = val[i].productTypeName
        temp1.disabled = true
        temp1.children = []
        if (val[i].businessTypeList.length > 0) {
          this.formatTableExpend(val[i].businessTypeList, temp1.children)
        }
        temp.push(temp1)
      }
      return temp
    },
    //
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    //  通过id 获取应用详情
    getAppDetailById(params){
      const query = {
        enterpriseAccountAppId: params
      }
      getAppById(query).then(res => {
        if (res.data.status == 0) {
          const data = res.data.data
          this.form.enterpriseCallbackUrl = data.enterpriseCallbackUrl
          this.form.enterpriseReceiveUpMessageUrl = data.enterpriseReceiveUpMessageUrl
          this.form.callbackFlag = data.callbackFlag == 0 ? true : false
          this.form.receiveUpMessageFlag = data.receiveUpMessageFlag == 0 ? true : false
          // this.form.businessTypeIdList = data.businessTypeIdList[0]
          this.checkedList = data.businessTypeIdList
        } else{
          this.$message({
            type: 'error',
            message: res.data.message,
            center: true
          })
        }
      }).catch(() => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
      })
    },
    // 行展开
    expandChange(row, expandedRows){
      row.expend = !row.expend
      if (row.expend) {
        this.temp2 = []
        row.temp2 = []
        const query1 = {
          id: row.id
        }
        getAppType(query1).then((res) => {
          if (res.data.status == 0) {
            // console.log(res.data.data)
            const data = res.data.data
            // this.formatTableExpend(res.data.data, row.temp2)
            // this.getAppDetail(row)
            data.forEach(item => {
              let tempName = ''
              if (item.checked) {
                if (item.businessTypeList.length > 0) {
                  item.businessTypeList.forEach(ele => {
                    if (ele.checked) {
                      tempName = item.productTypeName +'-'+ ele.businessTypeName
                      this.temp2.push(tempName)
                    }
                  })
                }
              }
            })
            row.temp2 = this.temp2
          } else {
            this.$message({
              type: 'error',
              message: res.data.message,
              center: true
            })
          }
        }).catch(error => {
          this.$message({
            type: 'error',
            message: error,
            center: true
          })
        })
      }
    },
    getAppDetail(row) {
      const query = {
        enterpriseAccountAppId: row.id
      }
      getAppById(query).then(res => {
        if (res.data.status == 0) {
          const data = res.data.data
          row.checkedList = data.businessTypeIdList
        } else{
          this.$message({
            type: 'error',
            message: res.data.message,
            center: true
          })
        }
      }).catch(() => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
      })
    }
  },
  created() {
    this.getDataList()
    this.getAppSet()
  }
};
</script>

<style lang="less" scoped>
#myApps{
  width: 100%;
  height: 100%;
  overflow: auto;
  color: #333;
  letter-spacing: 0.75px;
  .title {
    height: 96px;
    line-height: 96px;
    margin-left: 70px;
    font-size: 20px;
  }
  .container{
    width: 100%;
    height: calc(100% - 96px);
    padding: 0 70px;
    box-sizing: border-box;
    .headerBtn{
      margin-bottom: 30px;
      .iconBtn.el-button:hover{
        color: #C0C4CC !important;
      }
      .iconBtn.active{
        color: #368CFE !important;
        border-radius: 4px;
        border: 1px solid rgba(54,140,254,0.5);
      }
      .iconBtn.active:hover{
        color: #368CFE !important;
        border-radius: 4px;
        border: 1px solid rgba(54,140,254,0.5);
      }
    }
    .footer_page{
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }
    // .form-center{
    //   /deep/ .el-form-item__content{
    //     padding-top: 8px;
    //   }
    // }
  }
  .operation{
      margin-left: 10px;
      display: block;
      float: left;
      cursor: pointer;
      color: #409eff;
    }
}

.el-input {
  width: 260px;
}
.el-input__inner{
  width: 260px;
}
#myApps /deep/ .el-table__expanded-cell{
  background-color: #F8F8FB;
}
#myApps /deep/ .el-table__expanded-cell:hover{
  background-color: #F8F8FB !important;
}
.demo-table-expand /deep/ .el-form-item__content{
  font-size: 12px;
  color: #333;
}
.demo-table-expand /deep/ .el-form-item__label{
  font-size: 12px;
  color: #333;
}
.demo-table-expand /deep/ .el-form-item{
  margin-bottom: 0;
}
/deep/ .el-drawer__header span:focus {
    outline: 0;
}
/deep/ .el-drawer:focus{
    outline: 0;
}
/deep/ .el-drawer__header{
  border-bottom: 1px solid #E5E5E5;
  margin-bottom: 40px;
}
/deep/ .el-drawer__close-btn{
  font-size: 24px;
  color: #333;
}
// .drawerContent{
//   padding: 0 70px;
// }
.drawerContent  .el-input {
  width: 260px;
  margin-left: 0;
}
.drawerContent .el-input__inner {
  width: 260px;
}
.drawerContent /deep/ .el-input--suffix{
  width: 260px;
}
/deep/ .el-button+.el-button{
  margin-left: 3px;
}
/deep/ .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner{
  background-color:#368cfe
}
.el-tree /deep/.el-tree-node__expand-icon.is-leaf::before{
    display: none;
}
/deep/ .el-input .el-input__count{
    position: absolute;
    right: 0;
    bottom: -4px;
    line-height: 12px;
    height: auto;
}
</style>
