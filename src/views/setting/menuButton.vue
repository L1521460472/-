<template>
  <div id="menuButton">
    <div class="title">菜单管理</div>
    <div class="headerBtnRight">
      <el-button
        size="small"
        type="primary"
        @click="addJurisdiction"
        style="margin-bottom:30px"
      >
      <i class="iconfont iconxinzeng"></i>
      新增</el-button>
      <el-dialog :title="meg" :visible.sync="dialogVisible" :close-on-click-modal="false" width="600px" :before-close="handleClose">
        <div>
          <span class="demonstration">类型</span>
          <el-radio :disabled="isShow" v-model="radio" label="1">菜单</el-radio>
          <el-radio :disabled="isShow" v-model="radio" label="2">按钮</el-radio>
        </div>
        <div class="menu_block" v-if="falg01">
          <input type="hidden" v-model="valueId" />
          <div class="p p_language">
            <span class="demonstration">*名称</span>
            <el-input size="small" v-model="name"   placeholder="名称"></el-input>
          </div>
          <div class="p">
            <span class="demonstration">上级菜单</span>
            <span @click="getMenuButton">
              <el-cascader
                placeholder=""
                v-model="topMenu"
                :options="options"
                size="small"
                :props="defaultParams"
                ref="refHandle"
                :show-all-levels="false"
                clearCheckedNodes
                @change="handleChange"
                clearable
              ></el-cascader>
            </span>
          </div>
          <div class="p">
            <span class="demonstration">*路由</span>
            <el-input size="small" v-model="route"  placeholder="请输入路由"></el-input>
          </div>
          <div class="p">
            <span class="demonstration">*编码</span>
            <el-input size="small" v-model="code"   placeholder="请输入编码"></el-input>
          </div>
          <div class="p">
            <span class="demonstration">Icon</span>
            <el-input size="small" v-model="icon"  placeholder="请输入icon"></el-input>
          </div>
          <div class="p">
            <span class="demonstration">*排序</span>
            <el-input-number
              v-model="number"
              size="small"
              controls-position="right"
              @change="handleChange"
              class="p_input"
              :min="1"
              :max="50"
            ></el-input-number>
          </div>
          <div class="p">
            <span class="demonstration">描述</span>
            <el-input size="small" v-model="remarks"  placeholder="请输入描述"></el-input>
          </div>
          <!-- <div class="p">
            <span class="demonstration">规则</span>
            <el-button @click="add" size="mini">增加</el-button>
            <el-table :data="data">
              <el-table-column prop="ruleName">
                <template slot-scope="scope">
                  <el-input v-model="data[scope.$index].id" type="hidden"></el-input>
                </template>
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    v-model="data[scope.$index].ruleName"
                      placeholder="请输入ruleName"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="ruleType">
                <template slot-scope="scope">
                  <el-input
                    size="small"
                    @change="changeRuleType"
                    v-model="data[scope.$index].ruleType"
                      placeholder="请输入ruleType'"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <el-button size="small" @click="deleteRow(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div> -->
        </div>
        <div class="button_block" v-if="falg02">
          <input type="hidden" v-model="valueId" />
          <div class="p">
            <span class="demonstration">*上级菜单</span>
            <span @click="getMenuButton">
              <el-cascader
                size="small"
                v-model="topMenu"
                :options="options"
                ref="refHandle"
                :props="defaultParams"
                :show-all-levels="false"
                @change="handleChange"
                clearable
              ></el-cascader>
            </span>
          </div>
          <div class="p">
            <span class="demonstration">*名称</span>
            <el-input size="small" v-model="name"   placeholder="名称"></el-input>
          </div>
          <div class="p">
            <span class="demonstration">描述</span>
            <el-input size="small" v-model="remarks"  placeholder="请输入描述"></el-input>
          </div>
          <div class="p">
            <span class="demonstration">*编码</span>
            <el-input size="small" v-model="code"   placeholder="请输入编码"></el-input>
          </div>
          <div class="p">
            <span class="demonstration">*API</span>
            <el-input size="small" v-model="api"  placeholder="请输入API'"></el-input>
          </div>
        </div>
        <div class="button_block" v-if="falg03">
          <input type="hidden" v-model="valueId" />
          <div class="p">
            <span class="demonstration">*上级菜单</span>
            <span @click="getMenuButton">
              <el-cascader
                size="small"
                v-model="topMenu"
                :options="options"
                ref="refHandle"
                :props="defaultParams"
                :show-all-levels="false"
                @change="handleChange"
                clearable
              ></el-cascader>
            </span>
            <el-button @click="addButtonData" size="small">增加</el-button>
          </div>
          <el-table :data="buttonData">
            <el-table-column prop="name" label="名称" align="center">
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="buttonData[scope.$index].name"
                    placeholder="请输入名称"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="code" label="编码" align="center">
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="buttonData[scope.$index].code"
                    placeholder="请输入编码"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="api" label="API" align="center">
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="buttonData[scope.$index].api"
                    placeholder="请输入API"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="content" label="描述" align="center">
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="buttonData[scope.$index].content"
                    placeholder="请输入描述"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button size="small" @click="deleteButtonData(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer" v-if="showMenu" class="dialog-footer">
          <el-button size="small" @click="cancel">取消</el-button>
          <el-button size="small" type="primary" @click="confirm">确定</el-button>
        </span>
        <span slot="footer" v-else-if="showButton" class="dialog-footer">
          <el-button size="small" @click="cancel">取消</el-button>
          <el-button size="small" type="primary" @click="confirmButton">确定</el-button>
        </span>
        <span slot="footer" v-else class="dialog-footer">
          <el-button size="small" @click="cancel">取消</el-button>
          <el-button size="small" type="primary" @click="modification">确定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="footer">
      <el-table
        :data="tableData"
        size="small"
        border
        :header-cell-style="{ background: '#fafafa', color: '#333333' }"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        style="width: 100%;height:100%;"
        v-loading="loading"
       >
        <el-table-column prop="name" show-overflow-tooltip label="名称" width="150"></el-table-column>
        <el-table-column prop="type" show-overflow-tooltip label="类型"  width="70">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">菜单</span>
            <span v-if="scope.row.type == 2">按钮</span>
          </template>
        </el-table-column>
        <el-table-column prop="rank" show-overflow-tooltip label="排序"  width="70"></el-table-column>
        <el-table-column prop="code" show-overflow-tooltip label="编码" width="140" ></el-table-column>
        <el-table-column prop="icon" show-overflow-tooltip label="Icon" width="90" ></el-table-column>
        <el-table-column prop="api" show-overflow-tooltip label="API" width="150" ></el-table-column>
        <el-table-column prop="url" show-overflow-tooltip label="路由" width="150" ></el-table-column>
        <el-table-column prop="content" show-overflow-tooltip label="描述" width="130" ></el-table-column>
        <el-table-column label="操作" min-width="100" align="center">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="修改" placement="top">
              <img @click="handleClick(scope.row)"  class="operation" src="../../assets/svg/edit_icon.svg"   />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <img @click="handleDelete(scope.row)"  class="operation" src="../../assets/svg/delete_icon.svg"  />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {getLimitMenus,addMenu,getListMenu,getMenuButtonDetail,getDeleteDetail,deleteMenuButton,addButton,updateMenuButton} from '../../api/setting/menu'
import { getCookie,getButtonList} from "../../public";
export default {
  name: "menuButton",
  props:{
    // authorityBttonList:{
    //   type:Array
    // }
  },

  data() {
    return {
      tableData: [],
      meg: "",
      dialogVisible: false,
      dialogVisibleLanguage: false,
      valueId: "",
      radio: "1", //类型
      falg01: true, //菜单显示隐藏
      falg02: false, //按钮显示隐藏
      falg03: false,
      topMenu: [], //上级菜单
      name: "", //名称
      route: "", //路由
      icon:'',//icon
      remarks: "", //描述
      code: "", //编号
      api: "", //API
      options: [], //
      valueLanguage: "",
      defaultParams: {
        label: "name",
        value: "id",
        children: "children",
        checkStrictly: true, //可以选父节点
        emitPath: false, //是否返回由该节点所在的各级菜单的值所组成的数组,设置 false，则只返回该节点的值
      },
      number: 1, //排序
      isShow: false, //是否禁用类型
      sign: false, //新增修改按钮控制,true新增,false修改
      showButton: false, //新增按钮控制
      showMenu: false, //新增菜单控制
      data: [], //规则
      buttonData: [], //添加按钮
      dataLanguage: [],
      headers : {Authorization:getCookie('enterprisePass')},
      loading: false,
      tableHeight:window.innerHeight - 200 +'px'
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      //初始化数据
      this.loading = true
        getListMenu().then((res) => {
          //
          this.tableData = res.data.data;
          this.loading = false
        })
        .catch((err) => {
          this.$message({
            message: err,
            center: true,
            type: "error",
          })
          this.loading = false
        });
    },
    changeRuleType() {
      this.data.map((item) => {
        if (item.ruleType <= -128 || item.ruleType >= 127) {

        }
      });
    },
    handleClick(row) {
      //修改
      this.dialogVisible = true;
      this.meg = '修改';
      this.isShow = true; //禁用类型
      this.sign = false; //true新增按钮,false修改按钮
      // this.falg01 = false;
      // this.falg02 = true;
      // this.falg03 = false;
      this.showButton = false;
      this.showMenu = false;
      this.radio = row.type.toString();
      //
      let params = {
          id: row.id,
          menuType: row.type,
      }
      getMenuButtonDetail(params)
        .then((result) => {
          this.getMenuList();
          this.valueId = result.data.data.id; //id
          this.name = result.data.data.name; //简体名称
          this.route = result.data.data.url; //路由
          this.remarks = result.data.data.content; //描述
          this.code = result.data.data.code; //编号
          this.api = result.data.data.api; //API
          this.icon = result.data.data.icon //icon
          this.topMenu = result.data.data.parentId; //父id
          this.number = Number(result.data.data.menuRank); //排序
          this.data = result.data.data.menuRuleDetailVOList; //规则
          //
        })
        .catch((err) => {

          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    handleDelete(row) {
      //删除
      let params ={
          id: row.id,
          menuType: row.type,
      }
      getDeleteDetail(params)
        .then((result) => {
          if (result.status == 0) {
            //没有就直接删除
            this.delete(row);
          } else {
            //如果有子菜单，就给个提示再确定删除
            this.$confirm(result.data.message)
              .then(() => {
                this.delete(row);
              })
              .catch(() => {});
          }
          this.getMenuLists()
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    delete(row) {
      let params ={
          id: row.id,
          menuType: row.type,
      }
      deleteMenuButton(params)
        .then((result) => {
          //
          this.getData();
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    handleChange(value) {
      //选择上级菜单
      //
    },
    getMenuButton() {
      //点击上级菜单
    },
    handleClose(done) {
      //关闭弹出窗口
      done();
    },
    addJurisdiction() {
      //新增
      this.dialogVisible = true;
      this.isShow = false;
      this.falg01 = true;
      this.falg02 = false;
      this.falg03 = false;
      this.meg = '新增'    //   this.radio = "1";
      this.sign = true;
      this.showMenu = true;
      this.empty();
      this.getMenuList();
      this.getMenuLists()
    },
    getMenuList() {
      //获取菜单按钮列表
      getListMenu({},this.headers)
        .then((result) => {
          //
          this.options = this.getTreeData(result.data.data);
        })
        .catch((err) => {
          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
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
    confirm() {
      //确定新增菜单
      if (
          this.name == "" ||
          this.route == "" ||
          this.number == "" ||
          this.code == ""
        ) {
          this.$message({
            message: '必填项不能为空',
            center: true,
            type: "warning",
          });
          return;
        }
      //
      if (this.topMenu.length == 0 || this.topMenu == null) {
        this.topMenu = "";
      }
      let params ={
          code: this.code,
          name: this.name,
          content: this.remarks,
          menuRank: this.number,
          // menuRuleAddDTOList: this.data,
          parentId: (this.topMenu = null ? "" : this.topMenu),
          url: this.route,
          icon:this.icon
      }
      addMenu(params)
        .then((result) => {
          //
          if (result.status == 0) {
            this.dialogVisible = false;
            this.getData();
          } else {
            this.$confirm(result.data.message)
              .then(() => {
                this.dialogVisible = false;
                this.getData();
                return;
              })
              .catch(() => {});
          }
        })
        .catch((err) => {

          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    confirmButton() {
      let checked=false;//检查必填项
      if(this.buttonData&&this.buttonData.length>0){
        for(let item of this.buttonData){
          if(item.name==""||item.code==""||item.api==""){
            checked=true;
            break;
          }
        }
      }
      else{
        checked=true;
      }
      //确定按钮新增
      if ( checked|| this.topMenu == "" ) {
          this.$message({
            message: '必填项不能为空',
            center: true,
            type: "warning",
          });
          return;
        }
      let buttonListData = {
        parentId: (this.topMenu = null ? "" : this.topMenu),
        list: this.buttonData,
      };
     addButton(buttonListData)
        .then((result) => {
          //
          if (result.status == 0) {
            this.dialogVisible = false;
            this.getData();
            this.getMenuLists()
          } else {
            this.$confirm(result.data.message)
              .then(() => {
                return;
              })
              .catch(() => {});
          }
        })
        .catch((err) => {

          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    cancel() {
      //取消新增
      this.dialogVisible = false;
      this.empty();
    },
    modification() {
      //确定修改
      if (
          this.name == "" ||
          this.code == "" ||
          this.api == '' ||
          this.menuRank == ''
        ) {
          this.$message({
            message: '必填项不能为空',
            center: true,
            type: "warning",
          });
          return;
        }
        let params = {
          api: this.api,
          code: this.code,
          name: this.name,
          icon:this.icon,
          content: this.remarks,
          menuRank: this.number,
          id: this.valueId,
          // menuRuleAddDTOList: this.data,
          menuType: Number(this.radio),
          parentId: (this.topMenu = null ? "" : this.topMenu),
          url: this.route,
        }
      updateMenuButton(params)
        .then((result) => {
          //
          if (result.status == 0) {
            this.$message.success({
              message:'修改成功',
              center:true
            })
            this.dialogVisible = false;
            this.getData();
            this.getMenuLists()
          } else {
            this.$confirm(result.data.message)
              .then(() => {
                this.dialogVisible = false;
                this.getData();
                return;
              })
              .catch(() => {});
          }
        })
        .catch((err) => {

          this.$message({
            message: err.response.data.message,
            center: true,
            type: "error",
          });
        });
    },
    add() {
      //规则新增
      if (this.data == []) {
        this.data.push({ ruleName: "", ruleType: "" });
      } else {
        this.data.push({});
      }
    },
    addButtonData() {
      if (this.buttonData instanceof  Array) {
        this.buttonData.push({ name: "", cede: "", api: "", content: "" });
      } else {
        this.buttonData.push({});
      }
    },
    deleteRow(index) {
      //规则删除
      this.data.splice(index, 1);
    },
    deleteButtonData(index) {
      //规则删除
      this.buttonData.splice(index, 1);
    },
    empty() {
      // 置空
      this.name = ""; //名称
      this.route = ""; //路由
      this.icon= '',//icon
      this.remarks = ""; //描述
      this.code = ""; //编号
      this.api = ""; //API
      this.topMenu = [];
      this.number = 1; //排序
      // this.data = [{ ruleName: "", ruleType: "" }]; //规则
      this.data = []; //规则
      this.buttonData = [];
    },
    // 获取权限菜单，更新之后获取菜单
    getMenuLists(){
      getLimitMenus().then(res=>{
        if(res.data.status == 0){
          // this.menuItems = res.data.data
          sessionStorage.setItem('menuList',JSON.stringify(res.data.data))
        }else{
          this.$message.error({
            message:res.data.message,
            center:true
          })
        }
      }).catch(err=>{})
    }
},
  watch: {
    radio: function () {
      if (this.radio == "1") {
        this.falg01 = true;
        this.falg02 = false;
        this.falg03 = false;
        this.empty();
        this.getMenuList();
      } else {
        if (this.sign == true) {
          this.falg01 = false;
          this.falg02 = false;
          this.falg03 = true;
          this.showButton = true;
          this.showMenu = false;
          this.empty();
          this.getMenuList();
        } else {
          this.falg01 = false;
          this.falg02 = true;
          this.falg03 = false;
          this.showButton = false;
          this.showMenu = false;
          this.empty();
          this.getMenuList();
        }
      }
    },
    topMenu() {
      if (this.$refs.refHandle) {
        this.$refs.refHandle.dropDownVisible = false; //监听值发生变化就关闭它
      }
    },
    // authorityBttonList:{
    //   handler(data) {
    //     //
    //
    //   },
    //   immediate: true,
    //   deep: true,
    // }
  },

};
</script>

<style scoped>
#menuButton{
  width: 100%;
  height: 100%;
  padding: 0 70px;
  box-sizing: border-box;
}
.title {
    width: 100%;
    height: 96px;
    line-height: 96px;
    box-sizing: border-box;
    font-size: 20px;
  }
.p .el-input {
  width: calc(100% - 120px) !important;
}
.p > .el-table {
  box-sizing: border-box;
  padding-left: 95px;
}
.p > .el-table::before {
  height: 0 !important;
}
.p > .el-table .el-input {
  width: 100% !important;
}
.p > .el-table td {
  border-bottom: none !important;
}
.p .has-gutter {
  display: none;
}
.el-dialog .language .has-gutter {
  display: none;
}
.el-cascader .el-input {
  width: 180px !important;
}
.el-dialog__footer .el-button {
  margin-right: 0;
}
.demonstration {
  display: inline-block;
  width: 90px;
  margin-right: 10px;
  text-align: right;
}
.p {
  width: 100%;
  margin-top: 20px;
}
.p_input .el-input__inner {
  width: 130px !important;
}
/* -------------footer ------------- */
.footer {
  width: 100%;
  max-height: calc(100% - 100px);
  box-sizing: border-box;
  overflow-y: auto;
  border: 1px solid #e5e5e5;
  overflow: auto;
}
.footerBottom {
  width: 100%;
  height: 68px;
  box-sizing: border-box;
  padding-left: 25px;
  display: flex;
  align-items: center;
}
.footerBottom .el-button:nth-child(1) {
  color: #368cfe;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footerBottom .el-button:nth-child(1):hover {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footerBottom .el-button:hover {
  color: #c0c4cc !important;
}
.active {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footerBottom .active:hover {
  color: #368cfe !important;
  border-radius: 4px;
  border: 1px solid rgba(54, 140, 254, 0.5);
}
.footerTable {
  width: 100%;
  height: calc(100% - 68px);
}
.el-table {
  color: #333333;
}
.footer_informatian {
  width: 100%;
  height: calc(100% - 56px);
  overflow-y: auto;
}
.footer_page {
  width: 100%;
  height: 56px;
  display: flex;
  border-top: 1px solid #e5e5e5;
  align-items: center;
  text-align: center;
  justify-content: center;
}
.footer .el-table {
  overflow: auto;
}
.footer >>> .el-table .el-button{
  padding: 0 !important;
}
/* .footer >>> .el-table .cell{
  line-height: 23px;
}
.footer >>> .el-table .el-table__row td{
  height: 34px !important;
  padding: 0 !important;
} */
</style>
