<template>
  <div id="header" v-loading="loading" element-loading-text="loading">
    <div class="header">
      <div class="title">月结账单</div>
      <div class="container">
        <div class="headerBtn">
          <div class="headerBtnLeft">
            <el-button class="addBtn" style="border-radius: 4px 0 0 4px;" type="primary" size="small" @click="dataList">
              <i class="iconfont iconshuaxin"></i>
            </el-button>
            <el-button class="addBtn" type="primary" size="small" @click="dataList(1)">
              <i class="iconfont iconguanbi"></i>
            </el-button>
            <el-select v-model="monthValue" size="small" @change="dataList" placeholder="全部" style="width:160px;margin-right:10px;">
              <el-option v-for="item in monthOptions" :key="item.id" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
            <el-select v-model="value" size="small" @change="dataList" placeholder="全部" style="width:160px;margin-right:10px;">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="headerBtnRight">
            <span>请您及时下载保存历史消费记录数据,避免超过2个月后无法导出!</span>
            <span class="download" @click="handleDownload">点击下载当月详单</span>
          </div>
          <div class="headerMoney">
            <span>当月消费总额（元）：<b>{{feeAmount.toFixed(4)}}</b></span>
          </div>
        </div>
        <iTable :table='tableData'>
            <template slot-scope="props" slot="totalConsume">
                <span v-if="props.obj.row.consumeUnit == 0">{{props.obj.row.totalConsume}}条</span>
                <span v-if="props.obj.row.consumeUnit == 1">{{props.obj.row.totalConsume}}个</span>
                <span v-if="props.obj.row.consumeUnit == 2">{{props.obj.row.totalConsume}}G</span>
            </template>
        </iTable>
      </div>
    </div>
  </div>
</template>
<script>
import { tableList, download, getAppList } from '@/api/bill/monthlyBill'
import numberGrow from '@/components/numberGrow'
import iTable from '@/components/table'
export default {
  name: 'monthlyBill',
  data() {
    return {
      loading: false,
      monthValue: '', //选项值
      value: '', //应用值
      feeAmount: 0, //总消费
      tableData: {
        tr: [
          {
            id: 1,
            label: '费用名称',
            prop: 'feeName',
          },
          {
            id: 2,
            label: '时长/次数',
            prop: 'totalConsume',
            show:'template'
          },
          {
            id: 3,
            label: '费用',
            prop: 'feeAmount',
          },
        ],
        data: [],
        operation: {
          label: '操作',
          data: [
            {
              id: 1,
              label: '修改',
              Fun: 'edit',
              size: 'mini',
              type: 'primary',
            },
            {
              id: 2,
              label: '删除',
              Fun: 'delete',
              size: 'mini',
              type: 'primary',
            },
          ],
        },
        border: true,
        loading: false,
        align: 'left',
        hasOperation: false,
        tableHeight: window.innerHeight - 330 + '',
        total: 2,
        pageSize: 10,
        currentPage: 1,
      },
      options: [],
      monthOptions: [],
    }
  },
  methods: {
    handleDownload() {
        download({
            monthTime: this.monthValue,
            enterpriseAccountAppId: this.value
        }).then((res) => {
          let blob = new Blob([res.data])
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob) //blob,file.fileName
          } else {
            let link = document.createElement('a')
            let evt = document.createEvent('HTMLEvents')
            evt.initEvent('click', false, false)
            link.href = URL.createObjectURL(blob)
            link.download = '当月账单' + new Date().getTime() + '.xlsx'
            link.style.display = 'none'
            document.body.appendChild(link)
            link.click()
            window.URL.revokeObjectURL(link.href)
          }
        })
        .catch((error) => {
          this.$message({
            type: 'error',
            message: error,
            center: true,
          })
        })
    },
    dataList(val) {
      if (val == 1) {
        this.monthValue = this.monthOptions[0].id
        this.value = ''
      }
      tableList({
        monthTime: this.monthValue,
        enterpriseAccountAppId: this.value,
      })
        .then((res) => {
          if (res.data.status == 0) {
            this.tableData.data = res.data.data;
            if(res.data.data.length > 0){
                this.feeAmount = 0;
                for(let i=0;i<res.data.data.length;i++){
                    this.feeAmount += Number(res.data.data[i].feeAmount);
                }
            }else{
                this.feeAmount = 0;
            }
          } else {
            this.$message.error({
              message: res.data.message,
              center: true,
            })
          }
        })
        .catch((err) => {
          this.$message.error({
            message: err,
            center: true,
          })
        })
    },
    appList() {
      getAppList()
        .then((res) => {
          if (res.data.status == 0) {
            this.options = res.data.data
            this.options.unshift({ id: '', name: '全部' })
          }
        })
        .catch((err) => {
          this.$message.error({
            message: err,
            center: true,
          })
        })
    },
    timeList() {
      var date1 = new Date()
      var date2 = new Date()
      var date3 = new Date()
      date1.setMonth(date1.getMonth() - 3)
      date2.setMonth(date2.getMonth() - 2)
      date3.setMonth(date3.getMonth() - 1)
      var year1 = date1.getFullYear()
      var year2 = date2.getFullYear()
      var year3 = date3.getFullYear()
      var month1 = date1.getMonth() + 1
      var month2 = date2.getMonth() + 1
      var month3 = date3.getMonth() + 1
      month1 = month1 < 10 ? '0' + month1 : month1
      month2 = month2 < 10 ? '0' + month2 : month2
      month3 = month3 < 10 ? '0' + month3 : month3
      var sDate1 = year1.toString() + '-' + month1.toString()
      var sDate2 = year2.toString() + '-' + month2.toString()
      var sDate3 = year3.toString() + '-' + month3.toString()
      this.monthOptions.push({ id: sDate3, name: sDate3 })
      this.monthOptions.push({ id: sDate2, name: sDate2 })
      this.monthOptions.push({ id: sDate1, name: sDate1 })
      this.monthValue = this.monthOptions[0].id
    },
  },
  mounted() {
    this.timeList()
    this.appList()
    this.dataList()
  },
  components: {
    iTable,
    numberGrow
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
        width: 450px;
        height: 36px;
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
      .headerBtnRight {
        width: calc(100% - 450px);
        height: 36px;
        float: right;
        display: flex;
        align-items: center;
        .download {
          font-size: 16px;
          color: #368cfe;
          cursor: pointer;
        }
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
      .headerMoney {
        height: 50px;
        line-height: 50px;
        float: left;
        span {
          font-size: 16px;
        }
        b {
          color: #368cfe;
          div{
              display: inline;
              font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
