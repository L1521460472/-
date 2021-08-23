<template>
  <div id="operationLog" v-loading="loading"  element-loading-text="loading" >
    <div class="title">操作日志</div>
    <div class="headerBtn">
      <div class="tip">操作日志记录了登陆账号进行的所有操作。防止异常操作的出现，便于核查。</div>
      <el-input class="search" v-model="content" size="small" maxlength="50" placeholder="操作账号">
        <i @click="searchAction" slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>
    <el-table
      border
      :header-cell-style="{background: '#F5F7FA',color: '#333333',lineHeight: '20px',}"
      size="small"
      :data="tableData"
      :style="{'color':'#333','min-height':tableHeight + 'px'}"
    >
      <el-table-column prop="loginIp" label="登录IP" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="account" label="账号" width="140" show-overflow-tooltip></el-table-column>
      <el-table-column prop="content" label="操作" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createTime" width="180" label="时间" show-overflow-tooltip></el-table-column>
    </el-table>
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
</template>
<script>
import { getOperateionList } from "../../api/userName/userInfo";
export default {
  name: "operationLog",
  data() {
    return {
      loading:false,
      currentPage: 1,
      pageSize: 10,
      total:0,
      content:null,
      tableData: [],
      tableHeight:window.innerHeight - 316 +'',
    };
  },
  methods: {
    // 日志列表数据
    getDataList(){
      this.loading = true
      let params = {
        content:this.content,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      } 
      getOperateionList(params).then(res=>{
        this.loading = false
        if(res.data.status == 0){
          this.tableData = res.data.data.records
          this.total = res.data.data.total
        }else{
          this.$message({
            message:res.data.message,
            center:true,
            type:res.status === 2 ? 'warning':'error'
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

  },
  mounted() {
    this.getDataList()
    window.addEventListener("keydown", this.keyDown); //绑定监听事件
  },
};
</script>

<style lang="less" scoped>
#operationLog {
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
    margin-bottom: 20px;
  }
  .headerBtn{
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    .tip{
      // margin-bottom: 30px;
      line-height: 36px;
      color: #999999;
      font-size: 12px;
      letter-spacing: 0.75px;
    }
    .el-input {
      width: 160px;
    }
    .el-input__inner{
      width: 160px;
    }
  }
  .footer_page{
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
}
</style>