<template>
<!-- 通讯录管理 -->
  <div id="manageAddressBook">
    <div class="title">通讯录管理</div>
    <div class="container">
      <div class="top">
        <el-button size="small" type="primary" icon="el-icon-plus" @click="addDiyFild" v-has="'customColumnAdd'">添加自定义字段</el-button>
      </div>
      <div class="bottom">
        <el-table
          v-loading="loading"
          element-loading-text="加载中..."
          border
          size="small"
          :data="tableData"
          :height="tableHeight"
          :header-cell-style="{background:'#F5F7FA',color:'#333333'}">
          <el-table-column label="字段名称" prop="fieldName" show-overflow-tooltip></el-table-column>
          <el-table-column label="字段类型" prop="systemFlagStr"></el-table-column>
          <el-table-column label="字段样式" prop="fieldStyleStr"></el-table-column>
          <el-table-column label="使用" prop="useFlag" width="90">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.useFlag" :disabled="scope.$index === disabledIndex" @change="checked => changeStatus(checked, scope.row.id, 1)"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="必填" prop="mustFlag" width="90">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.mustFlag" :disabled="scope.$index === disabledIndex" @change="checked => changeStatus(checked, scope.row.id, 2)"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="列表显示" prop="showFlag" width="90">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.showFlag" :disabled="scope.$index === disabledIndex" @change="checked => changeStatus(checked, scope.row.id, 3)"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="检索" prop="searchFlag" width="90">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.searchFlag" :disabled="scope.$index === disabledIndex" @change="checked => changeStatus(checked, scope.row.id, 4)"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="描述" prop="fieldDescription" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <!-- <el-tooltip class="item" effect="dark" content="上移" placement="top">
                <img class="operation" v-if="scope.$index == 0"  src="../../assets/svg/move_up_gray.svg">
                <img class="operation" v-else @click="moveUp(scope)" src="../../assets/svg/move_up.svg">
              </el-tooltip> -->
              <span class="operation" v-if="scope.$index !== 0" @click="moveUp(scope)">上移</span>
              <!-- <el-tooltip class="item" effect="dark" content="下移" placement="top">
                <img class="operation"  v-if="scope.$index == tableData.length - 1"  src="../../assets/svg/move_down_gray.svg">
                <img class="operation" @click="moveDown(scope)" v-else src="../../assets/svg/move_down.svg">
              </el-tooltip> -->
              <span class="operation" v-if="scope.$index !== tableData.length - 1" @click="moveDown(scope)">下移</span>
              <!-- <el-tooltip class="item" effect="dark" content="修改" placement="top">
                <img class="operation" src="../../assets/svg/edit_icon.svg" v-has="'customColumnUpdate'" @click="editField(scope.row)">
              </el-tooltip> -->
              <span class="operation" v-has="'customColumnUpdate'" @click="editField(scope.row)">修改</span>
              <!-- <el-tooltip  class="item" effect="dark" content="删除" placement="top">
                <img class="operation"  src="../../assets/svg/delete_icon.svg" @click="deleteFields(scope.row.id)" v-has="'customColumnDelete'" v-if="scope.row.systemFlag">
              </el-tooltip> -->
              <span class="operation" @click="deleteFields(scope.row.id)" v-has="'customColumnDelete'" v-if="scope.row.systemFlag">删除</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="addDiyVisible"
      :close-on-click-modal="false"
      width="800px"
      >
      <!-- 第一步 -->
      <template v-if="step == 1">
        <el-table
          border
          size="small"
          :data="selectTableData"
          max-height="400px"
          :header-cell-style="{background:'#F5F7FA',color:'#333333'}">
          <el-table-column label="类型名称" prop="typeName" width="120">

          </el-table-column>
          <el-table-column label="类型模板" width="330">
            <template slot-scope="scope">
              <!-- 1是单行文本输入框 -->
              <el-input v-if="scope.row.type == 1" size="small" v-model="scope.row.value" readonly></el-input>
              <!-- 2是下拉选择框 -->
              <el-select v-else-if="scope.row.type == 2" size="small" readonly v-model="scope.row.value" style="width:100%">
                <el-option value="1" label="选项一"></el-option>
                <el-option value="2" label="选项二"></el-option>
              </el-select>
              <!-- 3是级联选择器 -->
              <template v-else-if="scope.row.type == 3" class="muti-choose">
                <el-select size="small" style="width:32%" placeholder="第一级" v-model="scope.row.value1">
                  <el-option value="1" label="选项一">选项一</el-option>
                  <el-option value="2" label="选项二">选项二</el-option>
                </el-select>
                <el-select size="small" style="width:32%" placeholder="第二级" v-model="scope.row.value2">
                  <el-option value="1" label="选项一">选项一</el-option>
                  <el-option value="2" label="选项二">选项二</el-option>
                </el-select>
                <el-select size="small" style="width:32%" placeholder="第三级" v-model="scope.row.value3">
                  <el-option value="1" label="选项一">选项一</el-option>
                  <el-option value="2" label="选项二">选项二</el-option>
                </el-select>
              </template>
              <!-- 4是单选框 -->
              <template v-else-if="scope.row.type == 4">
                <el-radio v-model="scope.row.value" label="1">备选项</el-radio>
                <el-radio v-model="scope.row.value" label="2">备选项</el-radio>
              </template>
              <!-- 5是多选框 -->
              <template v-else-if="scope.row.type == 5">
                <el-checkbox v-model="scope.row.value1">备选项1</el-checkbox>
                <el-checkbox v-model="scope.row.value2">备选项</el-checkbox>
              </template>
              <!-- 6是多行文本 -->
              <template v-else-if="scope.row.type == 6">
                <el-input size="small" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="scope.row.value" readonly></el-input>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="类型描述" prop="typeDescribe" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作" width="55">
            <template slot-scope="scope">
              <img class="operation" @click="selectedType(scope.row)" :src="currentSelect === scope.row.index ? src1 : src2" >
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 第二步 -->
      <template v-else>
        <el-form label-width="110px" ref="addForm" :model="addFormData" :rules="addFormRules">
          <el-form-item label="标题:" prop="fieldName">
            <el-input size="small" :readonly="readOnly" v-model="addFormData.fieldName" maxlength="20" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="描述:">
            <el-input size="small" v-model="addFormData.fieldDescription" maxlength="100" show-word-limit type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
          </el-form-item>
          <el-form-item label="必填项:">
            <el-checkbox  v-model="addFormData.mustFlag">必填项</el-checkbox><br/>
            <span class="tip">勾选此项，添加和修改联系人信息时该字段必须填写</span>
          </el-form-item>
          <el-form-item label="修改:">
            <el-checkbox  v-model="addFormData.updateFlag">禁止修改</el-checkbox><br/>
            <span class="tip">勾选此项，该字段将禁止修改</span>
          </el-form-item>
          <el-form-item v-if="fieldType == 3" label="下拉选择器:" class="select-area">
            <h-select :value="province" :read-only="readOnly" ref="hselect1" @changeValue="provinceChange" @delete="deleteProvince" @selectChange="selectChange(arguments)"></h-select>
            <h-select :value="city" :read-only="readOnly" ref="hselect2" @changeValue="cityChange" @delete="deleteCity" @selectChange="citySelect(arguments)"></h-select>
            <h-select :value="street" :read-only="readOnly" ref="hselect3" @changeValue="streetChange" @delete="deleteStreet"></h-select>
          </el-form-item>
          <el-form-item v-if="fieldType == 2" label="选项设置:">
            <div class="select-item">
              <div class="select-top" v-for="(item,index) in addFormData.itemList" :key="index">
                <div class="select-top-left">
                  <div style="width:15%">选项{{index+1}}</div>
                  <el-input v-model="item.content" :readonly="readOnly" size="small"></el-input>
                </div>
                <img src="../../assets/svg/icon_24px_remove.svg" @click="deleteOneLine(index)" v-if="!readOnly" />
              </div>
              <div>
                <label class="select-bottom" v-if="!readOnly">
                    <span @click="addNewLine">增加选项</span>
                    <img @click="addNewLine" src="../../assets/svg/icon_24px_add_circle.svg" />
                </label>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" v-if="step == 1" type="primary" @click="nextStep">下一步</el-button>
        <el-button size="small" v-if="step == 2 && isAdd"  @click="lastStep">上一步</el-button>
        <el-button size="small" v-if="step == 2 && isAdd" type="primary" :disabled="canClick" @click="addFildSubmit">确 定</el-button>
        <el-button size="small" v-if="step == 2 && !isAdd" type="primary" :disabled="canClick" @click="updateFields">确 定</el-button>
        <el-button size="small" v-if="step == 1 || !isAdd" @click="addDiyVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import HSelect from '@/components/HSelect.vue'
import { throttle } from '@/utils/util'
import { manageAddressList,updateStatus, deleteField, changeOrder, addField, fieldDetail, updateField } from '@/api/addressBook/manage'
export default {
  components: {
    HSelect
  },
  data() {
    return {
      loading: false,
      tableData: [],
      addDiyVisible: false,
      disabledIndex: '',
      tableHeight:window.innerHeight - 300 +'', // 表格高度
      // 弹窗的表格数据
      selectTableData: [
        {
          index: 0,
          typeName: '单行文本',
          type: 1,
          typeDescribe: '获取少量单行文本',
          value: '单行文本'
        },
        {
          index: 1,
          typeName: '下拉列表',
          type: 2,
          typeDescribe: '下拉列表',
          value: '1'
        },
        {
          index: 2,
          typeName: '日期',
          type: 1,
          typeDescribe: '获取日期，比如2020/10/01',
          value: '2020/10/01'
        },
        {
          index: 3,
          typeName: '时间',
          type: 1,
          typeDescribe: '获取时间，比如10:10:10',
          value: '10:10:10'
        },
        {
          index: 4,
          typeName: '日期时间',
          type: 1,
          typeDescribe: '获取日期，比如2020/10/01 10:10:10',
          value: '2020/10/01 10:10:10'
        },
        {
          index: 5,
          typeName: '数值',
          type: 1,
          typeDescribe: '带有小数位的数值，比如1.28',
          value: '3.1415'
        },
        {
          index: 6,
          typeName: '正整数',
          type: 1,
          typeDescribe: '正整数，比如128',
          value: '3'
        },
        {
          index: 7,
          typeName: '链接',
          type: 1,
          typeDescribe: '获取链接',
          value: 'https://www.baidu.com'
        },
        {
          index: 8,
          typeName: '单选框',
          type: 4,
          typeDescribe: '多选框',
          value: '',
        },
        {
          index: 9,
          typeName: '多选框',
          type: 5,
          typeDescribe: '多选，可以选中多个选项',
          value1: true,
          value2: true
        },
        {
          index: 10,
          typeName: '级联选择器',
          type: 3,
          typeDescribe: '级联选择器',
          value: 1,
          value1: '',
          value2: '',
          value3: ''
        },
        {
          index: 11,
          typeName: '多行文本',
          type: 6,
          typeDescribe: '多行文本，可以输入较多的内容',
          value: '多行文本，可以输入较多的内容',
        },
      ],
      currentSelect: '', // 当前选择的哪一行
      step: 1,  // 当前处于哪一步
      type: 0,  // 当前选择得类型
      fieldType: 0,  // 新增字段类型
      src1: require('../../assets/svg/icon_24px_select.svg'),
      src2: require('../../assets/svg/icon_24px_selected.svg'),
      // 单行文本字段表单
      addFormData: {
        cascadeList: [],  //
        fieldDescription: '',  // 字段描述
        fieldName: '',  // 字段名称
        fieldStyle: '',  // 字段类型
        itemList: [
          {
            id: '',
            content: ''
          }
        ],  // 下拉，单选，多选选项list
        mustFlag: 0,  // 必填项：0非必填，1必填
        updateFlag: 0  // 是否允许修改：0否，1是
      },
      addFormRules: {
        fieldName: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      },
      isAdd: true,  // true新增，false编辑
      province: [],
      city: [],
      street: [],
      readOnly: false,
      canClick: false, // 防止多次点击
      // cascadeList: []
      currentProvince: '',  // 当前的一级选择
      currentCity: '', // 当前的二级选择

    }
  },
  computed: {
    'title': function () {
      let tempTitle = ''
      if (this.step == 1) {
        tempTitle = this.isAdd ? '新增自定义字段' : '修改自定义字段'
      } else {
        switch(this.type){
        case 0:
          tempTitle = this.isAdd ? '新增单行文本字段' : '修改单行文本字段'
          this.fieldType = 1   // 单行文本
          break
        case 2:
          tempTitle = this.isAdd ?  '新增日期字段' : '修改日期字段'
          this.fieldType = 1   // 单行文本
          break
        case 3:
          tempTitle = this.isAdd ? '新增时间字段' : '修改时间字段'
          this.fieldType = 1   // 单行文本
          break
        case 4:
          tempTitle = this.isAdd ? '新增日期与时间字段' : '修改日期与时间字段'
          this.fieldType = 1   // 单行文本
          break
        case 5:
          tempTitle = this.isAdd ?  '新增数值字段' : '修改数值字段'
          this.fieldType = 1   // 单行文本
          break
        case 6:
          tempTitle = this.isAdd ?  '新增正整数字段' : '修改正整数字段'
          this.fieldType = 1   // 单行文本
          break
        case 7:
          tempTitle = this.isAdd ? '新增链接字段': '修改链接字段'
          this.fieldType = 1   // 单行文本
          break
        case 1:
          tempTitle = this.isAdd ? '新增下拉列表字段': '修改下拉列表字段'
          this.fieldType = 2 // 下拉列表
          break
        case 8:
          tempTitle =  this.isAdd ? '新增单选框字段' : '修改单选框字段'
          this.fieldType = 2 // 单选框
          break
        case 9:
          tempTitle = this.isAdd ? '新增多选框字段': '修改多选框字段'
          this.fieldType = 2 // 多选框
          break
        case 10:
          tempTitle = this.isAdd ? '新增级联列表字段': '修改级联列表字段'
          this.fieldType = 3 // 级联选择器
          break
        case 11:
          tempTitle = this.isAdd ? '新增多行文本字段': '修改多行文本字段'
          this.fieldType = 1 // 多行文本
          break
      }
      }
      return tempTitle
    }
  },
  watch: {
    // province() {
    //   console.log(this.province)
    //   this.city = this.province.childList
    // },
    // city() {
    //   this.street = this.city.childList
    // }
  },
  methods: {
    // 获取列表数据
    getList() {
      this.loading = true
      manageAddressList().then(res => {
        if (res.data.status == 0) {
          const data = res.data.data
          data.forEach((element,index) => {
            if (element.fieldName == '手机号'){
              this.disabledIndex = index
            }
            element.useFlag = element.useFlag == 1 ? true : false
            element.mustFlag = element.mustFlag == 1 ? true : false
            element.showFlag = element.showFlag == 1 ? true : false
            element.searchFlag = element.searchFlag == 1 ? true : false
          });
          this.tableData = data
        } else {
          this.$message({
            type: 'error',
            message: res.data.message,
            center: true
          })
        }
        this.loading = false
      }).catch((error) => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
        this.loading = false
      })
    },
    // 点击改变状态
    changeStatus(val, id, fieldStyle){
      const query = {
        "checkStatus": val == true ? 1: 0,
        "id": id,
        "type": fieldStyle
      }
      updateStatus(query).then(res => {
        if (res.data.status == 0) {
          this.$message({
            type: 'success',
            message: '操作成功!',
            center: true
          })
          this.getList()
        } else {
          this.$message({
            type: 'error',
            message: '操作失败!',
            center: true
          })
        }
      })
    },
    // 上移
    moveUp(val) {
      const query = {
        sourceId: val.row.id,
        targetId: this.tableData[val.$index - 1].id
      }
      changeOrder(query).then(res => {
        if (res.data.status == 0) {
          this.$message({
            type: 'success',
            message: '操作成功!',
            center: true
          })
          this.getList()
        } else {
          this.$message({
            type: 'error',
            message: '操作失败!',
            center: true
          })
        }
      })
    },
    moveDown(val) {
      const query = {
        sourceId: val.row.id,
        targetId: this.tableData[val.$index + 1].id
      }
      changeOrder(query).then(res => {
        if (res.data.status == 0) {
          this.$message({
            type: 'success',
            message: '操作成功!',
            center: true
          })
          this.getList()
        } else {
          this.$message({
            type: 'error',
            message: '操作失败!',
            center: true
          })
        }
      })
    },
    // 删除字段
    deleteFields(val){
      this.$confirm('确定要删除该字段嘛?', {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        closeOnClickModal:false,
        center:true
      }).then(() => {
        deleteField({id: val}).then(res => {
          if (res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '删除成功!',
              center: true
            })
            this.getList()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!',
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
      }).catch(() =>{})
    },
    // 添加自定义字段
    addDiyFild() {
      this.addDiyVisible = true
      this.step = 1
      this.currentSelect = ''
      this.isAdd = true
      this.readOnly = false
      this.addFormData = this.$options.data().addFormData
      this.province = []
      this.city = []
      this.street = []
      if (this.$refs.hselect1) {
        this.$refs.hselect1.clear()
      }
      if (this.$refs.hselect2) {
        this.$refs.hselect2.clear()
      }
      if (this.$refs.hselect3) {
        this.$refs.hselect3.clear()
      }
      if (this.$refs.addForm) {
        this.$refs.addForm.clearValidate()
        this.$refs.addForm.resetFields()
      }
    },
    selectedType(val) {
      this.currentSelect = val.index
      this.type = val.index
    },
    //下一步
    nextStep() {
      if (this.currentSelect === '') {
        this.$confirm('请先选择类型', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          confirmButtonClass:'btn-custom-confirm',
          center:true
        }).then(() => {
          // this.step = 2
        }).catch(() => {})
      } else {
        this.step = 2
      }
    },
    lastStep() {
      this.step = 1
    },
    // 确定添加
    addFildSubmit() {
      this.addFormData.fieldStyle = this.type
      this.addFormData.mustFlag = this.addFormData.mustFlag === true ? 1: 0
      this.addFormData.updateFlag = this.addFormData.updateFlag === true ? 1: 0
      this.addFormData.cascadeList = this.province
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.canClick = true
          let tempFlag = false
          if(this.addFormData.fieldStyle == 1 && this.addFormData.itemList.length > 0) {
            this.addFormData.itemList.forEach(item => {
              if (item.content == '') {
                tempFlag = true
                return
              }
            })
          }
          if (tempFlag) {
            this.$message({
              type: 'warning',
              message: '下拉选项的值不能为空！',
              center: true
            })
            this.canClick = false
            return
          }
          addField(this.addFormData).then(res => {
            if(res.data.status == 0) {
              this.$message({
                type: 'success',
                message: '新增成功!',
                center: true
              })
              this.getList()
              this.addDiyVisible = false
              this.province = []
              this.addFormData = this.$options.data().addFormData
              this.$refs.addForm.clearValidate()
              this.$refs.addForm.resetFields();
            } else {
              this.$message({
                type: 'error',
                message: res.data.message,
                center: true
              })
            }
            this.canClick = false
            }).catch((error) => {
              this.$message({
                type: 'error',
                message: error,
                center: true
              })
              this.canClick = false
            })
        }
      })
    },
    // 关闭新增类型弹窗
    closeAddFild() {
      this.addDiyVisible = false
      this.step = 1
    },
    // 当是下拉列表时新增一行
    addNewLine() {
      const val = {
        id: '',
        content: ''
      }
      if(this.addFormData.itemList == null) {
        this.addFormData.itemList= []
      }
      this.addFormData.itemList.push(val)
    },
    // 删除一行
    deleteOneLine(index){
      this.addFormData.itemList.splice(index, 1)
    },
    // 编辑修改字段
    editField(val){
      if (this.$refs.hselect1) {
        this.$refs.hselect1.clear()
      }
      if (this.$refs.hselect2) {
        this.$refs.hselect2.clear()
      }
      if (this.$refs.hselect3) {
        this.$refs.hselect3.clear()
      }
      if (!val.systemFlag) {
        this.readOnly = true
      } else {
        this.readOnly = false
      }
      this.isAdd = false
      this.step = 2
      this.addDiyVisible = true
      this.type = val.fieldStyle
      fieldDetail({id:val.id}).then(res => {
        if(res.data.status == 0) {
          res.data.data.mustFlag = res.data.data.mustFlag == 1 ? true : false
          res.data.data.updateFlag = res.data.data.updateFlag == 1 ? true : false
          // this.addFormData = Object.assign({}, res.data.data)
          this.addFormData.fieldDescription = res.data.data.fieldDescription
          this.addFormData.fieldName = res.data.data.fieldName
          this.addFormData.fieldStyle = res.data.data.fieldStyle
          this.addFormData.fieldStyleStr = res.data.data.fieldStyleStr
          this.addFormData.id = res.data.data.id
          this.addFormData.itemList = res.data.data.itemList
          if(res.data.data.fieldStyle == 10) {
            this.province = res.data.data.itemList || []
          } else {
            this.addFormData.itemList = res.data.data.itemList
          }
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
    updateFields() {
      this.canClick = true
      const updateData = Object.assign({}, this.addFormData)
      updateData.cascadeList = this.province
      updateData.mustFlag = updateData.mustFlag === true ? 1: 0
      updateData.updateFlag = updateData.updateFlag === true ? 1: 0
      updateField(updateData).then(res => {
        if (res.data.status == 0) {
          this.$message({
            type: 'success',
            message: '修改成功！',
            center: true
          })
          this.getList()
          this.province = []
          this.addDiyVisible = false
        } else {
          this.$message({
            type: 'error',
            message: res.data.message,
            center: true
          })
        }
        this.canClick = false
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
        this.canClick = false
      })
    },
    provinceChange(val) {
      const temp = {
        content: val,
        value: val,
        show: false,
        childList: []
      }
      this.city = []
      this.street = []
      this.province.push(temp)
    },
    deleteProvince(val) {
      this.province.splice(val, 1)
    },
    cityChange(val) {
      const temp = {
        content: val,
        value: val,
        show: false,
        childList: []
      }
      this.street = []
      this.city.push(temp)
    },
    deleteCity(val) {
      this.city.splice(val, 1)
    },
    streetChange(val) {
      const temp = {
        content: val,
        value: val,
        show: false,
        childList: []
      }
      this.street.push(temp)
    },
    deleteStreet(val) {
      this.street.splice(val, 1)
    },
    selectChange(val) {
      if (val.length != 1) {
        this.city = val[0]
        this.currentProvince = val[1]
        this.$refs.hselect2.clearValue()
        this.$refs.hselect3.clearValue()
        if (this.addFormData.itemList == null) {
          this.addFormData.itemList = this.province
        }
        this.addFormData.itemList[this.currentProvince].childList = this.city
      }
    },
    citySelect(val) {
      if (val.length != 1) {
        this.street = val[0]
        this.currentCity = val[1]
        this.$refs.hselect3.clearValue()
        this.addFormData.itemList[this.currentProvince].childList[this.currentCity].childList = this.street
      }
    }
  },
  created(){

  },
  mounted(){
    this.getList()
  }
}
</script>

<style lang="less" scoped>
#manageAddressBook{
  width: 100%;
  height: 100%;
  color: #333;
  letter-spacing: 0.75px;
  padding: 0 70px;
  box-sizing: border-box;
  .title{
    height: 96px;
    line-height: 96px;
    font-size: 20px;
  }
  .container{
    width: 100%;
    .bottom{
      margin-top: 30px;

    }
  }
  .muti-choose{
    display: flex;
    justify-content: space-around;
  }
  .select-item{
    border: 1px solid #eee;
    padding: 10px;
    .select-top{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .select-top-left{
        width: 60%;
        display: flex;
        justify-content: space-around;
      }
      img{
        cursor: pointer;
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
  .select-bottom{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .select-bottom span,img{
    cursor: pointer;
    user-select: none;
  }
  .select-area{
    /deep/ .el-form-item__content{
      display: flex;
    }
  }
  .tip{
    color: #999;
    font-size: 12px;
  }
  /deep/ .el-dialog__header{
    border-bottom: 1px solid #eee;
  }
  /deep/ .el-dialog__footer{
    text-align: center;
  }
}
</style>
