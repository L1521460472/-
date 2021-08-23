<template>
  <div id="header">
    <!-- 统计报表 -->
    <div class="header">
      <div class="title">统计报表</div>
      <div class="nav">
        <el-button-group>
          <!-- <el-button size="small" ref="buttonFocus" :class="{buttonList:index == count}" v-for="(item,index) in buttonList" :key="item" @click="btn(index)">{{item}}</el-button> -->
          <el-button size="small" ref="buttonFocus0" @click="btn(0)">今天</el-button>
          <el-button size="small" ref="buttonFocus1" @click="btn(1)">昨天</el-button>
          <el-button size="small" ref="buttonFocus2" @click="btn(2)">近一周</el-button>
          <el-button size="small" ref="buttonFocus3" @click="btn(3)">近30天</el-button>
        </el-button-group>
        <el-date-picker v-model="value1" type="daterange" size="small" unlink-panels :clearable='false' range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"
          @change="handleChange">
        </el-date-picker>
        <el-select v-model="value2" @change="handleTypeList" size="small" placeholder="请选择">
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="value3" size="small" :placeholder="text" v-if="disabled" @change="handleChange">
          <el-option v-for="item in options3" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-select v-model="value4" size="small" placeholder="业务类型" @change="handleChange">
          <el-option v-for="item in options4" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <!-- <el-button type="primary" size="small" icon="iconfont iconhuanyuan1"> 返回列表</el-button> -->
      </div>
      <div class="list">
        <div class="listBox">
          <div class="listBoxLeft">
            <img src="../../assets/svg/icon_28px_总提交2.0.svg" alt="">
          </div>
          <div class="listBoxRight">
            <p>{{ total1 }}</p>
            <span>总提交量
              <el-tooltip class="item" effect="dark" content="提交到平台的总量" placement="bottom">
                <img src="../../assets/svg/Frame.svg" alt="">
              </el-tooltip>
            </span>
          </div>
        </div>
        <div class="listBox">
          <div class="listBoxLeft">
            <img src="../../assets/svg/icon_28px_总发送2.0.svg" alt="">
          </div>
          <div class="listBoxRight">
            <p>{{ total2 }}</p>
            <span>总发送量
              <el-tooltip class="item" effect="dark" content="平台提交给运营商的总量" placement="bottom">
                <img src="../../assets/svg/Frame.svg" alt="">
              </el-tooltip>
            </span>
          </div>
        </div>
        <div class="listBox">
          <div class="listBoxLeft">
            <img src="../../assets/svg/icon_28px_总成功2.0.svg" alt="">
          </div>
          <div class="listBoxRight">
            <p>{{ total3 }}</p>
            <span>总成功量
              <el-tooltip class="item" effect="dark" content="成功送达至终端的总量，包括已读的数据" placement="bottom">
                <img src="../../assets/svg/Frame.svg" alt="">
              </el-tooltip>
            </span>
          </div>
        </div>
        <div class="listBox">
          <div class="listBoxLeft">
            <img src="../../assets/svg/icon_28px_总接收2.0.svg" alt="">
          </div>
          <div class="listBoxRight">
            <p>{{ total4 }}</p>
            <span>总接收量
              <el-tooltip class="item" effect="dark" content="平台接收到的总量" placement="bottom">
                <img src="../../assets/svg/Frame.svg" alt="">
              </el-tooltip>
            </span>
          </div>
        </div>
        <div class="listBox">
          <div class="listBoxLeft">
            <img src="../../assets/svg/icon_28px_成功率2.0.svg" alt="">
          </div>
          <div class="listBoxRight">
            <p>{{ total5 }}</p>
            <span>成功率
              <el-tooltip class="item" effect="dark" content="总成功量/总发送量" placement="bottom">
                <img src="../../assets/svg/Frame.svg" alt="">
              </el-tooltip>
            </span>
          </div>
        </div>
      </div>
      <div class="banner">
        <div id="echarts"></div>
      </div>
      <div class="container">
        <el-button type="primary" size="small" icon="iconfont icondaochu" @click="exportRepeat" v-has="'reportStatisticsExport'"> 导出</el-button>
      </div>
      <div class="table">
        <el-table :data="tableData" border size="small" style="width: 100%">
          <template v-for="(item,index) in tableDataLabel">
            <el-table-column :key="item + index" :prop="item.prop" :label="item.label" :width="item.width" margin show-overflow-tooltip v-if="item.disabled">
            </el-table-column>
          </template>
        </el-table>
        <div class="pagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50, 100]" :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import {
  reportTotal,
  exportExcel,
  account,
  department,
  getBusinessLis,
  enterpriseApplist,
  channelList,
} from '@/api/statistics/statisticalReport'
export default {
  name: 'statisticalReport',
  data() {
    return {
      disabled: false,
      count: 0,
      value1: [],
      value2: 'TOTAL',
      value3: '',
      value4: '',
      text: '应用',
      total1: '0',
      total2: '0',
      total3: '0',
      total4: '0',
      total5: '0',
      currentPage: 1,
      pageSize: 30,
      total: 0,
      options2: [
        {
          value: 'TOTAL',
          label: '按总量统计',
        },
        {
          value: 'ENTERPRISE_ACCOUNT_APP',
          label: '按应用统计',
        },
        {
          value: 'CHANNEL',
          label: '按通道统计',                                                                      
        },
        {
          value: 'DEPARTMENT',
          label: '按部门统计',
        },
        {
          value: 'ENTERPRISE_USER_ACCOUNT',
          label: '按账号统计',
        },
      ],
      options3: [],
      options4: [
        {
            id: '',
            name: '全部'
        },{
            id:1,
            name: 'RCS消息'
        },{
            id:2,
            name: 'SMS短信'
        },{
            id:3,
            name: 'MMS短信'
        }
      ],
      xAxis_data: [
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
      ],
      series_data: [
        {
          name: '总提交量',
          type: 'line',
          //   stack: '总量',
          data: ['1', '0', '0', '0', '0', '0', '0', '0', '0'],
        },
        {
          name: '总发送量',
          type: 'line',
          //   stack: '总量',
          data: ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        },
        {
          name: '总成功量',
          type: 'line',
          //   stack: '总量',
          data: ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        },
        {
          name: '总接收量',
          type: 'line',
          //   stack: '总量',
          data: ['0', '0', '0', '0', '0', '0', '0', '0', '0'],
        },
      ],
      successRate: [],
      tableData: [],
      tableDataLabel: [                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
        { label: '日期', disabled: true, width: '150', prop: 'date' },
        {
          label: '账号',
          disabled: false,
          width: '',
          prop: 'enterpriseUserAccountId',
        },
        { label: '部门', disabled: false, width: '', prop: 'departmentId' },
        {
          label: '应用名称',
          disabled: false,
          width: '',
          prop: 'enterpriseAccountAppId',
        },
        {
          label: '通道名称',
          disabled: false,
          width: '',
          prop: 'channelId',
        },
        { label: '业务类型', disabled: true, width: '', prop: 'businessType' },
        { label: '总提交量', disabled: true, width: '', prop: 'totalSubmit' },
        { label: '总发送量', disabled: true, width: '', prop: 'totalSend' },
        { label: '总成功量', disabled: true, width: '', prop: 'totalSuccess' },
        { label: '总接收量', disabled: true, width: '', prop: 'totalReceive' },
        { label: '成功率', disabled: true, width: '', prop: 'successRate' },
      ],                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    }
  },
  methods: {
    btn(index) {
      this.count = index
      if (index == 0) {
        //今
        this.value1 = []
        const end = new Date()
        const start = new Date()
        this.value1.push(this.dateToString(start))
        this.value1.push(this.dateToString(end))
        this.xAxis_data = []
        this.initTotal()
        this.$refs.buttonFocus0.$el.focus()
      } else if (index == 1) {
        //昨
        this.value1 = []
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
        end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
        this.value1.push(this.dateToString(start))
        this.value1.push(this.dateToString(end))
        this.xAxis_data = []
        this.initTotal()
        this.$refs.buttonFocus1.$el.focus()
      } else if (index == 2) {
        //周
        this.value1 = []
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 6)
        this.value1.push(this.dateToString(start))
        this.value1.push(this.dateToString(end))
        this.xAxis_data = []
        this.initTotal()
        this.$refs.buttonFocus2.$el.focus()
      } else if (index == 3) {
        //月
        this.value1 = []
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 29)
        this.value1.push(this.dateToString(start))
        this.value1.push(this.dateToString(end))
        this.xAxis_data = []
        this.initTotal()
        this.$refs.buttonFocus3.$el.focus()
      }
    },
    handleChange() {
      this.initTotal()
    },
    handleTypeList() {
      this.value3 = ''
      this.value4 = ''
      if (this.value2 == 'TOTAL') {
        this.tableDataLabel[1].disabled = false
        this.tableDataLabel[2].disabled = false
        this.tableDataLabel[3].disabled = false
        this.tableDataLabel[4].disabled = false
        this.disabled = false
        this.initTotal()
      } else if (this.value2 == 'ENTERPRISE_ACCOUNT_APP') {
        this.tableDataLabel[1].disabled = false
        this.tableDataLabel[2].disabled = false
        this.tableDataLabel[3].disabled = true
        this.tableDataLabel[4].disabled = false
        this.disabled = true
        this.text = '应用'
        enterpriseApplist().then((res) => {
          this.options3 = res.data.data
          this.options3.unshift({ id: '', name: '全部应用' })
        })
        this.initTotal()
      } else if (this.value2 == 'CHANNEL') {
        this.tableDataLabel[1].disabled = false
        this.tableDataLabel[2].disabled = false
        this.tableDataLabel[3].disabled = false
        this.tableDataLabel[4].disabled = true
        this.disabled = true
        this.text = '通道'
        channelList({
          enterpriseAccountAppId: '',
          businessTypeConfigId: '',
        }).then((res) => {
          this.options3 = res.data.data
          this.options3.map(item=>{
              item.id = item.serviceCode.toString() + item.extendedCode.toString()
          })
          this.options3.unshift({ id: '', name: '全部通道' })
        this.initTotal()
        })
      } else if (this.value2 == 'DEPARTMENT') {
        this.tableDataLabel[1].disabled = false
        this.tableDataLabel[2].disabled = true
        this.tableDataLabel[3].disabled = false
        this.tableDataLabel[4].disabled = false
        this.disabled = true
        this.text = '部门'
        department().then((res) => {
          this.options3 = res.data.data
          this.options3.unshift({ id: '', name: '全部部门' })
        })
        this.initTotal()
      } else {
        this.tableDataLabel[1].disabled = true
        this.tableDataLabel[2].disabled = true
        this.tableDataLabel[3].disabled = false
        this.tableDataLabel[4].disabled = false
        this.disabled = true
        this.text = '账号'
        account().then((res) => {
          this.options3 = res.data.data
          this.options3.unshift({ id: '', name: '全部账号' })
        })
        this.initTotal()
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.initTotal()
    },
    // 翻页
    handleCurrentChange(val) {
      this.currentPage = val
      this.initTotal()
    },
    // 导出
    exportRepeat() {
      const query = {
        beginTime: this.value1[0],
        businessType: this.value4,
        currentPage: this.currentPage,
        endTime: this.value1[1],
        channelId: this.value2 == 'CHANNEL' ? this.value3 : '',
        departmentId: this.value2 == 'DEPARTMENT' ? this.value3 : '',
        enterpriseAccountAppId: this.value2 == 'ENTERPRISE_ACCOUNT_APP' ? this.value3 : '',
        enterpriseUserAccountId: this.value2 == 'ENTERPRISE_USER_ACCOUNT' ? this.value3 : '',
        pageSize: 100000000,
        reportStatisticsTypeEnum: this.value2,
      }
      exportExcel(query)
        .then((res) => {
          //   console.log(res)
          let blob = new Blob([res.data])
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob) //blob,file.fileName
          } else {
            let link = document.createElement('a')
            let evt = document.createEvent('HTMLEvents')
            evt.initEvent('click', false, false)
            link.href = URL.createObjectURL(blob)
            link.download = '统计报表' + new Date().getTime() + '.xlsx'
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
    totalDistance() {
      let myChart = echarts.init(document.getElementById('echarts'))
      var arr = this.successRate
      let option = {
        // backgroundColor: '', //背景颜色透明
        color: ['#368CFE', '#FE9636', '#2BD990', '#9B51E0'],
        title: {
          //   text: "用户增长趋势图",
          //   left: "0",
          //   top: "10",
        },
        tooltip: {
          //提示框组件
          trigger: 'axis',
          borderWidth: 1,
          borderColor: '#D9D9D9',
          extraCssText: 'box-shadow:0px 0px 0px rgba(4,0,0,.3)',
          axisPointer: {
            // 坐标轴指示器配置项。
            type: 'line', // 'line' 直线指示器  'shadow' 阴影指示器  'none' 无指示器  'cross' 十字准星指示器。
            axis: 'auto', // 指示器的坐标轴。
            snap: true, // 坐标轴指示器是否自动吸附到点上
            lineStyle: {
              color: '#666666',
              type: 'solid',
            },
          },
          backgroundColor: 'rgba(0,0,0,0.36)',
          textStyle: {
            fontSize: 14,
            color: '#fff',
          },
          formatter: function (params, ticket, callback) {
            let axisValueLabel = params[0].axisValueLabel
            let src = axisValueLabel + '<br>'
            var index;
            for (var x in params) {
              src += params[x].seriesName + ': ' + params[x].value + '<br>'
              index = params[x].dataIndex
            }
            src += '成功率' + ': ' + arr[index] + '<br>'
            return src
          },
        },
        legend: {
          data: ['总提交量', '总发送量', '总成功量', '总接收量'],
          left: '0',
        },
        grid: {
          //表盘上下左右位置
          left: '0',
          right: '5%',
          bottom: '5%',
          containLabel: true,
        },
        toolbox: {
          //工具
          //   feature: {
          //     saveAsImage: {},
          //   },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false, //不从头开始显示，从中间开始显示
          axisLabel: {
            show: true,
            textStyle: {
              color: '#666666', //更改坐标轴文字颜色
              fontSize: 12, //更改坐标轴文字大小
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#e5e5e5',
              width: 1,
            },
          }, // x轴线条颜色
          boundaryGap: false,
          data: this.xAxis_data,
        },
        yAxis: {
          type: 'value',
          position: 'left',
          minInterval: 1,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#666666', //更改坐标轴文字颜色
              fontSize: 12, //更改坐标轴文字大小
            },
            formatter: '{value}条',
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#e5e5e5',
              width: 1,
            },
          }, // y轴线条颜色
        },
        series: this.series_data,
      }
      myChart.setOption(option)
      //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    initTotal() {
      reportTotal({
        beginTime: this.value1[0],
        endTime: this.value1[1],
        productType: this.value4,
        channelId: this.value2 == 'CHANNEL' ? this.value3 : '',
        departmentId: this.value2 == 'DEPARTMENT' ? this.value3 : '',
        enterpriseAccountAppId: this.value2 == 'ENTERPRISE_ACCOUNT_APP' ? this.value3 : '',
        enterpriseUserAccountId: this.value2 == 'ENTERPRISE_USER_ACCOUNT' ? this.value3 : '',
        reportStatisticsTypeEnum: this.value2, //[ TOTAL, CHANNEL, ENTERPRISE_ACCOUNT_APP, DEPARTMENT, ENTERPRISE_USER_ACCOUNT ]
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      })
        .then((res) => {
            if(res.status == 200){
                this.xAxis_data = []
                this.successRate = []
            this.series_data[0].data = []
            this.series_data[1].data = []
            this.series_data[2].data = []
            this.series_data[3].data = []
            this.total = res.data.data.total
            this.total1 = res.data.data.totalSubmit
            this.total2 = res.data.data.totalSend
            this.total3 = res.data.data.totalSuccess
            this.total4 = res.data.data.totalReceive
            this.total5 = (res.data.data.successRate * 100).toFixed(2) + '%'
            res.data.data.dailyReportStatistics.map((item) => {
              if (item.date.length > 10) {
                this.xAxis_data.push(item.date.substring(11, 16))
              } else {
                this.xAxis_data.push(item.date)
              }
              this.series_data[0].data.push(item.totalSubmit)
              this.series_data[1].data.push(item.totalSend)
              this.series_data[2].data.push(item.totalSuccess)
              this.series_data[3].data.push(item.totalReceive)
              this.successRate.push((item.successRate * 100).toFixed(2) + '%')
            })
            this.tableData = res.data.data.dailyReportStatistics.map((item) => {
              item.successRate = (item.successRate * 100).toFixed(2) + '%'
              if (item.businessType == null) {
                item.businessType = '全部'
              }
              if (item.channelId == null) {
                item.channelId = '全部'
              }
              if (item.departmentId == null) {
                item.departmentId = '全部'
              }
              if (item.enterpriseAccountAppId == null) {
                item.enterpriseAccountAppId = '全部'
              }
              if (item.enterpriseUserAccountId == null) {
                item.enterpriseUserAccountId = '全部'
              }
              if (this.value2 == 'ENTERPRISE_ACCOUNT_APP') {
                this.options3.map((res) => {
                  if (item.enterpriseAccountAppId == res.id) {
                    item.enterpriseAccountAppId = res.name
                  }
                })
              } else if (this.value2 == 'CHANNEL') {
                this.options3.map((res) => {
                  if (item.channelId == res.id) {
                    item.channelId = res.name
                  }
                })
              } else if (this.value2 == 'DEPARTMENT') {
                this.options3.map((res) => {
                  if (item.departmentId == res.id) {
                    item.departmentId = res.name
                  }
                })
              } else if (this.value2 == 'ENTERPRISE_USER_ACCOUNT') {
                this.options3.map((res) => {
                  if (item.enterpriseUserAccountId == res.id) {
                    item.enterpriseUserAccountId = res.name
                  }
                })
              }
              this.options4.map((res) => {
                if (item.businessType == res.id) {
                  item.businessType = res.name
                }
              })
              return item
            })
            this.$nextTick(() => {
              this.totalDistance()
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
    },
    dateToString(date) {
      //日期转字符串
      var year = date.getFullYear()
      var month = (date.getMonth() + 1).toString()
      var day = date.getDate().toString()
      if (month.length == 1) {
        month = '0' + month
      }
      if (day.length == 1) {
        day = '0' + day
      }
      var dateTime = year + '-' + month + '-' + day
      return dateTime
    },
  },
  mounted() {
    this.$refs.buttonFocus0.$el.focus()
    this.btn(0)
    // getBusinessLis({ id: 1 }).then((res) => {
    //     console.log('res: ', res.data);
    //   this.options4 = res.data.data
    //   this.options4.unshift({ id: '', name: '全部' })
    // })
  },
}
</script>
<style lang="less" scoped>
#header {
  width: 100%;
  // height: 100%;
  @vat: #666;
  .navW {
    width: 100%;
    // height: 100%;
  }
  .navF {
    box-sizing: border-box;
    font-size: 14px;
    padding: 0 70px;
  }
  .header {
    .navW();
    .navF();
    .title {
      height: 90px;
      font-size: 20px;
      line-height: 80px;
      box-sizing: border-box;
      padding-top: 10px;
    }
    .nav {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      //   .buttonList{
      //       color: #ffffff;
      //       border-color: #c6e2ff;
      //       background-color: #368cfe;
      //   }
      .el-button:focus,
      .el-button:hover {
        color: #ffffff;
        border-color: #c6e2ff;
        background-color: #368cfe;
      }
      .el-date-editor {
        width: 220px;
        margin-right: 5px;
        margin-left: 5px;
      }
      .el-select {
        width: 130px;
        margin-right: 5px;
      }
    }
    .list {
      .navW();
      height: 100px;
      margin: 20px 0;
      display: flex;
      justify-content: space-between;
      .listBox {
        width: 19%;
        height: 100px;
        border: 1px solid #e5e5e5;
        padding: 0 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .listBoxLeft {
          width: 50px;
          height: 50px;
          margin-right: 10px;
        }
        .listBoxRight {
          height: 50px;
          overflow: hidden;
          p {
            padding: 0;
            margin: 0;
            font-size: 17px;
            font-weight: 600;
            color: #333;
            margin-bottom: 8px;
          }
          span {
            font-size: 12px;
            color: #666;
            display: flex;
            img {
              margin-left: 5px;
            }
          }
        }
      }
    }
    .banner {
      .navW();
      height: 300px;
      #echarts {
        width: 100%;
        height: 100%;
      }
    }
    .container {
      .navW();
      margin: 10px 0;
      display: flex;
      justify-content: flex-end;
      .el-button:focus,
      .el-button:hover {
        color: #ffffff;
        border-color: #c6e2ff;
        background-color: #368cfe;
      }
    }
    .table {
      .pagination {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
      }
    }
  }
}
</style>
