<template>
<!-- 个人通讯录 -->
  <div id="personAddressBook" v-loading="loading" element-loading-text="loading">
    <div class="title">个人通讯录</div>
    <div class="container">
      <div class="container-left">
        <div style="display: flex;justify-content:center" v-if="isShowAddComapnyBtn">
          <el-button icon="el-icon-plus" size="small" type="primary" @click="addGroups" v-has="'addressBookGroupAdd'">新增分组</el-button>
        </div>
        <el-tree
          v-else
          :data="tempTreeData"
          node-key="id"
          highlight-current
          :props="defaultProps"
          @node-click="getDefaultNode"
          :current-node-key="selectTreeId"
          :expand-on-click-node="false"
          :default-expanded-keys="expandedTree"
        >
          <div class="custom-tree-node1" :class="selectTreeId===data.id ? 'is-current':''" slot-scope="{ node, data }">
            <div class="node_label">{{ node.label }}</div>
            <div class="icon_box">
              <el-tooltip  class="item" effect="dark" content="新增" placement="top" v-if="selectTreeId == data.id">
                <img @click="addGroups(node,data)"  class="icon" src="../../assets/svg/increase_icon.svg" v-has="'addressBookGroupAdd'" />
              </el-tooltip>
              <el-tooltip  class="item" effect="dark" content="修改" placement="top" v-if="selectTreeId == data.id && selectTreeId != undefined">
                <img @click="editGroups(node,data)"  class="icon" src="../../assets/svg/edit_icon2.svg"  v-has="'addressBookGroupUpdate'" />
              </el-tooltip>
              <el-tooltip  class="item" effect="dark" content="删除" placement="top" v-if="selectTreeId == data.id && selectTreeId != undefined">
                <img @click.prevent="deleteGroups(node,data)"  class="icon" src="../../assets/svg/delete_icon2.svg" v-has="'addressBookGroupDelete'" />
              </el-tooltip>
            </div>
          </div>
        </el-tree>
      </div>
      <div class="container-right">
        <div class="headerBtn">
          <div class="headerBtnLeft">
            <el-button-group>
              <el-button type="primary" size="small"  @click="refresh">
                <i class="iconfont iconshuaxin"></i>
              </el-button>
              <el-button type="primary" size="small"  @click="reset">
                <i class="iconfont iconguanbi"></i>
              </el-button>
            </el-button-group>
            <el-input v-model="searchValue" placeholder="手机号码搜索" size="small" style="width:160px;margin-left:10px">
              <i slot="suffix" style="cursor: pointer;" class="el-input__icon el-icon-search" @click="getTableList"></i>
            </el-input>
            <el-tooltip  class="item" effect="dark" content="更多搜索" placement="top" v-if="canSearch.length != 0">
              <img src="../../assets/svg/icon_34px_more_search.svg" @click="showSearch" style="margin-left:10px;cursor: pointer;"/>
            </el-tooltip>
          </div>
          <div class="headerBtnRight">
            <el-button size="small" type="primary" @click="addContactsAction" v-has="'addressBookAdd'">
              <i class="iconfont iconxinzeng"></i>
              新增
            </el-button>
            <el-button size="small" class="diyBtn" @click="importContacts" v-has="'addressBookMouldImport'">
              <i class="iconfont icondaoru"></i>
              导入
            </el-button>
            <el-button size="small" class="diyBtn" @click="exportExcel" v-has="'addressBookExport'">
              <i class="iconfont icondaochu"></i>
              导出
            </el-button>
            <el-button size="small" class="diyBtn" @click="exportTemplate" v-has="'addressBookMouldExport'">
              <i class="iconfont icondaochu1"></i>
              导入模板
            </el-button>
            <!-- <el-button size="small" class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable">
              <i class="iconfont iconxiugai"></i>
              修改
            </el-button> -->
            <el-button size="small" class="iconBtn" :class="{ 'active': !isDisable }" :disabled="isDisable" @click="batchDelete" v-has="'addressBookDelete'">
              <i class="iconfont iconshanchu"></i>
              删除
            </el-button>
          </div>
        </div>
        <el-collapse-transition>
          <div class="collpase-input" v-show="showMore">
            <template v-for="(item,index) in canSearch" class="search-center">
              <el-select style="width:20%;margin-right:10px" size="small" clearable v-model="item.value" :key="index" v-if="item.fieldStyle == 1 || item.fieldStyle == 8 || item.fieldStyle == 9">
                <el-option v-for="(ele, index) in item.itemList" :key="index" :label="ele.content" :value="ele.id">
                </el-option>
              </el-select>
              <el-cascader style="width:20%;margin-right:10px;position:relative;bottom:1px" clearable size="small" v-model="item.value" :options="item.itemList" :props="{ value: 'id', label: 'content',children: 'childList' }" :key="index" v-else-if="item.fieldStyle == 10"></el-cascader>
              <el-input v-else  v-model="item.value" :key="index" clearable :placeholder="item.fieldName + '搜索'" style="width:20%;margin-right:10px" size="small">
                <i slot="suffix" style="cursor: pointer;" class="el-input__icon el-icon-search" @click="getTableList"></i>
              </el-input>
            </template>
          </div>
        </el-collapse-transition>
        <div class="container-right-body">
          <el-table
            border
            :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
            size="small"
            class="table"
            :data="tableData"
            @selection-change="handleSelectionChange"
            :style="{'color':'#333','min-height':tableHeight + 'px'}"
            >
            <el-table-column type="selection" align="center" width="50"></el-table-column>
            <el-table-column v-for="(item,index) in tableHead" :min-width="item.label.length > 5 ? 150 : 80" :key="index" :label="item.label" :prop="item.prop" show-overflow-tooltip>

            </el-table-column>
            <!-- <el-table-column label="姓名" prop="name" show-overflow-tooltip></el-table-column>
            <el-table-column label="手机号"  prop="phone" show-overflow-tooltip></el-table-column>
            <el-table-column label="所属组" prop="belongTo" show-overflow-tooltip></el-table-column>
            <el-table-column label="邮箱"  prop="email" show-overflow-tooltip></el-table-column>
            <el-table-column label="地区" prop="area" show-overflow-tooltip></el-table-column>
            <el-table-column label="VIP身份" prop="isVIP" show-overflow-tooltip></el-table-column> -->
            <el-table-column width="120" label="操作" fixed="right">
              <template slot-scope="scope">
                <!-- <el-tooltip class="item" effect="dark" content="修改" placement="top" v-has="'addressBookUpdate'">
                  <img class="operation"  @click="addressEditAction(scope.row)" src="../../assets/svg/edit_icon.svg">
                </el-tooltip> -->
                <!-- <el-tooltip  class="item" effect="dark" content="删除" placement="top" v-has="'addressBookDelete'">
                  <img class="operation"  @click="accountDeleteAction(scope.row)"  src="../../assets/svg/delete_icon.svg">
                </el-tooltip> -->
                <span class="operation" @click="addressEditAction(scope.row)" v-has="'addressBookUpdate'">修改</span>
                <span class="operation" @click="accountDeleteAction(scope.row)" v-has="'addressBookDelete'">删除</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="footer_page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page.currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="page.pageSize"
              :pager-count="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.total"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增/编辑分组抽屉 -->
    <el-drawer
      :title="isAddGroup ? '新增分组' : '编辑分组'"
      :visible.sync="groupDrawer"
      :wrapperClosable="false"
      size="500px"
      direction="rtl">
      <el-form label-width="80px" :model="groupFormData">
        <el-form-item label="分组名称:">
          <el-input v-model="groupFormData.groupName" maxlength="12" show-word-limit size="small" style="width:100%"></el-input>
        </el-form-item>
        <el-form-item label="分组描述:">
          <el-input v-model="groupFormData.groupDescription" maxlength="50" show-word-limit rows="6" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="addGroup" v-if="isAddGroup" :disabled="submitBtnDsiable">确 定</el-button>
          <el-button type="primary" size="small" @click="editGroup" v-else :disabled="submitBtnDsiable">确 定</el-button>
          <el-button size="small" @click="closeGroup">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <!-- 新增/修改联系人抽屉 -->
    <el-drawer
      :title="isAddContacts ? '新增联系人' : '修改联系人'"
      :visible.sync="contactsDrawer"
      :wrapperClosable="false"
      direction="rtl"
      @close="cancleContacts"
      size="500px">
      <el-form  ref="contacts" label-width="100px" :model="contactsFormData" :rules="contactsRules" v-loading="loading2">
        <el-form-item v-for="(item, index) in formItemList" :key="index" :label="item.fieldName+':'" :required="index == 0 || item.mustFlag == 1">
          <el-input size="small" v-if="item.fieldStyle == 0" v-model="contactsFormData[item.id]" :disabled="!isAddContacts && item.updateFlag == 1">
          </el-input>
          <el-input size="small" v-if="item.fieldStyle == 5" oninput="value=value.replace(/[^\d.]/g,'')" @blur="e => inputValue(e, item.id)" v-model="contactsFormData[item.id]" :disabled="!isAddContacts && item.updateFlag == 1">
          </el-input>
          <el-input size="small" v-if="item.fieldStyle == 6" oninput="value=value.replace(/[^\d]/g,'')" @blur="e => inputValue(e, item.id)" v-model="contactsFormData[item.id]" :disabled="!isAddContacts && item.updateFlag == 1">
          </el-input>
          <el-input size="small" v-if="item.fieldStyle == 7" @blur="e => testUrl(e, item.id)" v-model="contactsFormData[item.id]" :disabled="!isAddContacts && item.updateFlag == 1">
          </el-input>
          <el-select v-if="item.fieldStyle == 1" size="small" style="width:200px" v-model="contactsFormData[item.id]" :disabled="!isAddContacts && item.updateFlag == 1">
            <el-option
              v-for="(ele, index) in item.itemList"
              :key="index"
              :label="ele.content"
              :value="ele.id">
            </el-option>
          </el-select>
          <el-date-picker
            v-if="item.fieldStyle == 2"
            size="small"
            v-model="contactsFormData[item.id]"
            type="date"
            style="width:200px"
            :disabled="!isAddContacts && item.updateFlag == 1"
            placeholder="选择日期">
          </el-date-picker>
          <el-time-picker
            arrow-control
            size="small"
            v-if="item.fieldStyle == 3"
            style="width:200px"
            :disabled="!isAddContacts && item.updateFlag == 1"
            v-model="contactsFormData[item.id]"
            placeholder="任意时间点">
          </el-time-picker>
          <el-date-picker
            v-if="item.fieldStyle == 4"
            size="small"
            style="width:200px"
            v-model="contactsFormData[item.id]"
            :disabled="!isAddContacts && item.updateFlag == 1"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
          <template v-if="item.fieldStyle == 8">
            <el-radio v-for="(ele, index) in item.itemList" v-model="contactsFormData[item.id]" :key="index" :label="ele.id" :disabled="!isAddContacts && item.updateFlag == 1">{{ele.content}}</el-radio>
          </template>
          <el-checkbox-group v-if="item.fieldStyle == 9" v-model="contactsFormData[item.id]" :disabled="!isAddContacts && item.updateFlag == 1">
            <el-checkbox v-for="(ele, index) in item.itemList" :key="index" :label="ele.id+''">{{ele.content}}</el-checkbox>
          </el-checkbox-group>
          <div v-if="item.fieldStyle == 10" class="mutiSelect">
            <el-cascader style="width:200px"  v-model="contactsFormData[item.id]" size="small" :options="item.itemList" @change="value => cascaderChange(value, item.id)" :disabled="!isAddContacts && item.updateFlag == 1">
            </el-cascader>
          </div>
          <el-input v-if="item.fieldStyle == 11" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="contactsFormData[item.id]" size="small" :disabled="!isAddContacts && item.updateFlag == 1"></el-input>
        </el-form-item>
        <el-form-item label="所属分组:" class="form-item-tree" required>
          <el-tree
            ref="groupTree"
            highlight-current
            :data="tempTreeData"
            node-key="id"
            :props="defaultProps"
            @node-click="selectWhichTree"
            :current-node-key="selectTreeId2"
            class="special-tree"
            :default-expanded-keys="expandedTree"
            >
            <div class="custom-tree-node1" slot-scope="{ node, data }">
              <!-- <el-checkbox  v-show="selectTreeId2 == data.id" class="diySelect" :checked="true" @change="checkboxChange"></el-checkbox> -->
              <span>{{node.label}}</span>
              <i class="el-icon-check" style="color: #409eff" v-show="selectTreeId2 == data.id"></i>
            </div>
          </el-tree>
        </el-form-item>
        <!-- <el-form-item label="姓名:">
          <el-input v-model="contactsFormData.name" maxlength="20" show-word-limit size="small" style="width:100%"></el-input>
        </el-form-item>
        <el-form-item label="手机号码:" prop="phone">
          <el-input v-model="contactsFormData.phone"  size="small" style="width:100%"></el-input>
        </el-form-item>
        <el-form-item label="所属分组:" prop="belongTo">
          <el-select v-model="contactsFormData.belongTo" placeholder="请选择分组" size="small">
            <el-option
              v-for="(item,index) in groupOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input v-model="contactsFormData.email"  size="small" style="width:100%"></el-input>
        </el-form-item>
        <el-form-item label="地区:">
          <el-cascader
          size="small"
          v-model="contactsFormData.area"
          :options="areaOptions"
          @change="handleChangeArea"></el-cascader>
        </el-form-item>
        <el-form-item label="VIP身份:">
          <el-select v-model="contactsFormData.isVIP" placeholder="请选择VIP身份" size="small">
            <el-option
              v-for="(item,index) in vipOptions"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" v-if="isAddContacts" size="small" @click="addContacts" :disabled="submitBtnDsiable">确 定</el-button>
          <el-button type="primary" v-else size="small" @click="editContacts" :disabled="submitBtnDsiable">确 定</el-button>
          <el-button size="small" @click="cancleContacts">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <!-- 导入联系人弹窗 -->
    <el-dialog
      title="导入联系人"
      :visible.sync="importContactsVisible"
      width="450px">
      <el-form label-width="80px" :model="importFormData">
        <el-form-item label="文件类型:">
          <el-checkbox v-model="importFormData.checked">Excel文件</el-checkbox>
        </el-form-item>
        <el-form-item label="所属分组:" class="form-item-tree">
          <el-tree
            ref="groupTree"
            highlight-current
            :data="tempTreeData"
            node-key="id"
            :props="defaultProps"
            @node-click="selectWhichTree"
            :current-node-key="selectTreeId2"
            class="special-tree"
            :default-expanded-keys="expandedTree"
            >
            <div class="custom-tree-node1" slot-scope="{ node, data }">
              <!-- <el-checkbox  v-show="selectTreeId2 == data.id" class="diySelect" :checked="true" @change="checkboxChange"></el-checkbox> -->
              <span>{{node.label}}</span>
              <i class="el-icon-check" style="color: #409eff" v-show="selectTreeId2 == data.id"></i>
            </div>
          </el-tree>
        </el-form-item>
        <el-form-item label="联系人:">
          <el-upload
            ref="importAddress"
            class="upload-demo"
            action="#"
            :show-file-list="false"
            :on-change="beforeImport"
            :on-success="importSuccess"
            :on-progress="importing"
            :on-error="importError"
            :auto-upload="false"
            :http-request="importExcelFile"
            multiple>
            <el-button size="small" type="primary">选择文件</el-button>
          </el-upload>
          <el-progress :percentage="percentage"></el-progress>
          <span style="font-size:12px;color:#999">{{filename}}，{{percentage}}%，成功{{successNumbers}}个，失败{{failNumbers}}个，重复{{repeatNumbers}}个</span>
        </el-form-item>
        <!-- <el-form-item label="">
          <el-table
            :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
            :data="importTableHead"
            size="small"
            max-height="250"
            border>
            <el-table-column label="系统列" prop="sysRows"></el-table-column>
            <el-table-column label="文件列" prop="fileRows"></el-table-column>
          </el-table>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="submitImport" :disabled="submitBtnDsiable">确 定</el-button>
        <el-button size="small" @click="importContactsVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 导出联系人弹窗 -->
    <el-dialog
      title="导出联系人"
      :visible.sync="exportVisible"
      width="450px"
      >
      <el-form label-width="80px">
        <el-form-item label="文件类型:">
          <el-checkbox v-model="exportFileType">Excel文件</el-checkbox>
        </el-form-item>
        <span style="font-size:12px;color:#999">提示:导出的数据量最大为50万条,当超过50万条时按50万一个文件保存</span>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="confirmExport" :disabled="submitBtnDsiable">确 定</el-button>
        <el-button size="small" @click="exportVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { leftMenu, addLeftMenu, updateLeftMenu, deleteLeftMenu, getHeadList, getTableList, exportExcel, formItem, deleteAddress, addAddress, updateAddress, importFile, exportTemplate } from '@/api/addressBook/personal'
import { getCookie } from '../../public'
import XLSX from 'xlsx'
import { Progress } from 'element-ui'
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return  callback(new Error('手机号码不能为空！'))
      }
      if (!(/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(this.phoneNumber))) {
        return  callback(new Error('非运营商号码！'))
      }
    }
    return {
      loading: false,  // loading
      isShowAddComapnyBtn: true,  // 是否显示添加分组按钮
      // deptAddBtn: false,
      deptUpdateBtn: false,
      defaultProps: {},
      selectTreeId: '',
      isDisable: true,   // 是否选择了数据，按钮禁用与否
      searchValue: '', // 搜索值
      exportFileType: false,
      tableHead: [],
      // 表格数据
      tableData: [],
      tableHeight:window.innerHeight - 310 +'', // 表格高度
      multipleSelection: [],  // 多选数据
      page: {  // 分页
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      // 添加分组表单数据
      groupFormData: {
        groupName: '',
        groupDescription: ''
      },
      isAddGroup: true,  // 是否是新增左侧的按钮   true 新增， false 编辑
      groupDrawer: false, // 分组抽屉标志
      contactsDrawer: false,  // 联系人抽屉
      isAddContacts: true, // 是否是新增联系人
      contactsFormData: {  // 新增联系人表单
      },
      // 分组下拉选项
      groupOptions: [
        {
          label: '分组一',
          value: 1
        },
        {
          label: '分组二',
          value: 2
        }
      ],
      // VIP下拉选项
      vipOptions: [
        {
          label: '是',
          value: true
        },
        {
          label: '否',
          value: false
        }
      ],
      // 地区级联选择
      areaOptions: [],
      contactsRules: {
        phone: [{ required: true, validator: checkPhone, trigger: 'blur' }],
        belongTo: [{ required: true, message: '请选择所属分组', trigger: 'blur' }]
      },
      importContactsVisible: false,
      importFormData: {  // 导入表单
        checked: true,
      },
      importTableHead: [
        {
          sysRows: '手机号码',
          fileRows: ''
        },
        {
          sysRows: '姓名',
          fileRows: ''
        },
        {
          sysRows: '邮箱',
          fileRows: ''
        },
        {
          sysRows: '地区',
          fileRows: ''
        },
        {
          sysRows: 'VIP身份',
          fileRows: ''
        }
      ],
      exportVisible: false,
      tempTreeData: [
      ],
      formItemList: [],  // 获取的表单项
      temp: [],
      province: '',  // 省
      city: '',  // 市
      street: '',  // 区
      allCityList: [],  // 所有的级联数据
      provinceList: [],  // 省
      cityList: [],  // 城
      streetList: [],  // 区
      canSearch: [],  // 可以搜素的列
      tempSelectTree: [],  // 选中的树的临时数组
      tempSelectTreeId: '',
      selectTreeId2: '',
      showMore: false, // 是否显示更多搜素项
      personId: '',
      percentage: 0, //
      filename: '暂无文件', // 文件名
      successNumbers: 0,
      failNumbers: 0,
      repeatNumbers: 0,
      loading2: false,
      expandedTree: [],
      isHaveGroup: true,
      submitBtnDsiable: false, // 提交类的按钮是否禁用
    }
  },
  watch: {
    multipleSelection() {
      if (this.multipleSelection.length > 0) {
        this.isDisable = false
      } else {
        this.isDisable = true
      }
    },
    tempTreeData() {
      if (this.tempTreeData.length > 0) {
        this.isShowAddComapnyBtn = false
      } else {
        this.isShowAddComapnyBtn = true
      }
    },
    selectTreeId() {
      // console.log(111)
      // console.log(this.selectTreeId)
      // console.log(this.selectTreeId != '')
      if(this.selectTreeId != '') {
        this.getTableList()
      }
    },
    province() {
      this.allCityList.forEach(item => {
        if(item.parentId == this.province) {
          this.cityList.push(item)
        }
      })
    },
    city() {
      this.allCityList.forEach(item => {
        if(item.parentId == this.city) {
          this.streetList.push(item)
        }
      })
    }
  },
  methods: {
    // 获取左侧通讯录列表
    getMenuList() {
      leftMenu().then(res => {
        if (res.data.status == 0) {
          this.tempTreeData = []
          this.formatTreeData(res.data.data, this.tempTreeData)
          if (res.data.data.length > 0) {
            this.selectTreeId = res.data.data[0].id
            this.isHaveGroup = true
          } else {
            this.isHaveGroup = false
          }
          res.data.data.forEach(item => {
            this.expandedTree.push(item.id)
            if (item.children.length > 0) {
              item.children.forEach(ele => {
                this.expandedTree.push(ele.id)
              })
            }
          })
       }
      })
    },
    addCompany() {

    },
    // 点击左侧树列表
    getDefaultNode(val1, val2, val3) {
      this.selectTreeId = val1.id
      // console.log(this.selectTreeId)
    },
    selectWhichTree(val){
      this.selectTreeId2 = val.id
      // console.log(this.selectTreeId2)
    },
    // 编辑分组
    editGroups(node, data) {
      this.isAddGroup = false
      this.groupDrawer = true
      this.groupFormData.groupName = data.label
      this.groupFormData.groupDescription = data.groupDescription
      this.groupFormData.parentId = data.parentId
      this.groupFormData.id = data.id
    },
    // 添加分组按钮打开弹窗
    addGroups(node, data) {
      this.isAddGroup = true
      this.groupDrawer = true
    },
    // 删除分组
    deleteGroups(node, data) {
      if (data.children && data.children.length > 0) {
        this.$confirm('分组存在子分组，请先删除该分组', {
          cancelButtonText: "取 消",
          confirmButtonText: "确 定",
          confirmButtonClass:'btn-custom-confirm',
          closeOnClickModal:false,
          center:true
        }).then(() => {

        })
        .catch(() => {})
      } else {
        this.$confirm('确认要删除该分组吗？', {
          cancelButtonText: "取 消",
          confirmButtonText: "确 定",
          confirmButtonClass:'btn-custom-confirm',
          closeOnClickModal:false,
          center:true
        }).then(() => {
          const query = {
            currentPage: this.page.currentPage,
            pageSize: this.page.pageSize,
            enterpriseAddressBookId: this.selectTreeId,
          }
          getTableList(query).then(res => {
            if (res.data.status == 0) {
              if (res.data.data.records.length == 0) {
                deleteLeftMenu({id: data.id}).then(res => {
                  if (res.data.status == 0) {
                    this.$message({
                      type: 'success',
                      message: '删除成功！',
                      center: true
                    })
                    this.getMenuList()
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
              } else {
                this.$message({
                  type: 'warning',
                  message: '分组存在用户，不允许删除；需要先将子分组或分组下面的用户转移到其他分组，才可删除该分组',
                  center:true
                })
              }
            }
          })
          }).catch(() => {})
      }
    },
    // 批量删除
    batchDelete() {
      const arr = this.multipleSelection.map(item => {
        return item.personId
      })
      const ids = arr.join(',')
       deleteAddress({ids: ids}).then(res => {
          if(res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '删除成功！',
              center: true
            })
            this.getTableList()
          } else {
            this.$message({
              type: 'error',
              message: res.data.message,
              center: true
            })
          }
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: error,
            center: true
          })
        })
    },
    // 刷新
    refresh() {
      this.getTableList()
    },
    // 重置
    reset() {
      this.page.currentPage = 1
      this.page.pageSize = 10
      this.searchValue = ''
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 点击编辑按钮
    addressEditAction(val) {
      this.personId = val.personId
      this.contactsDrawer = true
      this.isAddContacts = false
      this.provinceList = []
      this.selectTreeId2 = val.addressBookId
      this.getFormDetail(val.personId)
    },
    // 点击删除按钮
    accountDeleteAction(val) {
      this.$confirm('确定删除所选联系人？', {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        closeOnClickModal:false,
        center:true
      })
      .then(() => {
        deleteAddress({ids: val.personId}).then(res => {
          if(res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '删除成功！',
              center: true
            })
            this.getTableList()
          } else {
            this.$message({
              type: 'error',
              message: res.data.message,
              center: true
            })
          }
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: error,
            center: true
          })
        })
      })
      .catch(() => {})
    },
    // 确定导出
    confirmExport() {
      if (!this.exportFileType){
        this.$confirm('请先选择导出类型', {
          cancelButtonText: "取 消",
          confirmButtonText: "确 定",
          confirmButtonClass:'btn-custom-confirm',
          closeOnClickModal:false,
          center:true
        })
        .then(() => {})
        .catch(() => {})
      } else {
        const query = {
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize,
          enterpriseAddressBookId: this.selectTreeId,
          value: this.searchValue
        }
        this.submitBtnDsiable = true
        exportExcel({}).then(res => {
          const link = document.createElement('a')
          let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          link.download = '通讯录列表' + '.xls'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          this.exportVisible = false
          this.submitBtnDsiable = false
        }).catch(error => {
          this.$message({
            type: 'error',
            message: error,
            center: true
          })
          this.submitBtnDsiable = false
        })
      }
    },
    //每页多少条
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getTableList()
    },
    //选择页数
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.getTableList()
    },
    // 确定添加分组
    addGroup() {
      const query = {
        groupDescription: this.groupFormData.groupDescription,
        groupName: this.groupFormData.groupName,
        parentId: this.selectTreeId
      }
      this.submitBtnDsiable = true
      addLeftMenu(query).then(res => {
        if(res.data.status == 0) {
          this.$message({
            type: "success",
            message: '新增成功',
            center: true
          })
          this.getMenuList()
          this.isHaveGroup = true
          this.groupDrawer = false
          this.groupFormData.groupDescription = ''
          this.groupFormData.groupName = ''
        } else {
          this.$message({
            type: "error",
            message: '新增失败',
            center: true
          })
        }
        this.submitBtnDsiable = false
      }).catch(error => {
        this.$message({
          type: "error",
          message: error,
          center: true
        })
        this.submitBtnDsiable = false
      })
    },
    // 编辑分组
    editGroup() {
      this.submitBtnDsiable = true
      updateLeftMenu(this.groupFormData).then(res => {
        if (res.data.status == 0) {
          this.$message({
            type: 'success',
            message: '修改成功！',
            center: true
          })
          this.getMenuList()
          this.groupDrawer = false
          this.groupFormData.groupDescription = ''
          this.groupFormData.groupName = ''
        } else {
          this.$message({
            type: 'error',
            message: res.data.message,
            center: true
          })
        }
        this.submitBtnDsiable = false
      }).catch((error) => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
        this.submitBtnDsiable = false
      })
    },
    checkboxChange(value){
      // console.log(value)
      // const query = document.querySelector('.diySelect')
      // console.log(query)
      if(value) {
        console.log(value)
      }
    },
    // 关闭分组弹窗
    closeGroup() {
      this.groupDrawer = false
      this.groupFormData.groupDescription = ''
      this.groupFormData.groupName = ''
    },
    // 新增联系人
    addContactsAction() {
      if (!this.isHaveGroup) {
        this.$message({
          type:'warning',
          message: '请先创建分组',
          center: true
        })
        return
      }
      this.isAddContacts = true
      this.contactsDrawer = true
      // this.getFormDetail()
      this.getFormDetailByAdd()
      this.provinceList = []
      this.selectTreeId2 = this.selectTreeId
      // this.$refs.groupTree.setCheckedKeys([])
    },
    // 确定新增联系人
    addContacts() {
      this.$refs.contacts.validate((valid) => {
        if (valid) {
          for(let key in this.contactsFormData) {
            if (this.contactsFormData[key]  instanceof Array){
              this.contactsFormData[key] = this.contactsFormData[key].join(',')
            }
          }
          const arr = []
          for(let k in this.contactsFormData) {
            const val = {
              id: k,
              value: this.contactsFormData[k]
            }
            arr.push(val)
          }
          if (arr[0].value == '' || arr[0].value == null) {
            this.$message({
              type: 'warning',
              message: '请输入手机号',
              center: true
            })
            return
          } else if (!(/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(arr[0].value))) {
              this.$message({
                type: 'warning',
                message: '非运营商号码！',
                center: true
              })
              return
            }
          if (this.selectTreeId2 == '') {
            this.$message({
              type: 'warning',
              message: '请先选择分组',
              center: true
            })
            return
          }
          const query = {
            addressBookId: this.selectTreeId2,
            idValueList: arr
          }
          // console.log(query)
          // return
          this.submitBtnDsiable = true
          addAddress(query).then(res => {
            if (res.data.status == 0) {
              this.$message({
                type: 'success',
                message: '新增成功!',
                center: true
              })
              this.getTableList()
              this.contactsDrawer = false
            } else {
              this.$message({
                type: 'error',
                message: res.data.message,
                center: true
              })
            }
            this.submitBtnDsiable = false
          }).catch(error => {
            this.$message({
              type: 'error',
              message: error,
              center: true
            })
            this.submitBtnDsiable = false
          })
        }
        else {
          console.log('error submit')
        }
      })
    },
    // 级联选择器选择事件
    cascaderChange(val, id){
      // console.log(val, id)
    },
    // 确定编辑联系人
    editContacts() {
      this.$refs.contacts.validate((valid) => {
        if (valid) {
          // this.contactsDrawer = false
          for(let key in this.contactsFormData) {
            if (this.contactsFormData[key]  instanceof Array){
              this.contactsFormData[key] = this.contactsFormData[key].join(',')
            }
          }
          const arr = []
          for(let k in this.contactsFormData) {
            const val = {
              id: k,
              value: this.contactsFormData[k]
            }
            arr.push(val)
          }
          if (arr[0].value == '' || arr[0].value == null) {
            this.$message({
              type: 'warning',
              message: '请输入手机号',
              center: true
            })
            return
          } else if (!(/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(arr[0].value))) {
            this.$message({
              type: 'warning',
              message: '非运营商号码！',
              center: true
            })
            return
          }
          const query = {
            addressBookId: this.selectTreeId2,
            idValueList: arr,
            personId: this.personId
          }
          this.submitBtnDsiable = true
          updateAddress(query).then(res => {
            if (res.data.status == 0) {
              this.$message({
                type: 'success',
                message: '修改成功!',
                center: true
              })
              this.getTableList()
              this.contactsDrawer = false
            } else {
              this.$message({
                type: 'error',
                message: res.data.message,
                center: true
              })
            }
            this.submitBtnDsiable = false
          }).catch(error => {
            this.$message({
              type: 'error',
              message: error,
              center: true
            })
            this.submitBtnDsiable = false
          })
        }
        else {
          console.log('error submit')
        }
      })
    },
    // 关闭编辑联系人弹框
    cancleContacts() {
      this.contactsDrawer = false
      this.$refs.groupTree.setCheckedKeys([])
      this.$refs.contacts.resetFields();
      this.tempSelectTreeId = ''
    },
    // 级联选择
    handleChangeArea(val) {
      console.log(val)
    },
    // 导入联系人
    importContacts() {
      this.importContactsVisible = true
      this.filename = '暂无文件'
      this.percentage = 0
      this.successNumbers = 0
      this.failNumbers = 0
      this.repeatNumbers = 0
      this.$nextTick(() => {
        this.$refs.importAddress.clearFiles()
      })
    },
    // 导出联系人
    exportExcel(){
      this.exportVisible = true
      this.exportFileType = false
    },
    // 格式化树数据
    formatTreeData(data, tempTreeData){
      data.forEach(element => {
        const val = {
          id: element.id,
          label: element.name,
          groupDescription: element.extendData,
          parentId: element.parentId
        }
        tempTreeData.push(val)
        if (element.children.length > 0) {
          val.children = []
          this.formatTreeData(element.children, val.children)
        }
      })
    },
    // 获取表头数据
    getTableHead(){
      this.tableHead = []
      this.loading = true
      getHeadList().then(res => {
        if (res.data.status == 0) {
          const data = res.data.data
          data.forEach(item => {
            const val = {
              label: item.fieldName,
              prop: item.id+''
            }
            if (item.showFlag) {
              this.tableHead.push(val)
            }
            if (item.searchFlag) {
              // const temp = {
              //   id: item.id,
              //   label: item.fieldName,
              //   value: ''
              // }
              item.value = ''
              this.canSearch.push(item)
            }
          })
          this.canSearch.shift()
          // console.log(this.canSearch)
        }
        this.loading = false
      })
    },
    // 获取表格数据
    getTableList() {
      const value = []
      if (this.searchValue != '') {
        const val = {
          id: 1,
          value: this.searchValue
        }
        value.push(val)
      }
      if(this.canSearch.length > 0) {
        this.canSearch.forEach(item => {
          if(item.value != '') {
            const val = {
              id: item.id
            }
            if (item.value instanceof Array){
              val.value = item.value[item.value.length-1]
            } else {
              val.value = item.value
            }
            value.push(val)
          }
        })
      }
      // console.log(value)
      const query = {
        currentPage: this.page.currentPage,
        pageSize: this.page.pageSize,
        enterpriseAddressBookId: this.selectTreeId,
        columnIdValueList: value
      }
      this.loading = true
      getTableList(query).then(res => {
        if(res.data.status == 0) {
          const data = res.data.data
          this.page.total = data.total
          this.tableData = data.records
        }
        this.loading = false
      }).catch(error => {
        this.$message({
          type:'error',
          message: error,
          center: true
        })
        this.loading = false
      })
    },
    // 获取表单详情
    getFormDetail(id) {
      this.loading2 = true
      formItem({personId: id}).then(res => {
        const tempData = {}
        if(res.data.status == 0) {
          const data = res.data.data
          this.formItemList = data
          data.forEach(item => {
            this.allCityList = []
            if (item.fieldValue != null ) {
              if (item.fieldStyle == 8 || item.fieldStyle == 10) {
                item.fieldValue = parseInt(item.fieldValue)
              } else if(item.fieldStyle == 9) {
                if (item.fieldValue.indexOf(',') > -1) {
                  item.fieldValue = item.fieldValue.split(',')
                } else {
                  item.fieldValue = [item.fieldValue+'']
                }
              }
            }
            if (item.fieldStyle == 1) {
              tempData[item.id] = Number(item.fieldValue)
            } else {
              tempData[item.id] = item.fieldValue
            }
            if (item.fieldStyle == 10) {
              this.handleTreeData(item.itemList, this.allCityList)
              item.itemList = this.allCityList
            }
          })
          this.contactsFormData = tempData
        }
        this.loading2 = false
      }).catch(error => {
        this.$message({
          type: 'center',
          message: error,
          center: true
        })
        this.loading2 = false
      })
    },
    // 新增的时候获取表单的详情
    async getFormDetailByAdd(id) {
      this.loading2 = true
      await formItem({personId: id}).then(res => {
        if (res.data.status == 0) {
          const data  = res.data.data
          this.formItemList = data
          data.forEach(item => {
            this.allCityList = []
            if (item.fieldStyle == 10 || item.fieldStyle == 9) {
              this.$set(this.contactsFormData, item.id, [])
            } else {
              this.$set(this.contactsFormData, item.id, '')
            }
            if (item.fieldStyle == 10) {
              this.handleTreeData(item.itemList, this.allCityList)
              item.itemList = this.allCityList
            }
          })
          // console.log(this.contactsFormData)
        }
        this.loading2 = false
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
        this.loading2 = false
      })
    },
    searchItem(id){
      console.log(id)
    },
    // 键盘回车事件
    keyDown(e) {
      if(e.keyCode == 13) {
        this.getTableList()
      }
    },
    // 多选框触发事件
    mutiChange(val,val2,val3) {
      // console.log(val)
      // console.log(val2)
      // console.log(val3)
    },
    provinceChange(val, val2){
      this.contactsFormData[val2] = []
      this.contactsFormData[val2][0] = val
      this.province = val
    },
    cityChange(val, val2) {
      this.contactsFormData[val2][1] = val
      this.city = val
    },
    streetChange(val, val2) {
      this.contactsFormData[val2][2] = val
      this.street = val
    },
    // 处理树形结构数据
    handleTreeData(data, result) {
      if(data && data.length) {
        data.forEach(item => {
          const val = {}
          val.label = item.content
          val.value = item.id
          if (item.childList) {
            val.children = []
            this.handleTreeData(item.childList, val.children)
          }
          result.push(val)
        })
      }
    },
    handleCheckChange(data, checked, indeterminate){
      // if(!checked) {
      //   this.tempSelectTree = []
      // }
      const index = this.tempSelectTree.indexOf(data.id)
      console.log(index, this.tempSelectTree)
      if (index < 0 && this.tempSelectTree.length >= 1 && checked) {
        this.$message({
          message: '只能选择一个区域！',
          type: 'error',
          showClose: true
        })
        this.$refs.groupTree.setChecked(data, false)
      } else if(this.tempSelectTree.length === 0 && checked) {
        this.addressBookId = data.id
        this.tempSelectTree = []
        this.tempSelectTree.push(data.id)
      } else if (index >= 0 && this.tempSelectTree.length === 1 && !checked) {
        this.tempSelectTree = []
      }
    },
    showSearch() {
      this.showMore = !this.showMore
    },
    beforeImport(file) {
      // console.log(file)
      this.filename = file.name
      this.percentage = file.percentage > 100 ? 100 : file.percentage
      // this.successNumbers = 0
      // this.failNumbers = 0
      // this.repeatNumbers = 0
      this.readWorkBook(file.raw, this.readExcel)
    },
    readWorkBook(file, callback){
      const reader = new FileReader()
        try {
          reader.onload = e => {
          const data = e.target.result
          const workbook = XLSX.read(data, {type: 'binary'})
          if(callback) callback(workbook)
        }
        reader.readAsBinaryString(file)
      } catch(e) {
        console.log(e)
        return
      }
    },
    readExcel(workbook) {
      var sheetNames = workbook.SheetNames; // 工作表名称集合
      var worksheet = workbook.Sheets[sheetNames[0]]; // 这里我们只读取第一张sheet
      var csv = XLSX.utils.sheet_to_csv(worksheet);
      var rows = csv.split('\n')
      const result = rows[0].split(',')
      this.canSearch.forEach(item => {

      })
    },
    importExcelFile(file) {
      const formData = new FormData()
      formData.append('file', file.file)
      formData.append('addressBookId', this.selectTreeId2)
      importFile(formData, file, Progress => {
        console.log(Progress)
      })
    },
    submitImport() {
      if (this.selectTreeId2 == '') {
        this.$message({
          type: 'warning',
          message: '请先选择分组',
          center: true
        })
        return
      }
      if (this.filename == '暂无文件') {
        this.$message({
          type: 'warning',
          message: '请先选择文件',
          center: true
        })
        return
      }
      this.submitBtnDsiable = true
      this.$refs.importAddress.submit()
    },
    // 上传成功回调钩子函数
    importSuccess(response, file, fileList) {
      if (response.data.status == 0) {
        if (response.data.data.errorMsgList.length > 0) {
          this.successNumbers = response.data.data.successAmount
          this.failNumbers = response.data.data.errorAmount
          this.repeatNumbers = response.data.data.repeatAmount
          const arr = response.data.data.errorMsgList.join("\r\n")
          this.$message({
            type: 'error',
            message: arr,
            center: true
          })
        } else {
          this.successNumbers = response.data.data.successAmount
          this.failNumbers = response.data.data.errorAmount
          this.repeatNumbers = response.data.data.repeatAmount
          this.$message({
            type: 'success',
            message:'导入成功!',
            center: true
          })
          this.getTableList()
          this.importContactsVisible = false
        }
        this.submitBtnDsiable = false
      } else {
        this.$message({
          type: 'error',
          message:response.data.message,
          center: true
        })
        this.submitBtnDsiable = false
      }
      // console.log(this.successNumbers, this.failNumbers, this.repeatNumbers)
    },
    // 上传时回调钩子函数
    importing(event, file, fileList) {
      // console.log(event)
      // console.log(file)
      // console.log(fileList)
      // this.percentage = Math.floor(event.percent)
      // console.log(this.percentage)
    },
    // 上传失败回调钩子函数
    importError(err, file, fileList) {
      console.log(err)
      console.log(file)
      console.log(fileList)
      this.$message({
        type: 'error',
        message: err,
        center: true
      })
    },
    // 导出模板
    exportTemplate() {
      exportTemplate({}).then(res => {
        const link = document.createElement('a')
          let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          link.download = '通讯录模板' + '.xls'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
      }).catch(error => {
        this.$message({
            type: 'error',
            message: error,
            center: true
          })
      })
    },
    inputValue(e, id) {
      this.contactsFormData[id] = e.target.value
    },
    testUrl(e, id) {
      if (/^((ht|f)tps?):\/\/([\w-]+(\.[\w-]+)*\/?)+(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?$/.test(e.target.value) == false) {
        this.contactsFormData[id] = ''
        this.$message({
          type: 'warning',
          message: '请输入合法的url链接!',
          center: true
        })
      }
    }
  },
  created(){

  },
  mounted(){
    window.addEventListener('keydown', this.keyDown)
    this.getMenuList()
    this.getTableHead()
    // this.getTableList()
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDown, false)
  }
}
</script>

<style lang="less" scoped>
#personAddressBook{
  width: 100%;
  height: 100%;
  color: #333;
  letter-spacing: 0.75px;
  // padding: 0 70px;
  box-sizing: border-box;
  .title{
    height: 96px;
    line-height: 96px;
    font-size: 20px;
    padding-left: 70px;
  }
  .container{
    width: 100%;
    height: calc(100vh - 176px) ;
    display: flex;
    .container-left{
      width: 276px;
      overflow: auto;
      box-sizing: border-box;
      border-right: 1px solid #e5e5e5;
      .addCompany{
        text-align: center;
        margin-bottom: 50px;
      }
      /deep/ .el-tree{
        margin: 0 20px;
        overflow: auto;
        color: #333;
        min-width: 85%;
        display:inline-block !important;
        font-size: 14px;
        /deep/ .el-tree-node{
          overflow-x: hidden;
        }
        /deep/.el-tree-node__children{
          color: #666;
        }
      }
      .custom-tree-node1{
        display: flex;
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
      /deep/ .el-tree-node__content {
        height: 34px;
      }
      /deep/ .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
        background-color: #F8F8FB;
      }
    }
    .container-right{
      width: calc(100% - 276px);
      padding: 0 28px 0 10px;
      box-sizing: border-box;
      .headerBtn{
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .headerBtnLeft{
          display: flex;
          align-items: center;
        }
        .headerBtnRight{
          display: flex;
          align-items: center;
          .diyBtn{
            color: #368CFE;
            border: 1px solid rgba(54,140,254,0.5);
          }
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
      .container-right-body{
        margin-top: 10px;
        .footer_page{
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
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
  .search-center{
    display: flex;
    align-items: center;
  }
  .mutiSelect{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .form-item-tree{
    /deep/ .el-form-item__content{
      margin-top: 7px;
    }
  }
  .collpase-input{
    display: flex;
    justify-content: flex-start;
    // margin-bottom: 10px;
  }
  .special-tree {
    /deep/  .el-tree-node__expand-icon.is-leaf::before{
      display: none;
    }
  }
  /deep/ .el-dialog__footer{
    text-align: center;
  }
  /deep/ .el-dialog__body{
    padding: 20px 50px 20px 40px;
  }
  /deep/ .el-drawer__wrapper .el-drawer__body{
    padding: 0 50px;
  }
  /deep/ .el-form-item{
    margin-bottom: 15px;
  }
  /deep/ .el-progress-bar__inner{
    background-color: #FE9636;
  }
  /deep/ .el-dialog__header{
    border-bottom: 1px solid #eee;
  }
  /deep/ .el-drawer__wrapper.el-input{
    width: 100%;
  }
  /deep/ .el-drawer__wrapper .el-input{
    width: auto;
  }
  .table{
    /deep/ .el-table__fixed-body-wrapper{
      top: 41px !important;
    }
  }
}
</style>
