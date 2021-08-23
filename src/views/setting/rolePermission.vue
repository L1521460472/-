<template>
  <div id="roleManagement" :style="{'height':innerHeight}" v-loading="loading"  element-loading-text="loading">
    <div class="title">角色权限</div>
    <div class="content">
      <div class="roleLeft">
        <div class="addRole headerBtnRight">
          <el-button class="addBtn" v-if="roleAddBtn" type="primary" size="small" @click="addRole">
            <i class="iconfont iconxinzeng"></i>
            新增角色
          </el-button>
        </div>
        <ul class="roleList">
          <li class="roleItem" @click="selectRoleAction(item,index)" :class="selectRole == index ? 'activeRole':''" v-for="(item,index) in roleList" :key="item.id">
            <span>{{ item.name }}</span>
            <div class="roleItem_icon" v-if="item.id != 1 && selectRole === index">
              <el-tooltip v-if="roleEditBtn" class="item" effect="dark" content="修改" placement="top">
                <img  src="../../assets/svg/edit_icon2.svg" @click="editRole(item)" />
              </el-tooltip>
              <el-tooltip v-if="roleDeleteBtn" class="item" effect="dark" content="删除" placement="top">
                <img  src="../../assets/svg/delete_icon2.svg" @click="deleteRole(item)"/>
              </el-tooltip>

              <!-- <img v-if="roleEditBtn" src="../../assets/images/edit_icon2.svg" @click="editRole(item)" />
              <img v-if="roleDeleteBtn" src="../../assets/images/delete_icon2.svg" @click="deleteRole(item)"/> -->
            </div>
          </li>
        </ul>
      </div>
      <div class="roleRight">
        <div class="header">
          <div class="title2">功能权限</div>
          <div class="headerBtn headerBtnRight">
            <el-button v-if="copyBtn"  type="primary" size="small" @click="copyRole">
              <i class="iconfont iconfuzhi"></i>
              复制权限并新建角色
            </el-button>
            <el-button class="iconBtn" size="small" @click="resetRole" v-if="showRevertFlag && revertBtn">
              <i class="iconfont iconhuanyuan1"></i>
              还原权限
            </el-button>
          </div>
        </div>
        <div class="tip">角色用来控制账号可以查看和使用哪些功能模块和数据。设置完成后请在【账号列表】中为各个账号分配角色</div>
        <el-tree
          :data="treeData"
          show-checkbox
          node-key="id"
          :default-expand-all="true"
          :props="defaultProps"
          :expand-on-click-node="false"
          :default-checked-keys="checkedList"
          ref="tree"
          getCheckedNodes
        >
        </el-tree>
        <el-button v-if="authorityEditBtn" class="confirmJurisdiction" type="primary" size="small" @click="confirmJurisdiction">确定权限</el-button>
      </div>
    </div>
    <!-- 新建或编辑角色 -->
    <el-dialog
      :title="addRoleTitle"
      :visible.sync="addRoleToast"
      :close-on-click-modal="false"
      :before-close="closeToast"
      width="450px"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="70px"
        label-position="right"
      >
        <el-form-item prop="roleName" label="名称：">
          <el-input size="small" v-model="form.roleName"></el-input>
        </el-form-item>
        <el-form-item prop="roleDescribe" label="描述：">
          <el-input
            type="textarea"
            placeholder="请输入描述"
            maxlength="100"
            style="width: 260px"
            :autosize="{ minRows: 8, maxRows: 10 }"
            show-word-limit
            v-model="form.roleDescribe"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="confirmAddRole" v-if="addRoleTitle === '新建角色'" :disabled="isSubmit">提 交</el-button>
        <el-button type="primary" size="small" @click="confirmEditRole" v-if="addRoleTitle === '编辑角色'">提 交</el-button>
        <el-button @click="closeToast" size="small">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {getRoleData,addRole,editRole,deleteRole,getRoleAuthorityList,copyRole,editRoleAuthority,revertRoleAuthority} from '@/api/setting/api'
import { getCookie,regexpName,getButtonList } from "@/public";
export default {
  name: "roleManagement",
  props:{
    authorityBttonList:{
      type:Array
    }
  },
  data() {
    // 校验角色名称规则
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("名称不能为空"));
      } else if ( value.length > 12) {
        callback(new Error("名称长度为不超过12位"));
      } else if (!regexpName(value)) {
        callback(new Error("名称由中文或字母组成"));
      } else {
        callback();
      }
    };
    return {
      loading:false,
      // 角色列表
      roleList: [],
      //  权限树
      treeData: [],
      // 设置权限树对应lable及key
      defaultProps: {
        children: "children",
        label: "name",
      },
      // 新建角色弹窗
      addRoleToast: false,
      // 弹窗表单数据
      form: {
        id:null,
        type:'',//区别复制新增编辑
        roleName: "", //名称
        roleDescribe: "", //描述
      },
      rules: {
        roleName: [{ required: true, validator: validateName, trigger: "blur" },],
      },
      checkedList:[],//默认选中的节点
      showRevertFlag:false,//是否显示还原按钮
      addRoleTitle: "",
      selectRole:0,//选择的角色序号
      selectRoleId:null,//选中的角色Id
      selectRoleData:{},//选中的角色数据
      roleAddBtn:false,//角色新增按钮
      roleEditBtn:false,//角色编辑按钮
      roleDeleteBtn:false,//角色删除按钮
      copyBtn:false,//复制并新建角色按钮
      revertBtn:false,//还原权限按钮
      authorityEditBtn:false,//确定权限分配按钮
      innerHeight:window.innerHeight-100 + 'px',
      timer: null,
      isSubmit:false,//是否禁用提交按钮
      headers : {Authorization:getCookie('enterprisePass')}
    };
  },
  methods: {
    // 获取角色列表
    getRoleList(){
      getRoleData().then(res=>{
        if(res.data.status == 0){
          this.roleList = res.data.data
          this.selectRoleId = res.data.data[0].id
          this.getAuthorityList()
        }else{
          this.$message({
            message:res.data.message,
            center:true,
            type:res.data.status === 2 ? 'warning':'error'
          })
        }
      }).catch(err=>{
        this.$message.error({
          message:err,
          center:true
        })
      })
    },
    // 获取角色对应权限树
    getAuthorityList(){
      this.loading = true
      let roleId = {roleId:this.selectRoleId}
      getRoleAuthorityList(roleId).then(res=>{
        this.loading = false
        if(res.data.status == 0){
          this.treeData = res.data.data.treeNodeList
          this.showRevertFlag = res.data.data.showRevertFlag
          this.checkedList = []
          res.data.data.treeNodeList.map(item=>{
            if(item.check){
              this.checkedList.push(item.id)
            }
            item.children.map(item2=>{
              if(item2.check){
                this.checkedList.push(item2.id)
              }
              item2.children.map(item3=>{
                if(item3.check){
                  this.checkedList.push(item3.id)
                }
              })
            })
          })
        }else{
          this.$message({
            message:res.data.message,
            center:true,
            type:res.data.status === 2 ? 'warning':'error'
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
    // 选择角色
    selectRoleAction(role,index){
      this.selectRole = index
      this.selectRoleId = role.id
      this.getAuthorityList()
      this.selectRoleData =  Object.assign({}, role);
    },
    // 新增角色
    addRole() {
      // 权限置空
      this.addRoleTitle = "新建角色";
      this.form.id = null,
      this.form.type = 'add',
      this.form.roleName = "";
      this.form.roleDescribe = "";
      this.addRoleToast = true;
    },
    // 编辑角色
    editRole(item) {
      this.addRoleTitle = "编辑角色";
      this.form.id = item.id
      this.form.type = 'edit',
      this.form.roleName = item.name
      this.form.roleDescribe = item.description
      this.addRoleToast = true;
    },
    // 新增/复制角色确认
    confirmAddRole(){
      this.$refs.form.validate((valid) => {
        if(valid){
          if (this.timer) {
            clearTimeout(this.timer);
          }
          let _this = this
          _this.isSubmit = true
          this.timer = setTimeout(function () {
          _this.timer = null;
          if(_this.form.type === 'add'){
            let params = {
              description: _this.form.roleDescribe,
              name: _this.form.roleName
            }
            addRole(params).then(res=>{
              _this.isSubmit = false
              if(res.data.status == 0){
                _this.$message.success({
                  message:'角色新增成功',
                  center:true
                })
                _this.getRoleList()
                _this.closeToast()
              }else{
                _this.$message({
                  message:res.data.message,
                  center:true,
                  type:res.data.status === 2 ? 'warning':'error'
                })
              }
            }).catch(err=>{
              _this.isSubmit = false
              this.$message.error({
                message:err,
                center:true
              })
            })
          }else if(_this.form.type === 'copy'){
            let params = {
              id:_this.selectRoleId,
              description: _this.form.roleDescribe,
              name: _this.form.roleName
            }
            copyRole(params).then(res=>{
              _this.isSubmit = false
              if(res.data.status == 0){
                _this.$message.success({
                  message:'角色复制并新增成功',
                  center:true
                })
                _this.getRoleList()
                _this.closeToast()
              }else{
                _this.$message({
                  message:res.data.message,
                  center:true,
                  type:res.data.status === 2 ? 'warning':'error'
                })
              }
            }).catch(err=>{
              _this.isSubmit = false
              this.$message.error({
                message:err,
                center:true
              })
            })
          }
          }, 500);
        }
      });
    },
    // 编辑角色确认
    confirmEditRole(){
      this.$refs.form.validate((valid) => {
        if(valid){
          let params = {
            id:this.form.id,
            description: this.form.roleDescribe,
            name: this.form.roleName
          }
          editRole(params).then(res=>{
            if(res.data.status == 0){
              this.$message.success({
                message:'角色修改成功',
                center:true
              })
              this.getRoleList()
              this.closeToast()
            }else{
              this.$message({
                message:res.data.message,
                center:true,
                type:res.data.status === 2 ? 'warning':'error'
              })
            }
          }).catch(err=>{
            this.$message.error({
              message:err,
              center:true
            })
          })
        }

      });
    },
    // 删除角色
    deleteRole(item) {
      this.$confirm("确认要删除此角色？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        closeOnClickModal:false,
        center:true
      })
        .then(() => {
          let params = {id:item.id}
          deleteRole(params).then(res=>{
            if(res.data.status == 0){
              this.$message.success({
                message:'角色删除成功',
                center:true
              })
              this.getRoleList()
            }else{
              this.$message({
                message:res.data.message,
                center:true,
                type:res.data.status === 2 ? 'warning':'error'
              })
            }
          }).catch(err=>{
            this.$message.error({
              message:err,
              center:true
            })
          })
        })
        .catch(() => {

        });
    },
    // 复制权限并新建角色
    copyRole() {
      //先复制权限
      this.addRoleTitle = "新建角色";
      this.form.id = null;
      this.form.type = 'copy',
      this.form.roleName = "";
      this.form.roleDescribe = "";
      this.addRoleToast = true;
    },
    // 还原设置
    resetRole() {
      if(this.selectRoleId === 1 ){
        this.$message.warning({
          message:'当前所选角色为管理员，不能还原其权限！',
          center:true
        })
        return
      }
      this.$confirm("确认还原该角色权限吗？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        closeOnClickModal:false,
        center:true
      })
        .then(() => {
          revertRoleAuthority({id:this.selectRoleId}).then(res=>{
            if(res.data.status == 0){
              this.$message.success({
                message:'权限还原成功',
                center:true
              })
              this.getAuthorityList()
            }else{
              this.$message({
                message:res.data.message,
                center:true,
                type:res.data.status === 2 ? 'warning':'error'
              })
            }
          }).catch(err=>{
            this.$message.error({
              message:err,
              center:true
            })
          })
        })
        .catch(() => {

        });
    },
    // 确定分配的权限
    confirmJurisdiction(){
      if(this.selectRoleId === 1 ){
        this.$message.warning({
          message:'当前所选角色为管理员，不能编辑其权限！',
          center:true
        })
        return
      }
      let checkNodes = this.$refs.tree.getCheckedNodes()
      let authorityList = []
      checkNodes.map(item=>{
        let obj ={}
        obj.id = item.id
        obj.parentId = item.parentId
        obj.type = item.type
        authorityList.push(obj)
      })
      let params = {
        authorityList:authorityList,
        id: this.selectRoleId
      }
      editRoleAuthority(params).then(res=>{
        if(res.data.status == 0){
          this.$message.success({
            message:'权限分配成功',
            center:true
          })
          this.getAuthorityList()
        }else{
          this.$message({
            message:res.data.message,
            center:true,
            type:res.data.status === 2 ? 'warning':'error'
          })
        }
      }).catch(err=>{
        this.$message.error({
          message:err,
          center:true
        })
      })
    },
    // 关闭弹窗前的回调，清空表单验证规则
    closeToast(){
      this.$nextTick(()=>{
        this.$refs.form.resetFields();
         this.addRoleToast = false;
      })
    }
  },
  watch: {
    authorityBttonList:{
      handler(data) {
        let btns = getButtonList(data,'/rolePermission')

        if(btns){
          btns.map(item=>{
            if(item.code == "roleAdd") this.roleAddBtn = true
            if(item.code == "roleUpdate") this.roleEditBtn = true
            if(item.code == "roleDelete") this.roleDeleteBtn = true
            if(item.code == "authorityCopyAndAdd") this.copyBtn = true
            if(item.code == "authorityRevert") this.revertBtn = true
            if(item.code == "authorityUpdate") this.authorityEditBtn = true
          })
        }
      },
      immediate: true,
      deep: true,
    }
  },
  mounted() {
    this.getRoleList()
      // this.selectRoleData =  Object.assign({}, this.roleList[0]);
  },
};
</script>

<style lang="less" scoped>
#roleManagement {
  width: 100%;
  height: 100%;
  color: #333;
  letter-spacing: 0.75px;
  // overflow-y: auto;
  // overflow-x: hidden;
  .title {
    width: 100%;
    height: 96px;
    line-height: 96px;
    padding-left: 70px;
    box-sizing: border-box;
    font-size: 20px;
  }
  .content {
    width: 100%;
    height: calc(100% - 96px);
    display: flex;
    .roleLeft {
      width: 275px;
      min-height: 100%;
      // float: left;
      // padding: 0 20px;
      box-sizing: border-box;
      border-right: 1px solid #e5e5e5;
      .addRole {
        text-align: center;
        // padding-top: 60px;
        margin-bottom: 30px;
      }
      .roleList {
        padding-left: 0;
        height: calc(100% - 65px);
        overflow-y: auto;
        // overflow-x: hidden;
        .roleItem {
          cursor: pointer;
          width: 236px;
          height: 34px;
          margin:  0 20px 16px;
          box-sizing: border-box;
          font-size: 14px;
          line-height: 34px;
          // margin-bottom: 35px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            margin-left: 64px;
          }
          .roleItem_icon {
            display: flex;
            align-items: center;
            img {
              width: 18px;
              height: 18px;
              display: block;
              margin-right: 12px;
              cursor: pointer;
            }
          }
        }
        .activeRole{
          background-color: #f8f8fb;
        }
      }
    }
    .roleRight {
      // float: left;
      width: calc(100% - 275px);
      height: 100%;
      padding: 0 46px;
      box-sizing: border-box;
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .headerBtn{
          display: flex;
          align-items: center;
          .iconBtn.el-button{
            color: #368CFE;
            border-radius: 4px;
            border: 1px solid rgba(54,140,254,0.5);
          }
          .iconBtn.el-button:hover{
            color: #368CFE !important;
            border-radius: 4px;
            border: 1px solid rgba(54,140,254,0.5);
            background-color:  #ecf5ff !important;
          }
          .iconBtn.el-button:focus{
            background-color:#fff;
          }
          // .iconBtn.el-button:hover{
          //   color: #C0C4CC !important;
          // }
          // .iconBtn.active{
          //   color: #368CFE !important;
          //   border-radius: 4px;
          //   border: 1px solid rgba(54,140,254,0.5);
          // }
          // .iconBtn.active:hover{
          //   color: #368CFE !important;
          //   border-radius: 4px;
          //   border: 1px solid rgba(54,140,254,0.5);
          // }
        }
      }
      .tip {
        color: #999999;
        font-size: 12px;
        margin-top: 32px;
        margin-bottom: 20px;
      }
      .el-tree{
        background-color: #F8F8FB !important;
        height: calc(100% - 174px);
        overflow: auto;
        padding-left: 20px;
        padding-top: 20px;
        box-sizing: border-box;
        color: #333;
        /deep/.el-tree-node__children{
        color: #666;
        }
      }
      .confirmJurisdiction{
        margin-top: 20px;
        margin-left: 30px;
      }
    }
  }
}
#roleManagement /deep/ .el-dialog__footer {
  text-align: center ;
}
.el-input {
  width: 260px;
}
#roleManagement /deep/ .el-dialog__body {
  padding: 20px 50px 10px;
}
#roleManagement /deep/ .el-tree-node__content {
  height: 34px;
}
// 更改tree组件icon
.el-tree /deep/ .el-tree-node__expand-icon.expanded{
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
}
//有子节点 且未展开
.el-tree /deep/ .el-icon-caret-right:before{
    background: url("../../assets/svg/fold_icon.svg") no-repeat 0 0;
    content: '';
    display: block;
    width: 14px;
    height: 14px;
    font-size: 14px;
    background-size: 14px;
}
//有子节点 且已展开
.el-tree /deep/ .el-tree-node__expand-icon.expanded.el-icon-caret-right:before{
    background: url("../../assets/svg/unfold_icon.svg") no-repeat 0 0;
    content: '';
    display: block;
    width: 14px;
    height: 14px;
    font-size: 14px;
    background-size: 14px;
}
.el-tree /deep/.el-tree-node__expand-icon.is-leaf::before{
    display: none;
}

</style>

