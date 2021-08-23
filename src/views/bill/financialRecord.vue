<template>
  <div id="header" v-loading="loading" element-loading-text="loading">
    <div class="header">
      <div class="title">财务记录</div>
      <div class="container">
        <div class="headerBtn">
          <div class="headerBtnLeft">
            <el-button class="addBtn" style="border-radius: 4px 0 0 4px;" type="primary" size="small" @click="dataList">
              <i class="iconfont iconshuaxin"></i>
            </el-button>
            <el-button class="addBtn" type="primary" size="small" @click="dataList(-1)">
              <i class="iconfont iconguanbi"></i>
            </el-button>
            <el-select v-model="value" ref="searchSelect" @visible-change="isShowSelectOptions" @change="dataList" size="small" placeholder="全部" style="width:160px;margin-right:10px;">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
            <el-input v-model="remark" size="small" maxlength="50" placeholder="备注">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="dataList" style="cursor:pointer"></i>
            </el-input>
          </div>
        </div>
        <iTable :table='tableData' @onSizeChange='handleSizeChange' @onCurrentChange='handleCurrentChange'>
            <!--自定义当前的列-->
            <template slot-scope="props" slot="direction">
                <span v-if="props.obj.row.direction == 0">收入</span>
                <span v-if="props.obj.row.direction == 1">支出</span>
            </template>
        </iTable>
      </div>
    </div>
  </div>
</template>
<script>
import { tableList } from '@/api/bill/financialRecord'
import iTable  from '@/components/table'
export default {
  name: 'financialRecord',
  data() {
    return {
      loading: false,
      value: '',//选项值
      remark:'',//备注
      tableData: {
          tr:[
              {
                  id:1,
                  label:'方向',
                  prop:'direction',
                  show: 'template',
              },
              {
                  id:2,
                  label:'账户余额',
                  prop:'balanceAfterAudit',
              },
              {
                  id:3,
                  label:'金额',
                  prop:'amount',
              },
              {
                  id:4,
                  label:'时间',
                  prop:'auditTime',
              },
              {
                  id:5,
                  label:'备注',
                  prop:'remark',
              },
          ],
          data:[],
          expands: [
            // 展开行数据
            {
              id: '1',
              label: 'hello',
              prop: 'prop1111',
            },
          ],
          operation:{
              label:'操作',
              data:[
                  {
                      id:1,
                      label:'修改',
                      Fun: 'edit',
                      size:'mini',
                      type:'primary'
                  },
                  {
                      id:2,
                      label:'删除',
                      Fun: 'delete',
                      size:'mini',
                      type:'primary'
                  },
              ]
          },
          border: true,// 是否带有纵向边框，默认为false
          loading: false,// 加载中动画
          align:'left',// 设置数据居中显示
          hasSelect: false,// 有无选中功能
          hasExpand:false,// 有无展开行功能
          hasOperation:false,// 有无操作功能
          hasPagination:true,//有无分页
          tableHeight: window.innerHeight - 304 + '',//表格高度
          total: 2,
          pageSize: 10,
          currentPage: 1,
      },
      options: [
          {
              id:'',
              name:'全部'
          },
          {
              id:0,
              name:'收入'
          },
          {
              id:1,
              name:'支出'
          },
      ],
    }
  },
  methods: {
      handleSizeChange(val){
          this.tableData.pageSize = val;
          this.dataList();
      },
      handleCurrentChange(val){
          this.tableData.currentPage = val;
          this.dataList();
      },
      // 头部搜索下拉框选中后失焦防止回车触发下拉框
      isShowSelectOptions(isShowSelectOptions){
        if(!isShowSelectOptions) this.$refs.searchSelect.blur();
      },
      dataList(val){
          if (val == -1) {
            this.value = ''
            this.remark = ''
            this.tableData.currentPage = 1
          }
          tableList({
              direction:this.value,
              remark:this.remark,
              pageSize:this.tableData.pageSize,
              currentPage:this.tableData.currentPage
          }).then((res)=>{
              this.tableData.data = res.data.data.records;
              this.tableData.total = res.data.data.total;
          }).catch((err)=>{
              this.$message.error({
                message: err,
                center: true,
              })
          })
      },
      keyDown(e) {
      if (e.keyCode == 13) {
        this.dataList()
      }
    },
  },
  mounted() {
      this.dataList()
      window.addEventListener('keydown', this.keyDown) //绑定监听事件
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDown, false) //移除监听事件
  },
  components:{
      iTable 
  }
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
  }
}
</style>