<template>
  <div id="accountManagement" v-loading="loading"  element-loading-text="loading">
    <div class="title">账号管理</div>
    <div class="container" >
      <div class="accountLeft" :style="{'height':tableHeight - (-114) +'px'}" >
        <div class="addCompany" v-if="isShowAddComapnyBtn">
          <el-button class="addBtn" v-if="deptAddBtn" type="primary" size="small" @click="addCompany">
            <i class="iconfont iconxinzeng"></i>
            新增部门
          </el-button>
        </div>
        <el-tree
          :data="treeData"
          node-key="id"
          highlight-current
          :props="defaultProps"
          @node-click="getDefaultNode"
          :current-node-key="selectTreeId"
          default-expand-all
          :expand-on-click-node="false"
        >
          <div class="custom-tree-node1" :class="selectTreeId===data.id ? 'is-current':''" slot-scope="{ node, data }">
            <div class="node_label">{{ node.label }}</div>
            <div class="icon_box" v-if="selectTreeId === data.id">
              <el-tooltip v-if="deptAddBtn" class="item" effect="dark" content="新增" placement="top">
                <img @click="addDepartment(node,data)"  class="icon" src="../../assets/svg/increase_icon.svg"  />
              </el-tooltip>
              <el-tooltip v-if=" deptUpdateBtn" class="item" effect="dark" content="修改" placement="top">
                <img @click="editDepartment(node,data)"  class="icon" src="../../assets/svg/edit_icon2.svg"   />
              </el-tooltip>
              <el-tooltip v-if="topTreeId !== data.id && deptDeleteBtn" class="item" effect="dark" content="删除" placement="top">
                <img @click="deleteDepartment(node,data)"  class="icon" src="../../assets/svg/delete_icon2.svg"  />
              </el-tooltip>

              <!-- <img @click="addDepartment(node,data)" v-if="deptAddBtn" class="icon" src="../../assets/images/increase_icon.svg"  />
              <img @click="editDepartment(node,data)" v-if="topTreeId !== data.id && deptUpdateBtn" class="icon" src="../../assets/images/edit_icon2.svg"   />
              <img @click="deleteDepartment(node,data)" v-if="topTreeId !== data.id && deptDeleteBtn" class="icon" src="../../assets/images/delete_icon2.svg"  /> -->
            </div>
          </div>
        </el-tree>
      </div>
      <div class="accountRight">
        <div class="headerBtn">
          <div class="headerBtnLeft">
            <el-button class="addBtn" type="primary" size="small"  @click="refresh">
              <i class="iconfont iconshuaxin"></i>
            </el-button>
            <el-button class="addBtn" type="primary" size="small"  @click="reset">
              <i class="iconfont iconguanbi"></i>
            </el-button>
            <el-select v-model="roleId" ref="searchSelect" @change="changeRole"  @visible-change="isShowSelectOptions" clearable size="small" placeholder="角色">
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-input v-model="searchCont" size="small" maxlength="50" placeholder="账号或姓名">
              <i @click="searchAction" slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <div class="headerBtnRight">
            <el-button v-if="accountAddBtn"  type="primary" size="small" @click="accountAddAction">
              <i class="iconfont iconxinzeng"></i>
              新建
            </el-button>
            <el-button v-if="accountDisableBtn" class="iconBtn"  :class="{ 'active': !isDisable }" size="small" :disabled="isDisable" @click="stopUseAction()" >
              <i class="iconfont icontingyong"></i>
              停用
            </el-button>
            <el-button v-if="accountEnableBtn" class="iconBtn"  :class="{ 'active': !isDisable }" size="small" :disabled="isDisable" @click="startUseAction()" >
              <i class="iconfont iconzhuanweiqiyong"></i>
              启用
            </el-button>
            <el-button  class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" size="small" v-if="unlockBtn"  @click="unlock">
              <i class="iconfont iconzu"></i>
              解锁
            </el-button>
            <el-button v-if="accountDeleteBtn" class="iconBtn"  :class="{ 'active': !isDisable }" size="small" :disabled="isDisable" @click="accountDeleteAction(1,selectDeleteData)" >
              <i class="iconfont iconshanchu"></i>
              删除
            </el-button>
          </div>
        </div>
        <el-table
            border
            :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
            size="small"
            :data="tableData"
            @selection-change="handleSelectionChange"
            :height="tableHeight"
            style="width: 100%; height: 100%;color:#333"
          >
            <el-table-column type="selection" align="center" width="60"></el-table-column>
            <el-table-column prop="account" label="账号" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="userName" label="姓名" width="90" show-overflow-tooltip></el-table-column>
            <el-table-column prop="roleName" label="角色" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="departmentName" label="部门" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="email" label="邮箱" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="mobile" label="手机号码" width="120" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop="userExpandNumber" label="用户扩展码" width="130" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="accountStatusStr" label="状态" width="100" show-overflow-tooltip>
              <!-- <template slot-scope="scope">
                <span>{{scope.row.accountStatus == 0 ? '正常':'停用'}}</span>
              </template> -->
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column fixed="right" label="操作" min-width="180" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="accountEditBtn" class="operation" @click="accountEditAction(scope.row)">修改</span>
                <span v-if="resetPasswordBtn" class="operation" @click="resetPassword(scope.row)">重置密码</span>
                <span v-if="scope.row.roleId !== 1 && accountDeleteBtn" class="operation" @click="accountDeleteAction(2,scope.row)">删除</span>
                <!-- <el-tooltip v-if="accountEditBtn" class="item" effect="dark" content="修改" placement="top">
                  <img class="operation"  @click="accountEditAction(scope.row)" src="../../assets/svg/edit_icon.svg">
                </el-tooltip>
                <el-tooltip v-if="resetPasswordBtn"  class="item" effect="dark" content="密码重置" placement="top">
                  <img class="operation" @click="resetPassword(scope.row)" src="../../assets/svg/resetPassword.svg" >
                </el-tooltip>
                <el-tooltip v-if="scope.row.roleId !== 1 && accountDeleteBtn" class="item" effect="dark" content="删除" placement="top">
                  <img class="operation"  @click="accountDeleteAction(2,scope.row)"  src="../../assets/svg/delete_icon.svg">
                </el-tooltip> -->
              </template>
            </el-table-column>
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
    </div>
    <!-- 新增/编辑部门 -->
    <el-drawer
      :title="departmentDrawerTitle"
      :visible.sync="departmentDrawer"
      :before-close="closeDepartmentDrawer"
      :wrapperClosable="false"
      size="460px"
      direction="rtl">
      <el-form
        class="drawerContent"
        ref="departmentForm"
        :model="departmentForm"
        :rules="departmentRules"
        label-width="100px"
        label-position="right"
      >
        <el-form-item prop="departmentName" label="部门名称：">
          <el-input size="small" v-model="departmentForm.departmentName"></el-input>
        </el-form-item>
        <el-form-item prop="parmentDepartment" label="上级部门：">
          <span>{{departmentForm.parmentDepartment}}</span>
        </el-form-item>
        <el-form-item prop="departmentDescribe" label="部门描述：">
          <el-input
            type="textarea"
            placeholder="请输入部门描述"
            maxlength="20"
            style="width: 260px"
            :autosize="{ minRows: 8, maxRows: 10 }"
            show-word-limit
            v-model="departmentForm.departmentDescribe"
          ></el-input>
        </el-form-item>
        <el-form-item prop="parmentDepartment" label="">
            <el-button  type="primary" size="small" v-if="departmentDrawerTitle === '新建子部门'" @click="confirmAddDeparment" :disabled="isSubmit">确 定</el-button>
            <el-button  type="primary" size="small" v-if="departmentDrawerTitle === '编辑部门'" @click="confirmEditDeparment">确 定</el-button>
            <el-button  size="small" @click="closeDepartmentDrawer">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <!-- 新增/编辑账号 -->
    <el-drawer
      :title="accountDrawerTitle"
      :visible.sync="accountDrawer"
      :before-close="closeAccountDrawer"
      :modal-append-to-body="true"
      :wrapperClosable="false"
      size="500px"
      direction="rtl">
      <el-form
        class="drawerContent"
        ref="accountForm"
        :model="accountForm"
        :rules="accountRules"
        label-width="110px"
        label-position="right"
      >
        <el-form-item prop="account" label="账号：">
          <el-input size="small" v-model="accountForm.account" :disabled="disabledAccount"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名：">
          <el-input size="small" v-model="accountForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="roleId" label="角色：">
          <el-select v-if="accountForm.roleId !== 1 " v-model="accountForm.roleId" clearable size="small" placeholder="请选择角色">
            <el-option
              v-for="item in roleList2"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-select v-else v-model="accountForm.roleId" disabled clearable size="small" placeholder="请选择角色">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="phone" label="联系电话：">
          <el-input size="small" v-model="accountForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱：">
          <el-input size="small" v-model="accountForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="departmentId" label="部门：">
          <el-cascader
              placeholder=""
              v-model="accountForm.departmentId"
              :options="treeData"
              size="small"
              :props="defaultParams"
              :show-all-levels="false"
              clearCheckedNodes
              clearable
              ref="cascaderHandle"
              @change="closeDepartment"
          ></el-cascader>
        </el-form-item>
        <!-- <el-form-item prop="app" label="应用权限：">
          <el-select
            size="small"
            v-model="accountForm.app"
            multiple
            collapse-tags
            placeholder="请选择应用">
            <el-option
              v-for="item in appList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="extendedCode" label="用户扩展码：">
          <el-input size="small" maxlength="10" show-word-limit v-model="accountForm.extendedCode" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
        </el-form-item> -->
        <el-form-item prop="password" label="密码：" v-if="accountDrawerTitle === '新增账号'">
          <el-input size="small" type="password" v-model="accountForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="password2" label="确认密码：" v-if="accountDrawerTitle === '新增账号'">
          <el-input size="small" type="password" v-model="accountForm.password2"></el-input>
        </el-form-item>
        <el-form-item prop="parmentDepartment" label="">
            <el-button  type="primary" size="small" v-if="accountDrawerTitle === '新增账号'" @click="confirmAddAccount" :disabled="isSubmit">确 定</el-button>
            <el-button  type="primary" size="small" v-if="accountDrawerTitle === '修改账号'" @click="confirmEditAccount">确 定</el-button>
            <el-button  size="small" @click="closeAccountDrawer">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <!-- 重置密码 -->
    <el-dialog
      title="重置密码"
      class="resetPassword"
      :visible.sync="resetToast"
      :close-on-click-modal="false"
      :before-close="closeResetToast"
      width="460px"
    >
      <el-form
        ref="resetPasswordForm"
        :model="resetPasswordForm"
        :rules="resetPasswordRules"
        label-width="100px"
        label-position="right"
      >
        <el-form-item prop="account" label="账号：">
          <el-input disabled size="small" v-model="resetPasswordForm.account"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="新密码：">
          <el-input size="small" type="password" v-model="resetPasswordForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="password2" label="确认密码：">
          <el-input size="small" type="password" v-model="resetPasswordForm.password2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="confirmResetPassword" >确 认</el-button>
        <el-button @click="closeResetToast" size="small">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import bcryptjs from "bcryptjs";
import JSEncrypt from "jsencrypt"
import md5 from 'js-md5'
import {getDepartmentTree,addDepartment,editDepartment,deleteDepartment,getAccountList,getRoleList,addAccount,editAccount,stopUseAccount ,startUseAccount,deleteAccount,resetPassword,unlockAccount,getCheckedStatus,getAppList} from '@/api/setting/api'
import { getCookie,regexpPassword ,regexpAccount,regexpName,getButtonList, regexpPhone} from "@/public";
export default {
  name: "accountManagement",
  props:{
    authorityBttonList:{
      type:Array
    }
  },
  data() {
    // 账号验证规则
    var validateAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("账号不能为空"));
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error("账号长度为6-20位"));
      } else if (!regexpAccount(value)) {
        callback(new Error("账号必须有数字和小写字母组成"));
      } else {
        callback();
      }
    };
    // 密码验证规则
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (value.length < 8 || value.length > 12) {
        callback(new Error("密码长度为8-12位"));
      } else if (!regexpPassword(value)) {
        callback(new Error("密码必须有数字和字母组成"));
      } else {
        callback();
      }
    };
    // 确认密码验证规则
    var validatePassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("确认密码不能为空"));
      } else if (value !== this.accountForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    // 重置密码的确认密码校验
    var validatePassword3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("确认密码不能为空"));
      } else if (value !== this.resetPasswordForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    // 账号名字校验
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
      currentPage: 1, //当前页数
      pageSize: 10, //每页长度
      total: 0, //数据总条数
      treeData: [],//部门树
      defaultProps: {
        children: "children",
        label: "name",
      },
      topTreeId:0,
      selectTreeId:null,//选中的企业树的id
      roleId:null,//角色
      // 角色列表
      roleList:[],//角色列表查询时用
      roleList2:[],//过滤管理员后的角色列表（新增修改账号时用）
      searchCont:null,//搜索内容
      tableData:[],
      departmentDrawer:false,//是否显示新增部门或者编辑部门抽屉
      accountDrawer:false,//是否显示新增账号或者编辑账号抽屉
      departmentDrawerTitle:'',//新增或编辑部门标题
      accountDrawerTitle:'',//新增或编辑账号标题
      departmentForm:{
        id:'',
        departmentName:'',//部门名称
        parmentDepartment:'',//上级部门
        parentId:'',//上级部门id
        departmentDescribe:'',//部门描述
      },//部门表单数据
      accountForm:{
        id:null,
        account:'', //账号
        name: '', //姓名
        roleId: '',//角色
        phone: '',//联系电话
        email: '',//邮箱
        departmentId:'' ,//部门
        // app:null,
        // extendedCode:null,//用户扩展码
        password: '',//密码
        password2:'',//确认密码
      },//账号表单数据
      departmentRules: {
        departmentName: [
          { required: true, validator: validateName, trigger: "blur" },
          // { max: 12, message: "部门名称不超过12个字", trigger: "blur" },
        ],
      },//部门表单验证规则
      accountRules: {
        account:[{ required: true,validator: validateAccount, trigger: "blur" }],
        name:[{ required: true,validator: validateName, trigger: "blur" }],
        roleId:[{ required: true, message: "角色不能为空", trigger: "blur" }],
        email:[{ type: 'email', message: '邮箱格式不正确', trigger: "blur"}],
        // app:[{ required: true, message: '应用权限不能为空', trigger: "blur"}],
        password:[{ required: true,validator: validatePassword, trigger: "blur" }],
        password2:[{ required: true,validator: validatePassword2, trigger: "blur" }]
      },//账号表单验证规则
      appList:[],//权限应用列表
      selectedApp:[],//被选中的中的权限应用列表
      resetToast:false,//是否显示重置密码弹窗
      resetPasswordForm:{
        id:null,
        account:null,
        password:'',
        password2:''
      },//重置密码表单
      resetPasswordRules:{
        password:[{ required: true,validator: validatePassword, trigger: "blur" }],
        password2:[{ required: true,validator: validatePassword3, trigger: "blur" }]
      },//重置密码表单规则验证
      defaultParams: {
        label: "name",
        value: "id",
        children: "children",
        checkStrictly: true, //可以选父节点
        emitPath: false, //是否返回由该节点所在的各级菜单的值所组成的数组,设置 false，则只返回该节点的值
      },
      departmentList:[],//部门列表
      selectDeleteData:[],//选中要删除的数据
      isDisable:true,//是否禁用头部修改删除按钮
      disabledAccount:false,//是否禁用账号输入框
      deptAddBtn:false,//部门新增按钮
      deptUpdateBtn:false,//部门修改按钮
      deptDeleteBtn:false,//部门删除按钮
      accountAddBtn:false,//账号新增按钮
      accountEditBtn:false,//账号修改按钮
      accountDeleteBtn:false,//账号删除按钮
      accountDisableBtn:false,//账号停用按钮
      accountEnableBtn:false,//账号启用按钮
      unlockBtn:false,//解锁按钮
      resetPasswordBtn:false,//重置密码按钮
      isShowAddComapnyBtn:false,
      isDepart:false,//是否有部门
      isRole:false,//是否有角色
      timer: null,
      isSubmit:false,//是否禁用提交按钮
      tableHeight:window.innerHeight - 310 +'',
    };
  },
  methods: {
    // 获取用户部门树
    getTreeList(){
      getDepartmentTree().then(res=>{
        if(res.data.status == 0){
          if(res.data.data.length>0){
            this.isDepart = true
          }
          this.treeData = this.getTreeData(res.data.data)
          // this.selectTreeId  = this.topTreeId= res.data[0].id
          this.isShowAddComapnyBtn = res.data.data.length > 0 ? false:true
          this.topTreeId= res.data.data[0] ? res.data.data[0].id :null
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
    // 获取页面表格数据
    getDataList(){
      this.loading = true
      let params = {
        deptId: this.selectTreeId,
        name: this.searchCont,
        roleId: this.roleId,
        pageSize: this.pageSize,
        currentPage: this.currentPage,
      }
      getAccountList(params).then(res=>{
        this.loading = false
        if(res.data.status == 0){
          this.tableData = res.data.data.records
          this.total = res.data.data.total
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
    // 获取选中企业id
    getDefaultNode(node){
      this.selectTreeId = node.id
      this.currentPage = 1
      this.pageSize = 10
      this.getDataList()
    },
    // 刷新
    refresh(){
      this.getDataList()
    },
    // 重置清空
    reset(){
      this.roleId = null
      this.searchCont = null
      this.selectTreeId = null
      this.currentPage = 1
      this.pageSize = 10
      this.getDataList()
      this.getTreeList()
    },
    // 查询
    searchAction(){
      this.currentPage = 1
      this.getDataList()
    },
    // 切换角色
    changeRole(){
      this.searchAction()
    },
    // 回车查询
    keyDown(e) {
      if (e.keyCode == 13) {
        this.searchAction();
      }
    },
    // 初始时新建公司
    addCompany(){
      this.departmentDrawerTitle = '新建子部门'
      this.departmentForm.departmentName = ''
      this.departmentForm.id = ''
      this.departmentForm.parmentDepartment = ''
      this.departmentForm.parentId = ''
      this.departmentForm.departmentDescribe = ''
      this.departmentDrawer = true
    },
    // 新增部门
    addDepartment(node,departmentData){
      this.departmentDrawerTitle = '新建子部门'
      this.departmentForm.departmentName = ''
      this.departmentForm.id = ''
      this.departmentForm.parmentDepartment = departmentData.name
      this.departmentForm.parentId = departmentData.id
      this.departmentForm.departmentDescribe = ''
      this.departmentDrawer = true
    },
    // 新增部门确认
    confirmAddDeparment(){
      this.$refs.departmentForm.validate((valid) => {
        if(valid){
          if (this.timer) {
            clearTimeout(this.timer);
          }
          let _this = this
          _this.isSubmit = true
          this.timer = setTimeout(function () {
            _this.timer = null;
            let params ={
              name:_this.departmentForm.departmentName,
              parentId:_this.departmentForm.parentId,
              description:_this.departmentForm.departmentDescribe,
            }
            addDepartment(params).then(res=>{
              _this.isSubmit = false
              if(res.data.status == 0){
                _this.$message.success({
                  message:'子部门新建成功',
                  center:true
                })
                _this.getTreeList()
                _this.closeDepartmentDrawer()
              }else{
                _this.$message({
                  message:res.data.message,
                  center:true,
                  type:res.data.status === 2 ? 'warning':'error'
                })
              }
            }).catch(err=>{
              _this.isSubmit = false
              _this.$message.error({
                message:err,
                center:true
              })
            })
          }, 500);
        }
      });
    },
    // 编辑部门
    editDepartment(node,departmentData){
      this.departmentDrawerTitle = '编辑部门'
      this.departmentForm.departmentName = departmentData.name
      this.departmentForm.id = departmentData.id
      this.departmentForm.parmentDepartment = node.parent.data.name
      this.departmentForm.parentId = node.parent.data.id
      this.departmentForm.departmentDescribe = departmentData.extendData
      this.departmentDrawer = true
    },
    // 编辑部门确认
    confirmEditDeparment(){
      this.$refs.departmentForm.validate((valid) => {
        if(valid){
          let params ={
            id:this.departmentForm.id,
            name:this.departmentForm.departmentName,
            parentId:this.departmentForm.parentId,
            description:this.departmentForm.departmentDescribe,
          }
          editDepartment(params).then(res=>{
            if(res.data.status == 0){
              this.$message.success({
                message:'编辑部门成功',
                center:true
              })
              this.getTreeList()
              this.closeDepartmentDrawer()
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
    // 删除部门
    deleteDepartment(node,departmentData){
      this.$confirm("确认删除所选部门吗？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        closeOnClickModal:false,
        center:true
      })
        .then(() => {
          let params = {id:departmentData.id}
          deleteDepartment(params).then(res=>{
            if(res.data.status == 0){
              this.$message.success({
                message:'部门删除成功',
                center:true
              })
              this.selectTreeId =null
              this.getTreeList()
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
    // 新增修改账户时获取应用列表
    getAppListData(type,accountId){
      getAppList({accountId:accountId}).then(res=>{
        if(res.data.status == 0){
          this.appList = res.data.data.app
          if(type === 1){
            this.accountForm.app = null
          }else if(type === 2){
            this.accountForm.app = res.data.data.selectedAppId
          }
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
    // 新增账号
    accountAddAction(){
      getCheckedStatus().then(res=>{
        if(res.data.status == 0){
          if(res.data.data === 1){
            this.accountDrawerTitle = '新增账号'
            this.disabledAccount = false
            this.accountForm.id = null,
            this.accountForm.account = '',
            this.accountForm.name =  '',
            this.accountForm.roleId =  '',
            this.accountForm.phone =  '',
            this.accountForm.email =  '',
            this.accountForm.departmentId = this.selectTreeId,
            // this.accountForm.app = null,
            // this.accountForm.extendedCode = null,
            this.accountForm.password =  '',
            this.accountForm.password2 = ''
            if(!this.isDepart){
              this.$message.warning({
                message:'请先创建部门',
                center:true
              })
              return
            }
            if(!this.isRole){
              this.$message.warning({
                message:'请先创建角色',
                center:true
              })
              return
            }
            this.getAppListData(1)
            this.accountDrawer = true
          }else{
            this.$confirm("还未通过资质认证，是否前往认证？",{
              cancelButtonText: "取 消",
              confirmButtonText: "前往认证",
              confirmButtonClass:'btn-custom-confirm',
              closeOnClickModal:false,
              center:true
            })
              .then(()=>{
                this.$router.push('/userInformation')
              }).catch(()=>{

              })
          }
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
    // 新增账号确认
    confirmAddAccount(){
      this.$refs.accountForm.validate((valid) => {
        if(valid){
          let salt = bcryptjs.genSaltSync(); //定义密码加密的计算强度，默认10
          let password = bcryptjs.hashSync(md5(this.accountForm.password), salt); //进行加密
          if (this.timer) {
            clearTimeout(this.timer);
          }
          if ((this.accountForm.phone !== null && this.accountForm.phone !== "") && !regexpPhone(this.accountForm.phone)){
            this.$message({
              type: 'warning',
              message: '请输入正确的手机号码',
              center: true
            })
            return
          }
          let _this = this
          _this.isSubmit = true
          this.timer = setTimeout(function () {
            _this.timer = null;
          let params ={
            account: _this.accountForm.account,
            departmentId: _this.accountForm.departmentId,
            email: _this.accountForm.email,
            mobile: _this.accountForm.phone,
            password: password,
            confirmPassword: password,
            roleId: _this.accountForm.roleId,
            userName: _this.accountForm.name,
            // appIdList:_this.accountForm.app,
            // userExpandNumber:_this.accountForm.extendedCode
          }
          addAccount(params).then(res=>{
            _this.isSubmit = false
            if(res.data.status == 0){
              _this.$message.success({
                message:'新增账号成功',
                center:true
              })
              _this.getDataList()
              _this.closeAccountDrawer()
            }else{
              _this.$message({
                message:res.data.message,
                center:true,
                type:res.data.status === 2 ? 'warning':'error'
              })
            }
          }).catch(err=>{
            _this.isSubmit = false
            _this.$message.error({
              message:err,
              center:true
            })
          })
          }, 500);

        }
      });
    },
    // 编辑账号
    accountEditAction(row){
      this.accountDrawerTitle = '修改账号'
      this.disabledAccount = true
      this.accountForm.id = row.id,
      this.accountForm.account = row.account,
      this.accountForm.name =  row.userName,
      this.accountForm.roleId = row.roleId,
      this.accountForm.phone =  row.mobile,
      this.accountForm.email =  row.email,
      this.accountForm.departmentId = row.departmentId ,
      // this.accountForm.extendedCode = row.userExpandNumber,
      this.accountForm.password =  '',
      this.accountForm.password2 = '',
      this.getAppListData(2,row.id)
      this.accountDrawer = true
    },
    // 修改账号确认
    confirmEditAccount(){
      this.$refs.accountForm.validate((valid) => {
        if(valid){
          if (this.accountForm.phone !==null && this.accountForm.phone !=="" && !regexpPhone(this.accountForm.phone)){
            this.$message({
              type: 'warning',
              message: '请输入正确的手机号码',
              center: true
            })
            return
          }
          let params ={
            id:this.accountForm.id,
            departmentId: this.accountForm.departmentId,
            email: this.accountForm.email,
            mobile: this.accountForm.phone,
            roleId: this.accountForm.roleId,
            userName: this.accountForm.name,
            // appIdList:this.accountForm.app,
            // userExpandNumber:this.accountForm.extendedCode
          }
          editAccount(params).then(res=>{
            if(res.data.status == 0){
              this.$message.success({
                message:'修改账号成功',
                center:true
              })
              this.getDataList()
              this.closeAccountDrawer()
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
    // 删除账号
    accountDeleteAction(type,row){
      let ids =[]
      if(type == 1){
        for(let i = 0 ;i<row.length;i++){
          if(row[i].roleId === 1){
            this.$message.error({
              message:'不支持删除管理员账号！',
              center:true
            })
            return
          }
          ids.push(row[i].id)
        }
      }else{
        if(row.roleId === 1 ){
          this.$message.error({
            message:'不支持删除管理员账号！',
            center:true
          })
          return
        }
        ids.push(row.id)
      }
      this.$confirm("确定删除所选账号么？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        closeOnClickModal:false,
        center:true
      })
        .then(() => {
          let params = {ids:ids.toString()}
          deleteAccount(params).then(res=>{
            if(res.data.status == 0){
              this.$message.success({
                message:'账号删除成功',
                center:true
              })
              this.getDataList()

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
    // 停用账号
    stopUseAction(){
      let ids =[]
      for(let i =0 ;i<this.selectDeleteData.length;i++){
        if(this.selectDeleteData[i].roleId === 1){
          this.$message.error({
            message:'不支持停用管理员账号！',
            center:true
          })
          return
        }
        if(this.selectDeleteData[i].accountStatus !== 0 ){
          this.$message.error({
            message:'账号正常状态才可停用！',
            center:true
          })
          return
        }
        ids.push(this.selectDeleteData[i].id)
      }
      this.$confirm("确定停用所选账号么？", {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        closeOnClickModal:false,
        center:true
      })
        .then(() => {
          let params = {ids:ids.toString()}
          stopUseAccount(params).then(res=>{
            if(res.data.status == 0){
              this.$message.success({
                message:'账号停用成功',
                center:true
              })
              this.getDataList()
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
    // 启用账号
    startUseAction(){
      let ids = []
      for(let i =0;i<this.selectDeleteData.length;i++){
        if(this.selectDeleteData[i].accountStatus !== 1 ){
          this.$message.error({
            message:'账号停用状态才可启用！',
            center:true
          })
          return
        }
        ids.push(this.selectDeleteData[i].id)
      }
      let params = {ids:ids.toString()}
      startUseAccount(params).then(res=>{
        if(res.data.status == 0){
          this.$message.success({
            message:'账号启用成功',
            center:true
          })
          this.getDataList()
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
    // 解锁账号
    unlock(){
      let ids = []
      for(let i =0;i<this.selectDeleteData.length;i++){
        if(this.selectDeleteData[i].accountStatus !== 2 ){
          this.$message.error({
            message:'账号锁住状态才可解锁！',
            center:true
          })
          return
        }
        ids.push(this.selectDeleteData[i].id)
      }
      let params = {ids:ids.toString()}
      unlockAccount(params).then(res=>{
        if(res.data.status == 0){
          this.$message.success({
            message:'账号解锁成功',
            center:true
          })
          this.getDataList()
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
    // 重置密码
    resetPassword(row){
      this.resetPasswordForm.id = row.id
      this.resetPasswordForm.account = row.account
      this.resetPasswordForm.password = ''
      this.resetPasswordForm.password2 = ''
      this.resetToast = true
    },
    // 重置密码确认
    confirmResetPassword(){
      this.$refs.resetPasswordForm.validate((valid)=>{
        if(valid){
          let salt = bcryptjs.genSaltSync(); //定义密码加密的计算强度，默认10
          let password = bcryptjs.hashSync(md5(this.resetPasswordForm.password), salt); //进行加密
        // let jse = new JSEncrypt(); //新建JSEncrypt对象
        // let publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsdyqfaCfhwUuvIUyMnKu9Btmcx1bX53a9tV0q0vSF/S4fd+DjzhX/u8FWHH61e/YpRwvs6DiC/h06hgYnswnZxEvwp/eRxnt6JQVK2y+v8ZzZ838Z6fRb82W3g5FLJfTtJPf93uKlTDQywjYvmO1qbQTFraUNMSxzBi2/unRLHwIDAQAB"; // 设置密钥
        // jse.setPublicKey(publicKey); //设置公钥
        // let password = jse.encrypt(md5(this.resetPasswordForm.password))

          let params ={
            id: this.resetPasswordForm.id,
            confirmNewPassword: password,
            newPassword: password
          }
          resetPassword(params,this.headers).then(res=>{
            if(res.data.status == 0){
              this.$message.success({
                message:'密码重置成功',
                center:true
              })
              this.closeResetToast()
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
      })
    },
    // 关闭新增/编辑账号抽屉前重置表单规则
    closeAccountDrawer(){
      this.$nextTick(()=>{
        this.$refs.accountForm.resetFields();
        this.accountDrawer = false
      })
    },
    // 关闭新增/编辑部门抽屉前重置表单规则
    closeDepartmentDrawer(){
      this.$nextTick(()=>{
        this.$refs.departmentForm.resetFields();
        this.departmentDrawer = false
      })
    },
    closeDepartment(val){
      this.$refs.cascaderHandle.dropDownVisible = false
    },
    // 关闭重置密码弹窗清除表单规则
    closeResetToast(){
      this.$nextTick(()=>{
        this.$refs.resetPasswordForm.resetFields();
        this.resetToast = false
      })
    },
    //   表格选择则
    handleSelectionChange(val) {
      this.selectDeleteData = val
      this.isDisable = val.length < 1 ? true : false;
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
    // 头部搜索下拉框选中后失焦防止回车触发下拉框
    isShowSelectOptions(isShowSelectOptions){
      if(!isShowSelectOptions) this.$refs.searchSelect.blur();
    },
    getTreeData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].children.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].children = undefined;
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children);
        }
      }
      return data;
    },
  },
  watch: {
    authorityBttonList:{
      handler(data) {
        let btns = getButtonList(data,'/accountManagement')
        if(btns){
          btns.map(item=>{
            if(item.code == "deptAdd") this.deptAddBtn = true
            if(item.code == "deptUpdate") this.deptUpdateBtn = true
            if(item.code == "deptDelete") this.deptDeleteBtn = true
            if(item.code == "enterpriseUserAccountAdd") this.accountAddBtn = true
            if(item.code == "enterpriseUserAccountUpdate") this.accountEditBtn = true
            if(item.code == "enterpriseUserAccountDelete") this.accountDeleteBtn = true
            if(item.code == "enterpriseUserAccountDisable") this.accountDisableBtn = true
            if(item.code == "enterpriseUserAccountEnable") this.accountEnableBtn = true
            if(item.code == "enterpriseUserAccountPasswordReset") this.resetPasswordBtn = true
            if(item.code == "enterpriseUserAccountUnlock") this.unlockBtn = true

          })
        }
      },
      immediate: true,
      deep: true,
    }
  },
  mounted() {
    this.getTreeList()
    this.getDataList()
    getRoleList().then(res=>{
      if(res.data.status == 0){
        this.roleList = res.data.data
        this.roleList2 = res.data.data.filter(item=>{
          return item.id !== 1
        })
        if(this.roleList2.length>0){
          this.isRole = true
        }
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
    window.addEventListener("keydown", this.keyDown); //绑定监听事件
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false); //移除监听事件
  },

};
</script>

<style lang="less"  scoped>
#accountManagement {
  width: 100%;
  height: 100%;
  color: #333;
  letter-spacing: 0.75px;
  .title {
    // width: 100%;
    height: 96px;
    line-height: 96px;
    margin-left: 70px;
    font-size: 20px;
  }
  .container {
    width: 100%;
    height: calc(100%-90px);
    display: flex;
    // height: calc(100% - 96px);
    // overflow: hidden;
    .accountLeft {
      width: 276px;
      max-height: 100%;
      // height: 100%;
      // padding: 0 20px;
      overflow: auto;
      box-sizing: border-box;
      // overflow-y:overlay;
      // overflow:auto;
      border-right: 1px solid #e5e5e5;
      // float: left;
      .addCompany{
        text-align: center;
        margin-bottom: 50px;
      }
      .el-tree{
        margin: 0 20px;
        overflow: auto;
        color: #333;
        min-width: 85%;
        display:inline-block !important;
        font-size: 14px;
        /deep/.el-tree-node__children{
          color: #666;
        }
      }
    }
    .accountRight {
      margin-left: 10px;
      width:calc(100% - 286px);
      min-height: 100%;
      padding-right: 28px;
      // float: left;
      box-sizing: border-box;
      .headerBtn{
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
        .headerBtnLeft{
          display: flex;
          align-items: center;
        }
        .headerBtnRight{
          display: flex;
          align-items: center;
          .iconBtn.active{
            color: #368CFE !important;
            border-radius: 4px;
            border: 1px solid rgba(54,140,254,0.5);
          }
          .iconBtn.active:hover{
            color: #368CFE !important;
            border-radius: 4px;
            border: 1px solid rgba(54,140,254,0.5);
            background-color:  #ecf5ff !important;
          }
          .iconBtn.el-button:focus{
            background-color:#fff;
          }

        }

      }
      .footer_page{
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 1px solid #DEE4F0;
        box-sizing: border-box;
      }
    }
  }
  .custom-tree-node1{
    // display: flex;
    float: left;
    .node_label{
      float: left;
    }
    .icon_box{
      // min-width: 70px;
      // flex: 1;
      width: 84px;
      margin-left: 10px;
      display: block;
      float: left;
      .icon{
        float: left;
        display: block;
        margin-right: 10px;
      }
    }
  }
}
.operation{
  margin-left: 10px;
  display: block;
  float: left;
  cursor: pointer;
  color: #409eff;
}
.headerBtnLeft /deep/ .el-button+.el-button{
  margin-left: 1px;
}
.el-input {
  width: 160px;
  margin-left:10px ;
}
.el-input__inner{
  width: 160px;
  margin-left:10px ;
}
.headerBtnLeft /deep/ .el-input--suffix {
  width: 160px;
  margin-left:10px ;
}
#accountManagement /deep/ .el-tree-node__content {
  // min-width: 100%;
  height: 34px;
  // box-sizing: border-box;
  // overflow: auto;
}
#accountManagement /deep/ .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
  background-color: #F8F8FB;
}
// #accountManagement /deep/ .el-tree{
//   overflow: auto;
// }
#accountManagement /deep/ .custom-tree-node1 {
  // display: inline-block;
  // min-width: 100%;
  display: flex;
  // align-items: center;
  // justify-content: space-between;
  // // min-width: 100%;
  //       display: inline-block;

}
.cell .el-tooltip{
  display: flex;
  align-items: center;
}
/deep/ .el-drawer__header span:focus {
    outline: 0;
}
/deep/ .el-drawer:focus{
    outline: 0;
}
/deep/ .el-drawer__header{
  border-bottom: 1px solid #E5E5E5;
  margin-bottom: 40px;
}
/deep/ .el-drawer__close-btn{
  font-size: 24px;
  color: #333;
}
/deep/ .el-drawer__close-btn:focus{
    outline: 0;
}
.drawerContent  .el-input {
  width: 260px;
  margin-left: 0;
}
.drawerContent .el-input__inner {
  width: 260px;
}
.drawerContent /deep/ .el-input--suffix{
  width: 260px;
}
// .drawerContent .el-form-item{
//   // margin-bottom: 36px;
// }
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
    background: url("../../assets/svg/file_icon.svg") no-repeat 0 0;
    content: '';
    display: block;
    width: 14px;
    height: 14px;
    font-size: 14px;
    background-size: 14px;
}
.resetPassword /deep/ .el-dialog__body {
  padding: 20px 40px 10px ;
  text-align: center;
  .el-input {
    width: 260px;
    margin-left: 0;
  }
}
.resetPassword /deep/ .el-dialog__footer {
  text-align: center ;
}

</style>
