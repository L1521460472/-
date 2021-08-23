<template>
  <!-- 分组组件 -->
  <div>
    <div class="type-select" :class="{'muchmore': isMore}" id="#select">
      <div class="type-select-left">
        <div class="type-select-group">分组</div>
        <div v-for="(item,index) in types" :key="item.id" class="type-select-item" :class="[currentSelect === index ? 'active' : '']" @click="selectType(index,item.id)">
          {{item.name + '(' + item.total + ')'}}
        </div>
      </div>
      <div class="type-select-right">
        <el-popover
          placement="bottom"
          width="250"
          ref="popover"
          style="outline:none"
          trigger="click">
            <template class="popover-content">
              <div class="popover-title">请输入分组名称</div>
              <div>
                <el-input size="small" type="text" maxlength="8" show-word-limit v-model="newGroupName" placeholder="请输入分组名称"></el-input>
              </div>
              <div class="popover-footer">
                <el-button type="primary" size="mini" @click="submitNewGroup">确定</el-button>
                <el-button size="mini" @click="cancleGruop">取消</el-button>
              </div>
            </template>
          <!-- <span style="margin-right:20px;cursor: pointer;" slot="reference" v-has="'fileGroupAddOrUpdate'">
          <img src="../assets/icon-新建@1x.svg" />
          新建</span> -->
          <el-button type="text" size="medium" icon="el-icon-circle-plus-outline" class="button-add" slot="reference" v-has="'vmsFileGroupAddOrUpdate'">
            <!-- <img src="../assets/icon-新建@1x.svg" /> 新建 -->
            <span style="margin:14px 0">新建</span>
          </el-button>
        </el-popover>
        <!-- <span style="margin-right:20px;cursor: pointer;" v-has="'fileGroupAddOrUpdate'">
          <img src="../assets/icon-新建@1x.svg" />
          新建</span> -->
        <el-button type="text" size="medium" icon="el-icon-setting" @click="manageGroups" class="button-setting" v-has="'vmsFileGroupAddOrUpdate'">
          <!-- <img src="../assets/icon-管理@1x.svg" /> -->
          <span>管理</span>
          </el-button>
        <!-- <div class="popover-menu">
          <div>请输入分组名称</div>
          <el-input size="small" type="text" maxlength="8" show-word-limit v-model="newGroupName" placeholder="请输入分组名称"></el-input>
          <div>
            <el-button type="primary" size="mini" @click="submitNewGroup">确定</el-button>
            <el-button size="mini" @click="cancleGruop">取消</el-button>
          </div>
        </div> -->
      </div>
    </div>
    <div class="more" v-if="muchMore">
      <span @click="more">{{isMore ? '展开更多' : '收起'}}</span>
      <!-- <img src="" /> -->
      <i v-if="isMore" class="el-icon-arrow-down"></i>
      <i v-else class="el-icon-arrow-up"></i>
    </div>
    <el-dialog
      title="新增分组"
      :visible.sync="addGroupVisible"
      width="30%"
      style="max-height:500px;overflow-y:scroll">
      <el-form label-width="80px">
        <el-form-item label="分组名称:">
          <el-input size="small" type="text" maxlength="8" show-word-limit v-model="newGroupName" placeholder="请输入分组名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addGroupVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="submitNewGroup" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="管理分组"
      :visible.sync="manageGroupVisible"
      width="40%">
        <span class="manage-sort">推拽分组进行排序</span>
        <div>
          <drag-transition-2 :types="types" @change="changeTypes" @editStatus="editGroupStatus" :fileType="fileType" @updateList="updateList"></drag-transition-2>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="manageGroupVisible = false" size="mini">确 定</el-button>
          <el-button @click="manageGroupVisible = false" size="mini">取 消</el-button>
        </span>
    </el-dialog>
    <!-- <el-dialog :visible.sync="test" width="250px" :modal="false" :show-close="false" top="320px" class="dialog-myself"
    ></el-dialog> -->
  </div>
</template>
<script>
import { updateGroup, getGroupByType, deleteGroup } from '@/api/vms/media'
import DragTransition2 from './dragTransition2.vue'
export default {
  name: 'typeGroup',
  components: {
    DragTransition2
  },
  props:{
    types: {
      type: Array,
      default:()=>[]
    },
    current1: {
      type: Number,
      default: 0
    },
    fileType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      currentSelect: 0,
      addGroupVisible: false, // 新增分组弹框控
      newGroupName: '', // 新分组的名称
      manageGroupVisible: false, // 管理分组名称
      isMore: true,
      muchMore: false,
      viewMoreHeight: 0,
      test: true
    }
  },
  watch: {
    // viewMoreHeight() {
      //
      // if (this.viewMoreHeight == 37) {
      //   this.muchMore = false
      // }
    // },
    types: {
      handler(){
        if (this.types.length > 5) {
          this.muchMore = true
        } else {
          this.muchMore = false
        }
      }
    }
  },
  mounted(){
    // this.getElementHeight()
  },
  methods: {
    // 新增弹框打开
      addGroup() {
        this.newGroupName = ""
        this.addGroupVisible = true
      },
      // 判断当前是选中的分组时哪一个
      selectType(val1,val2) {
        this.currentSelect = val1
        this.$emit('select',val1)
        //
      },
      // 打开分组管理弹窗
      manageGroups() {
        this.manageGroupVisible = true
      },
      // 新增分组提交
      submitNewGroup() {
        if (this.types.length>= 50) {
          this.$message({
            type: 'warning',
            message: '最多只能建50个分组,您已超过限制',
            center: true
          })
          this.$refs.popover.doClose()
          return
        }
        if (this.newGroupName == '') {
          this.$message({
            type: 'warning',
            message: '请输入分组名称'
          })
          return
        }
        const query = {
          name: this.newGroupName,
          groupOrder: this.types.length -1,
          fileType: this.fileType
        }
        updateGroup(query).then(res => {
          //
          if (res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '新增成功!',
              center: true
            })
            this.getGroupByTypes(this.fileType)
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
        // 判断是不是超过一行
        // this.getElementHeight()
        this.$refs.popover.doClose()
        this.newGroupName = ""
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
            // this.types1 = data
            //
            this.$emit('changeTypes', data)
          }
        })
      },
      cancleGruop(){

        this.$refs.popover.doClose()
        this.newGroupName = ''
      },
      changeTypes(val) {
        // this.types = val
        //
        this.$emit('changeTypes', val)
      },
      // 修改分组名称
      editGroupStatus(val) {
        this.types[val].isEdit = !this.types[val].isEdit
      },
      more() {
        this.isMore = !this.isMore
        // this.$nextTick(() => {
          // const viewMore = document.getElementsByClassName("type-select-left")[this.fileType - 1]
          //
          // this.viewMoreHeight = viewMore.offsetHeight
          //
        // })
      },
      getElementHeight() {
        this.$nextTick(function() {
          const viewMore = document.getElementsByClassName("type-select-left")[this.fileType - 1]
          this.viewMoreHeight = viewMore.offsetHeight
          //
          if(this.viewMoreHeight > 37) {
            this.isMore = true
            this.muchMore = true
          } else if (this.viewMoreHeight == 30) {
            this.muchMore = true
          } else if (this.viewMoreHeight == 37) {
            this.muchMore = false
            this.isMore = false
          }
        })
      },
      // 更新列表数据
      updateList(val){
        //
        this.$emit('updateList', val)
      }
  }
}
</script>
<style lang="less" scoped>
  .type-select{
      display: flex;
      justify-content: space-between;
      // align-items: center;
      color: #999999;
      // font-family: Microsoft YaHei;
      // font-weight: regular;
      font-size: 12px;
      line-height: normal;
      letter-spacing: 0.2px;
      text-align: center;
      margin-top: 20px;
      overflow: hidden;
      max-height: 200px;
      overflow-y: scroll;
      transition: max-height 0.3s linear;
    }
    .type-select-left{
        display: flex;
        justify-content: start;
        align-items: center;
        flex-wrap: wrap;
        max-width: 800px;
      }
      .type-select-group{
        margin-right: 20px;
        border: 1px solid transparent;
        margin-bottom: 5px;
      }
      .type-select .type-select-item{
        padding: 5px 15px;
        margin-right: 14px;
        margin-bottom: 5px;
        border: 1px solid transparent;
        user-select: none;
        cursor: pointer;
        min-width: 80px;
      }
      .type-select .active{
        border-radius: 32px;
        background: #FFFFFF;
        border: 1px solid #368CFE;
        color: #368CFE;
      }
      .type-select-right{
        display: flex;
        justify-content: space-around;
        height: 37px;
        align-items: center;
        cursor: default;
        position: relative;
        font-size: 14px;
      }
      // .type-select-right span {
        // display: flex;
        // align-items: center;
        // font-size: 14px;
        // line-height: normal;
        // letter-spacing: 0.2px;
        // text-align: left;
      // }
      // .type-select-right img{
      //   width: 20px;
      //   height: 20px;
      //   margin-right: 8px;
      // }
      .popover-menu{
        width: 250px;
        position: absolute;
        z-index: 9999;
        text-align: center;
        background-color: #fff;
        border: 1px solid #ebeef5;
        font-size: 14px;
        padding: 12px;
        color: #606266
      }
      .more{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        color: #666;
        user-select: none;
      }
      .muchmore{
        max-height: 30px;
        overflow: hidden;
        transition: max-height 0.3s linear;
      }
      .popover-content{
        padding: 0 25px;
      }
      .popover-title{
        color: #333333;
        // font-family: Microsoft YaHei;
        // font-weight: regular;
        font-size: 14px;
        line-height: normal;
        letter-spacing: 0.75px;
        text-align: left;
        padding: 10px 0;
      }
      .popover-footer{
        text-align: center;
        padding: 10px 0;
      }
      .manage-sort{
        color: #999999;
      }
      /deep/ .dialog-myself .el-dialog .el-dialog__header{
        border-bottom: none;
      }
      /deep/ .el-dialog__body {
        padding: 10px 30px;
        max-height: 500px;
        overflow-y: scroll;
      }
      /deep/ .el-dialog__footer{
        text-align: center;
      }
      /deep/ .el-dialog__header{
        border-bottom: 1px solid #e5e5e5;
      }
      /deep/ .el-icon-circle-plus-outline:before{
        font-size: 20px;
      }
      /deep/ .el-icon-setting:before{
        font-size: 20px;
      }
      .button-add{
        color: #fe9636;
        margin-right:10px;
        display:flex;
        align-items: center;
      }
      .button-setting{
        margin-right:5px;
        color: #fe9636;
        display:flex;
        align-items: center;
      }
</style>
