<template>
  <div id="signatureManage" v-loading="loading"  element-loading-text="loading">
    <div class="title">签名管理</div>
    <div class="container">
      <div class="headerBtn">
        <div class="headerBtnLeft">
          <el-button class="addBtn" type="primary" size="small"  @click="refresh">
            <i class="iconfont iconshuaxin"></i>
          </el-button>
          <el-button class="addBtn" type="primary" size="small"  @click="reset">
            <i class="iconfont iconguanbi"></i>
          </el-button>
          <!-- <el-select v-model="application" ref="searchSelect" @change="changeApplication" clearable size="small" placeholder="请输入应用场景">
            <el-option
              v-for="item in applicationList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select> -->
          <el-input class="search" v-model="searchCont" size="small" maxlength="50" placeholder="签名或企业账号">
            <i @click="searchAction" slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="headerBtnRight">
          <el-button  type="primary"  size="small"   @click="addSignature">
            <i class="iconfont iconxinzeng"></i>
            添加签名
          </el-button>
        </div>
      </div>
      <div >
        <el-table
          border
          :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
          size="small"
          :data="tableData"
          :style="{'color':'#333','min-height':tableHeight + 'px'}"
        >
          <el-table-column prop="signName" label="签名名称" width="220" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column prop="applySceneStr" label="应用场景" width="120" show-overflow-tooltip></el-table-column> -->
          <el-table-column prop="checkStatusStr" label="状态" width="200" show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="status">
                <span>{{scope.row.checkStatusStr}}</span>
                <el-tooltip v-if="scope.row.checkStatus == 2" class="item" effect="dark" :content="scope.row.reason" placement="top">
                    <img style="width:14px;height:14px" src="../../assets/svg/redWarning_icon.svg" alt="" />
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="220" show-overflow-tooltip></el-table-column>
          <el-table-column  label="操作" min-width="110" show-overflow-tooltip>
            <template slot-scope="scope">
              <span class="operation" v-show="scope.row.checkStatus === 0" >———</span>
              <span class="operation" v-show="scope.row.checkStatus === 2" @click="editAction(scope.row)">编辑</span>
              <span class="operation" v-show="scope.row.checkStatus === 1 || scope.row.checkStatus === 2"  @click="deleteAction(scope.row)">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="footer_page">
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
      </div>
    </div>
    <!-- 新增签名 -->
    <el-drawer
      :title="signatureTitle"
      :visible.sync="signatureDrawer"
      :before-close="closeSignatureDrawer"
      :modal-append-to-body="true"
      :wrapperClosable="false"
      size="500px"
      direction="rtl">
      <el-form
        class="drawerContent"
        ref="signatureForm"
        :model="signatureForm"
        :rules="signatureRules"
        label-width="100px"
        label-position="right"
      >
        <el-form-item prop="signatureName" label="签名名称：">
          <el-input size="small" v-model="signatureForm.signatureName"></el-input>
        </el-form-item>
        <!-- <el-form-item prop="application" label="应用场景：">
          <el-radio-group v-model="signatureForm.application">
            <el-radio :label="1">验证码</el-radio>
            <el-radio :label="2">通用</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item prop="parmentDepartment" >
            <el-button v-if="signatureTitle==='添加签名'" type="primary" size="small" :disabled="isSubmit" @click="confirmAddSignature">提 交</el-button>
            <el-button v-if="signatureTitle==='编辑签名'" type="primary" size="small"  @click="confirmEditSignature">提 交</el-button>
            <el-button  size="small" @click="closeSignatureDrawer">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

  </div>
</template>
<script>
import {getSignPageList,addSign,deleteSign,editSign} from '@/api/signature/signatureManage'

export default {
  name:'signatureManage',
  data() {
    return {
      loading:false,
      currentPage: 1, //当前页数
      pageSize: 10, //每页长度
      total: 0, //数据总条数
      searchCont:null,//搜索内容
      tableData:[],
      // application:null,
      // applicationList: [
      //   {
      //     id:1,
      //     value:'验证码'
      //   },
      //   {
      //     id:2,
      //     value:'通用'
      //   },
      // ],//应用场景
      enterpriseList:[],
      signatureDrawer:false,//添加签名抽屉
      signatureForm:{
        id:null,
        signatureName:null,
      },
      signatureRules:{
        signatureName:[
          { required: true, message: "签名名称不能为空", trigger: "blur" },
          { min: 2, max: 12, message: '长度限2-12个字符', trigger: 'blur' }
        ],
      },
      signatureTitle:null,
      isSubmit:false,//是否禁用提交按钮
      tableHeight:window.innerHeight - 310 +'',
      timer: null,
    };
  },
  methods: {
    // 获取签名管理列表
    getDataList(){
      this.loading = true
      let params ={
        name: this.searchCont,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }
      getSignPageList(params).then(res=>{
        this.loading = false
        if(res.data.status == 0){
          this.tableData = res.data.data.records
          this.total = res.data.data.total
        }else{
          this.$message({
            message:res.data.message,
            center:true,
            type:res.data.status === 2 ? 'warning':'error'
          })
        }
      }).catch(err=>{
        this.loading = false
        this.$message.error({
          message:err,
          center:true
        })
      })
    },
    // 刷新
    refresh(){
      this.getDataList()
    },
    // 重置清空
    reset(){
      this.currentPage = 1
      this.pageSize = 10
      this.searchCont= null
      // this.application = null
      this.getDataList()
    },
    // 查询
    searchAction(){
      this.currentPage = 1
      this.getDataList()
    },
    // 回车查询
    keyDown(e) {
      if (e.keyCode == 13) {
        this.searchAction();
      }
    },
    // 添加签名
    addSignature(){
      this.signatureTitle = '添加签名'
      this.signatureForm.signatureName = null
      // this.signatureForm.application = 1
      this.signatureDrawer = true
    },
    // 确认新增签名
    confirmAddSignature(){
      this.$refs.signatureForm.validate(valid=>{
        if(valid){
          this.isSubmit = true
          let params ={
            signName: this.signatureForm.signatureName
          }
          addSign(params).then(res=>{
            this.isSubmit = false
            if(res.data.status == 0){
              this.$message.success({
                message:'签名新增成功',
                center:true
              })
              this.getDataList()
              this.closeSignatureDrawer()
            }else{
              this.$message.error({
                message:res.data.message,
                center:true
              })
            }
          }).catch(err=>{
            this.$message.error({
              message:err,
              center:true
            })
          })
        }
      })
    },
    // 编辑签名
    editAction(row){
      this.signatureTitle = '编辑签名'
      this.signatureForm.signatureName = row.signName
      this.signatureForm.id = row.id
      this.signatureDrawer = true
    },
    // 编辑确认
    confirmEditSignature(){
      let params ={
        id:this.signatureForm.id,
        signName:this.signatureForm.signatureName
      }
      editSign(params).then(res=>{
        if(res.data.status == 0){
          this.$message.success({
            message:'签名编辑成功',
            center:true
          })
          this.getDataList()
          this.closeSignatureDrawer()
        }else{
          this.$message.error({
            message:res.data.message,
            center:true
          })
        }
      }).catch(err=>{
        this.$message.error({
          message:err,
          center:true
        })
      })
    },
    // 删除签名
    deleteAction(row){
      this.$confirm("确认删除该条签名？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        center:true
      })
        .then(() => {
          deleteSign({id:row.id}).then(res=>{
            if(res.data.status == 0){
              this.$message.success({
                message:'签名删除成功',
                center:true
              })
              this.getDataList()
            }else{
              this.$message.error({
                message:res.data.message,
                center:true
              })
            }
          }).catch(err=>{
            this.$message.error({
              message:err,
              center:true
            })
          })
        })
        .catch(() => {
          console.log("取消");
        });

    },
    //每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.getDataList()
    },
    //选择页数
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDataList()
    },
    // 关闭添加签名抽屉
    closeSignatureDrawer(){
      this.$nextTick(()=>{
        this.$refs.signatureForm.resetFields();
        this.signatureDrawer = false
      })
    },
  },
  mounted() {
    this.getDataList()
    window.addEventListener("keydown", this.keyDown); //绑定监听事件
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false); //移除监听事件
  },

};
</script>

<style lang="less" scoped>
#signatureManage{
  width: 100%;
  height: 100%;
  color: #333;
  overflow: auto;
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
      display: flex;
      justify-content: space-between;
      .headerBtnLeft{
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
    }
    .status{
      // width: 200px;
      display: flex;
      align-items: center;
      .refuseReason{
        max-width: 200px !important;
        white-space: normal !important;
      }
      img{
        margin-left: 10px;
      }
    }
  }
}
#signatureManage /deep/ .el-dialog__body{
  padding: 30px 40px;
}
#signatureManage /deep/ .el-dialog__footer {
  text-align: center ;
  padding: 10px 40px 20px;
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

</style>
