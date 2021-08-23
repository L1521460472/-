<template>
    <div id="userConfiguration">
        <div class="title">基本配置</div>
        <div class="contanier">
            <div class="baseSeetingBox">
                <div class="baseSeetinTitle">
                    <img src="../../assets/svg/server_icon.svg" alt="">
                    <span>服务器配置</span>
                </div>
                <div class="saveCont">
                    <p>IP白名单</p>
                    <el-input
                        type="textarea"
                        placeholder="每行一个IP地址，通过回车键换行…"
                        :autosize="{ minRows: 6, maxRows: 8 }"
                        show-word-limit
                        v-model="serverList"
                    ></el-input>
                    <el-button  class="save" type="primary" size="small"  @click="saveServer" v-has="'whiteListSave'">保 存</el-button>
                </div>
            </div>
            <div class="baseSeetingBox">
                <div class="baseSeetinTitle">
                    <img src="../../assets/svg/phoneCard_icon.svg" alt="">
                    <span>测试号码</span>
                </div>
                <div class="saveCont">
                    <p>号码白名单</p>
                    <el-input
                        type="textarea"
                        placeholder="每行一个手机号，通过回车键换行…"
                        :autosize="{ minRows: 6, maxRows: 8 }"
                        show-word-limit
                        v-model="phoneCard"
                    ></el-input>
                    <el-button  class="save" type="primary" size="small"  @click="savePhone" v-has="'whiteListSave'">保 存</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { searchWhiteList, saveWhiteList } from '@/api/Develop/config'
import { Loading } from 'element-ui'
// import { checkUrl } from '../../utils/util.js'
export default {
    name:'userConfiguration',
    data() {
        return {
            serverList: '',//服务器配置地址
            phoneCard: '',//电话号码配置地址
            loading: '',
            isPhone: true
        }
    },
    methods: {
        // 保存服务器配置
        saveServer(){
          const mobileWhiteList = this.phoneCard.split(/[\s\n]/).filter(item => {
            if (item != '' || item != null) {
              return item
            }
          })
          const serverWhiteList = this.serverList.split(/[\s\n]/).filter(item => {
            if (item != '' || item != null) {
              return item
            }
          })
          const query = {
            enterpriseAccountAppId: 1,
            mobileWhiteList: mobileWhiteList,
            serverWhiteList: serverWhiteList
          }
          const result = serverWhiteList.every(item => {
            if (item != '' || item != null) {
              return /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(item)
            }
          })
          if (!result) {
            this.$message({
              type: 'warning',
              message: '请输入合法的IP',
              center: true
            })
            return
          }
          saveWhiteList(query).then(res => {
            if (res.data.status == 0) {
              if (serverWhiteList == '') {
                  this.$message({
                    type: 'warning',
                    message: '服务器白名单未填写任何信息',
                    center: true
                  })
                } else {
                  this.$message({
                    type: 'success',
                    message: '添加成功!',
                    center: true
                  })
                }
              this.getConfigInfo()
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
        },
        // 保存号码白名单
        savePhone(){
          const mobileWhiteList = this.phoneCard.split(/[\s\n]/).filter(item => {
            if (item != '' || item != null) {
              return item
            }
          })
          const serverWhiteList = this.serverList.split(/[\s\n]/).filter(item => {
            if (item != '' || item != null) {
              return item
            }
          })
          const query = {
            enterpriseAccountAppId: 1,
            mobileWhiteList: mobileWhiteList,
            serverWhiteList: serverWhiteList
          }
          const result = mobileWhiteList.every(item => {
            return (/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(item))
          })
          if(!result) {
            this.$message({
              type: 'warning',
              message: '请输入合法的手机号',
              center: true
            })
            return
          }
          if (mobileWhiteList.length > 50) {
            this.$message({
              type: 'warning',
              message: '号码白名单最多50个！',
              center: true
            })
            return
          }
          saveWhiteList(query).then(res => {
            if (res.data.status == 0) {
               if (mobileWhiteList == '') {
                  this.$message({
                    type: 'warning',
                    message: '号码白名单未填写任何信息',
                    center: true
                  })
                } else {
                  this.$message({
                    type: 'success',
                    message: '添加成功!',
                    center: true
                  })
                }
              this.getConfigInfo()
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
        },
        // 获取配置信息
        getConfigInfo() {
          this.loading = Loading.service({
            lock: true,
            text: '正在加载中...',//可以自定义文字
            spinner:'el-icon-loading',//自定义加载图标类名
            background: 'rgba(255, 255, 255, 0.7)',  //遮罩层背景色
            target: document.querySelector('.contanier')
          })
          searchWhiteList().then(res => {
            if (res.data.status == 0) {
              this.serverList = res.data.data.serverWhiteList.join("\n")
              this.phoneCard = res.data.data.mobileWhiteList.join("\n")
            } else {
              this.$message({
                type: res.data.status === 2 ? 'warning':'error',
                message: res.data.message,
                center: true
              })
            }
            this.loading.close()
          }).catch(error => {
            this.loading.close()
            this.$message({
                type: 'error',
                message: error,
                center: true
              })
          })
        }
    },
    created() {
      this.getConfigInfo()
    }
}
</script>
<style lang="less" scoped>
#userConfiguration {
  width: 100%;
  height: 100%;
  overflow: auto;
  color: #333;
  letter-spacing: 0.75px;
  overflow-y: auto;
  overflow-x: hidden;
  .title {
    width: 100%;
    height: 96px;
    line-height: 96px;
    margin-left: 70px;
    font-size: 20px;
  }
  .contanier {
    width: 100%;
    padding: 0 130px 0 87px;
    box-sizing: border-box;
    .baseSeetingBox{
        margin-bottom: 50px;
        .baseSeetinTitle{
            display: flex;
            align-items: center;
            img{
                width: 24px;
                height: 24px;
                display: block;
                margin-right: 8px;
            }
        }
        .saveCont{
            padding-left: 33px;
            box-sizing: border-box;
            p{
                color: #666666;
                font-size: 14px;
            }
            /deep/ .el-textarea__inner{
                background-color: #F8F8FB;
                border: none;
            }
            .save{
                margin-top: 20px;
            }
        }
    }
  }
}
</style>
