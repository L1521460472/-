<template>
  <!-- 登录 -->
  <div id="header">
    <div class="login-content">
      <!-- <img src="../assets/svg/login8.svg" class="login-content-bg"> -->
      <img src="../assets/images/login_icon.svg"  class="login_icon">
      <img src="../assets/svg/logo4.svg" alt="" class="logo">
      <div class="login-form">
          <span class="title">5G行业消息平台</span>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="myform">
            <el-form-item prop="username">
              <el-input v-model="ruleForm.username" clearable autocomplete="off" placeholder="请输入账号" class="my-input placeholder-left">
                <i slot="prefix" class="iconfont iconyonghu"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" clearable class="placeholder-left" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码">
                <i slot="prefix" class="iconfont iconsuo"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-row type="flex" justify="space-between">
                <el-col :span="14">
                  <el-input placeholder="请输入验证码" v-model="ruleForm.code">
                  </el-input>
                </el-col>
                <el-col :span="10" style="position:relative">
                  <verificationCode ref="mychild" :changeCode.sync="identifyCode" style="position:absolute; right:0"></verificationCode>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading" style="width:100%">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      <!-- <div class="login-content-right">
        <div class="login-form">
          <span class="title">5G行业消息平台</span>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="28px" class="myform">
            <el-form-item prop="username">
              <el-input v-model="ruleForm.username" autocomplete="off" placeholder="请输入账号">
                <i slot="prefix" class="iconfont iconyonghu"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码">
                <i slot="prefix" class="iconfont iconsuo"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-col :span="14">
                <el-input placeholder="请输入验证码" v-model="ruleForm.code">
                </el-input>
              </el-col>
              <el-col :span="8" style="margin-left: 10px">
                <verificationCode ref="mychild" :changeCode.sync="identifyCode"></verificationCode>

              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading" style="width:100%">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div> -->
    </div>
    <div class="footer">
      <span>©2021 深圳市航通北斗信息技术有限公司 版权所有
        ​​粤ICP备15008917号</span>
    </div>
  </div>
</template>
<script>
import bcryptjs from 'bcryptjs'
import JSEncrypt from 'jsencrypt'
import md5 from 'js-md5'
import { Login } from '../api/homeIndex/login'
import { getCookie, setCookie, removeCookie } from '../public'
import { getLimitMenus } from '../api/setting/menu'
import verificationCode from '@/components/verificationCode'
import { Loading } from 'element-ui'
export default {
  name: 'Login',
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
        code: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },
      identifyCode: '',
      loading: false,
      btnList: [],
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.ruleForm.code.toUpperCase() != this.identifyCode) {
            this.$message({
              message: '验证码错误！',
              type: 'error',
              center: true,
            })
            this.ruleForm.code = ''
            this.$refs.mychild.changeCode()
          } else {
            this.loading = true
            this.fullLoading
            let salt = bcryptjs.genSaltSync() //定义密码加密的计算强度，默认10
            let jse = new JSEncrypt() //新建JSEncrypt对象
            let publicKey =
              'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsdyqfaCfhwUuvIUyMnKu9Btmcx1bX53a9tV0q0vSF/S4fd+DjzhX/u8FWHH61e/YpRwvs6DiC/h06hgYnswnZxEvwp/eRxnt6JQVK2y+v8ZzZ838Z6fRb82W3g5FLJfTtJPf93uKlTDQywjYvmO1qbQTFraUNMSxzBi2/unRLHwIDAQAB' // 设置密钥
            jse.setPublicKey(publicKey) //设置公钥

            let password = jse.encrypt(md5(this.ruleForm.password))

            let params = {
              loginName: this.ruleForm.username,
              password: password,
              rememberMe: 0,
            }
            Login(params)
              .then((res) => {
                if (res.data.status == 0) {
                  setCookie('enterpriseToken', res.data.data.token, 1/3)
                  setCookie('enterpriseName', res.data.data.userName, 1/3)
                  setCookie('enterpriseId', res.data.data.accountId, 1/3)
                  setCookie('companyName', res.data.data.enterpriseName, 1/3)
                  setCookie('loginName', this.ruleForm.username, 1/3)
                  sessionStorage.setItem('loginName', this.ruleForm.username)
                  getLimitMenus()
                    .then((res) => {
                      if (res.data.status == 0) {
                        if(res.data.data && res.data.data.length<1){
                          this.$message.error({
                            message:'账号暂无访问权限,请先联系管理员分配权限',
                            center:true
                          })
                          return
                        }
                        const data = res.data.data
                        const result = this.getTreeData(data)
                        sessionStorage.setItem(
                          'btnList',
                          JSON.stringify(result)
                        )
                        sessionStorage.setItem('menuList', JSON.stringify(data))
                        if (data[0].show) {
                          this.$router.push(data[0].children[0].url)
                        } else {
                          this.$router.push(data[0].url)
                        }
                        this.$message({
                          type: 'success',
                          message:
                            '亲爱的' + this.ruleForm.username + ', 欢迎回来！',
                          center: true,
                        })
                      } else {
                        this.$message({
                          type: 'success',
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
                  // this.$router.push("/homeIndex")
                  // this.$message({
                  //   type: 'success',
                  //   message: '亲爱的' + this.ruleForm.username + ', 欢迎回来！',
                  //   center: true
                  // })
                } else {
                  this.$message.error({
                    message: res.data.message,
                    center: true,
                  })
                }
                this.loading = false
                this.fullLoading.close()
              })
              .catch((err) => {
                this.loading = false
                this.fullLoading.close()
                this.$message.error({
                  message: err,
                  center: true,
                })
              })
          }
        } else {
          //
          return false
        }
      })
    },
    keyDown(e) {
      if (e.keyCode == 13) {
        //enter回车键 == 13
        this.submitForm()
      }
    },
    // getMenuList(){
    //   getLimitMenus().then(res=>{
    //     if(res.data.status == 0){
    //       // this.menuItems = res.data.data
    //       const data = res.data.data
    //       const result = this.getTreeData(data)
    //       sessionStorage.setItem('btnList', JSON.stringify(result))
    //       sessionStorage.setItem('menuList',JSON.stringify(data))
    //     } else {
    //       this.$message.error({
    //         message:res.data.message,
    //         center:true
    //       })
    //     }
    //   }).catch(err=>{})
    // },
    getTreeData(data) {
      for (var i in data) {
        if (data[i].type == 2) {
          this.btnList.push(data[i].code)
        }
        if (data[i].children != 0) {
          this.getTreeData(data[i].children)
        }
      }
      return this.btnList
    },
  },
  computed: {
    fullLoading: function () {
      return Loading.service({
        lock: true,
        text: '正在登陆...', //可以自定义文字
        spinner: 'el-icon-loading', //自定义加载图标类名
        background: 'rgba(0, 0, 0, 0.6)', //遮罩层背景色
        target: document.querySelector('.login'),
      })
    },
  },
  mounted() {
    window.addEventListener('keydown', this.keyDown) //绑定监听事件
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDown, false) //移除监听事件
  },
  components: {
    verificationCode,
  },
}
</script>
<style lang="less" scoped>
  .bordered {
    border: 1px solid #e5e5e5;
  }
#header {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  background: url('../assets/images/login2.png') no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login {
    width: 640px;
    height: 360px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    .login_left {
      float: left;
      width: 320px;
      height: 100%;
    }
    .login_right {
      padding-top: 20px;
      box-sizing: border-box;
      float: left;
      width: 320px;
      height: 100%;
      background: #fff;
      position: relative;
      /deep/ .el-input--prefix .el-input__inner {
        padding-left: 40px !important;
      }
      .image01 {
        position: absolute;
        top: 12px;
        left: 12px;
      }
      .image02 {
        position: absolute;
        top: 12px;
        left: 12px;
      }
    }
  }
  // .el-form-item {
  //   width: 90%;
  //   /deep/ .el-input__inner {
  //     width: 100% !important;
  //   }
  // }
  .login-btn {
    display: flex;
    justify-content: center;
    .el-button {
      width: 260px;
    }
  }
  .p-hyld {
    font-size: 20px;
    font-weight: 600;
    color: #333;
  }
  .footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 50px;
    margin: auto;
    font-size: 12px;
    color: #999999;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
  }
  .login-content{
    width: 77%;
    height: 77%;
    max-width: 1380px;
    max-height: 750px;
    background: url('../assets/images/login1.png') no-repeat;
    background-color: transparent;
    border-radius: 24px;
    box-shadow: 0px 4px 24px 0px rgba(0,19,41,0.10);
    background-size: 100% 100%;
    // overflow: hidden;
    position: relative;
    .login-content-bg{
      width: 100%;
    }
    .login_icon{
      width: 48%;
      height: 53%;
      position: absolute;
      top: 25%;
      left: 5%;
    }
    .logo{
        position: absolute;
        top: 9%;
        left: 5%;
        width: 160px;
        z-index: 2;
      }
      .desc{
        position: absolute;
        left: 87px;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 40%;
      }
    }
    .login-form{
      width: 330px;
      height: 345px;
      box-sizing: border-box;
      position: absolute;
      right: 8%;
      top: 0;
      bottom: 0;
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 9px;
      margin: auto;
      .title{
        font-size: 24px;
        font-weight: 700;
        position: absolute;
        top: 30px;
        left: 33px;
      }
      .myform{
        width: 80%;
        position: absolute;
        top: 78px;
        transform: translateX(-50%);
        left: 50%;
        // .placeholder-left{
        //   /deep/ input::-webkit-input-placeholder {
        //     padding-left: 5px;
        //   }
        // }
      }
    /deep/ .el-input__inner{
      border: none;
      background: #F7F5FB;
    }
    /deep/ .el-input--prefix .el-input__inner{
      padding-left: 38px;
    }
    /deep/ .el-input__prefix{
      left: 14px;
    }
  }
  // @media (min-width: 1360px) {
  //       .login-content {
  //           height: 58%;
  //       }
  //   }
  //   @media (min-width: 1440px) {
  //       .login-content {
  //           height: 62%;
  //       }
  //   }
  //   @media (min-width: 1660px) {
  //       .login-content {
  //           height: 72%;
  //       }
  //   }
  //   @media (min-width: 1920px) {
  //       .login-content {
  //           height: 80%;
  //       }
  //   }
}
</style>
