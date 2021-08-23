<template>
  <div id="header" ref="header" v-loading="loading" element-loading-text="loading">
    <!-- 消息模板 -->
    <div class="header">
      <div class="title">消息模板</div>
      <div class="nav">
        <div class="navLeft">
          <span>我的模板（共{{ textNum + changeNum}}条）</span>
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
            <el-button size="mini" :class="{ active: isDisableTotal }" @click="handleClick()" round>全部 ({{ textNum + changeNum }})</el-button>
            <el-button size="mini" :class="{ active: isDisableText }" @click="handleClick(7)" round>普通模板 ({{ textNum }})</el-button>
            <el-button size="mini" :class="{ active: isDisableChange }" @click="handleClick(8)" round>变量模板 ({{ changeNum }})</el-button>
          </div>
          <div class="tableTRight">
            <el-button v-if="isListShow" type="text" @click.stop="addMessage" style="color: #fe9636" v-has="'vmsMessageMouldAddOrUpdate'"><i class="el-icon-circle-plus-outline"></i>
              <p>新建模板</p>
            </el-button>
            <div class="addMsg" v-if="isShow">
              <div @click="handleText">
                <img src="../../assets/svg/icon-文本消息@1x.svg" alt="" />普通模板
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
            <el-table-column type="expand" align="center">
              <template slot-scope="props">
                <div class="messagebox" v-for="(item,index) in props.row.vmsMessageContentList" :key="'items' + index">
                  <div class="expandText" v-if="item.type == 0">{{item.content}}</div>
                  <div class="expandImage" v-if="item.type == 1">
                    <img :src="item.fileDetailUrl" alt="">
                  </div>
                  <div class="expandAudio" v-if="item.type == 2">
                    <audio :ref="'audio' + index" @ended="handleEnded(props.$index,index)" @loadedmetadata="handleDuration(props.$index,index)" preload readyState>
                      <source :src="item.fileDetailUrl" type="audio/mpeg" />
                    </audio>
                    <div class="audioCon">
                      <img class="iamgeLeft" :src="item.iamgeLeftUrl" alt="" />
                      {{ item.duration }}
                      <img class="imageRight" @click="handlePlay(props.$index,index)" :src="item.imageRightUrl" alt="" />
                    </div>
                  </div>
                  <div class="expandVideo" v-if="item.type == 3">
                    <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="item.playerOptions"></video-player>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="mouldCode" label="模版ID" show-overflow-tooltip></el-table-column>
            <el-table-column prop="mouldName" label="模版名称" show-overflow-tooltip ></el-table-column>
            <el-table-column prop="enterpriseAccountAppName" label="应用" show-overflow-tooltip ></el-table-column>
            <el-table-column prop="businessTypeStr" label="业务类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="模版类型" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.messageType === 6">普通模板</span>
                <span v-if="scope.row.messageType === 7">变量模板</span>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="状态"  show-overflow-tooltip>
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
            <el-table-column prop="mouldUpdateTime" label="更新时间" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column label="操作" width="130">
              <template slot-scope="scope">
                <!-- <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                  <el-button @click.native.prevent="handleEdit(scope.$index, scope.row)" type="text" size="small" v-has="'vmsMessageMouldAddOrUpdate'">
                    <img src="../../assets/svg/icon-24px-编辑@1x.svg" alt="" />
                  </el-button>
                </el-tooltip> -->
                <span class="operation" @click.prevent="handleEdit(scope.$index, scope.row)" v-has="'vmsMessageMouldAddOrUpdate'">编辑</span>
                <!-- <el-tooltip class="item" effect="dark" content="删除" placement="bottom"> -->
                  <el-popover placement="bottom" width="200" :ref="`deleteVideo-${scope.$index}`" trigger="click">
                    <span style="padding: 30px">是否删除该消息模板？</span>
                    <div class="group-footer">
                      <el-button size="mini" type="primary" @click="handleDelete(scope.row, scope)">确定</el-button>
                      <el-button size="mini" @click="cancleDeleteVideoFile(scope)">取消</el-button>
                    </div>
                    <!-- <el-button type="text" style="padding: 0" slot="reference" v-has="'vmsMessageMouldDeleteById'">
                      <img src="../../assets/svg/icon-24px-删除@1x.svg" />
                    </el-button> -->
                    <span class="operation" slot="reference" v-has="'vmsMessageMouldDeleteById'">删除</span>
                  </el-popover>
                <!-- </el-tooltip> -->
                <!-- <el-tooltip class="item" effect="dark" content="发送" placement="bottom">
                  <el-button @click.native.prevent="handleSend(scope.row)" type="text" size="small" v-has="'vmsMessageMouldSendMouldMessage'" v-if="scope.row.checkStatus == 1">
                    <img src="../../assets/svg/icon-24px-发送@1x.svg" alt="" />
                  </el-button>
                  <el-button @click.native.prevent="handleSend(scope.row)" type="text" size="small" v-has="'vmsMessageMouldSendMouldMessage'" v-else disabled>
                    <img src="../../assets/svg/icon-24px-发送@1x.svg" alt="" />
                  </el-button>
                </el-tooltip> -->
                <span class="operation" @click="handleSend(scope.row)" v-has="'vmsMessageMouldSendMouldMessage'" v-if="scope.row.checkStatus == 1">发送</span>
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
                <img src="../../assets/svg/icon-文本消息@1x.svg" alt="" />普通模板
              </div>
              <div @click="handleChange">
                <img src="../../assets/svg/icon_变量.svg" alt="" />变量模板
              </div>
            </div>
          </div>
          <template v-for="(item,index) in tableData">
            <!-- ----------------------------------------文本--------------------------------------------------- -->
            <div class="tablistBox" :key="item.id" v-if="item.messageType == 6">
              <div class="boxTitle">
                <span class="operation" @click.prevent="handleEdit(index, item)" v-has="'vmsMessageMouldAddOrUpdate'">编辑</span>
                <el-popover placement="bottom" :ref="`deleteVideo-${index}`" trigger="click">
                    <span style="padding: 30px">是否删除该消息模板？</span>
                    <div class="group-footer">
                      <el-button size="mini" type="primary" @click="handlePlaneDelete(item, index)">确定</el-button>
                      <el-button size="mini" @click="canclePlaneDelete(index)">取消</el-button>
                    </div>
                    <span class="operation" slot="reference" v-has="'vmsMessageMouldDeleteById'">删除</span>
                  </el-popover>
                <span class="operation" @click.prevent="handleSend(item)" v-has="'vmsMessageMouldSendMouldMessage'" v-if="item.checkStatus == 1">发送</span>
              </div>
              <div class="boxText boxContent">
                <div class="messagebox" v-for="(items,index1) in item.vmsMessageContentList" :key="'items' + index1">
                  <div class="expandText" v-if="items.type == 0">{{items.content}}</div>
                  <div class="expandImage" v-if="items.type == 1">
                    <img :src="items.fileDetailUrl" alt="">
                  </div>
                  <div class="expandAudio" v-if="items.type == 2">
                    <audio :ref="'audio1' + index1" @ended="handleEnded1(index,index1)" @loadedmetadata="handleDuration1(index,index1)" preload readyState>
                      <source :src="items.fileDetailUrl" type="audio/mpeg" />
                    </audio>
                    <div class="audioCon">
                      <img class="iamgeLeft" :src="items.iamgeLeftUrl" alt="" />
                      {{ items.duration }}
                      <img class="imageRight" @click="handlePlay1(index,index1)" :src="items.imageRightUrl" alt="" />
                    </div>
                  </div>
                  <div class="expandVideo" v-if="items.type == 3">
                    <video-player class="video-player vjs-custom-skin" ref="videoPlayer1" :playsinline="true" :options="items.playerOptions"></video-player>
                  </div>
                </div>
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
            <div class="tablistBox" :key="item.id" v-if="item.messageType == 7">
              <div class="boxTitle">
                  <span class="operation" @click.prevent="handleEdit(index, item)" v-has="'vmsMessageMouldAddOrUpdate'">编辑</span>
                <el-popover placement="bottom" :ref="`deleteVideo-${index}`" trigger="click">
                    <span style="padding: 30px">是否删除该消息模板？</span>
                    <div class="group-footer">
                      <el-button size="mini" type="primary" @click="handlePlaneDelete(item, index)">确定</el-button>
                      <el-button size="mini" @click="canclePlaneDelete(index)">取消</el-button>
                    </div>
                    <span class="operation" slot="reference" v-has="'vmsMessageMouldDeleteById'">删除</span>
                  </el-popover>
                <span class="operation" @click.prevent="handleSend(item)" v-has="'vmsMessageMouldSendMouldMessage'" v-if="item.checkStatus == 1">发送</span>
              </div>
              <div class="boxText boxContent">
                <div class="messagebox" v-for="(items,index1) in item.vmsMessageContentList" :key="'items' + index1">
                  <div class="expandText" v-if="items.type == 0">{{items.content}}</div>
                  <div class="expandImage" v-if="items.type == 1">
                    <img :src="items.fileDetailUrl" alt="">
                  </div>
                  <div class="expandAudio" v-if="items.type == 2">
                    <audio :ref="'audio1' + index1" @ended="handleEnded1(index,index1)" @loadedmetadata="handleDuration1(index,index1)" preload readyState>
                      <source :src="items.fileDetailUrl" type="audio/mpeg" />
                    </audio>
                    <div class="audioCon">
                      <img class="iamgeLeft" :src="items.iamgeLeftUrl" alt="" />
                      {{ items.duration }}
                      <img class="imageRight" @click="handlePlay1(index,index1)" :src="items.imageRightUrl" alt="" />
                    </div>
                  </div>
                  <div class="expandVideo" v-if="items.type == 3">
                    <video-player class="video-player vjs-custom-skin" ref="videoPlayer1" :playsinline="true" :options="items.playerOptions"></video-player>
                  </div>
                </div>
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
import {
  getMessageTemplateList,
  businessTypeList,
  getMouldNum,
  getAppList,
  sentMessage,
  deleteMessageMould,
} from '../../api/vms/vmsMessageTemplate'
import { getCookie, download } from '../../public'
export default {
  name: 'vmsMessageTemplate',
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
      flag: false,
      messageType: null,
      iamgeLeftUrl: require('../../assets/svg/pause2_icon.svg'),
      imageRightUrl: require('../../assets/svg/play_icon.svg'),
      duration: '00:00', //音频时长
      businessTypeList: [], //业务类型
      appOptions: [], //应用
      allNum: 0, //全部模板数量
      textNum: 0, //文本数量
      changeNum: 0, //变量数量
      isDisableTotal: true,
      isDisableText: false,
      isDisableFile: false,
      isDisableCard: false,
      isDisableChange: false,
      isShow: false,
      dialogVisible: false,
      isListShow: false,
      isShowPlane: false,
      disableList: false, //列表显示还是瀑布流
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
    handleAddMessage() {
      this.isShowPlane = true
    },
    handleBodyClick() {
      this.isShow = false
      this.isShowPlane = false
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
              item.vmsMessageContentList.map((item) => {
                if (item.type == 2) {
                  item.flag = false
                  item.iamgeLeftUrl = require('../../assets/svg/pause2_icon.svg')
                  item.imageRightUrl = require('../../assets/svg/play_icon.svg')
                  item.duration = '00:00'
                } else if (item.type == 3) {
                  item.playerOptions = {
                    //播放速度
                    // playbackRates: [0.5, 1.0, 1.5, 2.0],
                    //如果true,浏览器准备好时开始回放。
                    autoplay: false,
                    // 默认情况下将会消除任何音频。
                    muted: false,
                    // 导致视频一结束就重新开始。
                    loop: false,
                    // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    preload: 'auto',
                    language: 'zh-CN',
                    // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    aspectRatio: '16:9',
                    // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    fluid: true,
                    sources: [
                      {
                        //类型
                        type: 'video/mp4',
                        //url地址
                        src: item.fileDetailUrl,
                      },
                    ],
                    //你的封面地址
                    poster: '',
                    //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    notSupportedMessage: '此视频暂无法播放，请稍后再试',
                    controlBar: {
                      timeDivider: true,
                      durationDisplay: true,
                      remainingTimeDisplay: false,
                      //全屏按钮
                      fullscreenToggle: false,
                    },
                  }
                }
              })
              this.appOptions.map((item0) => {
                if (item.enterpriseAccountAppId == item0.id) {
                  item.enterpriseAccountAppName = item0.name
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
          this.$message.error({
            message: err,
            center: true,
          })
        })
      this.$nextTick(() => {
        businessTypeList({ id: 3 })
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
            this.$message.error({
              message: err,
              center: true,
            })
          })
      })
    },
    // 获取消息模板类型对应的数量
    getMouldNumData() {
      getMouldNum({})
        .then((res) => {
          if (res.data.status == 0) {
            this.textNum = res.data.data.VMS_NORMAL
            this.changeNum = res.data.data.VMS_VARIABLE
          } else {
            this.$message.error({
              message: res.data.message,
              center: true,
            })
          }
        })
        .catch((err) => {})
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
    // 音频播放
    handlePlay(e, index) {
      this.tableData[e].vmsMessageContentList[index].flag = !this.tableData[e]
        .vmsMessageContentList[index].flag
      if (this.tableData[e].vmsMessageContentList[index].flag) {
        this.$refs[`audio${index}`][0].play()
        this.tableData[e].vmsMessageContentList[index].iamgeLeftUrl = require('../../assets/images/paly2_icon.gif')
        this.tableData[e].vmsMessageContentList[index].imageRightUrl = require('../../assets/svg/pause_icon.svg')
      } else {
        this.$refs[`audio${index}`][0].pause()
        this.tableData[e].vmsMessageContentList[
          index
        ].iamgeLeftUrl = require('../../assets/svg/pause2_icon.svg')
        this.tableData[e].vmsMessageContentList[
          index
        ].imageRightUrl = require('../../assets/svg/play_icon.svg')
      }
    },
    handleEnded(e, index) {
      this.tableData[e].vmsMessageContentList[index].flag = !this.tableData[e]
        .vmsMessageContentList[index].flag
      this.tableData[e].vmsMessageContentList[index].iamgeLeftUrl = require('../../assets/svg/pause2_icon.svg')
      this.tableData[e].vmsMessageContentList[index].imageRightUrl = require('../../assets/svg/play_icon.svg')
    },
    handleDuration(e, index) {
      var h = Math.floor(this.$refs[`audio${index}`][0].duration / 360)
      var m =
        Math.floor(this.$refs[`audio${index}`][0].duration / 60) < 10
          ? '0' + Math.floor(this.$refs[`audio${index}`][0].duration / 60)
          : Math.floor(this.$refs[`audio${index}`][0].duration / 60)
      var s = Math.floor(this.$refs[`audio${index}`][0].duration % 60)
      var str = h > 0 ? h + ':' + m + ':' + s : m + ':' + s
      this.tableData[e].vmsMessageContentList[index].duration = str
    },
    // 音频播放
    handlePlay1(e, index) {
      this.tableData[e].vmsMessageContentList[index].flag = !this.tableData[e]
        .vmsMessageContentList[index].flag
      if (this.tableData[e].vmsMessageContentList[index].flag) {
        this.$refs[`audio1${index}`][0].play()
        this.tableData[e].vmsMessageContentList[index].iamgeLeftUrl = require('../../assets/images/paly2_icon.gif')
        this.tableData[e].vmsMessageContentList[index].imageRightUrl = require('../../assets/svg/pause_icon.svg')
      } else {
        this.$refs[`audio1${index}`][0].pause()
        this.tableData[e].vmsMessageContentList[
          index
        ].iamgeLeftUrl = require('../../assets/svg/pause2_icon.svg')
        this.tableData[e].vmsMessageContentList[
          index
        ].imageRightUrl = require('../../assets/svg/play_icon.svg')
      }
    },
    handleEnded1(e, index) {
      this.tableData[e].vmsMessageContentList[index].flag = !this.tableData[e]
        .vmsMessageContentList[index].flag
      this.tableData[e].vmsMessageContentList[index].iamgeLeftUrl = require('../../assets/svg/pause2_icon.svg')
      this.tableData[e].vmsMessageContentList[index].imageRightUrl = require('../../assets/svg/play_icon.svg')
    },
    handleDuration1(e, index) {
      var h = Math.floor(this.$refs[`audio1${index}`][0].duration / 360)
      var m =
        Math.floor(this.$refs[`audio1${index}`][0].duration / 60) < 10
          ? '0' + Math.floor(this.$refs[`audio1${index}`][0].duration / 60)
          : Math.floor(this.$refs[`audio1${index}`][0].duration / 60)
      var s = Math.floor(this.$refs[`audio1${index}`][0].duration % 60)
      var str = h > 0 ? h + ':' + m + ':' + s : m + ':' + s
      this.tableData[e].vmsMessageContentList[index].duration = str
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
      if (val == 7) {
        this.isDisableTotal = false
        this.isDisableText = true
        this.isDisableChange = false
        this.messageType = 6
      } else if (val == 8) {
        this.isDisableTotal = false
        this.isDisableText = false
        this.isDisableChange = true
        this.messageType = 7
      } else {
        this.isDisableTotal = true
        this.isDisableText = false
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
      if (row.messageType == 6) {
        this.$router.push({
          name: 'diyVmsMessage',
          query: { jum: 'text', id: row.mouldId },
        })
      } else if (row.messageType == 7) {
        this.$router.push({
          name: 'diyVmsMessage',
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
    // 取消删除
    cancleDeleteVideoFile(scope) {
      scope._self.$refs[`deleteVideo-${scope.$index}`].doClose()
    },
    //发送
    handleSend(row) {
      this.$router.push({
        // name: "moreMessages",
        path: '/vmsMoreMessage',
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
    },
    addMessage() {
      //新增消息
      this.isShow = true
    },
    handleBodyClick() {
      this.isShow = false
    },
    handleText() {
      //文本消息
      this.$router.push({
        name: 'diyVmsMessage',
        query: { jum: 'text' },
      })
      this.isShow = false
    },
    handleChange() {
      this.$router.push({
        name: 'diyVmsMessage',
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
      }
      .navRight {
        .el-icon-search {
          cursor: pointer;
        }
      }
    }
    .table {
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
            height: 80px;
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
          width: 24px;
          height: 26px;
          line-height: 26px;
          float: left;
          padding: 0;
          margin-right: 6px;
        }
        .messagebox {
          width: 330px;
          background-color: #fff;
          border: 1px solid #e5e5e5;
          border-radius: 4px;
          overflow: hidden;
          box-sizing: border-box;
          .expandText {
            width: 100%;
            margin: 15px 0;
            padding: 0 20px;
            background-color: #fff;
            border-radius: 4px;
            box-sizing: border-box;
            word-break: break-all;
            display: -webkit-box;
            font-size: 14px;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            overflow: hidden;
          }
          .expandImage {
            width: 100%;
            // border: 1px solid #e5e5e5;
            background: #ffffff;
            box-sizing: border-box;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .expandAudio {
            width: 90%;
            height: 60px;
            margin: 15px 5% 15px 5%;
            border: 1px solid #e5e5e5;
            box-sizing: border-box;
            background: #ffffff;
            .audioCon {
              width: 100%;
              height: 100%;
            //   border: 1px solid #e5e5e5;
              background: #ffffff;
              float: left;
              display: flex;
              justify-content: space-around;
              align-items: center;
              .iamgeLeft {
                margin-left: 5px;
                cursor: pointer;
              }
              .imageRight {
                margin-right: 5px;
                cursor: pointer;
              }
            }
          }
          .expandVideo {
            width: 100%;
            border: 1px solid #e5e5e5;
            background: #ffffff;
          }
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
            top: 30%;
            left: 45%;
            width: 130px;
            height: 80px;
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
            .messagebox {
          width: 100%;
          background-color: #fff;
          border: 1px solid #e5e5e5;
          border-radius: 4px;
          overflow: hidden;
          box-sizing: border-box;
          .expandText {
            width: 100%;
            margin: 15px 0;
            padding: 0 20px;
            background-color: #fff;
            border-radius: 4px;
            box-sizing: border-box;
            word-break: break-all;
            display: -webkit-box;
            font-size: 14px;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            overflow: hidden;
          }
          .expandImage {
            width: 100%;
            // border: 1px solid #e5e5e5;
            background: #ffffff;
            box-sizing: border-box;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .expandAudio {
            width: 90%;
            height: 60px;
            margin: 15px 5% 15px 5%;
            border: 1px solid #e5e5e5;
            box-sizing: border-box;
            background: #ffffff;
            .audioCon {
              width: 100%;
              height: 100%;
            //   border: 1px solid #e5e5e5;
              background: #ffffff;
              float: left;
              display: flex;
              justify-content: space-around;
              align-items: center;
              .iamgeLeft {
                margin-left: 5px;
                cursor: pointer;
              }
              .imageRight {
                margin-right: 5px;
                cursor: pointer;
              }
            }
          }
          .expandVideo {
            width: 100%;
            border: 1px solid #e5e5e5;
            background: #ffffff;
            overflow: hidden;
          }
        }
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
      .operation{
      margin-left: 10px;
      display: block;
      float: left;
      cursor: pointer;
      color: #409eff;
    }
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
