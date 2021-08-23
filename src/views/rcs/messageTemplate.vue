<template>
  <div id="header" ref="header" v-loading="loading" element-loading-text="loading">
    <!-- 消息模板 -->
    <div class="header">
      <div class="title">消息模板</div>
      <div class="nav">
        <div class="navLeft">
          <span>我的模板（共{{ textNum + fileNum + cardNum + changeNum }}条）</span>
          <img @click="handlePlaneShow" :src="planeSrc" alt="平铺" /> <span style="margin-right:6px"></span>
          <img @click="handleListShow" :src="listSrc" alt="列表" />
        </div>
        <div class="navRight">
          <el-input v-model="templateName" placeholder="模板名称" size="small" clearable><i slot="suffix" @click="search" class="el-input__icon el-icon-search"></i></el-input>
        </div>
      </div>
      <div class="table">
        <div class="tableT">
          <div class="tableTLeft">
            <el-button size="mini" :class="{ active: isDisableTotal }" @click="handleClick()" round>全部 ({{ textNum + fileNum + cardNum + changeNum }})</el-button>
            <el-button size="mini" :class="{ active: isDisableText }" @click="handleClick(1)" round>文本模板 ({{ textNum }})</el-button>
            <el-button size="mini" :class="{ active: isDisableFile }" @click="handleClick(2)" round>文件模板 ({{ fileNum }})</el-button>
            <el-button size="mini" :class="{ active: isDisableCard }" @click="handleClick(3)" round>卡片模板 ({{ cardNum }})</el-button>
            <el-button size="mini" :class="{ active: isDisableChange }" @click="handleClick(4)" round>变量模板 ({{ changeNum }})</el-button>
          </div>
          <div class="tableTRight">
            <el-button v-if="isListShow" type="text" @click.stop="addMessage" style="color: #fe9636" v-has="'messageMouldCardAddOrUpdate'"><i class="el-icon-circle-plus-outline"></i>
              <p>新建模板</p>
            </el-button>
            <div class="addMsg" v-if="isShow">
              <div @click="handleText">
                <img src="../../assets/svg/icon-文本消息@1x.svg" alt="" />文本模板
              </div>
              <div @click="handleFile">
                <img src="../../assets/svg/icon-文件消息@1x.svg" alt="" />文件模板
              </div>
              <div @click="handleCard">
                <img src="../../assets/svg/icon-卡片消息@1x.svg" alt="" />卡片模板
              </div>
              <div @click="handleChange">
                <img src="../../assets/svg/icon_变量.svg" alt="" />变量模板
              </div>
            </div>
          </div>
        </div>
        <div class="tableF" v-if="disableList">
          <el-table ref="multipleTable" :data="tableData" :header-cell-style="{ background: '#F4F4F4', color: '#333333' }" border size="small" tooltip-effect="dark" style="width: 100%"
            :style="{ color: '#333', 'min-height': tableHeight + 'px' }">
            <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
            <el-table-column type="expand" align="center">
              <template slot-scope="props">
                <div class="text" v-if="props.row.messageType == 0">
                  <div class="textTop">{{ props.row.content }}</div>
                  <div class="textBottom" v-if="
                      props.row.suggestions && props.row.suggestions.length > 0
                    ">
                    <span v-for="(item, index) in props.row.suggestions" :key="index">
                      <span class="btn" v-if="item.action">{{
                        item.action.displayText
                      }}</span>
                      <span class="btn" v-if="item.reply">{{
                        item.reply.displayText
                      }}</span>
                    </span>
                  </div>
                </div>
                <div class="expandAudio" v-else-if="props.row.messageType == 1">
                  <fileList :fileData="props.row"></fileList>
                  <el-button @click.native.prevent="
                      downloadAction(
                        props.row.fileGroupDetail.fileUrl,
                        props.row.fileGroupDetail.fileName
                      )
                    " type="text" size="small" class="dowImage">
                    <img src="../../assets/svg/icon-24px-下载@1x.svg" alt="" />
                  </el-button>
                </div>
                <div v-else-if="props.row.messageType == 2">
                  <cardList :cardData="props.row"></cardList>
                </div>
                <div class="text" v-else>
                  <div class="textTop">{{ props.row.content }}</div>
                  <div class="textBottom" v-if="
                      props.row.suggestions && props.row.suggestions.length > 0
                    ">
                    <span v-for="(item, index) in props.row.suggestions" :key="index">
                      <span class="btn" v-if="item.action">{{
                        item.action.displayText
                      }}</span>
                      <span class="btn" v-if="item.reply">{{
                        item.reply.displayText
                      }}</span>
                    </span>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="mouldCode" label="模版ID" show-overflow-tooltip></el-table-column>
            <el-table-column prop="mouldName" label="模版名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterpriseAccountAppName" label="应用" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop="channelName" label="通道" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="businessTypeStr" label="业务类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="模版类型" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.messageType === 0">文本消息</span>
                <span v-if="scope.row.messageType === 1">文件消息</span>
                <span v-if="scope.row.messageType === 2">卡片消息</span>
                <span v-if="scope.row.messageType === 3">变量消息</span>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="状态" show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="status">
                  <span v-if="scope.row.checkStatus === 0">审核中</span>
                  <span v-if="scope.row.checkStatus === 1">审核通过</span>
                  <span v-if="scope.row.checkStatus === 2">审核不通过</span>
                  <span v-if="scope.row.checkStatus === 3">运营商审核中</span>
                  <span v-if="scope.row.checkStatus === null">草稿</span>
                  <el-tooltip v-if="scope.row.checkStatus == 2" class="item" effect="dark" :content="scope.row.checkContent" placement="top">
                    <img style="width:14px;height:14px" src="../../assets/svg/redWarning_icon.svg" alt="" />
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="mouldUpdateTime" label="更新时间" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" width="130">
              <template slot-scope="scope">
                <!-- <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                  <el-button @click.native.prevent="handleEdit(scope.$index, scope.row)" type="text" size="small" v-has="'messageMouldCardAddOrUpdate'">
                    <img src="../../assets/svg/icon-24px-编辑@1x.svg" alt="" />
                  </el-button>
                </el-tooltip> -->
                <span class="operation" @click.prevent="handleEdit(scope.$index, scope.row)" v-has="'messageMouldCardAddOrUpdate'">编辑</span>
                <!-- <el-tooltip class="item" effect="dark" content="删除" placement="bottom"> -->
                  <el-popover placement="bottom" width="200" :ref="`deleteVideo-${scope.$index}`" trigger="click">
                    <span style="padding: 30px">是否删除该消息模板？</span>
                    <div class="group-footer">
                      <el-button size="mini" type="primary" @click="handleDelete(scope.row, scope)">确定</el-button>
                      <el-button size="mini" @click="cancleDeleteVideoFile(scope)">取消</el-button>
                    </div>
                    <!-- <el-button type="text" style="padding: 0" slot="reference" v-has="'messageMouldDeleteById'">
                      <img src="../../assets/svg/icon-24px-删除@1x.svg" />
                    </el-button> -->
                    <span class="operation" slot="reference" v-has="'messageMouldDeleteById'">删除</span>
                  </el-popover>
                <!-- </el-tooltip> -->
                <!-- <el-tooltip class="item" effect="dark" content="发送" placement="bottom">
                  <el-button @click.native.prevent="handleSend(scope.row)" type="text" size="small" v-has="'messageMouldSendMouldMessage'" v-if="scope.row.checkStatus == 1">
                    <img src="../../assets/svg/icon-24px-发送@1x.svg" alt="" />
                  </el-button>
                  <el-button @click.native.prevent="handleSend(scope.row)" type="text" size="small" v-has="'messageMouldSendMouldMessage'" v-else disabled>
                    <img src="../../assets/svg/icon-24px-发送@1x.svg" alt="" />
                  </el-button>
                </el-tooltip> -->
                <span class="operation" @click.prevent="handleSend(scope.row)" v-has="'messageMouldSendMouldMessage'" v-if="scope.row.checkStatus == 1">发送</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="tablist" :style="{minHeight:tabHeight}" v-if="!disableList">
          <div class="addMessage" @click.stop="handleAddMessage">
            <img src="../../assets/svg/icon_Frame.svg" alt="">
            <p>新建消息</p>
            <div class="addMsg" v-if="isShowPlane">
              <div @click="handleText">
                <img src="../../assets/svg/icon-文本消息@1x.svg" alt="" />文本模板
              </div>
              <div @click="handleFile">
                <img src="../../assets/svg/icon-文件消息@1x.svg" alt="" />文件模板
              </div>
              <div @click="handleCard">
                <img src="../../assets/svg/icon-卡片消息@1x.svg" alt="" />卡片模板
              </div>
              <div @click="handleChange">
                <img src="../../assets/svg/icon_变量.svg" alt="" />变量模板
              </div>
            </div>
          </div>
          <template v-for="(item,index) in tableData">
            <!-- ----------------------------------------文本--------------------------------------------------- -->
            <div class="tablistBox" :key="item.id" v-if="item.messageType == 0">
              <div class="boxTitle">
                  <!-- <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                  <el-button @click.native.prevent="handleEdit(index, item)" type="text" size="small" v-has="'messageMouldCardAddOrUpdate'">
                    <img src="../../assets/svg/icon_编辑.svg" alt="" />
                  </el-button>
                </el-tooltip>
                <el-tooltip class="item1" effect="dark" content="删除" placement="bottom">
                  <el-popover placement="bottom" :ref="`deleteVideo-${index}`" trigger="click">
                    <span style="padding: 30px">是否删除该消息模板？</span>
                    <div class="group-footer">
                      <el-button size="mini" type="primary" @click="handlePlaneDelete(item, index)">确定</el-button>
                      <el-button size="mini" @click="canclePlaneDelete(index)">取消</el-button>
                    </div>
                    <el-button type="text" style="padding: 0" slot="reference" v-has="'messageMouldDeleteById'">
                      <img src="../../assets/svg/icon_删除.svg" />
                    </el-button>
                  </el-popover>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="发送" placement="bottom">
                  <el-button @click.native.prevent="handleSend(item)" type="text" size="small" v-has="'messageMouldSendMouldMessage'" v-if="item.checkStatus == 1">
                    <img src="../../assets/svg/icon_发送.svg" alt="" />
                  </el-button>
                  <el-button @click.native.prevent="handleSend(item)" type="text" size="small" v-has="'messageMouldSendMouldMessage'" v-else disabled>
                    <img src="../../assets/svg/icon_发送.svg" alt="" />
                  </el-button>
                </el-tooltip> -->
                <span class="operation" @click.prevent="handleEdit(index, item)" v-has="'messageMouldSendMouldMessage'">编辑</span>
                <el-popover placement="bottom" :ref="`deleteVideo-${index}`" trigger="click">
                    <span style="padding: 30px">是否删除该消息模板？</span>
                    <div class="group-footer">
                      <el-button size="mini" type="primary" @click="handlePlaneDelete(item, index)">确定</el-button>
                      <el-button size="mini" @click="canclePlaneDelete(index)">取消</el-button>
                    </div>
                    <span class="operation" slot="reference" v-has="'messageMouldSendMouldMessage'">删除</span>
                  </el-popover>
                <span class="operation" @click.prevent="handleSend(item)" v-has="'messageMouldSendMouldMessage'" v-if="item.checkStatus == 1">发送</span>
              </div>
              <div class="boxText boxContent">
                {{item.content}}
              </div>
              <hr v-if="item.suggestions && item.suggestions.length > 0" color="#e5e5e5" style="height:0;border-top:1px solid #e5e5e5;border-right:0;border-left:0;border-bottom:0;">
              <div class="textBottom" v-if="
                      item.suggestions && item.suggestions.length > 0
                    ">
                <span v-for="(item1, index) in item.suggestions" :key="index">
                  <span class="btn" v-if="item1.action">{{
                        item1.action.displayText
                      }}</span>
                  <span class="btn" v-if="item1.reply">{{
                        item1.reply.displayText
                      }}</span>
                </span>
              </div>
              <div class="boxTime">更新于 {{item.mouldUpdateTime}}</div>
            </div>
            <!-- ----------------------------------------文件--------------------------------------------------- -->
            <div class="tablistBox" :key="item.id" v-if="item.messageType == 1">
              <div class="boxTitle">
                  <span class="operation" @click.prevent="handleEdit(index, item)" v-has="'messageMouldSendMouldMessage'">编辑</span>
                <el-popover placement="bottom" :ref="`deleteVideo-${index}`" trigger="click">
                    <span style="padding: 30px">是否删除该消息模板？</span>
                    <div class="group-footer">
                      <el-button size="mini" type="primary" @click="handlePlaneDelete(item, index)">确定</el-button>
                      <el-button size="mini" @click="canclePlaneDelete(index)">取消</el-button>
                    </div>
                    <span class="operation" slot="reference" v-has="'messageMouldSendMouldMessage'">删除</span>
                  </el-popover>
                <span class="operation" @click.prevent="handleSend(item)" v-has="'messageMouldSendMouldMessage'" v-if="item.checkStatus == 1">发送</span>
              </div>
              <div class="boxText">
                <waterfallFile :fileData="item"></waterfallFile>
              </div>
              <hr v-if="item.suggestions && item.suggestions.length > 0" color="#e5e5e5" style="height:0;border-top:1px solid #e5e5e5;border-right:0;border-left:0;border-bottom:0;">
              <div class="textBottom" v-if="
                      item.suggestions && item.suggestions.length > 0
                    ">
                <span v-for="(item1, index) in item.suggestions" :key="index">
                  <span class="btn" v-if="item1.action">{{
                        item1.action.displayText
                      }}</span>
                  <span class="btn" v-if="item1.reply">{{
                        item1.reply.displayText
                      }}</span>
                </span>
              </div>
              <div class="boxTime">更新于 {{item.mouldUpdateTime}}</div>
            </div>
            <!-- ----------------------------------------卡片--------------------------------------------------- -->
            <div class="tablistBox" :key="item.id" v-if="item.messageType == 2">
              <div class="boxTitle">
                  <span class="operation" @click.prevent="handleEdit(index, item)" v-has="'messageMouldSendMouldMessage'">编辑</span>
                <el-popover placement="bottom" :ref="`deleteVideo-${index}`" trigger="click">
                    <span style="padding: 30px">是否删除该消息模板？</span>
                    <div class="group-footer">
                      <el-button size="mini" type="primary" @click="handlePlaneDelete(item, index)">确定</el-button>
                      <el-button size="mini" @click="canclePlaneDelete(index)">取消</el-button>
                    </div>
                    <span class="operation" slot="reference" v-has="'messageMouldSendMouldMessage'">删除</span>
                  </el-popover>
                <span class="operation" @click.prevent="handleSend(item)" v-has="'messageMouldSendMouldMessage'" v-if="item.checkStatus == 1">发送</span>
              </div>
              <div class="boxText">
                <waterfallCard :cardData="item"></waterfallCard>
              </div>
              <hr v-if="item.suggestions && item.suggestions.length > 0" color="#e5e5e5" style="height:0;border-top:1px solid #e5e5e5;border-right:0;border-left:0;border-bottom:0;">
              <div class="textBottom" v-if="
                      item.suggestions && item.suggestions.length > 0
                    ">
                <span v-for="(item1, index) in item.suggestions" :key="index">
                  <span class="btn" v-if="item1.action">{{
                        item1.action.displayText
                      }}</span>
                  <span class="btn" v-if="item1.reply">{{
                        item1.reply.displayText
                      }}</span>
                </span>
              </div>
              <div class="boxTime">更新于 {{item.mouldUpdateTime}}</div>
            </div>
            <!-- ----------------------------------------变量--------------------------------------------------- -->
            <div class="tablistBox" :key="item.id" v-if="item.messageType == 3">
              <div class="boxTitle">
                  <span class="operation" @click.prevent="handleEdit(index, item)" v-has="'messageMouldSendMouldMessage'">编辑</span>
                <el-popover placement="bottom" :ref="`deleteVideo-${index}`" trigger="click">
                    <span style="padding: 30px">是否删除该消息模板？</span>
                    <div class="group-footer">
                      <el-button size="mini" type="primary" @click="handlePlaneDelete(item, index)">确定</el-button>
                      <el-button size="mini" @click="canclePlaneDelete(index)">取消</el-button>
                    </div>
                    <span class="operation" slot="reference" v-has="'messageMouldSendMouldMessage'">删除</span>
                  </el-popover>
                <span class="operation" @click.prevent="handleSend(item)" v-has="'messageMouldSendMouldMessage'" v-if="item.checkStatus == 1">发送</span>
              </div>
              <div class="boxText boxContent">
                {{item.content}}
              </div>
              <hr v-if="item.suggestions && item.suggestions.length > 0" color="#e5e5e5" style="height:0;border-top:1px solid #e5e5e5;border-right:0;border-left:0;border-bottom:0;">
              <div class="textBottom" v-if="
                      item.suggestions && item.suggestions.length > 0
                    ">
                <span v-for="(item1, index) in item.suggestions" :key="index">
                  <span class="btn" v-if="item1.action">{{
                        item1.action.displayText
                      }}</span>
                  <span class="btn" v-if="item1.reply">{{
                        item1.reply.displayText
                      }}</span>
                </span>
              </div>
              <div class="boxTime">更新于 {{item.mouldUpdateTime}}</div>
            </div>
          </template>
        </div>
        <div class="pagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40, 50]" :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
      <div class="MessageBox" v-if="dialogVisible">
        <div class="banner">
          <div class="bannerTitle">
            <div class="titleLeft">发送消息</div>
            <div class="titleRight">
              <i @click="cancle" class="el-icon-close"></i>
            </div>
          </div>
          <div class="bannerMain">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
              <el-form-item label="应用" prop="app">
                <el-select size="small" v-model="ruleForm.app" placeholder="请选择">
                  <el-option v-for="item in appOptions" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="消息模板" prop="msg">
                <span>{{ ruleForm.msg }}</span>
              </el-form-item>
              <el-form-item label="发送给" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="bannerFottom">
            <el-button type="primary" @click="confirmSend" size="small">发送</el-button>
            <el-button size="small" @click="cancle">取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import cardList from '@/components/cardList'
import fileList from '@/components/fileList'
import waterfallFile from '@/components/waterfallFile'
import waterfallCard from '@/components/waterfallCard'
import {
  getMessageTemplateList,
  businessTypeList,
  getMouldNum,
  getAppList,
  channelList,
  sentMessage,
  deleteMessageMould,
} from '../../api/message/messageTemplate'
import { getCookie, download } from '../../public'
export default {
  name: 'messageTemplate',
  components: { cardList, fileList, waterfallFile, waterfallCard },
  data() {
    return {
      loading: false,
      planeSrc: require('../../assets/svg/平铺.svg'),
      listSrc: require('../../assets/svg/icon_24px_列表.svg'),
      templateName: null,
      tableData: [],
      ruleForm: {
        app: '',
        msg: '',
        channelId: '',
        mouldCode: '', //消息模板code
        desc: '',
      },
      rules: {
        app: [
          { required: true, message: '应用不可为空', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        desc: [{ required: true, message: '手机号不可为空', trigger: 'blur' }],
      },
      appOptions: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      messageType: null,
      businessTypeList: [], //业务类型
      appOptions: [], //应用
      channelOptions: [], //通道
      allNum: 0, //全部模板数量
      textNum: 0, //文本数量
      fileNum: 0, //文件数量
      cardNum: 0, //卡片数量
      changeNum: 0, //变量数量
      isDisableTotal: true,
      isDisableText: false,
      isDisableFile: false,
      isDisableCard: false,
      isDisableChange: false,
      isShow: false,
      isListShow: false,
      isShowPlane: false,
      disableList: false, //列表显示还是瀑布流
      dialogVisible: false,
      enterpriseId: getCookie('enterpriseId'),
      tableHeight: window.innerHeight - 370 + '',
      tabHeight: window.innerHeight - 370 + 'px',
    }
  },
  methods: {
    //平铺
    handlePlaneShow() {
      this.isListShow = false
      this.disableList = false
      this.planeSrc = require('../../assets/svg/平铺.svg')
      this.listSrc = require('../../assets/svg/icon_24px_列表.svg')
    },
    //列表
    handleListShow() {
      this.isListShow = true
      this.disableList = true
      this.planeSrc = require('../../assets/svg/icon_24px_平铺_1.svg')
      this.listSrc = require('../../assets/svg/列表.svg')
    },
    // 获取列表数据
    getListData() {
      this.loading = true
      let params = {
        messageType: this.messageType,
        name: this.templateName,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }
      getMessageTemplateList(params)
        .then((res) => {
          this.loading = false
          if (res.data.status == 0) {
            this.total = res.data.data.total
            // 遍历组装业务类型文本
            res.data.data.records.map((item) => {
              this.appOptions.map((item0) => {
                if (item.enterpriseAccountAppId == item0.id) {
                  item.enterpriseAccountAppName = item0.name
                }
              })
              this.channelOptions.map((item1) => {
                if (item.channelId == item1.id) {
                  item.channelName = item1.name
                }
              })
              this.businessTypeList.map((item2) => {
                if (item.businessType == item2.id) {
                  item.businessTypeStr = item2.name
                }
              })
            })
            this.$nextTick(() => {
              this.tableData = res.data.data.records
            })
          } else {
            this.$message.error({
              message: res.data.message,
              center: true,
            })
          }
        })
        .catch((err) => {
          this.$message.error({
            message: err,
            center: true,
          })
        })
    },
    // 获取业务类型
    getBusinessTypeList() {
      getAppList()
        .then((res) => {
          this.appOptions = res.data.data
        })
        .catch((err) => {
          //   this.$message.error({
          //     message: err,
          //     center: true,
          //   })
        })
    //   channelList({ enterpriseAccountAppId: '', businessTypeConfigId: '' })
    //     .then((res) => {
    //       this.channelOptions = res.data.data
    //     })
    //     .catch((err) => {
    //       //   this.$message.error({
    //       //     message: err,
    //       //     center: true,
    //       //   })
    //     })
      this.$nextTick(() => {
        businessTypeList({ id: 1 })
          .then((res) => {
            if (res.data.status == 0) {
              this.businessTypeList = res.data.data
              this.getListData()
            } else {
              this.$message.error({
                message: res.data.message,
                center: true,
              })
            }
          })
          .catch((err) => {
            // this.$message.error({
            //   message: err,
            //   center: true,
            // })
          })
      })
    },
    // 获取消息模板类型对应的数量
    getMouldNumData() {
      getMouldNum({})
        .then((res) => {
          if (res.data.status == 0) {
            this.textNum = res.data.data.TEXT
            this.fileNum = res.data.data.FILE
            this.cardNum = res.data.data.CARD
            this.changeNum = res.data.data.VARIABLE
          } else {
            // this.$message.error({
            //   message: res.data.message,
            //   center: true,
            // })
          }
        })
        .catch((err) => {
          //   this.$message.error({
          //     message: err,
          //     center: true,
          //   })
        })
    },
    // 条件查询
    search() {
      this.currentPage = 1
      this.getListData()
    },
    // 回车查询
    keyDown(e) {
      if (e.keyCode == 13) {
        this.search()
      }
    },
    // 改变页面尺寸
    handleSizeChange(val) {
      this.pageSize = val
      this.getListData()
    },
    // 翻页
    handleCurrentChange(val) {
      this.currentPage = val
      this.getListData()
    },
    handleClick(val) {
      if (val == 1) {
        this.isDisableTotal = false
        this.isDisableText = true
        this.isDisableFile = false
        this.isDisableCard = false
        this.isDisableChange = false
        this.messageType = 0
      } else if (val == 2) {
        this.isDisableTotal = false
        this.isDisableText = false
        this.isDisableFile = true
        this.isDisableCard = false
        this.isDisableChange = false
        this.messageType = 1
      } else if (val == 3) {
        this.isDisableTotal = false
        this.isDisableText = false
        this.isDisableFile = false
        this.isDisableCard = true
        this.isDisableChange = false
        this.messageType = 2
      } else if (val == 4) {
        this.isDisableTotal = false
        this.isDisableText = false
        this.isDisableFile = false
        this.isDisableCard = false
        this.isDisableChange = true
        this.messageType = 3
      } else {
        this.isDisableTotal = true
        this.isDisableText = false
        this.isDisableFile = false
        this.isDisableCard = false
        this.isDisableChange = false
        this.messageType = null
      }
      this.currentPage = 1
      this.getListData()
    },
    // 下载文件
    downloadAction(url, fileName) {
      download(url, fileName)
    },
    handleEdit(index, row) {
      //编辑
      if (row.messageType == 0) {
        this.$router.push({
          name: 'diyMessage',
          query: { jum: 'text', id: row.mouldId },
        })
      } else if (row.messageType == 1) {
        this.$router.push({
          name: 'diyMessage',
          query: { jum: 'file', id: row.mouldId },
        })
      } else if (row.messageType == 2) {
        this.$router.push({
          name: 'diyMessage',
          query: { jum: 'card', id: row.mouldId },
        })
      } else if (row.messageType == 3) {
        this.$router.push({
          name: 'diyMessage',
          query: { jum: 'change', id: row.mouldId },
        })
      }
    },
    handleDelete(row, scope) {
      //删除
      deleteMessageMould({ messageMouldId: row.mouldId })
        .then((res) => {
          if (res.data.status == 0) {
            scope._self.$refs[`deleteVideo-${scope.$index}`].doClose()
            this.$message.success({
              message: '消息模板删除成功',
              center: true,
            })
            this.getListData()
            this.getMouldNumData()
          } else {
            this.$message.error({
              message: res.data.message,
              center: true,
            })
          }
        })
        .catch((err) => {
          this.$message.error({
            message: err,
            center: true,
          })
        })
    },
    //瀑布流删除
    handlePlaneDelete(row, index) {
      deleteMessageMould({ messageMouldId: row.mouldId })
        .then((res) => {
          if (res.data.status == 0) {
            this.$refs[`deleteVideo-${index}`][0].doClose()
            this.$message.success({
              message: '消息模板删除成功',
              center: true,
            })
            this.getListData()
            this.getMouldNumData()
          } else {
            this.$message.error({
              message: res.data.message,
              center: true,
            })
          }
        })
        .catch((err) => {
          this.$message.error({
            message: err,
            center: true,
          })
        })
    },
    // 取消删除
    cancleDeleteVideoFile(scope) {
      scope._self.$refs[`deleteVideo-${scope.$index}`].doClose()
    },
    // 取消瀑布流删除
    canclePlaneDelete(index) {
      this.$refs[`deleteVideo-${index}`][0].doClose()
    },
    //发送
    handleSend(row) {
      this.$router.push({
        // name: "moreMessages",
        path: '/moreMessages',
        query: {
          mouldId: row.mouldId,
          app: row.enterpriseAccountAppId,
          messageType: row.messageType,
        },
      })
    },
    confirmSend() {
      //确认发送
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const temp = this.ruleForm.desc.split(/[\s\n]/).filter((item) => {
            if (item != '' || item != null) {
              return item
            }
          })
          const result = temp.every((item) => {
            return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(item)
          })
          if (!result) {
            this.$message({
              type: 'warning',
              message: '请输入合法的手机号！',
              center: true,
            })
            return
          }
          let phoneList = temp.join(',')
          const params = {
            // batchName:'',//批次名称
            channelId: '', // 消息通道
            chatbotId: '125200401111131', // 机器人ID
            clientType: 'MAAP', // CM通道专用，其他不需要带
            enterpriseAccountAppId: this.ruleForm.app, //企业应用id
            // inReplyToContributionId: "null", // 回复id
            mouldCode: this.ruleForm.mouldCode, // 普通消息模板id
            params: {
              // 模板参数
              phone: '',
              date: '',
            },
            phoneDistinct: true, //号码去重
            sendingMode: 'ACTIVE', //ACTIVE:群发消息; PASSIVE:交互消息
            // timingTime:'',//定时时间，未开启定时则为空
            to: phoneList, // 接收方手机号
            clientCorrelator: '', //用户端关联数据
          }
          sentMessage(params)
            .then((res) => {
              if (res.data.status == 0) {
                this.$message.success({
                  message: '发送成功',
                  center: true,
                })
                this.cancle()
              } else {
                this.$message.error({
                  message: res.data.message,
                  center: true,
                })
              }
            })
            .catch((err) => {
              this.$message.error({
                message: err,
                center: true,
              })
            })
        }
      })
    },
    cancle() {
      //取消发送
      this.dialogVisible = false
      window.addEventListener('keydown', this.keyDown) //绑定监听事件
      // this.ruleForm.app = "";
      // this.ruleForm.desc = "";
      this.total.bntgmr.type.scope.data.list.obj
    },
    addMessage() {
      //新增消息
      this.isShow = true
    },
    handleAddMessage() {
      this.isShowPlane = true
    },
    handleBodyClick() {
      this.isShow = false
      this.isShowPlane = false
    },
    handleText() {
      //文本消息
      this.$router.push({
        name: 'diyMessage',
        query: { jum: 'text' },
      })
      this.isShow = false
    },
    handleFile() {
      //文件消息
      this.$router.push({
        name: 'diyMessage',
        query: { jum: 'file' },
      })
      this.isShow = false
    },
    handleCard() {
      //卡片消息
      this.$router.push({
        name: 'diyMessage',
        query: { jum: 'card' },
      })
      this.isShow = false
    },
    handleChange() {
      this.$router.push({
        name: 'diyMessage',
        query: { jum: 'change' },
      })
      this.isShow = false
    },
  },
  mounted() {
    this.getBusinessTypeList()
    this.getMouldNumData()
    this.$nextTick(() => {
      document.addEventListener('click', this.handleBodyClick)
    })
    window.addEventListener('keydown', this.keyDown) //绑定监听事件
  },
  destroyed() {
    document.removeEventListener('click', this.handleBodyClick)
    window.removeEventListener('keydown', this.keyDown, false) //移除监听事件
  },
}
</script>
<style lang="less" scoped>
#header {
  width: 100%;
  // height: 100%;
  @vat: #666;
  .navW {
    width: 100%;
    // height: 100%;
  }
  .navF {
    box-sizing: border-box;
    font-size: 14px;
    padding: 0 70px;
  }
  .header {
    .navW();
    .navF();
    .title {
      height: 90px;
      font-size: 20px;
      line-height: 80px;
      box-sizing: border-box;
      padding-top: 10px;
    }
    .nav {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .navLeft {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #333;
        img:hover {
          cursor: pointer;
        }
      }
      .navRight {
        .el-icon-search {
          cursor: pointer;
        }
      }
    }
    .table {
      .text {
        width: 330px;
        background-color: #fff;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        padding: 0 30px;
        box-sizing: border-box;
        .textTop {
          margin: 15px 0px;
          word-break: break-all;
          display: -webkit-box;
          // width: 100%;
          // height: 40px;
          font-size: 14px;
          // color: #999;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
        }
        .textBottom {
          width: 268px;
          padding: 20px 0;
          border-top: 1px solid #e5e5e5;
          white-space: nowrap;
          overflow-x: auto;
          .btn {
            width: fit-content;
            height: 34px;
            display: inline-block;
            line-height: 34px;
            text-align: center;
            border: 1px solid #e5e5e5;
            border-radius: 34px;
            margin-right: 16px;
            padding: 0 10px;
            box-sizing: border-box;
            cursor: pointer;
          }
          .btn:hover {
            color: #409eff;
            border-color: #409eff;
          }
          .btn:nth-of-type(3n) {
            margin-right: 0;
          }
        }
      }
      // height: calc(100% - 130px);
      .tableT {
        height: 90px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .tableTLeft {
          .el-button {
            color: #999;
            border: 1px solid#fff;
          }
          .el-button:hover {
            background: none;
          }
          .el-button:focus {
            background: none;
          }
          .active {
            border: 1px solid#368CFE;
            color: #368cfe;
          }
        }
        .tableTRight {
          position: relative;
          .el-button {
            /deep/ span {
              display: flex;
              justify-content: center;
              align-items: center;
            }
            [class*=' el-icon-'],
            [class^='el-icon-'] {
              font-size: 24px;
              display: block;
              margin-right: 5px;
            }
          }
          .addMsg {
            width: 130px;
            height: 150px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            position: absolute;
            top: 60px;
            right: -25px;
            z-index: 999;
            border-radius: 4px;
            background: #ffffff;
            box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.15);
            div {
              width: 100%;
              height: 38px;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              img {
                margin-right: 10px;
              }
            }
            div:hover {
              background: #f5f5f5;
            }
          }
        }
      }
      .tableF {
        width: 100%;
        .el-table .item {
          width: 20px;
          height: 20px;
          line-height: 20px;
          float: left;
          padding: 0;
          margin-right: 6px;
        }
        /deep/ .el-table__expanded-cell[class*='cell'] {
          background: #f8f8fb;
        }
        /deep/ .el-table__expanded-cell[class*='cell']:hover {
          background: #f8f8fb !important;
        }
        /deep/ .el-table__row td:nth-child(1) div {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .expandAudio {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .dowImage {
          float: right;
          padding: 0;
        }
        .status {
          display: flex;
          align-items: center;
          img {
            margin-left: 10px;
          }
        }
      }
      .tablist {
        width: 100%;
        padding:0 20px;
        box-sizing: border-box;
        margin: 0 auto;
        border:none;
        column-width: 30%; /*设定列宽*/
        column-count: 3; /*列数*/
        column-gap: 20; /*列间距*/
        .addMessage {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 200px;
          border: 1px solid #e5e5e5;
          margin-bottom: 20px;
        //   margin-top: 10px;
          background-color: #f8f8fb;
          break-inside: avoid; /*避免在元素内部断行并产生新列*/
          cursor: pointer;
          position: relative;
          overflow: auto;
          .addMsg {
            position: absolute;
            top: 13%;
            left: 45%;
            width: 130px;
            height: 150px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            position: absolute;
            right: -35px;
            z-index: 999;
            border-radius: 4px;
            background: #ffffff;
            box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.15);
            div {
              width: 100%;
              height: 38px;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              img {
                margin-right: 10px;
              }
            }
            div:hover {
              background: #f5f5f5;
            }
          }
        }
        .tablistBox {
          width: 100%;
          padding: 10px;
          box-sizing: border-box;
          border: 1px solid #e5e5e5;
          break-inside: avoid; /*避免在元素内部断行并产生新列*/
          margin-bottom: 20px;
          margin-top: 10px;
          overflow: hidden;
          position: relative;
          .boxTitle {
              position: absolute;
              right: 10px;
              z-index: 99999;
            display: none;
            .el-button--text {
              margin-left: 5px;
              padding: 0;
              font-size: 20px;
              margin-bottom: 10px;
            }
            .item1{
                height: 29px;
            }
          }
          .boxText {
            width: 100%;
            // min-height: 60px;
            // max-height: 250px;
            margin-top: 32px;
            word-break: break-all;
            display: -webkit-box;
            font-size: 14px;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            margin-bottom: 15px;
            .item {
              width: 24px;
              height: 26px;
              line-height: 26px;
              float: left;
              padding: 0;
              margin-right: 6px;
            }
          }
          .boxContent{
              margin-top: 32px;
          }
          .textBottom {
            // width: 268px;
            padding: 20px 0;
            white-space: nowrap;
            overflow-x: auto;
            .btn {
              width: fit-content;
              height: 34px;
              display: inline-block;
              line-height: 34px;
              text-align: center;
              border: 1px solid #e5e5e5;
              border-radius: 34px;
              margin-right: 16px;
              padding: 0 10px;
              box-sizing: border-box;
              cursor: pointer;
            }
            .btn:hover {
              color: #409eff;
              border-color: #409eff;
            }
            .btn:nth-of-type(3n) {
              margin-right: 0;
            }
          }
          .boxTime {
            font-size: 10px;
            color: #999;
            //   margin-top: 10px;
          }
        }
        .tablistBox:hover{
            box-shadow: 0 0 10px #e5e5e5;
            .boxTitle{
                display: block;
            }
        }
      }
      @media (min-width: 800px) { 
        .tablist { 
            column-count: 3; // two columns on larger phones 
        } 
    } 
    @media (min-width: 1440px) { 
        .tablist { 
            column-count: 4; // two columns on larger phones 
        } 
    } 
    @media (min-width: 1600px) { 
        .tablist { 
            column-count: 5; // three columns on...you get it 
        } 
    }
      .pagination {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
      }
    }
    .operation{
      margin-left: 10px;
      display: block;
      float: left;
      cursor: pointer;
      color: #409eff;
    }
  }
  .MessageBox {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 999;
    .banner {
      width: 450px;
      height: 390px;
      background: #fff;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      .bannerTitle {
        width: 100%;
        height: 44px;
        box-sizing: border-box;
        padding: 0 33px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e5e5e5;
        .titleRight {
          cursor: pointer;
        }
      }
      .bannerMain {
        width: 100%;
        height: 272px;
        box-sizing: border-box;
        padding-top: 20px;
        .el-form-item {
          margin-bottom: 16px;
        }
        .el-textarea {
          width: 220px;
          /deep/ .el-textarea__inner {
            height: 140px !important;
          }
        }
      }
      .bannerFottom {
        width: 100%;
        height: 74px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
