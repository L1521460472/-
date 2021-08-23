<template>
  <div id="header">
    <!-- 群发助手 -->
    <div class="header">
        <div class="title">群发助手</div>
    </div>
    <div class="content">
      <div class="content-left">
        <div class="content-left-head">
          <span>添加联系人({{contacts}})</span>
          <img src="../../assets/svg/删除1.svg" style="cursor: pointer;" @click="deletePhoneList">
        </div>
        <div class="content-left-button">
          <el-button type="primary" size="small" @click="importFiles" v-has="'vmsMessageAddressBookImport'">
            <i class="iconfont icondaoru"></i>
            导入文件
            <!-- <img src="../../assets/images1/icon_18px_导入.svg" style="width:14px;height:14px">导入文件 -->
          </el-button>
          <el-button type="primary" size="small" @click="addressBook" v-has="'vmsMessageAddressBookPageList'">
            <i class="iconfont icontongxunlu"></i>通讯录
            <!-- <img src="../../assets/images1/icon_18px_通迅录.svg" style="width:14px;height:14px">通讯录 -->
          </el-button>
        </div>
        <div v-show="messageType == 6">
          <el-input placeholder="快速输入手机号" v-model="phoneNumber" @keyup.enter.native="addPhoneToList">
            <el-button slot="append" @click="open">展开</el-button>
          </el-input>
        </div>
        <!-- <el-divider></el-divider> -->
        <div class="content-left-list">
          <div class="list-item" v-for="(item, index) in phoneLists" :key="index">
            <span class="list-item-left">
              <img src="../../assets/svg/icon_头像.svg" style="margin-right:7px">
              <span class="phone-style">{{item}}</span>
            </span>
            <i class="el-icon-close close-phone" @click="deletePhone(index)"></i>
          </div>
        </div>
        <div class="content-left-footer">
          <el-pagination
            small
            background
            layout="prev, pager, next"
            :current-page="currentPage"
            :hide-on-single-page="true"
            :page-size="10"
            :total="contacts"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>
      <div class="content-center">
        <span>群发消息内容</span>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="110px"
          class="demo-ruleForm"
        >
          <el-form-item label="批次名称：">
            <el-input v-model="ruleForm.batchName" size="small"></el-input>
          </el-form-item>
          <el-form-item label="应用：" prop="app">
            <el-select v-model="ruleForm.app" size="small"  placeholder="请选择" @change="changeApp">
              <el-option
                v-for="item in appOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="消息模板：" prop="msg">
            <el-select v-model="ruleForm.msg" size="small" filterable placeholder="请选择">
              <el-option
                v-for="item in msgOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="发送给" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc" placeholder="每行一个手机号,或者以空格隔开..."></el-input>
          </el-form-item> -->
          <el-form-item label="可用变量：" v-show="messageType == 7">
            <!-- <div class="variable">
              <span v-for="(item,index) in variableList" :key="index" @click="variableSelect(item)" :class="{'disable': messageType != 3}"> {{item.label}} </span>
            </div> -->
            <span style="color:#bbb;" v-if="variableList.length == 0">暂无可替换变量</span>
            <div>
              <el-button v-for="(item,index) in variableList" :key="index" @click="variableSelect(item)" size="small" :disabled= "messageType != 7">{{item.name}}</el-button>
            </div>
            <div class="tips" v-if="variableList.length != 0">提示：点击可用变量将依次替换消息模板中的变量</div>
          </el-form-item>
          <el-form-item label="发送时间段：">
            <!-- <el-time-picker
              is-range
              v-model="ruleForm.sendTimeRange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker> -->
            <div style="color: #368CFE">
              <span>{{startTime }}</span> 至 <span>{{endTime }}</span>
            </div>
          </el-form-item>
          <el-form-item label="过滤重复号码：">
            <el-checkbox v-model="ruleForm.phoneDistinct">启用</el-checkbox>
          </el-form-item>
          <el-form-item label="定时发送：">
            <el-checkbox v-model="delivery">启用</el-checkbox><br/>
            <!-- <el-date-picker
              :disabled="!delivery"
              v-show="delivery"
              v-model="ruleForm.timingTime"
              type="datetime"
              :picker-option="{
                start: '00:00:00',
                step: '00:30:00',
                end: '23:30:00'
              }"
              placeholder="选择日期时间">
            </el-date-picker> -->
            <div v-show="delivery" class="time-area">
              <el-date-picker
                v-model="ruleForm.timingDate"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
              <el-time-select
                v-model="ruleForm.timingTime"
                :picker-options="{
                  start: '00:00',
                  step: '00:30',
                  end: '23:30'
                }"
                format="HH:mm:ss"
                value-format="HH:mm:ss"
                placeholder="选择时间">
              </el-time-select>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSend" size="small" v-has="'vmsMessageSendMouldMessage'" :disabled="submitDisable">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="content-right">
        <span>效果预览</span>
        <div class="content-right-body">
          <div class="phone-box">
            <div class="simulation">
              <div class="header">{{appName}}</div>
              <div class="message-content">
                <div class="top">
                  <img src="../../assets/svg/icon_头像.svg" style="margin-right:2px">
                  <span style="color:#aaa">{{nowTime}}</span>
                </div>
                <div class="bottom">
                  <!-- 普通消息 -->
                  <!-- <div v-if="messageType == 0"> -->
                    <div v-for="(item, index) in templateContent" :key="index">
                      <div class="text" v-if="item.type == 0">{{item.content}}</div>
                      <div class="file" v-if="item.type == 1">
                        <img  :src="item.fileDetailUrl" />
                      </div>
                      <div v-if="item.type == 2">
                        <audio controls="controls" class="audio-class" style="width: 220px; object-fit: fill">
                          <source :src="item.fileDetailUrl" type="audio/mpeg" />
                        </audio>
                      </div>
                      <div v-if="item.type == 3" class="video-box">
                        <video :src="item.fileDetailUrl" controls="controls" class="video-class" width="220px" height="140px"></video>
                      </div>
                    </div>
                  <!-- </div> -->
                  <!-- 文件消息 -->
                  <!-- <div v-if="item.type == 1">
                    <div class="file">
                      <img v-if="fileContent.fileType == 1" :src="fileContent.fileUrl" />
                      <div v-if="fileContent.fileType == 2" style="overflow-x: scroll;">
                        <audio controls="controls" class="audio-class">
                          <source :src="fileContent.fileUrl" type="audio/mpeg" />
                        </audio>
                      </div>
                      <div v-if="fileContent.fileType == 3">
                        <video :src="fileContent.fileUrl" controls="controls" class="video-class"></video>
                      </div>
                    </div>
                  </div> -->
                  <!-- 卡片消息 -->
                  <!-- <div v-if="item.type == 2">
                    <div class="file">
                      <img :src="cardContent.fileUrl" />
                      <div class="file-content">
                        <div class="file-content-head">
                          {{cardContent.title}}
                        </div>
                        <div class="file-content-body">
                          {{cardContent.textContent}}
                        </div>
                        <template v-if="cardContent.showButton">
                          <div class="file-content-button" v-for="(item, index) in cardContent.buttonList" :key="index">{{item.displayText}}</div>
                        </template>
                      </div>
                    </div>
                  </div> -->

                  <!-- 变量消息 -->
                  <!-- <div v-if="messageType == 1">
                    <div class="text">
                      {{variableMessage}}
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
            <div class="footer-menu">
              <div class="menu-top" v-if="hoverMenuList.length > 0">
                <div class="menu-top-item" v-for="(item, index) in hoverMenuList" :key="index">{{item}}</div>
              </div>
              <div class="menu-bottom">
                <i class="iconfont iconjianpan1 menu-icon"></i>
                <el-input size="mini" placeholder="MMS消息" style="margin-right:4px" readonly></el-input>
                <i class="iconfont iconyuyin menu-icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="手动添加"
      :visible.sync="openVisible"
      width="40%">
      <span>多个手机号码以空格、回车、逗号（半角）、分号（半角）、竖线（|）其中一种方式隔开！</span>
      <el-input type="textarea" v-model="phoneArray" style="margin-top:12px"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="splitPhone" size="small">确 定</el-button>
        <el-button @click="openVisible = false" size="small">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="导入联系人"
      :visible.sync="importVisible"
      width="450px">
        <el-form label-width="100px" :model="importFormData">
          <el-form-item label="文件类型:">
            <el-radio :label="true" v-model="importFormData.fileType">Excel 文件</el-radio>
          </el-form-item>
          <el-form-item label="个人通讯录:">
            <el-checkbox v-model="importFormData.checked">自动添加</el-checkbox>
          </el-form-item>
          <el-form-item label="所属分组:" class="form-item-tree">
            <el-tree
              ref="groupTree"
              highlight-current
              :data="treeData"
              node-key="id"
              :props="defaultProps"
              @node-click="selectWhichTree"
              :current-node-key="selectTreeId2"
              class="special-tree"
              :default-expanded-keys="expandedTree"
              >
            <div class="custom-tree-node1" slot-scope="{ node, data }">
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
            :on-success="importSuccess"
            :auto-upload="false"
            :http-request="importExcelFile"
            :file-list="fileList"
            multiple>
            <el-button size="small" type="primary">选择文件</el-button>
          </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitImport" :disabled="importFileButtonDisable" size="small">确 定</el-button>
            <el-button @click="importVisible = false" size="small">取 消</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
    <el-dialog
      title="选择通讯录"
      :visible.sync="addressVisible"
      v-loading="loading1"
      width="80%">
        <div class="addressBook-tip">
          注意：选中上级组别，点击【添加全部】，添加的联系人为全组联系人（包含本组及下属的各个分组）。无需再重复选中下属分组添加联系人。
        </div>
        <div class="addressBook-content">
          <div class="addressBook-content-left">
            <div class="addressBook-content-left-left">
              <el-tree
                :data="treeData"
                node-key="id"
                highlight-current
                :props="defaultProps"
                :default-expanded-keys="expandedTree"
                :expand-on-click-node="false"
                :current-node-key="selectTreeId"
                @node-click="handleNodeClick"></el-tree>
            </div>
            <div class="addressBook-content-left-right">
              <div class="header-button">
                <el-button-group style="width:30%">
                  <el-button type="primary" @click="reflesh" size="small">
                  <i class="iconfont iconshuaxin"></i>
                </el-button>
                <el-button type="primary" @click="clearSearch"  size="small">
                  <i class="iconfont iconguanbi"></i>
                </el-button>
                </el-button-group>
                <el-input size="small" v-model="searchValue" style="width:40%" @keyup.enter.native="getTableList">
                  <i slot="suffix" class="el-input__icon el-icon-search" @click="getTableList"></i>
                </el-input>
              </div>
              <div>
                <el-table
                  :data="addressBookData"
                  :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
                  @selection-change="handleSelectionChange"
                  border
                  height="320"
                  v-loading="loading2"
                  size="small">
                  <el-table-column type="selection" width="50" align="center"></el-table-column>
                  <!-- <el-table-column label="姓名"></el-table-column>
                  <el-table-column label="手机号"></el-table-column>
                  <el-table-column label="所属组"></el-table-column>
                  <el-table-column label="邮箱"></el-table-column>
                  <el-table-column label="地区"></el-table-column>
                  <el-table-column label="VIP身份"></el-table-column> -->
                  <el-table-column v-for="(item, index) in tableHeadList" show-overflow-tooltip :key="index" :label="item.name" :prop="item.id"></el-table-column>
                </el-table>
              </div>
              <div class="footer-page">
                <el-pagination
                  background
                  size="small"
                  layout="prev, pager, next"
                  @current-change="handPageChange"
                  :total="page2.total">
                </el-pagination>
              </div>
            </div>
          </div>
          <div class="addressBook-content-center">
            <img style="margin-bottom:10px;cursor: pointer;" src="../../assets/svg/icon_double_right.svg">
            <el-button size="small" type="primary" @click="addAll">添加全部</el-button>
            <el-button size="small" type="primary" @click="addSelected">添加已选</el-button>
          </div>
          <div class="addressBook-content-right">
            <div class="right-header-top">
              <span>添加联系人({{tempPhoneList.length}})</span>
              <img src="../../assets/svg/icon_18px_delete.svg" @click="removeTempPhoneList" style="cursor: pointer;"/>
            </div>
            <div class="right-header-bottom">
              <div class="phone-list-number" v-for="(item, index) in tempPhoneList" :key="index">
                <div class="phone-list-number-left">
                  <img src="../../assets/svg/icon_头像.svg"/>
                  <span class="phone-style">{{item}}</span>
                </div>
                <i class="el-icon-close close-phone" @click="removeThisPhone(index)"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="addressBook-footer">
          <el-button type="primary" size="small" @click="selectedAddressBook">导 入</el-button>
          <el-button size="small" @click="addressVisible = false">取 消</el-button>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAppLists } from '@/api/Develop/myapp'
import {
  getMessageList,
  sendTempalteMsessage,
  addressImport,
  leftMenu,
  getTableList,
  getHeadList
} from '@/api/vms/moreMessage'
import { MessageMould, MessageMouldCard, cardList, getFile } from '@/api/message/diyMessage'
import { Loading } from 'element-ui'
import dayjs from 'dayjs'
export default {
  name: 'moreMessages',
  data() {
    return {
      // contacts: 0,  // 联系人数量
      phoneNumber: '',  // 左侧手机号
      ruleForm: {
        batchName: '',
        app: '',
        msg: '',
        desc: '',
        phoneDistinct: false,
        timingTime: '',
        timingDate: '',
      },
      rules: {
        app: [
          { required: true, message: '应用不可为空', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        msg: [
          { required: true, message: '消息模板不可为空', trigger: 'blur' },
        ],
        desc: [{ required: true, message: '手机号不可为空', trigger: 'blur' }],
      },
      appOptions: [],
      msgOptions: [],
      loading: '',
      value1: '',
      value2: '',
      delivery: false,  // 定时发送
      variableList: [
      ],
      phoneLists:[],  // 当前页的数据
      phoneTotalList: [],  // 总的电话列表
      appName: '测试', // 预览应用名称
      openVisible: false,  // 弹框控制
      phoneArray: '',  // 输入的电话号码
      currentPage: 1,  // 当前页码
      startTime: '00:00:00',  // 发送时间段开始时间
      endTime: '00:00:00',    // 发送时间段结束时间

      templateContent: [
        {
          content: '这是一段测试文本',
          type: 0
        }
      ],  // 模板内容

      messageType: 6,  // 模板类型
      textContent: '这是一段测试文本，这是一段测试文本',  // 文本内容
      fileContent: {  // 文件内容
        fileType: 1,  // 图片、视频、音频
        fileUrl: '',
      },
      cardContent: {  // 卡片内容
        title: '',
        textContent: '',
        fileUrl: '',
        buttonList: [
        ],
        showButton: false
      },
      hoverMenuList: [],
      variableMessage: '',  // 变量内容
      btnDisable: false,  // 变量按钮是否可以点击
      replaceParams: [],
      replaceWhich: 1,
      importVisible: false, // 导入联系人弹窗控制
      addressVisible: false, // 选择通讯录弹框控制
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      addressBookData: [],  // 通讯录表格数据
      selectTreeId: null, // 当前选择的树结构id
      page2: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      searchValue: '', // 搜索
      tableHeadList: [],
      loading1: false,  // 选择通讯录时的loading
      mutiData: [],
      tempPhoneList: [],
      importFormData: {
        fileType: true,
        checked: false
      },
      selectTreeId2: '',
      expandedTree: [],
      loading2: false,
      tempTableData: [],  // 替换变量
      order: [],  // 替换变量标志位
      fileList: [], // 上传文件列表
      variablePhoneNumner: [],  // 当是变量时
      addIntoTempData: [], //导入通讯录临时变量
      importFileButtonDisable: false,
      submitDisable: false,
    };
  },
  computed: {
    nowTime() {   // 接收信息的时间
      return dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
    },
    contacts() {
      return this.phoneTotalList.length
    }
  },
  watch: {
    msgOptions(){
      if (Object.keys(this.$route.query).length > 0) {
        this.messageType = this.$route.query.messageType
        if (this.msgOptions.length > 0) {
          this.msgOptions.forEach(item => {
            const moduleId = item.value.split(' ')[0]
            if (this.$route.query.mouldId == moduleId) {
              this.ruleForm.msg = item.value
            }
          })
        }
      }
    },
    appOptions() {
      if (Object.keys(this.$route.query).length > 0) {
        if (this.appOptions.length > 0) {
          // this.ruleForm.app = this.$route.query.app
          this.appOptions.forEach(item => {
            if (item.value == this.$route.query.app) {
              this.ruleForm.app = item.value
            }
          })
        }
      }
    },
    'ruleForm.msg': {
      handler() {
        if (this.ruleForm.msg != '') {
          this.selectedModule(this.ruleForm.msg)
          this.order = []
        }
      }
    },
    'ruleForm.app': {
      handler() {
        if (this.ruleForm.app) {
          this.selectedApp(this.ruleForm.app)
        }
      }
    },
    selectTreeId() {
      this.getTableList()
    },
    phoneTotalList() {
      // console.log(this.phoneTotalList)
      this.getCurrentList(this.currentPage)
      // console.log(this.phoneLists)
    }
  },
  methods: {
    // 发送模板消息
    handleSend() {
      const that = this
      const timingTimeTemp = this.ruleForm.timingDate + ' ' + this.ruleForm.timingTime + ':00'
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.phoneTotalList.length == 0) {
            this.$message({
              type: 'warning',
              message: '请先添加联系人',
              center: true
            })
            return
          }
          // 判断批次名称是否含有特殊字符
          const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“’。，、？]")
          if (pattern.test(this.ruleForm.batchName)) {
            this.$message({
              type: 'warning',
              message: '批次名称中不能含有特殊字符!',
              center: true
            })
            return
          }
          if (this.delivery && this.ruleForm.timingDate == '' && this.ruleForm.timingTime == '') {
            this.$message({
              type: 'warning',
              message: '请先选择定时发送时间！',
              center: true
            })
            return
          }
          const phoneList = this.phoneTotalList.join(',')
          const query = {
            batchName: this.ruleForm.batchName,
            // channel: 'HW', // 消息通道
            // chatbotId: '125200401111131', // 机器人ID
            // clientType: 'MAAP', // CM通道专用，其他不需要带
            enterpriseAccountAppId: this.ruleForm.app, //企业应用id
            // inReplyToContributionId: 'null', // 回复id
            mouldCode: this.ruleForm.msg.split(' ')[1], // 普通消息模板id
            variableParams: this.replaceParams,
            phoneDistinct: this.ruleForm.phoneDistinct,
            sendingMode: 'ACTIVE',
            to: phoneList, // 接收方手机号
            timingTime: timingTimeTemp == ' :00'? '' : dayjs(timingTimeTemp).format("YYYY-MM-DD HH:mm:ss"),
            clientCorrelator: '', //用户端关联数据
          }
          this.loading = Loading.service({
            lock: true,
            text: '正在发送中...', //可以自定义文字
            spinner: 'el-icon-loading', //自定义加载图标类名
            background: 'rgba(255, 255, 255, 0.7)', //遮罩层背景色
            target: document.querySelector('.demo-ruleForm'),
          })
          if (this.messageType == 7 && this.replaceParams.length == 0) {
            this.$confirm('当前消息模板存在未替换的变量，是否确定发送？', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              confirmButtonClass:'btn-custom-confirm',
              center:true
            }).then(() => {
              this.submitDisable = true
              sendTempalteMsessage(query)
              .then((res) => {
                this.loading.close()
                if (res.data.status == 0) {
                  this.$message({
                    type: 'success',
                    message: '发送成功!',
                    center: true,
                  })
                  this.ruleForm = this.$options.data().ruleForm
                  this.$refs.ruleForm.resetFields()
                  that.delivery = false
                  that.phoneTotalList = []
                  that.phoneLists = []
                  that.variablePhoneNumner = []
                  that.variableList = []
                } else {
                  this.$message({
                    type: res.data.status === 2 ? 'warning' : 'error',
                    message: res.data.message,
                    center: true,
                  })
                }
                this.submitDisable = false
              })
              .catch((error) => {
                this.loading.close()
                this.$message({
                  type: res.data.status === 2 ? 'warning' : 'error',
                  message: error,
                  center: true,
                })
                this.submitDisable = false
              })
            }).catch(() => {
              this.loading.close()
            })
          } else {
            this.submitDisable = true
            sendTempalteMsessage(query)
              .then((res) => {
                this.loading.close()
                if (res.data.status == 0) {
                  this.$message({
                    type: 'success',
                    message: '发送成功!',
                    center: true,
                  })
                  this.ruleForm = this.$options.data().ruleForm
                  this.$refs.ruleForm.resetFields()
                  this.delivery = false
                  that.phoneTotalList = []
                  that.phoneLists = []
                  that.variablePhoneNumner = []
                  that.variableList = []
                } else {
                  this.$message({
                    type: res.data.status === 2 ? 'warning' : 'error',
                    message: res.data.message,
                    center: true,
                  })
                }
                this.submitDisable = false
              })
              .catch((error) => {
                this.loading.close()
                this.$message({
                  type: res.data.status === 2 ? 'warning' : 'error',
                  message: error,
                  center: true,
                })
                this.submitDisable = false
              })
          }
        } else {
          return false;
        }
      })
    },
    // 获取应用下拉列表
    getDataList() {
      getAppLists()
        .then((res) => {
          if (res.data.status == 0) {
            const data = res.data.data
            data.forEach((item) => {
              const val = {}
              val.value = item.id
              val.label = item.name
              this.appOptions.push(val)
            })
          } else {
            // this.$message.error({
            //   message: res.data.message,
            //   center: true,
            // })
          }
        })
        .catch((error) => {
        //   this.$message.error({
        //     message: error,
        //     center: true,
        //   })
        })
    },
    // 获取消息模板列表
    getMessageLists() {
      this.msgOptions = []
      const params = {
        checkStatus: 1,
        enterpriseAccountAppId: this.ruleForm.app
      }
      getMessageList(params).then(res => {
        this.msgOptions = []
        if (res.data.status == 0) {
          const data = res.data.data
          data.forEach(item => {
            const val = {
              label: item.name,
              value: item.id + ' ' + item.mouldCode,
              type: item.messageType
            }
            this.msgOptions.push(val)
          })
        } else {
          this.$message.error({
            message: res.data.message,
            center: true,
          })
        }
      })
    },
    variableSelect(val) {
      this.replaceParams = []
      if (this.phoneTotalList.length == 0) {
        this.$message({
          type: 'warning',
          message: '请先输入联系人！',
          center: true
        })
        return
      }
      const regex3 = /\{(.+?)\}/;
      const arr = this.variableMessage.split(regex3)
      const arr1 = arr.map((item, index) => {
        if ((index+1) % 2 == 0) {
          return ' { ' + item + ' } '
        }
        else {
          return item
        }
      })
      if (this.replaceWhich + 2 > arr.length) {
        this.replaceWhich = 1
      }
      arr1[this.replaceWhich] = ' { ' + val.name + ' } '
      this.order[(this.replaceWhich - 1)/2] = val.id
      const tempOrder = []
      this.order.forEach(item => {
        if(item != '' || item != undefined) {
          tempOrder.push(item)
        }
      })
      this.order = tempOrder
      this.variablePhoneNumner.forEach(item => {
        const val = {}
        val.variableParam = {}
        if (item.length > 0) {
          this.order.forEach((ele,index) => {
            item.forEach(temp => {
              if(temp.id == 1) {
                val.receivePhone = temp.value
              }
              if (ele == temp.id) {
                val.variableParam['column'+(index+1)] = temp.value instanceof Array ? '' : temp.value
              }
            })
          })
          this.replaceParams.push(val)
          const tempResult= []
          const tempVal = {}
          for(let i=0;i<this.replaceParams.length;i++) {
            if (!tempVal[this.replaceParams[i].receivePhone]) {
              tempResult.push(this.replaceParams[i])
              tempVal[this.replaceParams[i].receivePhone] = true
            }
          }
          this.replaceParams = tempResult
        }
      })
      this.replaceWhich += 2
      this.variableMessage = arr1.join("")
      const list = this.variableMessage.split('||')
      // console.log(list)
      // const tempi = 0
      // for(let i = 0; i< this.templateContent.length; i++) {
      //   console.log(tempi)
      //   if (this.templateContent[i].type == 0) {
      //     const data = {
      //       content: list[tempi],
      //       type: 0
      //     }
      //     this.$set(this.templateContent, i, data)
      //     i+=1
      //   }
      // }
      let i = 0
      let k = 0
      while(k < this.templateContent.length) {
        if (this.templateContent[k].type == 0) {
          const data = {
            content: list[i],
            type: 0
          }
          this.$set(this.templateContent, k, data)
          i++
        }
        k++
      }
    },
    // 删除联系人
    deletePhone(index) {
      this.phoneTotalList.splice((this.currentPage-1)*10 + index, 1)  // 总数中删除
      this.getCurrentList(this.currentPage)
    },
    // 展开弹窗
    open(){
      this.openVisible = true
      this.phoneArray = ''
    },
    // 分割手动输入的联系人列表
    splitPhone(){
      // 判断是不是含有中文字符
      const res = /[；，]/
      if(this.phoneArray.match(res)){
        this.$message({
          type: 'warning',
          message: '请输入半角的逗号或者分号',
          center: true
        })
        return
      }
      const temp = this.phoneArray.split(/[\s\n,|; ]/).filter(item => {
            if (item != '' || item != null) {
              return item
            }
          })
      // 过滤一下是否含有非法手机号
      const result = temp.every(item => {
        return (/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(item))
      })
      if (!result) {
        this.$message({
          type: 'warning',
          message: '请输入合法的手机号！',
          center: true
        })
        return
      }
      this.phoneTotalList.push(...temp)
      this.getCurrentList(this.currentPage)
      this.openVisible = false
    },
    // 删除联系人列表
    deletePhoneList() {
      this.$confirm("确定清空所有联系人吗？", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass:'btn-custom-confirm',
        center:true
      }).then(() => {
        this.phoneTotalList = []
        this.phoneLists = []
      }).catch(() => {
        // console.log(222)
      })
    },
    // 当回车按下时验证号码并将号码添加到列表
    addPhoneToList() {
      // console.log(this.phoneNumber)
      if (this.phoneNumber.length != 11 || !(/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(this.phoneNumber))) {
        this.$message({
          type: 'warning',
          message: '请输入合法的手机号',
          center: true
        })
      } else {
        this.phoneTotalList.push(this.phoneNumber)
        this.getCurrentList(this.currentPage)
        this.$message({
          type: 'success',
          message: '添加成功！',
          center: true
        })
        this.phoneNumber = ''
      }
    },
    // 选中模板
    selectedModule(val) {
      const params = {
        messageMouldId: val.split(' ')[0]
      }
      MessageMould(params).then(res => {
        if (res.data.status == 0) {
          const data = res.data.data
          this.startTime = data.sendStartTime == null ? '00:00:00' : data.sendStartTime
          this.endTime = data.sendEndTime == null ? '00:00:00' : data.sendEndTime
          this.hoverMenuList = []
          if (data.suggestions) {
            data.suggestions.forEach(item => {
              if (item.reply) {
                this.hoverMenuList.push(item.reply.displayText)
              }
              if (item.action) {
                this.hoverMenuList.push(item.action.displayText)
              }
            })
          }
          if (data.enterpriseAccountAppId != null) {
            this.ruleForm.app = data.enterpriseAccountAppId
          }

          if(data.cssContent != null) {
            this.templateContent = JSON.parse(data.cssContent)
          }
          // console.log(this.templateContent)
          if (data.messageType == 6) {
            this.messageType = 6
            this.variablePhoneNumner = []
          } else if (data.messageType == 7) {
            this.messageType = 7
            const tempArr = []
            this.templateContent.forEach(item => {
              if (item.type == 0) {
                tempArr.push(item.content)
              }
            })
            const str = tempArr.join('||')
            this.variableMessage = str
            this.replaceWhich = 1
            this.order = []
            // console.log(str)
          }
          // if(data.type == 0) {  // 文本消息
          //   this.messageType = 0
          // } else if (data.messageType == 1) {  // 文件消息
          //   this.messageType = 1
          //   getFile({fileGroupDetailId: data.fileGroupDetailId}).then((res) => {
          //     if (res.data.status == 0) {
          //       const data = res.data.data
          //       this.fileContent.fileType = data.fileType
          //       this.fileContent.fileUrl = data.fileUrl
          //     } else {
          //       this.$message({
          //         type: 'warning',
          //         message: res.data.message,
          //         center: true
          //       })
          //     }
          //   })
          // } else if (data.messageType == 2) {  // 卡片消息
          //   this.messageType = 2
          //   // 在调用一个获取卡片详情的接口
          //   cardList({messageMouldId: val.split(' ')[0]}).then((res) => {
          //     if(res.data.status == 0) {
          //       const result = res.data.data[0]
          //       this.cardContent.textContent = result.description
          //       this.cardContent.title = result.title
          //       if (result.suggestions.length > 0) {
          //         this.cardContent.showButton = true
          //         this.cardContent.fileUrl = result.fileGroupDetail.fileUrl
          //         result.suggestions.forEach(item => {
          //           if (item.reply) {
          //             this.cardContent.buttonList.push({displayText: item.reply.displayText})
          //           }
          //           if (item.action) {
          //             this.cardContent.buttonList.push({displayText: item.action.displayText})
          //           }
          //         })
          //       }
          //     }
          //   })
          // } else if (data.messageType == 3) {
          //   this.messageType = 3
          //   this.variableMessage = data.content
          // }
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
    // 选中应用
    selectedApp(val){
      this.appName = this.findAppByid(val)
      this.getMessageLists()
      this.replaceWhich = 1
    },
    // 根据id匹配应用名称
    findAppByid(id) {
      let temp = ''
      this.appOptions.forEach(item => {
        if (item.value == id) {
          temp = item.label
        }
      })
      return temp
    },
    // 根据页码获取当前页的电话列表
    getCurrentList(page) {
      this.phoneLists = this.phoneTotalList.slice((page-1)*10, page*10)
    },
    // 当页码变化时
    handleCurrentChange(val) {
      this.currentPage = val
      this.getCurrentList(this.currentPage)
    },
    // 点击导入文件按钮
    importFiles(){
      this.selectTreeId2 = ''
      this.importFileButtonDisable = false
      this.fileList = []
      this.importVisible = true
    },
    addressBook() {
      this.addressVisible = true
      this.tempPhoneList = []
      this.addIntoTempData = []
      this.searchValue = ''
      // this.getMenuList()
      this.getTableHead()
      this.getTableList()
    },
    handleNodeClick(val) {
      this.selectTreeId = val.id
    },
    handleSelectionChange(val) {  // 选择通讯录表格多选事件
      this.mutiData = val
      // console.log(this.mutiData)
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
    // 获取弹窗内通讯录树列表
    getMenuList() {
      leftMenu().then(res => {
        if (res.data.status == 0) {
          this.treeData = []
          this.formatTreeData(res.data.data, this.treeData)
          res.data.data.forEach(item => {
            this.expandedTree.push(item.id)
            if (item.children.length > 0) {
              item.children.forEach(ele => {
                this.expandedTree.push(ele.id)
              })
            }
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
    },
    selectWhichTree(val) {
      this.selectTreeId2 = val.id
    },
    handPageChange(val) {
      this.page2.currentPage = val
      this.getTableList()
    },
    // 获取表格数据
    getTableList() {
      this.loading2 = true
      const query = {
        currentPage: this.page2.currentPage,
        pageSize: this.page2.pageSize,
        enterpriseAddressBookId: this.selectTreeId,
        columnIdValueList: [
          {
            id: 1,
            value: this.searchValue
          }
        ]
      }
      if (this.searchValue == '') {
        query.columnIdValueList.shift()
      }
      getTableList(query).then(res => {
        if(res.data.status == 0) {
          const data = res.data.data
          this.page2.total = data.total
          this.addressBookData = data.records
        }
        this.loading2 = false
      }).catch(error => {
        this.$message({
          type:'error',
          message: error,
          center: true
        })
        this.loading2 = false
      })
    },
    // 刷新
    reflesh() {
      this.getTableList()
    },
    // 清空搜素条件
    clearSearch() {
      this.searchValue = ''
    },
    // 获取表头数据
    getTableHead(){
      this.loading1 = true
      this.tableHeadList = []
      getHeadList().then(res => {
        if (res.data.status == 0) {
          const data = res.data.data
          data.forEach(item => {
            const val = {
              name: item.fieldName,
              id: item.id+''
            }
            if (item.showFlag) {
              this.tableHeadList.push(val)
            }
          })
        }
        this.loading1 = false
      }).catch(error => {
        this.$message({
          type: 'success',
          message: error,
          center: true
        })
        this.loading1 = false
      })
    },
    addAll() {
      // const temp = []
      // const query = {
      //   currentPage: 1,
      //   pageSize: this.page2.total,
      //   enterpriseAddressBookId: this.selectTreeId,
      //   columnIdValueList: [
      //     {
      //       id: 1,
      //       value: this.searchValue
      //     }
      //   ]
      // }
      // if (this.searchValue == '') {
      //   query.columnIdValueList.shift()
      // }
      // this.loading2 = true
      // let tempData = []
      // getTableList(query).then(res => {
      //   if (res.data.status == 0) {
      //     const data = res.data.data
      //     tempData = data.records
      //     tempData.forEach(item => {
      //       if (this.tempPhoneList.indexOf(item[1]) < 0) {
      //         this.tempPhoneList.push(item[1])
      //         temp.push(item)
      //       }
      //     })
      //     this.addIntoTempData = this.addIntoTempData.concat(temp)
      //   } else {
      //     this.$message({
      //       type: 'error',
      //       message: res.data.message,
      //       center
      //     })
      //   }
      //   this.loading2 = false
      // }).catch(error => {
      //   this.$message({
      //     type: 'error',
      //     message: error,
      //     center:true
      //   })
      //   this.loading2 = false
      // })

      const temp = []
      this.addressBookData.forEach(item => {
         if (this.tempPhoneList.indexOf(item[1]) < 0) {
           this.tempPhoneList.push(item[1])
           temp.push(item)
         }
      })
      this.addIntoTempData = this.addIntoTempData.concat(temp)
    },
    addSelected() {
      if(this.mutiData.length == 0) {
        this.$confirm("请先选择联系人", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          confirmButtonClass:'btn-custom-confirm',
          center:true
        }).then(() => {
        }).catch(() => {
        })
      } else {
        let tempArray = []
        tempArray= this.mutiData.map(item => {
          return item[1]
        })
        this.tempPhoneList = this.tempPhoneList.concat(tempArray)
        this.addIntoTempData = this.addIntoTempData.concat(this.mutiData)
      }
    },
    removeTempPhoneList() {
      this.$confirm("确定删除所有联系人", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          confirmButtonClass:'btn-custom-confirm',
          center:true
        }).then(() => {
          this.tempPhoneList = []
        }).catch(() => {
        })
    },
    selectedAddressBook() {
      if (this.tempPhoneList.length == 0) {
        this.$message({
          type: 'warning',
          message: '请先选择联系人!',
          center: true
        })
        return
      }
      this.phoneTotalList.push(...this.tempPhoneList)
      this.variableList = this.tableHeadList
      // this.tempTableData = this.addressBookData
      const arr = []
      this.addIntoTempData.forEach(item => {
        let val = []
        const keys = Object.keys(item)
        for(let i = 0; i < keys.length; i++){
          const val2 = {}
          if(!isNaN(keys[i])){
            // val[keys[i]] = item[keys[i]]
            val2.id = keys[i]
            val2.value = item[keys[i]]
          }
          val.push(val2)
        }
        arr.push(val)
      })
      this.tempTableData = arr
      this.variablePhoneNumner = this.variablePhoneNumner.concat(this.tempTableData)
      this.addressVisible = false
    },
    removeThisPhone(index){
      this.tempPhoneList.splice(index, 1)
    },
    importSuccess() {

    },
    importExcelFile(file) {
      const formData = new FormData()
      formData.append('file', file.file)
      formData.append('autoAddFlag', this.importFormData.checked)
      formData.append('addressBookId', this.selectTreeId2)
      this.importFileButtonDisable = true
      addressImport(formData).then(res => {
        if (res.data.status == 0) {
          if (res.data.data.errorMsgList.length > 0) {
            this.$message({
              type: 'error',
              message: res.data.data.errorMsgList,
              center: true
            })
            this.importFileButtonDisable = false
            return
          }
          this.phoneTotalList = [...this.phoneTotalList, ...res.data.data.phoneList]
          this.variableList = res.data.data.columnList
          this.tempTableData = res.data.data.columnValueList
          this.variablePhoneNumner = res.data.data.columnValueList
          this.importVisible = false
          this.importFormData.checked = false
          this.selectTreeId2 = ''
          this.$message({
            type: 'success',
            message: '导入成功！',
            center: true
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.message,
            center: true
          })
        }
        this.fileList = []
        this.importFileButtonDisable = false
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
        this.fileList = []
        this.importFileButtonDisable = false
      })
    },
    submitImport() {
      if (this.selectTreeId2 == '') {
        this.$message({
          type: 'warning',
          message: '请先选择分组！',
          center: true
        })
        return
      }
      this.$refs.importAddress.submit()
    },
    changeApp() {
      this.ruleForm.msg = ''
    }
  },
  created() {
    this.getDataList()
    this.getMessageLists()
  },
  mounted() {
    this.getCurrentList(this.currentPage)
    this.getMenuList()
  }
}
</script>
<style lang="less" scoped>
#header {
  width: 100%;
  height: 100%;
  @vat: #666;
  .navW {
    width: 100%;
    height: 100%;
  }
  .navF {
    box-sizing: border-box;
    font-size: 14px;
  }
  .header {
    .navW();
    .el-form-item{
      // margin-bottom: 36px;
      // /deep/ .el-input__inner {
      //   width: 220px !important;
      // }
      /deep/ .el-form-item__content{
        width: 70%;
      }
      /deep/ .el-select{
        width: 100%;
      }
    }
    .el-textarea{
        /deep/ .el-textarea__inner{
            height: 200px !important;
        }
    }
    }
  // }
  .title{
      height: 100px;
      font-size: 20px;
      line-height: 100px;
      box-sizing: border-box;
      padding-left: 70px;
      // margin-bottom: 30px;
  }
  .content{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 70px;
    min-height: 620px;
    .content-left {
      width: 25%;
      border-right: 1px solid #ccc;
      padding: 0 17px 20px 0;
      box-sizing: border-box;
      // font-size: 14px;
      // font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      // font-weight: 400;
      text-align: left;
      position: relative;
      overflow: hidden;
      .content-left-head{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items:center;
        color: #333;
        letter-spacing: 0px;
      }
      .content-left-button{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px 0;
        /deep/ .el-button span{
          display: flex;
          align-items: center;
        }
        /deep/ .el-button img{
          width: 14px;
          height: 14px;
          margin-right: 2px;
        }
      }
      .content-left-list{
        padding-top: 24px ;
        .list-item{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 0;
          color: #333333;
          font-size: 14px;
          .close-phone{
            color: transparent;
          }
          .list-item-left{
            display: flex;
            align-items: center;

          }
        }
        .list-item:hover {
          // background-color: #eee;
          color: #409eff;
          .close-phone{
            color: #409eff;
            cursor: pointer;
          }
        }
      }
      .content-left-footer{
        width: 100%;
        position: absolute;
        bottom: 10px;
        overflow: auto;
      }
    }
    .content-center{
      width: 40%;
      // border: 1px solid #ccc;
      // border-radius: 5px;
      padding: 0 17px 20px 17px;
      box-sizing: border-box;
      .time-area{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .demo-ruleForm{
        margin-top: 10px;
      }
      .variable{
        span{
          color: #409eff;
          border: 1px solid rgba(54,140,254,0.3);
          border-radius: 4px;
          padding: 6px 13px;
          margin-right: 12px;
          user-select: none;
        }
        .disable{
          pointer-events: none;
          cursor:not-allowed;
        }
      }
      .variable span:hover {
        border-color: #409eff;
        cursor: pointer;
      }
      .tips{
        font-size:12px;
        color:#bbb;
        user-select: none;
      }
    }
    .content-right{
      padding: 0 17px 20px 17px;
      box-sizing: border-box;
      .content-right-body{
        width: 280px;
        margin-top: 10px;
        height: 600px;
        background-image: url("../../assets/images/Silver1.png");
        background-repeat: no-repeat;
        background-size: 100% 90%;
        position: relative;
        .phone-box{
          position: absolute;
          width: 243px;
          height: 418px;
          top: 61px;
          left: 20px;
          .simulation{
            position: absolute;
            width: 100%;
            top: 5px;
            box-sizing: border-box;
            padding-left: 5px;
            word-break: break-all;
            .header{
              text-align: center;
              font-weight: bold;
            }
            .message-content{
              margin-top: 12px;
              width: 100%;
              max-height: 300px;
              overflow-y: scroll;
              .top{
                display: flex;
                align-items: center;
                font-size: 12px;
              }
              .bottom{
                margin-bottom: 20px;
                .text{
                  background: #eee;
                  padding: 10px;
                  border-radius: 8px;
                  font-size: 12px;
                  margin-left: 5%;
                  margin-top: 3px;
                  max-width: 187px;
                }
                .file{
                  width: 90%;
                  margin-top: 5px;
                  border-radius: 8px;
                  margin-left: 5%;
                  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                  overflow: hidden;
                  img{
                    width: 100%;
                    max-height: 200px;
                  }
                  .file-content{
                    padding: 10px;
                    font-size: 12px;
                    .file-content-head{
                      font-size: 14px;
                      font-weight: bold;
                    }
                    .file-content-body{
                      margin-top: 10px;
                      color: #333;
                      display: -webkit-box;
                      -webkit-box-orient: vertical;
                      -webkit-line-clamp: 3;
                      overflow: hidden;
                    }
                    .file-content-button{
                      background-color: #eee;
                      padding: 10px 30px;
                      text-align: center;
                      border-radius: 30px;
                      font-weight: bold;
                      margin-top: 10px;
                    }
                  }
                  .video-box{
                    border-radius: 20px;
                    overflow: hidden;
                    margin-left: 5%;
                    display: flex;
                    justify-content: center;
                    .video-class{
                      width: 238px;
                      max-height: 200px;
                      object-fit: fill;
                    }
                  }
                  .audio-class{
                    object-fit: fill;
                    padding: 20px 5px;
                    outline: none;
                    margin-left: 5%;
                  }
                }
              }
            }

          }
          .footer-menu{
            width: 97%;
            position: absolute;
            bottom: 5px;
            left: 5px;
            font-size: 12px;
            .menu-top{
              width: 100%;
              overflow-x: scroll;
              display: -webkit-box;
              margin-bottom: 2px;
              .menu-top-item{
                padding: 4px 8px;
                border-radius: 12px;
                margin-right: 8px;
                background-color: #eee;
                color: #409eff;
              }
            }
            .menu-top::-webkit-scrollbar-thumb {
                border-radius: 10px;
                background: #fff;
            }
            .menu-bottom{
              display: flex;
              justify-content: space-between;
              align-items: center;
              .menu-icon{
                background-color: #eee;
                font-size: 22px;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
  }
  .addressBook-tip{
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
  .addressBook-content{

    display: flex;
    justify-content: space-around;
    height: 450px;
    .addressBook-content-left{
      width: 70%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      .addressBook-content-left-left{
        width: 25%;
        border: 1px solid #e5e5e5;
        padding: 10px;
        overflow: auto;
      }
      .addressBook-content-left-right{
        width: 75%;
        border: 1px solid #e5e5e5;
        border-left: none;
        padding: 20px;
        .header-button{
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .footer-page{
          display: flex;
          justify-content: center;
          padding: 10px 0;
        }
      }
    }
    .addressBook-content-center{
      width: 10%;
      height: 100%;
      // border: 1px solid #e5e5e5;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      /deep/ .el-button+.el-button{
        margin-left: 0;
        margin-top: 10px;
      }
    }
    .addressBook-content-right{
      width: 19%;
      height: 100%;
      border: 1px solid #e5e5e5;
      overflow: auto;
      .right-header-top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
      }
      .right-header-bottom{
        color: #333;
        .phone-list-number{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          .phone-list-number-left{
            display: flex;
            align-items: center;
          }
          .close-phone{
            cursor: pointer;
            display: none;
          }
        }
        .phone-list-number:hover i{
          display: block;
        }
      }
    }
  }
  .addressBook-footer{
    padding: 20px 0 0 0;
    text-align: center;
  }
  .form-item-tree{
    /deep/ .el-form-item__content{
      margin-top: 7px;
    }
  }
  /deep/.el-dialog__header{
    border-bottom: 1px solid #eee;
  }
  /deep/ .el-dialog__footer{
    text-align: center;
  }
  /deep/ .iconfont{
    margin-right: 3px;
  }
}
</style>
