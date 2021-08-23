<template>
    <div id="headerN">
        <div class="header">
                    <div class="title">整体情况</div>
                    <div class="headerList">
                <el-row v-has="'overviewConsume'">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <div class="listTop">账户余额</div>
                            <number-grow :value="balance">
                              <template v-slot:unit>
                                <span>元</span>
                              </template>
                            </number-grow>
                            <!-- <div class="listMain">{{balance.toFixed(2)}}<span>元</span></div> -->
                            <div class="listFooter">冻结{{freeze.toFixed(4)}}元 <span>|</span> 赠送金额{{give.toFixed(4)}}元</div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light">
                            <div class="listTop">今日消费</div>
                            <number-grow :value="todayMoney">
                              <template v-slot:unit>
                                <span>元</span>
                              </template>
                            </number-grow>
                            <!-- <div class="listMain">{{todayMoney.toFixed(2)}}<span>元</span></div> -->
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <div class="listTop">昨日消费</div>
                            <number-grow :value="yesterdayMoney">
                              <template v-slot:unit>
                                <span>元</span>
                              </template>
                            </number-grow>
                            <!-- <div class="listMain">{{yesterdayMoney.toFixed(2)}}<span>元</span></div> -->
                        </div>
                    </el-col>
                </el-row>
                <el-row v-has="'messageOverview'">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <div class="listTop">今日发送</div>
                            <number-grow :value="todaySend" :vaildNumber="false">
                              <template v-slot:unit>
                                <span>条</span>
                              </template>
                            </number-grow>
                            <!-- <div class="listMain">{{todaySend}}<span>条</span></div> -->
                            <div class="listFootered">收{{todayCount}} &nbsp;&nbsp;&nbsp; {{percent}}% <i :class=" isup == true ? 'el-icon-top':'el-icon-bottom'"></i></div>
                            <!-- <div class="listFootered">收156 &nbsp;&nbsp;&nbsp; 41.67% <i class="el-icon-top"></i></div> -->
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light">
                            <div class="listTop">昨日此时发</div>
                            <number-grow :value="yesterdayNowSend" :vaildNumber="false">
                              <template v-slot:unit>
                                <span>条</span>
                              </template>
                            </number-grow>
                            <!-- <div class="listMain">{{yesterdayNowSend}}<span>条</span></div> -->
                            <div class="listFootered">收{{yesterdayNowCount}}</div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <div class="listTop">昨日发</div>
                            <number-grow :value="yesterdaySend" :vaildNumber="false">
                              <template v-slot:unit>
                                <span>条</span>
                              </template>
                            </number-grow>
                            <!-- <div class="listMain">{{yesterdaySend}}<span>条</span></div> -->
                            <div class="listFootered">收{{yesterdayCount}}</div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="main">

        </div>
        <div class="footer">
            <div class="title">新的消息</div>
            <div class="footerList">
                <dl @click="handleText">
                    <dt><img src="../../assets/images/icon-48px-文本@1x.png" alt=""></dt>
                    <dd>文本消息</dd>
                </dl>
                <dl @click="handleFile">
                    <dt><img src="../../assets/images/icon-48px-图片@1x.png" alt=""></dt>
                    <dd>图片消息</dd>
                </dl>
                <dl @click="handleFile">
                    <dt><img src="../../assets/images/icon-48px-音频@1x.png" alt=""></dt>
                    <dd>音频消息</dd>
                </dl>
                <dl @click="handleFile">
                    <dt><img src="../../assets/images/icon-48px-视频@1x.png" alt=""></dt>
                    <dd>视频消息</dd>
                </dl>
                <dl @click="handleCard">
                    <dt><img src="../../assets/images/icon-48px-卡片@1x.png" alt=""></dt>
                    <dd>卡片消息</dd>
                </dl>
                <dl @click="handleChange">
                    <dt><img src="../../assets/svg/icon_48px_变量.svg" alt=""></dt>
                    <dd>变量消息</dd>
                </dl>
            </div>
        </div>
    </div>
</template>
<script>
import { getConsumption, getMessages } from '@/api/homeIndex/index'
import numberGrow from '@/components/numberGrow'
export default {
    name:'homeIndex',
    components: {
      numberGrow
    },
    data() {
        return {
            // 消费
            balance:0.00,//余额
            freeze:0.00,//冻结余额
            give:0.00,//赠送余额
            todayMoney:0.00,//今日消费
            yesterdayMoney:0.00,//昨日消费

            // 消息
            todaySend:0,//今日发送
            todayCount:0,//今日收
            // percent:43.67,//百分比
            yesterdayNowSend:0,//昨日此时发送
            yesterdayNowCount:0,//昨日此时收
            yesterdaySend:0,//昨日发送
            yesterdayCount:0,//昨日收
            isup: true,
            number: 0,
            tweenedNumber: 0
        }
    },
    computed: {
      percent() {
        const temp =  (((this.todaySend + this.todayCount) - (this.yesterdayNowSend + this.yesterdayNowCount)) / (this.yesterdayNowSend + this.yesterdayNowCount)) * 100
        //
        if (temp >= 0 || (this.yesterdayNowSend + this.yesterdayNowCount) == 0) {
          this.isup = true
        } else {
          this.isup = false
        }
        const temp1 = Math.abs(temp)
        if ((this.todaySend + this.todayCount) == 0 && (this.yesterdayNowSend + this.yesterdayNowCount) == 0) {
          return 0
          // this.isup = true
        } else if((this.todaySend + this.todayCount) != 0 && (this.yesterdayNowSend + this.yesterdayNowCount) == 0) {
          return 100
        }
        if (temp1 > 100) {
          return 100
        } else {
          return temp1.toFixed(2)
        }
      },
    },
    methods: {
      // 获取消费概况
      getCusInfo() {
        getConsumption().then(res => {
          if (res.data.status == 0) {
            this.balance = res.data.data.accountBalance
            this.freeze = res.data.data.freezeBalance
            this.give = res.data.data.giveBalance
            this.todayMoney = res.data.data.todayConsumption
            this.yesterdayMoney = res.data.data.yesterdayConsumption
          } else {
            this.$message({
              type: res.data.status === 2 ? 'warning':'error',
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
      // 获取消息情况
      getMessageInfo() {
        getMessages().then(res => {
          if (res.data.status == 0) {
            this.todaySend = res.data.data.todaySend
            this.todayCount = res.data.data.todayReceive
            // this.fretodayCounteze = res.data.data.freezeBalance
            // this.percent = res.data.data.freezeBalance
            this.yesterdayNowSend = res.data.data.yesterdayThisTimeSend
            this.yesterdayNowCount = res.data.data.yesterdayThisTimeReceive
            this.yesterdaySend = res.data.data.yesterdaySend
            this.yesterdayCount = res.data.data.yesterdayReceive
          } else {
            this.$message({
              type: res.data.status === 2 ? 'warning':'error',
              message: res.data.message,
              center: true
            })
          }
        }).catch(error => {
          this.$message({
            type:'error',
            message: error,
            center: true
          })
        })
      },
      handleText() {
      //文本消息
      if(sessionStorage.getItem('menuList').indexOf('messageMouldAddOrUpdate') > 0){
        this.$router.push({
            name: "diyMessage",
            query: { jum: "text" },
        });
      }else{
          this.$message({
            type:'error',
            message: '暂无权限访问！',
            center: true
          })
      }
    },
    handleFile() {
      //文件消息
      if(sessionStorage.getItem('menuList').indexOf('messageMouldAddOrUpdate') > 0){
        this.$router.push({
            name: "diyMessage",
            query: { jum: "file" },
        });
      }else{
          this.$message({
            type:'error',
            message: '暂无权限访问！',
            center: true
          })
      }
    },
    handleCard() {
      //卡片消息
      if(sessionStorage.getItem('menuList').indexOf('messageMouldCardAddOrUpdate') > 0){
        this.$router.push({
            name: "diyMessage",
            query: { jum: "card" },
        });
      }else{
          this.$message({
            type:'error',
            message: '暂无权限访问！',
            center: true
          })
      }
    },
    handleChange(){
        //变量消息
      if(sessionStorage.getItem('menuList').indexOf('messageMouldCardAddOrUpdate') > 0){
        this.$router.push({
        name: "diyMessage",
        query: { jum: "change" },
      });
      }else{
          this.$message({
            type:'error',
            message: '暂无权限访问！',
            center: true
          })
      }
    },
    handleIndexOf(){

    }
    },
    created() {
        //
        //
      const btnList = JSON.parse(sessionStorage.getItem('btnList'))
      // 判断是否有权限
      if (btnList && (btnList.indexOf('overviewConsume') > -1)) {
        this.getCusInfo()
      }
      if (btnList && (btnList.indexOf('messageOverview') > -1))
      {
        this.getMessageInfo()
      }
    }
}
</script>
<style lang="less" scoped>
#headerN {
  width: 100%;
  height: 100%;
  min-height: 100%;
  @vat: #333333;
  .title {
        width: 100%;
        height: 110px;
        box-sizing: border-box;
        line-height: 110px;
        font-size: 20px;
        font-weight: 400;
        color: @vat;
        padding-left: 70px;
    }
  .header {
    width: 100%;
    height: 53%;
    background: #ffffff;
    .headerList{
        width: 100%;
        height: calc(100% - 110px);
        box-sizing: border-box;
        padding-bottom: 47px;
        .el-row{
            width: 100%;
            height: 50%;
            margin-bottom: 20px;
        }
    }
    .grid-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .listTop {
      font-size: 14px;
      color: #666666;
    }
    .listMain {
      font-size: 32px;
      line-height: 50px;
      span {
        font-size: 20px;
        color: #666666;
      }
    }
    .listFooter {
      font-size: 14px;
      color: #666666;
      line-height: 30px;
      width: fit-content;
      padding: 0 10px;
      border-radius: 4px;
      background-color: #f4f4f4;
      span {
        color: #e5e5e5;
      }
    }
    .listFootered{
        font-size: 14px;
        color: #666666;
        .el-icon-bottom{
            color: #2BD990;
        }
        .el-icon-top{
            color: #FE3636;
        }
    }
  }
  .main {
    width: 100%;
    height: 20px;
    background: #f8f8fb;
  }
  .footer {
    width: 100%;
    height: 45%;
    background: #ffffff;
    padding-bottom: 20px;
    .footerList{
        width: 100%;
        box-sizing: border-box;
        padding: 0 50px;
        height: calc(100% - 100px);
        display: flex;
        justify-content: space-around;
        align-content: center;
        dl{
            width: 15%;
            height: 224px;
            box-sizing: border-box;
            margin: 0;
            text-align: center;
            background-color: #F8F8FB;
            border: 1px solid #F8F8FB;
            cursor: pointer;
            dt{
                height: 60%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            dd{
                height: 40%;
                font-size: 14px;
                margin: 0;
                text-align: center;
            }
        }
        dl:hover{
            border: 1px solid #368CFE;
        }
    }
  }
}
</style>
