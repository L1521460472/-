<template>
  <div id="userInformation">
    <div class="title">基本信息</div>
    <div class="container">
      <div class="containerTitle">账号信息</div>
      <el-form label-width="85px" label-position="left" class="accountInfo">
        <el-form-item label="注册邮箱：">
          <span>{{email ? email:'暂无'}}</span>
        </el-form-item>
        <el-form-item label="联系电话：">
          <span>{{phone ? phone:'暂无'}}</span>
        </el-form-item>
        <el-form-item label="上次登录：">
          <span>{{loginTime ? loginTime:'暂无'}}</span>
        </el-form-item>
      </el-form>
      <div v-if="!isCompany">
        <div class="containerTitle">
          <span>认证信息</span>
          <span v-if="status == -1" class="certification active0">未认证</span>
          <span v-else-if="status == 0" class="certification active1">待审核</span>
          <span v-else-if="status == 1" class="certification active2">已认证</span>
          <span v-else class="certification active3">审核拒绝</span>
          <el-tooltip v-if="status == 2" class="item" effect="dark" :content="refuseReason" placement="top">
            <img  src="../../assets/svg/redWarning_icon.svg" alt="">
          </el-tooltip>
        </div>
        <div v-show="!showEdit" >
          <el-form  label-position="left">
              <el-form-item label="公司名称：" >
                  <span>{{enterpriseName ? enterpriseName : '暂无'}}</span>
                  <el-button type="primary" size="small"  class="edit" @click="updateAction" v-if="status == 1">更新</el-button>
                  <el-button type="primary" size="small"  class="edit" @click="editAction" v-else-if="status == -1 || status == 2">编辑</el-button>
              </el-form-item>
              <el-form-item label="统一社会信用代码：">
                  <span>{{code ? code:'暂无'}}</span>
              </el-form-item>
              <el-form-item label="注册地址：">
                  <span>{{address ? address:'暂无'}}</span>
              </el-form-item>
              <el-form-item label="营业执照：">
                  <div class="license" v-if="imgList.length > 0">
                      <el-image v-for="item in imgList" :key='item.id' style="width: 69px; min-height: 98px" :src="item.fileUrl" :preview-src-list="[item.fileUrl]"></el-image>
                  </div>
                  <span v-else>暂无</span>
              </el-form-item>
          </el-form>
          </div>
            <div v-show="showEdit" >
            <el-form
              ref="formAuth"
              label-width="150px"
              label-position="left"
              :model="authentication"
              :rules="rules"
              >
              <el-form-item label="公司名称：" >
                  <span>{{authentication.enterpriseName || '暂无'}}</span>
              </el-form-item>
              <el-form-item label="统一社会信用代码：" prop="code">
                  <el-input  v-model="authentication.code" maxlength="20" ></el-input>
              </el-form-item>
              <el-form-item label="注册地址：" prop="address">
                  <el-input  v-model="authentication.address" maxlength="100" ></el-input>
              </el-form-item>
              <el-form-item label="营业执照：">
                <div class="uploadBox">
                  <el-upload
                      class="upload-demo"
                      drag
                      action="#"
                      ref="uploadDemo"
                      :http-request="uploadPictures"
                      :show-file-list="true"
                      :limit="10"
                      :on-remove="handleRemove"
                      multiple>
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  </el-upload>
                  <div class="explain" >说明：金融、保险、医疗、教育、房产行业，除营业执照外，还需上传相关从业资质证明</div>
                </div>
              </el-form-item>
              <!-- <el-form-item>
                <div class="license" v-if="imgList.length > 0">
                    <el-image v-for="item in imgList" :key='item.id' style="width: 69px; min-height: 98px" :src="item.fileUrl" :preview-src-list="[item.fileUrl]"></el-image>
                </div>
              </el-form-item> -->
              <el-form-item >
                  <el-button type="primary" size="small" @click="submitAction">提交</el-button>
                  <el-button  size="small" @click="showEdit = false">取消</el-button>
              </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getCompanyInfo, submitCompayInfo, uploadFile } from '../../api/userName/userInfo'
import { Loading } from 'element-ui'
export default {
  name: "userInformation",
  data() {
    return {
        email:'',
        phone:'',
        loginTime:'',
        enterpriseName:'',
        code:'',
        address:'',
        status: 0,
        refuseReason: '',
        imgList:[],
        authentication: {
          enterpriseName: '',  // 公司名称
          code: '',  // 社会信用代码
          address: ''  // 注册地址
        },
        showEdit:false,//显示编辑状态
        loading: '',
        fileLists: [], // 上传的文件列表
        isCompany: 0,
        editStatus: 'edit',
        rules: {
          code: [
            { required: true, message: "请输入统一社会信用代码", trigger: "blur" }
          ],
          address: [
            { required: true, message: "请输入注册地址", trigger: "blur" }
          ]
        },
        list: [], // 文件列表
    };
  },
  created() {
    this.getInfo()
  },
  methods: {
    //   点击编辑按钮显示编辑器
    editAction(){
      this.showEdit = true
      this.editStatus = 'edit'
      // console.log(this.enterpriseName)
      this.authentication.enterpriseName = this.enterpriseName
    },
    // 点击更新按钮显示编辑
    updateAction() {
      this.$confirm('变更认证信息后，所有资料将会被重新审核，确定是否变更认证信息？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelButtonClass: "btn-custom-cancel",
        type: 'warning'
      }).then(()=> {
        this.editStatus = 'update'
        this.showEdit = true
        this.authentication.enterpriseName = this.enterpriseName
        this.authentication.code = this.code
        this.authentication.address = this.address
      }).catch(()=>{})
    },
    // 删除文件列表时的钩子
    handleRemove(file, fileList) {
      this.fileLists.forEach((item, index) => {
        if (item.fileName == file.name) {
          this.fileLists.splice(index, 1)
        }
      })
    },
    //   编辑提交
    submitAction() {
      // console.log(this.authentication)
      this.$refs.formAuth.validate((valid) => {
        if (this.authentication.code.length > 20) {
          this.$message({
            type: 'warning',
            message: '统一社会信用代码长度不能超过20',
            center: true
          })
          return
        }
        if (this.authentication.address.length > 100) {
          this.$message({
            type: 'warning',
            message: '注册地址长度不能超过100',
            center: true
          })
          return
        }
        if (valid) {
          const query = {
            systemFileDTO: this.fileLists,
            enterpriseCreditCode: this.authentication.code,  // 统一社会信用代码
            registeredAddress: this.authentication.address,  // 注册地址
            businessLicense: ''  // 营业执照id
          }
          submitCompayInfo(query).then(res => {
            if (res.data.status == 0) {
            this.$message({
                type: 'success',
                message: '提交成功!',
                center: true
              })
              this.$refs.uploadDemo.clearFiles()
              this.authentication.code = ''
              this.authentication.address = ''
              this.getInfo()
            } else {
              this.$message({
                type: 'error',
                message: res.data.message,
                center: true
              })
            }
            this.showEdit = false
            }).catch(error => {
              this.$message({
                type: 'error',
                message: error,
                center: true
              })
              this.showEdit = false
            })
        }
      })
    },
    // 更新提交
    updateSubnit() {

    },
    getInfo() {
      const params = {
        accountType: 0
      }
      this.loading = Loading.service({
        lock: true,
        text: '正在加载中...',//可以自定义文字
        spinner:'el-icon-loading',//自定义加载图标类名
        background: 'rgba(255, 255, 255, 0.7)',  //遮罩层背景色
        target: document.querySelector('#userInformation')
      })
      getCompanyInfo(params).then((res) => {
        const result = res.data.data
        this.email = result.email
        this.phone = result.mobile
        this.loginTime = result.lastLoginTime
        this.enterpriseName = result.enterpriseAuthenticationVO != null ? result.enterpriseAuthenticationVO.enterpriseName : ''
        this.code = result.enterpriseAuthenticationVO != null ? result.enterpriseAuthenticationVO.enterpriseCreditCode : ''
        this.address = result.enterpriseAuthenticationVO != null ? result.enterpriseAuthenticationVO.registeredAddress : ''
        // this.authentication.enterpriseName = result.enterpriseAuthenticationVO != null ? result.enterpriseAuthenticationVO.enterpriseName : ''
        // this.authentication.code = result.enterpriseAuthenticationVO != null ? result.enterpriseAuthenticationVO.enterpriseCreditCode : ''
        // this.authentication.address = result.enterpriseAuthenticationVO != null ? result.enterpriseAuthenticationVO.registeredAddress : ''
        this.status = result.enterpriseAuthenticationVO != null ? result.enterpriseAuthenticationVO.checkStatus: ''
        this.refuseReason = result.enterpriseAuthenticationVO != null ?result.enterpriseAuthenticationVO.checkContent : ''
        this.imgList = (result.enterpriseAuthenticationVO != null && result.enterpriseAuthenticationVO.fileList) ? result.enterpriseAuthenticationVO.fileList : []
        // this.fileLists = result.enterpriseAuthenticationVO != null ? result.enterpriseAuthenticationVO.fileList : []
        this.isCompany = result.accountType
        this.loading.close()
      }).catch((error) => {
        this.loading.close()
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
      })
    },
    // 上传图片
    uploadPictures(item) {
      const formData = new FormData()
      formData.append("file", item.file)
      const filename = item.file.name
      uploadFile(formData).then(res => {
        if (res.data.status == 0) {
          this.$message({
            type: 'success',
            message: '上传成功!',
            center: true
          })
        const val = {
          fileUrl: res.data.data,
          fileOrder: this.fileLists.length+1,
          fileName: filename
        }
        this.fileLists.push(val)
        } else {
          this.$message({
            type: 'error',
            message: res.data.message,
            center: true
          })
        }
      }).catch((error) => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
      })
    }
  },
};
</script>

<style lang="less" scoped>
#userInformation {
  width: 100%;
  // height: 100%;
  overflow: auto;
  background-color: #fff;
  overflow: hidden;
  color: #333;
  padding: 0 70px;
  box-sizing: border-box;
  .title {
    font-size: 20px;
    margin-top: 40px;
  }
  .container {
    .containerTitle{
        font-size: 16px;
        margin-top: 35px;
        margin-bottom: 15px;
        line-height: 36px;
        border-bottom: 1px solid #E5E5E5;
        display: flex;
        align-items: center;
        .certification{
            font-size: 12px;
            border-radius: 4px;
            width: 70px;
            height: 22px;
            line-height: 22px;
            text-align: center;
            display: block;
            background: rgba(54,140,254,0.4);
            color: #368CFE;
            margin: 0 6px 0 18px;
        }
        .active0{
            background: #368CFE;
            color: #fff;
        }
        .active1{
            background: #FE9636;
            color: #fff;
        }
        .active2{
            background:  #2BD990;
            color: #fff;
        }
        .active3{
            background: #FE3636;
            color: #fff;
        }
    }
    .accountInfo{
        .el-form-item{
            margin-bottom: 5px;
        }
    }
    .license{
        .el-image {
            margin-right: 10px;
        }
    }
    .uploadBox{
      display: flex;
      .explain{
        width: 200px;
        margin:8px 0 0 14px;
        color: #FE9636;
        font-size: 12px;
        line-height: 20px;
        letter-spacing: 0.1px;
      }
    }
  }
}

.el-form-item{
    .edit{
        float: right;
    }
    .el-input {
        width: 260px;
    }
    .el-input__inner{
        width: 260px;
    }
}
/deep/ .el-upload-dragger{
    width: 260px;
    height: 128px;
}
.el-upload-dragger .el-icon-upload{
    font-size: 46px;
    margin: 24px 0 10px;
}
/deep/ .el-form-item__label{
  color: #666;
}
/deep/ .el-message-box__btns{
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
}
</style>
<style>
  .btn-custom-cancel{
    float: right;
    margin-left: 10px;
  }
</style>
