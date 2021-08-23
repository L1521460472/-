<template>
  <div>
    <el-select v-model="carsarValue" ref="selectArea" size="small" @change="select">
      <el-option
        class="diy-item"
        v-for="(item, index) in value"
        :key="index"
        :label="item.content"
        :value="item.content">
          <span v-if="!item.show">{{item.content}}</span>
          <div style="width:125px" v-else @click.stop.prevent="stopInput">
            <el-input size="small" v-model="item.content"></el-input>
          </div>
          <span v-if="!readOnly">
            <i v-if="!item.show" class="el-icon-edit space" @click.stop="editOption(index)"></i>
            <i v-else class="el-icon-check" @click.stop="editOption(index)"></i>
            <i class="el-icon-delete" @click.stop="deleteOption(index)"></i>
          </span>
      </el-option>
      <el-option value="" v-if="!readOnly">
        <li class="add" @click.stop="add">
          <i class="el-icon-plus"></i>
        </li>
      </el-option>
      <li class="add-item" v-if="isShow">
        <div style="width:125px">
          <el-input size="small" v-model="addValue" @keyup.enter.native="submitAdd"></el-input>
        </div>
        <div>
          <i class="el-icon-check" @click.stop="submitAdd"></i>
          <i class="el-icon-close" @click.stop="cancleAdd"></i>
        </div>
      </li>
    </el-select>
  </div>
</template>
<script>
export default {
  data(){
    return {
      carsarValue: '',
      isShow: false,
      addValue: '',
      currentSelect: '', // 当前选择
    }
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    add() {
      this.isShow = !this.isShow
    },
    editOption(index) {
      this.value[index].show = !this.value[index].show
    },
    deleteOption(index) {
      this.$confirm('删除该级联数据，关联数据将一同删除，是否确定删除？', {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        closeOnClickModal:false,
        center:true
      }).then(() => {
        // console.log('删除级联数据')
        this.$emit('delete', index)
      }).catch(() => {})
    },
    // 取消新增
    cancleAdd() {
      this.isShow = !this.isShow
    },
    stopInput() {
      console.log('阻止输入框冒泡事件')
    },
    submitAdd() {
      if (this.addValue != '' && this.addValue != null) {
        this.$emit('changeValue', this.addValue)
        this.addValue = ''
        this.isShow = !this.isShow
      } else {
        this.$message({
          type: 'warning',
          message: '选项不能为空!',
          center: true
        })
        return
      }
    },
    select(val) {
      this.value.forEach((item, index) => {
        if (val == item.content) {
          this.currentSelect = index
          const temp = item.childList || []
          this.$emit('selectChange', temp, index)
        }
      })
    },
    clear() {
      this.carsarValue = ''
      this.$emit('selectChange', [])
    },
    clearValue() {
      this.carsarValue = ''
    }
  }
}
</script>
<style lang="less" scoped>
.center{
  text-align: center;
}
.diy-item{
  display: flex;
  justify-content: space-between;
  .space{
    margin-right: 5px;
  }
  i:hover{
    color: #409eff;
  }
}
.add-item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-sizing: border-box;
  i:hover{
    cursor: pointer;
    color: #409eff;
  }
}
.add{
  display: flex;
  justify-content: center;
  padding: 10px 0 5px;
  color: #409eff;
}
.add:hover{
  background-color: #F5F7FA;
}
/deep/ .el-select-dropdown__item{
  display: flex;
  justify-content: space-between;
}
/deep/ .el-select-dropdown__item:hover{
  background-color: #F5F7FA;
}
</style>
