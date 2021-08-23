<template>
  <div id="setPassword">
    <div class="title">密码设置</div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="125px"
      label-position="right"
    >
      <el-form-item prop="oldPassWord" label="原密码：">
        <el-input  v-model="form.oldPassWord" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="newPassWord" label="新密码：">
        <el-input  v-model="form.newPassWord" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="newPassWord2" label="再次输入密码：">
        <el-input  v-model="form.newPassWord2" type="password"></el-input>
      </el-form-item>
    </el-form>
    <div class="footerButton">
      <el-button type="primary"  @click="submitAction"
        >提交</el-button
      >
    </div>
  </div>
</template>
<script>
import bcryptjs from "bcryptjs"
import JSEncrypt from "jsencrypt"
import md5 from 'js-md5'
import { regexpPassword, removeCookie } from "../../public";
import { changePassword } from "../../api/userName/setPasswoed"
export default {
  name: "setPassword",
  data() {
    var validateOldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入现在使用的密码"));
      } else if (value.length < 8 || value.length > 12) {
        callback(new Error("密码长度为8-12位"));
      } else {
        callback();
      }
    };
    var validateNewPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码由大小写字母和数字组成，长度为8-12位"));
      } else if (value.length < 8 || value.length > 12) {
        callback(new Error("密码长度为8-12位"));
      } else if (!regexpPassword(value)) {
        callback(new Error("密码必须有数字和字母组成"));
      } else {
        callback();
      }
    };
    var validateNewPass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.form.newPassWord) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      form: {
        oldPassWord: "", //原密码
        newPassWord: "", //新密码
        newPassWord2: "", //再次输入密码
      },
      rules: {
        oldPassWord: [{ validator: validateOldPass, trigger: "blur" }],
        newPassWord: [{ validator: validateNewPass, trigger: "blur" }],
        newPassWord2: [{ validator: validateNewPass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitAction() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = {
            oldPassword: this.encryption(this.form.oldPassWord),
            newPassword1: this.encryption(this.form.newPassWord),
            newPassword2: this.encryption(this.form.newPassWord2)
          }
          changePassword(params).then(res => {
            if (res.data.status == 0) {
              removeCookie("enterpriseToken")
              removeCookie("enterpriseName")
              this.$message({
                type: 'success',
                message: '修改成功!',
                center: true
              })
              this.$router.push('/')
            } else {
              this.$message({
                type: 'error',
                message: res.data.message,
                center: true
              })
            }
          })
        }
      });
    },
    encryption(pwd) {
      // let salt = bcryptjs.genSaltSync(12); //定义密码加密的计算强度，默认10
      let jse = new JSEncrypt(); //新建JSEncrypt对象
      let publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsdyqfaCfhwUuvIUyMnKu9Btmcx1bX53a9tV0q0vSF/S4fd+DjzhX/u8FWHH61e/YpRwvs6DiC/h06hgYnswnZxEvwp/eRxnt6JQVK2y+v8ZzZ838Z6fRb82W3g5FLJfTtJPf93uKlTDQywjYvmO1qbQTFraUNMSxzBi2/unRLHwIDAQAB"; // 设置密钥
      jse.setPublicKey(publicKey); //设置公钥
      let password = jse.encrypt(md5(pwd))
      return password
    }
  },
};
</script>

<style lang="less" scoped>
#setPassword {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 0 70px;
  box-sizing: border-box;
  background-color: #fff;
  overflow: hidden;
  .title {
    font-size: 20px;
    margin-top: 40px;
    margin-bottom: 70px;
  }
  .el-form {
    .el-form-item {
      /deep/ .el-input__inner {
        width: 260px !important;
      }
    }
  }
  .footerButton {
    margin-left: 124px;
  }
}
/deep/ .el-form-item__label {
  color: #666;
}
.el-form-item {
  margin-bottom: 36px;
}
</style>
