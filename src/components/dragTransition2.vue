<template>
  <!-- 可拖拽组件 -->
  <div>
    <div class="group-item"
      v-for="(item, index) in types"
      :key="index"
      draggable="true"
      @dragstart="hnadleDragStart($event, item)"
      @dragover.prevent="handleDragOver($event)"
      @dragenter="handleDragEnter($event, item)"
      @dragend="handleDragEnd($event, item)"
      @drop="handleDrop($event, item)">
        <div class="group-item-left">
          <span v-if="!item.isEdit">{{item.name}}</span>
          <el-input v-else v-model="item.name" type="text" maxlength="8" show-word-limit size="small" @keyup.enter.native="updateGroupName(index, item.name, item.id)"></el-input>
        </div>
        <div class="group-item-right">
          <template v-if="item.id == null || item.id == -1 ">
            <span>系统默认</span>
          </template>
          <template v-else>
            <img src="../assets/images/icon-修改@1-1x.png" @click="editGroup(index, item.name, item.id)" />
            <el-button slot="reference" type="text" style="padding: 0" @click="deleteGroup(item.id)">
              <img src="../assets/images/icon---outlined---action---main---delete-3@1x.png" />
            </el-button>
            <img src="../assets/images/icon-拖拽@1x.png" />
          </template>
        </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="25%"
      center
      top="150px"
      :show-close="false"
      append-to-body>
      <div>
        <el-radio-group v-model="radio">
          <el-radio :label="1">删除分组，组内所有{{fileType == 1 ? '图片' : (fileType == 2 ? '音频': '视频')}}移到未分组</el-radio>
          <el-radio :label="2">删除分组，同时删除组内所有{{fileType == 1 ? '图片' : (fileType == 2 ? '音频': '视频')}}</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureDeleteGroup" size="mini">确 定</el-button>
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { deleteGroups, updateGroup, getGroupByType, updateFile } from '@/api/vms/media'
export default {
  name: 'dragTransition',
  props: {
    types: {
      type: Array,
      default: []
    },
    fileType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      dialogVisible: false,  // 弹窗控制
      radio: 1,
      currentDelete: '', // 当前要删除的分组
      dragging: null, // 正在拖拽的元素
      targetDragg: null //  目标元素
    }
  },
  mounted(){
    //
  },
  methods: {
      //
      editGroup(val,val2,val3){
        this.$emit('editStatus', val)
        if (this.types[val].isEdit == false) {
          const query = {
            id: val3,
            name: val2
          }
          updateGroup(query).then(res => {
            if (res.data.status == 0) {
              this.$message({
                type: 'success',
                message: '更新成功!',
                center: true
              })
            } else {
              this.$message({
                type: 'error',
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
        }
      },
      // 键盘回车修改组名
      updateGroupName(index, name, id){
        //
        const query = {
          id: id,
          name: name
        }
        updateGroup(query).then(res => {
          if (res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '更新成功!',
              center: true
            })
          } else {
            this.$message({
              type: 'error',
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
        this.$emit('editStatus', index)
      },
      // 拖拽开始
      hnadleDragStart(event, item) {
        this.dragging = item
      },
      // 拖拽结束
      handleDragEnd() {
        this.dragging = null
      },
      // 当拖动元素在目标元素内时反复触发
      handleDragOver(event){
        event.dataTransfer.dropEffect = 'move'
      },
      // 当拖动元素进入目标元素时触发一次
      handleDragEnter(event, item) {
        event.dataTransfer.effectAllowed = "move"
        this.targetDragg = item
        if (item == this.dragging) {
          return
        }
        const newItems = [...this.types]
        const src = newItems.indexOf(this.dragging)
        const dst = newItems.indexOf(item)

        newItems.splice(dst, 0, ...newItems.splice(src, 1))
        this.$emit('change', newItems)
      },
      handleDrop(event, item){
        const temp = this.dragging.groupOrder
        this.dragging.groupOrder = this.targetDragg.groupOrder
        this.targetDragg.groupOrder = temp
        if (this.dragging == this.targetDragg) return // 判断是不是发生过移动
        const query1 = {
          id: this.dragging.id,
          name: this.dragging.name,
          groupOrder: this.dragging.groupOrder
        }
        updateGroup(query1).then(res => {
          if(res.data.status != 0) {
            this.$message({
              type: 'error',
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
        const query2 = {
          id: this.targetDragg.id,
          name: this.targetDragg.name,
          groupOrder: this.targetDragg.groupOrder
        }
        updateGroup(query2).then(res => {
          if(res.data.status != 0) {
            this.$message({
              type: 'error',
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
      //  删除分组
      deleteGroup(val) {
        this.dialogVisible = true
        this.currentDelete = val
      },
      // 确认删除分组
      sureDeleteGroup() {
        this.dialogVisible = false
        const query = {
          cascadeDeleteFile: this.radio == 1 ? false : true,
          id: this.currentDelete,
          fileType: this.fileType
        }
        deleteGroups(query).then(res => {
          if(res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '删除成功!',
              center: true
            })
            this.getGroupByTypes(this.fileType)
            this.$emit('updateList', this.fileType)
          } else {
            this.$message({
              type: 'error',
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
      // 根据类型获取分组方法
      getGroupByTypes(val) {
        const query = {
          fileType: val
        }
        getGroupByType(query).then(res => {
          if(res.data.status == 0) {
            let sum = 0
            const data = res.data.data
            for (let k in data) {
              sum += data[k].total
            }
            const val = {
              id: null,
              total: sum,
              name: this.fileType == 1 ? '我的图片': (this.fileType == 2 ? '我的音频' : '我的视频')
            }
            data.unshift(val)
            data.forEach(item => {
              item.isEdit = false
            })
            //
            this.$emit('change', data)
          }
        })
      },
  }
}
</script>
<style lang="less" scoped>
  .group-item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e5e5e5;
      padding: 12px 0;
      color: #333333;
    }
    .group-item-right img{
        width: 18px;
        height:18px;
        margin-right: 8px;
      }
      /deep/ .el-dialog--center .el-dialog__body{
        padding: 0 25px 10px;
        max-height: 500px;
        overflow-y: scroll;
      }
      /deep/ .el-radio {
        padding: 5px 0;
      }
</style>
