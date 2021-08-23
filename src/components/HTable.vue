<template>
<!-- 基于elementui表格的二次封装 -->
  <div class="content-body">
    <!-- 表格搜索区域插槽可展开搜索 -->
    <el-collapse-transition>
      <div v-show="showOperation">
        <slot name="search"></slot>
      </div>
    </el-collapse-transition>
    <el-collapse-transition>
      <div class="operation-btn">
        <!-- <el-tooltip content="列显隐" placement="top">
          <el-button type="text" icon=" iconfont icontiaojie" @click="showColumns"></el-button>
        </el-tooltip> -->
        <!-- <el-tooltip content="搜索栏显隐" placement="top">
          <i class="el-icon-search select" @click="showChange"></i>
        </el-tooltip> -->
      </div>
    </el-collapse-transition>
    <el-table
      :data="data"
      :border="tableOptions.border || true"
      :stripe="tableOptions.stripe || false"
      size="small"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
      :style="{'color':'#333','min-height': (tableOptions.minHeight || '') + 'px'}"
      :header-cell-style="{ background: '#F4F4F4', color: '#333333', 'line-height': '22px' }">
      <template v-if="tableOptions.expand || false">
        <el-table-column type="expand" align="center">
          <template slot-scope="scope">
            <slot name="expand" :row="scope.row"></slot>
          </template>
        </el-table-column>
      </template>
      <template v-if="tableOptions.select || false">
        <el-table-column type="selection" align="center">
        </el-table-column>
      </template>
      <template v-for="(item, index) in tableOptions.columns">
        <el-table-column
        v-if="!(item.hide || false)"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :align="item.align || 'left'"
        :fixed="item.fixed || false"
        :width="item.width || ''"
        :min-width="item.minWidth || ''"
        :show-overflow-tooltip="item.overHidden || true"
        ></el-table-column>
      </template>
      <!-- 操作列插槽 -->
        <el-table-column v-if="operation" label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <slot name="operation" :row="scope.row"></slot>
          </template>
        </el-table-column>
    </el-table>
    <!-- 底部插槽，例如分页器 -->
    <div style="text-align:center">
      <slot name="footer"></slot>
    </div>
    <el-drawer
      title="列显隐"
      :visible.sync="drawer"
      direction="rtl"
      size="'50%'">
      <el-transfer v-model="transferValue" :data="transferData" :titles="transferTitle" @change="changeColumns"></el-transfer>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: 'HTable',
  props: {
    tableOptions: {
      type: Object,
      default: () => {
        return {}
      }
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    // border: {
    //   type: Boolean,
    //   default: true
    // },
    // stripe: {
    //   type: Boolean,
    //   default: true
    // },
    operation: {  // 是否显示操作栏
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showOperation: true,  // 搜索框是否收缩
      drawer: false,  // 抽屉控制
      transferValue: [],
      transferData: [],
      transferTitle: ['显示', '隐藏']
    }
  },
  methods: {
    showChange() {
      this.showOperation = !this.showOperation
    },
    showColumns() {
      this.drawer = !this.drawer
      this.transferData = []
      this.tableOptions.columns.forEach((item, index) => {
        this.transferData.push({
          key: index,
          label: item.label
        })
      })
    },
    changeColumns(val1, val2,val3) {
      // console.log(val1, val2,val3)
      // console.log(this.transferValue)
      this.tableOptions.columns.forEach(item => {
        item.hide = false
      })
      this.transferValue.forEach(item => {
        // if (this.tableOptions.columns[item].hide == undefined) {
        //   this.tableOptions.columns[item].hide = false
        // } else {
        //   this.tableOptions.columns[item].hide = !this.tableOptions.columns[item].hide
        // }
        this.tableOptions.columns[item].hide = true
      })
    },
    handleSelectionChange(val) {
      this.$emit('select', val)
    }
  }
}
</script>
<style scoped>
  .content-body{
    position: relative;
    margin-top: 12px;
  }
  .operation-btn {
    position: absolute;
    /* display: flex;
    flex-direction: row-reverse; */
    /* color: #409eff; */
    font-size: 20px;
    /* padding: 10px 0; */
    z-index: 40;
    left: 15px;
  }
  .select {
    cursor: pointer;
  }
  /deep/ .el-transfer{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  /deep/ .el-transfer__buttons{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
  }
  /deep/ .el-drawer__body{
    padding: 0 30px;
  }
  /deep/ .el-transfer__button:first-child{
    margin-bottom: 0;
    margin-bottom: 10px;
  }
  /deep/ .el-transfer__button:last-child{
    margin-left: 0;
  }
  /deep/ :focus {
    outline: 0;
  }
  /deep/ .el-drawer__open .el-drawer.rtl {
    width: 50%;
  }
  /deep/ .el-transfer-panel{
    width: 250px;
    height: 500px;
  }
  /deep/ .el-transfer-panel__list{
    height: auto;
  }
  /deep/ .el-dialog__header{
    border-bottom: 1px solid #eee;
  }
</style>
