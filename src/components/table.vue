<template>
  <div :table='table'>
    <el-table v-loading="table.loading" :border="table.border" :align="table.align" @selection-change="handleSelectionChange" :header-cell-style="{background:'#F4F4F4',color:'#333333'}" size="small"
      :data="table.data" style="width: 100%;" :style="{ color: '#333', 'min-height': table.tableHeight + 'px' }">
      <el-table-column align="center" :show-overflow-tooltip="true" v-if="table.hasSelect" type="selection" width="55">
        </el-table-column>
      <el-table-column type="expand" :show-overflow-tooltip="true" :align="table.align" v-if="table.hasExpand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item :label="item.label" v-for="item in table.expands" :key="item.id">
                <span>{{ props.row[item.prop] }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
      <template v-for="item in table.tr">
        <el-table-column show-overflow-tooltip :label="item.label" :key="item.id" :width="item.width ? item.width : ''" v-if="item.show !== false && item.show === 'template'">
          <template slot-scope="scope">
            <slot :name='item.prop' :obj='scope'></slot>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip :label="item.label" :prop="item.prop" :key="item.id" :width="item.width ? item.width : ''" v-else-if="item.show !== false && item.show !== 'template'"></el-table-column>
      </template>
      <el-table-column :align="table.align" :label="table.operation.label" :width="table.operation.width ? table.operation.width : ''"
        :min-width="table.operation.minWidth ? table.operation.minWidth : ''" v-if="table.hasOperation">
        <template slot-scope="scope">
          <el-button v-for="item in table.operation.data" :key="item.id" :type="item.type" :size="item.size" @click.stop="handleOperation(scope.$index, scope.row, item.id)">{{item.label}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer_page" v-if="table.hasPagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="table.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="table.pageSize" :pager-count="5"
        layout="total, sizes, prev, pager, next, jumper" :total="table.total"></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'iTable',
  props: {
    table: {
      type: Object,
      default() {
        return {
          hasMergeRowOrColumn: false, // 是否合并单元格
          loading: false, // 加载中动画
          hasShowSummary: false, // 是否显示表位合计行
          border: false, // 是否带有纵向边框，默认为false
          align: 'center', // 设置数据居中显示
          hasSelect: false, // 有无选中功能
          hasOperation: false, // 有无操作功能
          hasExpand: false, // 有无展开行功能
          hasPagination:false,//有无分页
          tableHeight: window.innerHeight - 304 + '',//表格高度
          total: 0,//总共条数
          pageSize: 10,//每页条数
          currentPage: 1,//页数
          tr: [
            // 表头数据 —— className:列的class名
            {
              id: '1',
              label: 'label',
              prop: 'prop',
              className: 'classname',
              minWidth: '80',
              show: true, // show有三种值：false隐藏当前列，true常规表格列，template自定义表格列
            },
          ],
          data: [], // 表格数据 —— 如需添加行class，处理数据时则需要传入class名， class需为数组
          expands: [
            // 展开行数据
            {
              id: '1',
              label: 'label',
              prop: 'prop',
            },
          ],
          operation: {
            // 操作功能
            label: '操作', // 操作列的行首文字
            width: '200', // 操作列的宽度
            className: '', // 操作列的class名
            data: [
              // 操作列数据
              {
                label: '通过', // 按钮文字
                Fun: 'handleSubmit', // 点击按钮后触发的父组件事件
                size: 'mini', // 按钮大小
                id: '1', // 按钮循环组件的key值
                classname: 'show', // 按钮的类名
                type: 'primary', // 按钮的类型
              },
            ],
          },
        }
      },
    },
  },
  data() {
    return {
        
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('onHandleSelectionChange', val)
    },
    handleOperation(a, b, id) {
      const data = this.table.operation.data
      for (let i = 0; i < data.length; i++) {
        if (id === data[i].id) {
          this.$emit(data[i].Fun, a, b)
        }
      }
    },
    handleSizeChange(val) {
      this.$emit('onSizeChange',val)
    },
    //选择页数
    handleCurrentChange(val) {
      this.$emit('onCurrentChange',val)
    },
  },
  mounted() {
  },
}
</script>
<style lang="less" scoped>
.el-table .item {
  width: 24px;
  height: 26px;
  line-height: 26px;
  float: left;
  padding: 0;
  margin-right: 6px;
}
.footer_page {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  //   border-top: 1px solid #dee4f0;
  box-sizing: border-box;
}
</style>