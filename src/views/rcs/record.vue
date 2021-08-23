<template>
  <!-- 收发记录页面 -->
  <div id="header">
    <div class="header">
      <div class="title">收发记录</div>
    </div>
    <div class="content">
      <el-tabs v-model="currentTab" @tab-click="handleClick">
        <el-tab-pane label="发送记录" name="first">
          <!-- 头部搜索区域 -->
          <div class="content-head">
            <div class="headerBtn">
              <el-button-group class="content-first">
                <el-button type="primary" size="small" @click="refresh" class="btn-height">
                  <i class="iconfont iconshuaxin"></i>
                </el-button>
                <el-button type="primary" @click="clearSend" size="small" class="btn-height">
                  <i class="iconfont iconguanbi"></i>
                </el-button>
              </el-button-group>
              <el-select v-model="enterpriseAccountAppId" placeholder="应用" size="small" ref="appSelect" @visible-change="appChange" clearable @change="getSendBatchList">
                <el-option v-for="item in appOptions" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="sendStatus" placeholder="状态" size="small" ref="statusSelect" @visible-change="statusChange" clearable @change="getSendBatchList">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-input size="small" placeholder="批次名称" v-model="searchContent">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="getSendBatchList"></i>
              </el-input>
              <el-date-picker
                size="small"
                v-model="time"
                type="daterange"
                unlink-panels
                :clearable="false"
                range-separator="~"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="getSendBatchList"
                style="position:relative;bottom:1px">
              </el-date-picker>
            </div>

            <el-button-group>
              <div class="headerBtnRight">
                <el-button size="small" class=" iconBtn active" style="margin-right:3px" @click="exportRepeat" v-has="'messageBatchMessageExport'" :disabled="exportBtnDisable">
                  <i class="iconfont icondaochu"></i>
                  导出
                </el-button>
                <el-button size="small" style="margin-right:3px" class="iconBtn" :class="{ 'active': !btnDisable }" :disabled="btnDisable" @click="repeat" v-has="'messageBatchResend'">
                  <i class="iconfont iconshuaxin"></i>
                  失败重发
                </el-button>
              </div>
              <!-- <el-button size="small" class="iconBtn" @click="deleteRopeat" :class="{ 'active': !btnDisable }" :disabled="btnDisable" v-has="'messageBatchDelete'">
                <i class="iconfont iconshanchu"></i>
                删除
              </el-button> -->
            </el-button-group>
          </div>
          <h-table :tableOptions="tableOptions" :operation="true" :data="data" v-loading="loading1" @select="selectValues">
            <template slot="expand" slot-scope="props">
              <div class="text" v-if="props.row.messageContent && props.row.messageContent.messageType == 'TEXT'">
                <div class="textTop">{{ props.row.messageContent.content }}</div>
                <div class="textBottom" v-if="
                    props.row.messageContent.suggestions && props.row.messageContent.suggestions.length > 0
                  ">
                  <span v-for="(item, index) in props.row.messageContent.suggestions" :key="index">
                    <span class="btn" v-if="item.action">{{item.action.displayText}}</span>
                    <span class="btn" v-if="item.reply">{{item.reply.displayText}}</span>
                  </span>
                </div>
              </div>
              <!-- <span v-if="props.row.messageContent.messageType == 'TEXT'">{{ props.row.messageContent.content }}</span> -->
              <div v-else-if=" props.row.messageContent && props.row.messageContent.messageType == 'FILE'">
                <fileList :fileData="props.row.messageContent"></fileList>
                <el-button @click.native.prevent="downLoad(props.row.messageContent.fileGroupDetail.fileName, props.row.messageContent.fileGroupDetail.fileUrl)" type="text" size="small"
                  class="dowImage">
                  <img src="../../assets/images/icon-24px-下载@1x.png" alt="" />
                </el-button>
              </div>
              <div v-else-if="props.row.messageContent && props.row.messageContent.messageType == 'CARD'">
                <cardList :cardData="props.row.messageContent"></cardList>
              </div>
            </template>
            <template slot="operation" slot-scope="scope">
              <!-- 这里是需求变更操作变成文字，故此段注释掉 -->
              <!-- <el-tooltip class="item" effect="dark" content="取消发送" placement="top">
                <el-button type="text" size="mini">
                  <img src="../../assets/images1/icon_24px_审核不能过.svg">
                </el-button>
                <img class="operation" src="../../assets/svg/icon_24px_审核不能过.svg" @click="cancaleSend(scope)" v-has="'messageBatchWithdraw'">
              </el-tooltip> -->
              <!-- <el-tooltip class="item" effect="dark" content="发送详情" placement="top">
                <el-button type="text" size="mini" @click="edit(scope)">
                  <img src="../../assets/images1/icon_24px_更多.svg">
                </el-button>
                <img class="operation" src="../../assets/svg/icon_24px_更多.svg" @click="toDetail(scope)" v-has="'messageSendRecordPageList'">
              </el-tooltip> -->
              <span class="operation" v-if="scope.row.status != 'FINISH'" @click="cancaleSend(scope)" v-has="'messageBatchWithdraw'">取消</span>
              <span class="operation" @click="toDetail(scope)" v-has="'messageSendRecordPageList'">详情</span>
            </template>
          </h-table>
          <div class="page-footer">
            <el-pagination size="small" @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page.sync="page1.currentPage" :size-change.sync="page1.currentSize"
              layout="total, sizes, prev, pager, next, jumper" :total="page1.total">
            </el-pagination>
          </div>
          <el-dialog title="失败重发" :visible.sync="sendrecordVisible" width="35%">
            <el-form label-width="80px">
              <el-form-item label="发送用户" :rules="[{ required: true}]">
                <el-radio-group v-model="sendTo">
                  <el-radio :label="1">当前登录用户</el-radio>
                  <el-radio :label="2">原发送用户</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <el-table border stripe size="small" :data="repeatData" :header-cell-style="{ background: '#F4F4F4', color: '#333333' }">
              <el-table-column label="批次名称" prop="batchName" show-overflow-tooltip></el-table-column>
              <el-table-column label="消息内容" prop="messageContent" show-overflow-tooltip></el-table-column>
              <el-table-column label="预估重发" prop="repeat" show-overflow-tooltip></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="confirmRepeat" size="small">确 定</el-button>
              <el-button @click="sendrecordVisible = false" size="small">取 消</el-button>
            </span>
          </el-dialog>
        </el-tab-pane>
        <!--                          发送详情                          -->
        <el-tab-pane label="发送详情" name="second">
          <div class="headerBtn">
            <el-button-group>
              <el-button type="primary" size="small" @click="refreshSendDetail" class="btn-height">
                <i class="iconfont iconshuaxin"></i>
              </el-button>
              <el-button type="primary" @click="clearSendDetail" size="small" class="btn-height">
                <i class="iconfont iconguanbi"></i>
              </el-button>
            </el-button-group>
            <el-select v-model="enterpriseAccountAppId2" placeholder="应用" size="small" clearable ref="selectApp2" @visible-change="selectApp2" @change="getSendDetail">
              <el-option v-for="item in appOptions" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="status2" placeholder="状态" size="small" clearable ref="statusSelect2" @visible-change="statusSelect2"  @change="getSendDetail">
              <el-option v-for="item in optionsList3" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-input size="small" placeholder="批次名称" v-model="batchName2">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="getSendDetail"></i>
            </el-input>
          </div>
          <div class="detail-contetn">
            <el-table border size="small" tooltip-effect="dark" v-loading="loading2" :data="detailData" :style="{'color':'#333','min-height': (minHeight || '') + 'px','line-height': '27px'}"
              :header-cell-style="{ background: '#F4F4F4', color: '#333333','line-height': '22px' }">
              <el-table-column label="批次名称" prop="batchName" width="140" show-overflow-tooltip></el-table-column>
              <el-table-column label="应用名称" prop="appName" width="140" show-overflow-tooltip></el-table-column>
              <el-table-column label="业务类型" prop="businessTypeName" width="140" show-overflow-tooltip></el-table-column>
              <el-table-column label="手机号码" prop="phoneNumber" width="100" show-overflow-tooltip></el-table-column>
              <el-table-column label="消息模板" prop="messageMouldName" width="140" show-overflow-tooltip></el-table-column>
              <el-table-column label="发送结果" prop="sendOfResult" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column label="失败原因" prop="failCause" width="120" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.failCause || '--'}}</span>
                </template>
              </el-table-column>
              <el-table-column label="提交时间" prop="createTime" width="140" show-overflow-tooltip></el-table-column>
              <el-table-column label="定时时间" prop="timingTime" width="140" show-overflow-tooltip></el-table-column>
              <el-table-column label="发送时间" prop="sendTime" width="140" show-overflow-tooltip></el-table-column>
              <el-table-column label="送达时间" prop="deliverTime" width="140" show-overflow-tooltip></el-table-column>
              <el-table-column label="发送通道" prop="channelName" width="150" show-overflow-tooltip></el-table-column>
              <el-table-column label="发送账号" prop="createAccountName" show-overflow-tooltip></el-table-column>
              <el-table-column label="提交报告" prop="submitReport" show-overflow-tooltip></el-table-column>
              <el-table-column label="状态报告" prop="statusOfReport" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
          <div class="page-footer">
            <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page.sync="page2.currentPage" :size-change.sync="page2.currentSize"
              layout="total, sizes, prev, pager, next, jumper" :total="page2.total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="接收记录" name="third">
          <div class="headerBtn">
            <el-button-group>
              <el-button type="primary" size="small" @click="refreshReceive" class="btn-height">
                <i class="iconfont iconshuaxin"></i>
              </el-button>
              <el-button type="primary" @click="clearReceive" size="small" class="btn-height">
                <i class="iconfont iconguanbi"></i>
              </el-button>
            </el-button-group>
            <el-select v-model="enterpriseAccountAppId3" placeholder="应用" size="small" clearable ref="appSelect3" @visible-change="appSelect3" @change="getReceiveList">
              <el-option v-for="item in appOptions" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="status3" placeholder="状态" size="small" clearable ref="statusSelect3" @visible-change="statusSelect3"  @change="getReceiveList">
              <el-option v-for="item in submitStatusOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-input size="small" placeholder="手机号码" v-model="batchName3">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="getReceiveList"></i>
            </el-input>
          </div>
          <div class="detail-content">
            <div class="detail-contetn">
              <el-table border size="small" v-loading="loading3" tooltip-effect="dark" :data="receiveData" :style="{'color':'#333','min-height': (minHeight || '') + 'px'}"
                :header-cell-style="{ background: '#F4F4F4', color: '#333333', 'line-height': '22px' }">
                <el-table-column label="应用" prop="appName" show-overflow-tooltip></el-table-column>
                <el-table-column label="手机号码" prop="phoneNumber"></el-table-column>
                <el-table-column label="接收内容" prop="receiveContent" show-overflow-tooltip></el-table-column>
                <el-table-column label="接收账号" prop="createAccountName" show-overflow-tooltip></el-table-column>
                <el-table-column label="接收部门" prop="departmentName" show-overflow-tooltip></el-table-column>
                <el-table-column label="接收通道" prop="channelId" show-overflow-tooltip></el-table-column>
                <el-table-column label="送达时间" prop="deliverTime" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column label="状态" prop="status"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <!-- 这里是需求变更操作变成文字，故此段注释掉 -->

                    <!-- <el-tooltip class="item" effect="dark" content="回复消息" placement="top">
                      <el-button type="text" size="small" @click="reply">
                        <img src="../../assets/images1/icon_24px_回复.svg"/>
                      </el-button>
                      <img class="operation" src="../../assets/svg/icon_24px_回复.svg" @click="replyMessage(scope)" v-has="'messageReply'" />
                    </el-tooltip> -->
                    <!-- <el-tooltip class="item" effect="dark" content="查看记录" placement="top">
                      <el-button type="text" size="small">
                        <img src="../../assets/images1/icon_24px_详情.svg" />
                      </el-button>
                      <img class="operation" src="../../assets/svg/icon_24px_详情.svg" @click="handleDetails(scope.$index, scope.row)" v-has="'messageRecordView'" />
                    </el-tooltip> -->
                    <span class="operation" @click="replyMessage(scope)" v-has="'messageReply'">回复</span>
                    <span class="operation" @click="handleDetails(scope.$index, scope.row)" v-has="'messageRecordView'">详情</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="page-footer">
            <el-pagination @size-change="handleSizeChange3" @current-change="handleCurrentChange3" :current-page.sync="page3.currentPage" :size-change.sync="page3.currentSize"
              layout="total, sizes, prev, pager, next, jumper" :total="page3.total">
            </el-pagination>
          </div>
          <el-dialog title="回复消息" :visible.sync="receiveVisible" width="30%">
            <div class="tips">
              <span>上行号码: </span><span>{{ upNumber }}</span>
            </div>
            <div class="tips">
              <span>上行内容: </span> <span>{{ upContent }}</span>
            </div>
            <el-input type="textarea" v-model="sendContent" :rows="4" style="margin-top: 20px"></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" size="small" @click="confirmResend">确 定</el-button>
              <el-button size="small" @click="receiveVisible = false">取 消</el-button>
            </span>
          </el-dialog>
          <el-drawer title="收发记录" :visible.sync="drawer" :direction="direction">
            <!-- 聊天内容区域 -->
            <div ref="chattingContent" id="chattingContent" class="chatting-content" v-loading="chatLoading" @scroll="chatScroll">
              <div v-if="msgs.length == 0">
                <span class="none-message">暂无记录</span>
              </div>
              <div v-else>
                <div v-for="(item, index) of msgs" :key="index">
                  <!-- 发送类型为接收的 -->
                  <div v-if="item.direction == 'RECEIVE'" class="chatting-item self clearfix">
                    <div class="msg-date">
                      {{ item.sendTime }}
                    </div>
                    <div class="msg-from">
                      <!-- <span class="loc">[{{item.loc}}]</span> -->
                      <span class="msg-author">{{ item.messageContent.phoneList}}</span>
                      <img src="../../assets/images/Frame-350@1x.png" alt="">
                    </div>
                    <div class="msg-content" v-if="item.messageContent.messageType == 'TEXT' ">
                      {{ item.messageContent.content }}
                    </div>
                    <div class="msg-content" v-else-if="item.messageContent.messageType == 'FILE'">
                      <fileList :fileData="item.messageContent"></fileList>
                    </div>
                    <div class="msg-content" v-else-if="item.messageContent && item.messageContent.messageType == 'CARD'">
                      <cardList :cardData="item.messageContent"></cardList>
                    </div>
                  </div>
                  <!-- 文件类型为发的时候 -->
                  <div v-else class="chatting-item other clearfix">
                    <!-- 时间 -->
                    <div class="msg-date">
                      {{ item.sendTime }}
                    </div>
                    <!-- 头像+名称 -->
                    <div class="msg-from">
                      <img src="../../assets/images/Frame-343@1x.png" alt="">
                      <span class="msg-author">{{ item.appName }}</span>
                    </div>
                    <!-- 内容信息 -->
                    <div class="msg-content" v-if="item.messageContent.messageType == 'TEXT' ">
                      {{ item.messageContent.content }}
                    </div>
                    <div class="msg-content" v-else-if="item.messageContent.messageType == 'FILE'">
                      <fileList :fileData="item.messageContent"></fileList>
                    </div>
                    <div class="msg-content" v-else-if="item.messageContent.messageType = 'CARD'">
                      <cardList :cardData="item.messageContent"></cardList>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-drawer>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import cardList from '@/components/cardList'
import fileList from '@/components/fileList'
import HTable from '@/components/HTable'
import {
  sendBatch,
  channelLists,
  receiveList,
  sendDetailList,
  messageBatchWithdraw,
  recoedDetail,
  replyMessage,
  repeatMessage,
  exportExcel,
  deleteBatch,
} from '../../api/message/records'
import { getAppLists } from '../../api/Develop/myapp'
import { getMessageList } from '../../api/message/moreMessage'
import { download } from '../../public'
import { businessTypeList } from '../../api/message/messageTemplate'
import dayjs from 'dayjs'
export default {
  components: {
    HTable,
    cardList,
    fileList,
  },
  data() {
    return {
      currentTab: 'first', // 当前是第几个tab页
      messageModule: [], //  消息模板列表
      channelList: [],
      businessTypeList: [],
      // 发送记录
      enterpriseAccountAppId: '', // 应用
      appOptions: [], // 应用列表
      sendStatus: '', // 发送状态
      status: '', // 状态
      statusOptions: [
        {
          value: 'TO_SEND',
          label: '待发送',
        },
        {
          value: 'SENDING',
          label: '发送中',
        },
        {
          value: 'FINISH',
          label: '发送完成',
        },
        {
          value: 'CANCEL',
          label: '取消',
        },
        {
          value: 'TO_CHECK',
          label: '待审核',
        },
      ], // 状态列表
      searchContent: '', // 批次名称
      time: [], // 时间
      tableOptions: {
        // 表格配置项
        border: true,
        stripe: false,
        expand: false,
        select: true,
        expand: true,
        minHeight: window.innerHeight - 330 + '',
        columns: [
          {
            label: '批次名称',
            prop: 'batchName',
            minWidth: '120',
          },
          {
            label: '应用名称',
            prop: 'appName',
            minWidth: '120',
          },
          {
            label: '业务类型',
            prop: 'businessTypeName',
            minWidth: '150',
          },
          {
            label: '消息模板',
            prop: 'messageMouldName',
            minWidth: '150',
          },
          {
            label: '提交时间',
            prop: 'createTime',
            minWidth: '150',
          },
          {
            label: '定时时间',
            prop: 'timingTime',
            minWidth: '150',
          },
          {
            label: '完成时间',
            prop: 'finishTime',
            minWidth: '150',
          },
          // {
          //   label: '发送通道',
          //   prop: 'channelName',
          //   minWidth: '150',
          // },
          {
            label: '发送账号',
            prop: 'createAccountName',
          },
          {
            label: '批次状态',
            prop: 'batchStatus',
          },
          {
            label: '提交号码数',
            prop: 'submitPhones',
            minWidth: '90',
          },
          {
            label: '被过滤号码数',
            prop: 'filterPhones',
            minWidth: '100',
          },
          {
            label: '已发送号码数',
            prop: 'successPhones',
            minWidth: '100',
          },
          {
            label: '失败号码数',
            prop: 'failPhones',
            minWidth: '90',
          },
        ],
      },
      selectValue: [],
      btnDisable: true,
      data: [], // 表格数据
      sendrecordVisible: false, // 弹窗控制
      sendTo: 1,
      repeatData: [],
      page1: {
        currentPage: 1,
        currentSize: 10,
        total: 0,
      },
      loading1: false, // 表格1的loading效果
      exportBtnDisable: false,

      /**
       * 发送详情
       */
      loading2: false, // 表格2的loading效果
      batchId: '', // 批次ID
      enterpriseAccountAppId2: '', // 应用ID
      status2: '', // 状态
      batchName2: '', // 批次名称
      optionsList2: [
        {
          label: '提交成功',
          value: 'SUBMIT',
        },
        {
          label: '提交失败',
          value: 'SUBMIT_FAIL',
        },
      ],
      optionsList3: [
        // 发送详情发送状态列表
        {
          label: '发送中',
          value: 'SENDING',
        },
        {
          label: '发送失败',
          value: 'SEND_FAILED',
        },
        {
          label: '发送成功',
          value: 'SEND_SUCCESS',
        },
        {
          label: '未知状态',
          value: 'UNKNOWN'
        }
      ],
      optionsList04: [
        {
          value: 'TO_SUBMIT',
          label: '待提交',
        },
        {
          value: 'SUBMIT',
          label: '已提交',
        },
        {
          value: 'SUBMIT_FAILED',
          label: '提交失败',
        },
        {
          value: 'SENT',
          label: '已发出',
        },
        {
          value: 'DELIVERED',
          label: '已送达',
        },
        {
          value: 'DISPLAYED',
          label: '已读',
        },
        {
          value: 'FAILED',
          label: '发送失败',
        },
        {
          value: 'SMS',
          label: '转短信',
        },
        {
          value: 'ABNORMAL',
          label: '系统异常',
        },
        {
          value: 'REVOKED',
          label: '已撤销',
        },
        {
          value: 'REVOKED_FAILED',
          label: '撤销失败',
        },
        {
          value: 'TO_REPLY',
          label: '待回复',
        },
        {
          label: '已回复',
          value: 'REPLIED',
        },
        {
          label: '未知状态',
          value: 'UNKNOWN'
        }
      ],
      minHeight: window.innerHeight - 330 + '',
      detailData: [
        //  发送详情表格数据
      ],
      page2: {
        currentPage: 1,
        currentSize: 10,
        total: 0,
      },
      /**
       * 接收记录
       */
      loading3: false,
      receiveData: [
        // 接收记录表格数据
        {
          appName: '',
          phoneNumber: '',
          receiveContent: '',
          receiveAccount: '',
          receiveDepartment: '',
          receiveChanel: '通一',
          deliverTime: '',
          status: '',
        },
      ],
      enterpriseAccountAppId3: '',
      status3: '',
      batchName3: '',
      submitStatusOptions: [
        {
          value: 'TO_REPLY',
          label: '未回复',
        },
        {
          label: '已回复',
          value: 'REPLIED',
        },
      ],
      receiveVisible: false,
      upNumber: '', // 上行号码
      upContent: '', // 上行内容
      sendContent: '', // 发送内容
      channelId: '',
      replyContent: {
        businessId: '',
        channelId: '',
        content: '',
        enterpriseAccountAppId: '',
        sendingMode: '',
        to: '',
      }, // 发送内容参数
      page3: {
        currentPage: 1,
        currentSize: 10,
        total: 0,
      },

      direction: 'rtl',
      chatLoading: false,
      tempData: '',
      detailSizeDown: 5,
      detailSizeUp: 5,
      msgs: [],
      drawer: false,
    }
  },
  methods: {
    // 切换tabye
    handleClick() {
      if (this.currentTab == 'first') {
        this.page1.currentPage = 1
        this.getSendBatchList()
      } else if (this.currentTab == 'second') {
        this.page2.currentPage = 1
        this.batchId = ''
        this.getSendDetail()
      } else if (this.currentTab == 'third') {
        this.page3.currentPage = 1
        this.getReceiveList()
      }
    },
    //  获取应用列表
    getDataList() {
      // this.appOptions = []
      getAppLists()
        .then((res) => {
          if (res.data.status == 0) {
            this.appOptions = res.data.data
          } else {
            this.$message.error({
              message: res.data.message,
              center: true,
            })
          }
        })
        .catch((error) => {
          this.$message.error({
            message: error,
            center: true,
          })
        })
    },
    // 获取消息模板列表
    getMessageLists() {
      const query = {
        checkStatus: 1,
      }
      getMessageList(query)
        .then((res) => {
          if (res.data.status == 0) {
            this.messageModule = res.data.data
          } else {
            this.$message({
              type: res.data.status === 2 ? 'warning' : 'error',
              message: res.data.message,
              center: true,
            })
          }
        })
        .catch((error) => {
          this.$message.error({
            message: error,
            center: true,
          })
        })
    },
    // 获取通道列表
    getChannelList() {
      channelLists().then((res) => {
        if (res.data.status == 0) {
          this.channelList = res.data.data
        } else {
          this.$message({
            type: 'error',
            message: res.data.message,
            center: true,
          })
        }
      })
    },
    // 下载
    downLoad(fileName, url) {
      download(url, fileName)
    },
    // 获取类型列表
    getMessageTypeList() {
      businessTypeList({ id: 1 })
        .then((res) => {
          if (res.data.status == 0) {
            this.businessTypeList = res.data.data
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
    /**
     * 发送记录
     */
    // 发送批次记录列表
    getSendBatchList() {
      const that = this
      this.loading1 = true
      const query = {
        currentPage: this.page1.currentPage,
        enterpriseAccountAppId: this.enterpriseAccountAppId,
        pageSize: this.page1.currentSize,
        searchContent: this.searchContent,
        status: this.sendStatus,
        beginTime: this.time[0],
        endTime: this.time[1],
      }
      if (this.sendStatus == '') {
        delete query.status
      }
      sendBatch(query)
        .then((res) => {
          if (res.data.status == 0) {
            const data = res.data.data
            this.page1.total = data.total
            this.$nextTick(() => {
              data.records.forEach((item) => {
                that.appOptions.forEach((item1) => {
                  if (item.enterpriseAccountAppId == item1.id) {
                    item.appName = item1.name
                  }
                })
                // that.channelList.forEach((item3) => {
                //   if (item.channelId == item3.id) {
                //     item.sendChaanle = item3.name
                //   }
                // })
                that.businessTypeList.forEach((item4) => {
                  if (item.businessType == item4.id) {
                    item.businessTypeName = item4.name
                  }
                })
                item.batchStatus = that.findAppByid(item.status, that.statusOptions)
                if (item.messageContent != null) {
                  if (item.messageContent.messageType == 'CARD') {
                    item.messageContent.messageMouldCards = item.messageContent.cardList
                  }
                }
              })
              this.data = data.records
            })
          } else {
            this.$message({
              type: 'error',
              message: res.data.message,
              center: true,
            })
          }
          this.loading1 = false
        })
        .catch((error) => {
        //   this.$message({
        //     type: 'error',
        //     message: error,
        //     center: true,
        //   })
          this.loading1 = false
        })
    },
    // 刷新
    refresh() {
      this.getSendBatchList()
    },
    // 清空发送记录搜索条件
    clearSend() {
      this.searchContent = ''
      this.sendStatus = ''
      this.enterpriseAccountAppId = ''
      this.page1.currentPage = 1
    },
    toDetail(scope) {
      this.batchId = scope.row.id
      this.currentTab = 'second'
      this.getSendDetail()
    },
    // 取消发送
    cancaleSend(val) {
      this.$confirm('确定取消发送吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'btn-custom-confirm',
        center: true,
      })
        .then(() => {
          const query = {
            businessId: val.row.id,
          }
          messageBatchWithdraw(query)
            .then((res) => {
              if (res.data.status == 0) {
                this.$message({
                  type: 'success',
                  message: '取消发送成功！',
                  center: true,
                })
                this.getSendBatchList()
              } else {
                this.$message({
                  type: 'error',
                  message: res.data.message,
                  center: true,
                })
              }
            })
            .catch((error) => {
              this.$message({
                type: 'error',
                message: error,
                center: true,
              })
            })
        })
        .catch(() => {
          console.log('取消删除')
        })
    },
    // 失败重发
    repeat() {
      this.repeatData = []
      this.selectValue.forEach((item) => {
        const val = {
          batchName: item.batchName,
          messageContent: item.messageMouldName,
          repeat: item.failPhones,
          id: item.id,
        }
        this.repeatData.push(val)
      })
      this.sendrecordVisible = true
    },
    // 表格选择事件
    selectValues(val) {
      this.selectValue = val
    },
    // 确定重发
    confirmRepeat() {
      const ids = this.repeatData.map((item) => {
        return item.id
      })
      const query = {
        resendBatchIds: ids,
        keepOriginalUserSend: this.sendTo == 1 ? true : false,
      }
      // console.log(query)
      // return
      repeatMessage(query)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '重发成功!',
              center: true,
            })
          } else {
            this.$message({
              type: 'error',
              message: res.data.message,
              center: true,
            })
          }
        })
        .catch((error) => {
          this.$message({
            type: 'error',
            message: error,
            center: true,
          })
        })
      this.sendrecordVisible = false
    },
    // 导出重发
    exportRepeat() {
      const query = {
        beginTime: this.time[0],
        currentPage: this.page1.currentPage,
        endTime: this.time[1],
        enterpriseAccountAppId: this.enterpriseAccountAppId,
        pageSize: this.page1.currentSize,
        searchContent: this.searchContent,
        status: this.sendStatus,
      }
      if (this.sendStatus == '') {
        delete query.status
      }
      this.exportBtnDisable = true
      exportExcel(query)
        .then((res) => {
          // console.log(res)
          const link = document.createElement('a')
          let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          link.download = '批次记录' + new Date().getTime() + '.xls'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          this.exportBtnDisable = false
        })
        .catch((error) => {
          this.$message({
            type: 'error',
            message: error,
            center: true,
          })
          this.exportBtnDisable = false
        })
    },
    // 批量删除重发
    deleteRopeat() {
      this.$confirm('确定要删除选中的数据吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'btn-custom-confirm',
        center: true,
      })
        .then(() => {
          const arr = this.selectValue.map((item) => {
            return item.id
          })
          deleteBatch(arr)
            .then((res) => {
              if (res.data.status == 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功！',
                  center: true,
                })
                this.getSendBatchList()
              } else {
                this.$message({
                  type: 'error',
                  message: '删除失败！',
                  center: true,
                })
              }
            })
            .catch((error) => {
              this.$message({
                type: 'error',
                message: error,
                center: true,
              })
            })
        })
        .catch(() => {})
    },
    handleSizeChange1(val) {
      this.page1.currentSize = val
      this.getSendBatchList()
    },
    handleCurrentChange1(val) {
      this.page1.currentPage = val
      this.getSendBatchList()
    },
    // 应用选择触发
    appChange(isShow) {
      if (!isShow) {
        this.$refs.appSelect.blur()
      }
    },
    // 状态选择触发
    statusChange(isShow) {
      if (!isShow) {
        this.$refs.statusSelect.blur()
      }
    },
    /**
     * 发送详情
     */
    // 获取发送详情数据列表
    getSendDetail() {
      const that = this
      this.loading2 = true
      const query = {
        batchId: this.batchId,
        currentPage: this.page2.currentPage,
        enterpriseAccountAppId: this.enterpriseAccountAppId2,
        pageSize: this.page2.currentSize,
        searchContent: this.batchName2,
        status: this.status2,
      }
      if (this.status2 == '') {
        delete query.status
      }
      sendDetailList(query)
        .then((res) => {
          if (res.data.status == 0) {
            const data = res.data.data
            this.page2.total = data.total
            data.records.forEach((item) => {
              that.appOptions.map((item1) => {
                if (item.enterpriseAccountAppId == item1.id) {
                  item.appName = item1.name
                }
              })
              // that.messageModule.map((item2) => {
              //   if (item.messageMouldId == item2.id) {
              //     item.messageModules = item2.name
              //   }
              // })
              // that.channelList.map((item3) => {
              //   if (item.channelId == item3.id) {
              //     item.sendChaanle = item3.name
              //   }
              // })
              that.businessTypeList.map((item4) => {
                if (item.businessType == item4.id) {
                  item.businessTypeName = item4.name
                }
              })
              // item.appName = that.findAppByid(
              //   item.enterpriseAccountAppId,
              //   that.appOptions
              // )
              // item.messageModules = that.findAppByid(
              //   item.messageMouldId,
              //   that.messageModule
              // )
              // item.sendChaanle = that.findAppByid(
              //   item.channelId,
              //   that.channelList
              // )
              // item.statusOfSubmit = that.findAppByid(
              //   item.submitStatus,
              //   that.optionsList2
              // )
              item.statusOfReport = that.findAppByid(
                item.messageStatus,
                that.optionsList04
              )
              item.sendOfResult = that.findAppByid(
                item.sendResult,
                that.optionsList3
              )
              // item.businessType = that.findAppByid(
              //   item.businessType,
              //   that.businessTypeList
              // )
            })
            this.$nextTick(() => {
              this.detailData = data.records
            })
          } else {
            this.$message({
              type: 'error',
              message: res.data.message,
              center: true,
            })
          }
          this.loading2 = false
        })
        .catch((error) => {
          this.$message({
            type: 'error',
            message: error,
            center: true,
          })
          this.loading2 = false
        })
    },
    // 刷新列表
    refreshSendDetail() {
      this.getSendDetail()
    },
    // 清空搜索列表
    clearSendDetail() {
      this.enterpriseAccountAppId2 = ''
      this.status2 = ''
      this.batchName2 = ''
      this.page2.currentPage = 1
    },
    handleSizeChange2(val) {
      this.page2.currentSize = val
      this.getSendDetail()
    },
    handleCurrentChange2(val) {
      this.page2.currentPage = val
      this.getSendDetail()
    },
    selectApp2(isShow) {
      if (!isShow) {
        this.$refs.selectApp2.blur()
      }
    },
    statusSelect2(isShow) {
      if (!isShow) {
        this.$refs.statusSelect2.blur()
      }
    },
    /**
     * 接收记录
     */
    // 接收记录列表
    getReceiveList() {
      const that = this
      this.loading3 = true
      const query = {
        currentPage: this.page3.currentPage,
        enterpriseAccountAppId: this.enterpriseAccountAppId3,
        pageSize: this.page3.currentSize,
        searchContent: this.batchName3,
        status: this.status3,
      }
      if (this.status3 == '') {
        delete query.status
      }
      receiveList(query)
        .then((res) => {
          if (res.data.status == 0) {
            const result = res.data.data
            this.page3.total = result.total
            result.records.forEach((item) => {
              // item.appName = that.findAppByid(
              //   item.enterpriseAccountAppId,
              //   that.appOptions
              // )
              that.appOptions.map((item1) => {
                if (item.enterpriseAccountAppId == item1.id) {
                  item.appName = item1.name
                }
              })
              // that.channelList.map((item3) => {
              //   if (item.channelId == item3.id) {
              //     item.receiveChannle = item3.name
              //   }
              // })
              // item.receiveChannle = that.findAppByid(
              //   item.channelId,
              //   that.channelList
              // )
              item.status = that.findAppByid(
                item.messageStatus,
                that.submitStatusOptions
              )
              item.receiveContent = item.messageContent.content
            })
            this.$nextTick(() => {
              this.receiveData = result.records
            })
          } else {
            this.$message({
              type: 'error',
              message: res.data.message,
              center: true,
            })
          }
          this.loading3 = false
        })
        .catch((error) => {
          this.$message({
            type: 'error',
            message: error,
            center: true,
          })
          this.loading3 = false
        })
    },
    replyMessage(val) {
      this.sendContent = ''
      console.log(val.row)
      this.upNumber = val.row.phoneNumber
      this.upContent = val.row.receiveContent
      this.replyContent.businessId = val.row.id
      this.replyContent.channelId = val.row.channelId
      this.replyContent.content = this.sendContent
      this.replyContent.enterpriseAccountAppId = val.row.enterpriseAccountAppId
      this.replyContent.sendingMode = 'PASSIVE'
      this.replyContent.to = val.row.phoneNumber
      this.receiveVisible = true
    },
    //  回复
    confirmResend() {
      this.replyContent.content = this.sendContent
      replyMessage(this.replyContent)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '回复成功！',
              center: true,
            })
          } else {
            this.$message({
              type: 'error',
              message: res.data.message,
              center: true,
            })
          }
        })
        .catch((error) => {
          this.$message({
            type: 'error',
            message: error,
            center: true,
          })
        })
      this.receiveVisible = false
    },
    // 查看记录
    //  viewRecords(val) {
    //    console.log(val)
    //  },
    handleSizeChange3(val) {
      this.page3.currentSize = val
      this.getReceiveList()
    },
    handleCurrentChange3(val) {
      this.page3.currentPage = val
      this.getReceiveList()
    },
    // 清空接收记录
    clearReceive() {
      this.enterpriseAccountAppId3 = ''
      this.status3 = ''
      this.page3.currentPage = 1
      this.batchName3 = ''
    },
    // 应用选择事件
    appSelect3(isShow) {
      if (!isShow) {
        this.$refs.appSelect3.blur()
      }
    },
    statusSelect3(isShow) {
      if (!isShow) {
        this.$refs.statusSelect3.blur()
      }
    },
    // 刷新接收记录
    refreshReceive() {
      this.getReceiveList()
    },
    // 回车事件
    keyDown(e) {
      if (e.keyCode == 13) {
        if (this.currentTab == 'first') {
          this.getSendBatchList()
        } else if (this.currentTab == 'second') {
          this.getSendDetail()
        } else if (this.currentTab == 'third') {
          this.getReceiveList()
        }
      }
    },
    // 根据应用ID, 模板ID匹配应用、模板
    findAppByid(val, options) {
      let temp = ''
      options.forEach((item) => {
        if (val == item.value) {
          temp =  item.label
        }
      })
      return temp
    },
    // 监听页面滚动
    chatScroll() {
      const scrollEvent = this.$refs.chattingContent
      // console.log(scrollEvent.scrollTop)
      if (
        scrollEvent.scrollTop + scrollEvent.clientHeight ==
        scrollEvent.scrollHeight
      ) {
        this.detailSizeDown += 5
        const query = {
          channelId: this.channelId,
          phoneNumber: this.tempData.phoneNumber,
          scrollType: 'DOWN',
          sendTime: this.tempData.sendTime
            ? this.tempData.sendTime
            : this.tempData.createTime,
          size: this.detailSizeDown,
        }
        this.chatLoading = true
        this.getRecordMemory(query)
      } else if (scrollEvent.scrollTop == 0) {
        // console.log('向上获取聊天记录')
        this.detailSizeUp += 5
        const query = {
          channelId: this.channelId,
          phoneNumber: this.tempData.phoneNumber,
          scrollType: 'UP',
          sendTime: this.tempData.sendTime
            ? this.tempData.sendTime
            : this.tempData.createTime,
          size: this.detailSizeUp,
        }
        this.getRecordMemory(query)
      }
      this.chatLoading = false
    },
    // 获取记录
    getRecordMemory(val) {
      const that = this
      this.chatLoading = true
      recoedDetail(val)
        .then((res) => {
          // console.log(res.data.data)
          if (res.data.status == 0) {
            const data = res.data.data
            if (val.scrollType == 'DOWN') {
              const temp = data.slice(this.msgs.length)
              // console.log(data)
              temp.forEach((item) => {
                that.appOptions.forEach(ele => {
                  if (item.enterpriseAccountAppId == ele.id) {
                    item.appName = ele.name
                  }
                })
                this.msgs.push(item)
              })
            } else if (val.scrollType == 'UP') {
              const temp = data.slice(this.msgs.length)
              // console.log(temp.length)   //此次添加的数组的长度
              temp.forEach((item) => {
                that.appOptions.forEach(ele => {
                  if (item.enterpriseAccountAppId == ele.id) {
                    item.appName = ele.name
                  }
                })
                this.msgs.unshift(item)
              })
              this.$nextTick(() => {
                if (this.msgs.length - 1 > temp.length && temp != 0) {
                  const scrollHeight = document.getElementsByClassName(
                    'msg-from'
                  )[temp.length - 1].offsetTop
                  const scrollEvent = this.$refs.chattingContent
                  scrollEvent.scrollTop = scrollHeight
                }
              })
            }
          } else {
            this.$message({
              type: 'error',
              message: '获取收发记录失败',
              center: true,
            })
          }
          this.chatLoading = false
        })
        .catch((error) => {
          this.$message({
            type: 'error',
            message: error,
            center: true,
          })
          this.chatLoading = false
        })
    },
    // 打开抽屉，查看记录
    handleDetails(val1, val2) {
      //查看记录
      this.drawer = true
      // console.log(val2)
      this.channelId = val2.channelId
      this.tempData = val2
      // console.log(this.tempData)
      const query = {
        channelId: this.channelId,
        phoneNumber: this.tempData.phoneNumber,
        scrollType: 'DOWN',
        sendTime: this.tempData.sendTime
          ? this.tempData.sendTime
          : this.tempData.createTime,
        size: this.detailSizeDown,
      }
      // console.log(query)
      this.chatLoading = true
      this.getRecordDetail(query)
    },
    //获取聊天记录
    getRecordDetail(val) {
      const that = this
      recoedDetail(val)
        .then((res) => {
          if (res.data.status == 0) {
            const data = res.data.data
            data.unshift(this.tempData)
            data.forEach((item) => {
              // item.appName = this.findAppByid(
              //   item.enterpriseAccountAppId,
              //   that.appOptions
              // )
              that.appOptions.forEach(ele => {
                if (item.enterpriseAccountAppId == ele.id) {
                  item.appName = ele.name
                }
              })
              item.messageContent.messageMouldCards =
                item.messageContent.cardList
            })
            for (let i = 0; i < data.length; i++) {
              this.$set(this.msgs, i, data[i])
            }
            this.$nextTick(() => {
              const scrollEvent = this.$refs.chattingContent
              scrollEvent.scrollTo(0, 10)
            })
          } else {
            this.$message({
              type: 'error',
              message: '获取收发记录失败',
              center: true,
            })
          }
          this.chatLoading = false
        })
        .catch((error) => {
          this.$message({
            type: 'error',
            message: error,
            center: true,
          })
          this.chatLoading = false
        })
    },
    getList() {
      businessTypeList({ id: 1 })
        .then((res) => {
          if (res.data.status == 0) {
            this.businessTypeList = res.data.data
          } else {
            this.$message.error({
              message: res.data.message,
              center: true,
            })
          }
        })
        .catch((err) => {
        //   this.$message.error({
        //     message: err,
        //     center: true,
        //   })
        })
      getAppLists()
        .then((res) => {
          if (res.data.status == 0) {
            this.appOptions = res.data.data
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
      // getMessageList({})
      //   .then((res) => {
      //     if (res.data.status == 0) {
      //       this.messageModule = res.data.data
      //     } else {
      //       this.$message({
      //         type: res.data.status === 2 ? 'warning' : 'error',
      //         message: res.data.message,
      //         center: true,
      //       })
      //     }
      //   })
      //   .catch((error) => {
      //     this.$message.error({
      //       message: error,
      //       center: true,
      //     })
      //   })
      this.$nextTick(() => {
        channelLists().then((res) => {
          if (res.data.status == 0) {
            this.channelList = res.data.data
            this.getSendBatchList()
          } else {
            // this.$message({
            //   type: 'error',
            //   message: res.data.message,
            //   center: true,
            // })
          }
        })
      })
    },
    async initTableList() {
      const result1 = await businessTypeList()
      if (result1.data.status == 0) {
        this.businessTypeList = result1.data.data
      }
      const result2 = await getAppLists()
      if (result2.data.status == 0) {
        this.appOptions = result2.data.data
      }
      const result3 = await channelLists()
      if (result3.data.status == 0) {
        this.channelList = result3.data.data
      }
      await this.getSendBatchList()
    }
  },
  watch: {
    selectValue() {
      if (this.selectValue.length > 0) {
        this.btnDisable = false
      } else {
        this.btnDisable = true
      }
    },
  },
  mounted() {
    window.addEventListener('keydown', this.keyDown)
    this.time = [
      dayjs(new Date()).format('YYYY-MM-DD'),
      dayjs(new Date()).format('YYYY-MM-DD'),
    ]
    this.initTableList()
  },
  created() {
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDown, false)
  },
}
</script>
<style lang="less" scoped>
#header {
  width: 100%;
  min-height: 100%;
  @vat: #666;
  .header {
    padding: 0 70px;
    box-sizing: border-box;
  }
  .title {
    height: 80px;
    font-size: 20px;
    line-height: 80px;
    box-sizing: border-box;
    // padding-left: 70px;
    padding-top: 10px;
  }
  .content {
    padding: 0 70px;
    .search {
      display: flex;
      align-items: center;
      padding: 5px 0;
    }
    .content-head {
      display: flex;
      // padding: 1px 0;
      // flex-wrap: nowrap;
      // flex-direction: column;
      // flex-shrink:1;
      justify-content: space-between;
      align-items: center;
      .content-first {
        flex: 0 0 15%;
      }
    }
    // .btn-height{
    // height: 32px;
    // line-height: 32px;
    // }
    // .iconBtn{
    //   display: flex;
    //   align-items: center;
    //   max-height: 32px;
    //   line-height: 32px;
    //   color: #409eff;
    //   border-radius: 4px;
    //   border: 1px solid rgba(54,140,254,0.5);
    //   box-sizing: border-box;
    //   i{
    //     margin-right: 3px;
    //   }
    // }
    .iconBtn.active {
      color: #368cfe !important;
      border-radius: 4px;
      border: 1px solid rgba(54, 140, 254, 0.5);
    }
    .iconBtn.active:hover {
      color: #368cfe !important;
      border-radius: 4px;
      border: 1px solid rgba(54, 140, 254, 0.5);
      background-color: #ecf5ff !important;
    }
    .iconBtn.el-button:focus {
      background-color: #fff;
    }
    .detail-contetn {
      margin-top: 12px;
    }
    .tips {
      padding-top: 10px;
    }
    .page-footer {
      text-align: center;
      margin: 20px 0;
    }
    .dowImage {
      float: right;
      padding: 0;
    }
    .textTop{
      max-width: 600px;
      padding: 10px 20px;
      border: 1px solid #eee;
      display: inline-block;
      color: #333;
      border-radius: 5px;
      background: #eee;
    }
    .text{
      display: inline-block;
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 20px;
      background: #eee;
      .textTop{
        max-width: 600px;
        padding: 0 0 10px 0;
        display: inline-block;
        color: #333;
        border-radius: 5px;
      }
      .textBottom{
        padding-top: 10px;
        border-top: 1px solid #fff;
        .btn{
          padding:3px 6px;
          margin-right: 10px;
          border: 1px solid #fff;
          border-radius: 4px;
          background: #fff;
        }
        .btn:hover{
          border: 1px solid #409eff;
        }
      }
    }

    /deep/ .el-date-editor--daterange.el-input__inner {
      max-width: 220px;
    }
    // /deep/ .el-button span{
    //   display: flex;
    //   align-items: center;
    // }
    /deep/ .el-button-group > .el-button img {
      width: 12px;
      height: 12px;
      margin-right: 2px;
    }
    /deep/ .el-select > .el-input {
      max-width: 150px;
    }
    /deep/ .el-input--small {
      width: 120px;
    }
    /deep/ .el-dialog__header {
      border-bottom: 1px solid #eee;
    }
    /deep/ .el-dialog__body {
      padding: 10px 20px 30px;
    }
    /deep/ .el-dialog__footer {
      text-align: center;
    }
    /deep/ .cell .el-button--small {
      padding: 1px 5px;
    }
    /deep/ .el-tabs__nav-wrap::after {
      height: 1px;
    }
    /deep/ .el-button + .el-button {
      margin-left: 2px;
    }
    // /deep/ .el-table .cell{
    //   line-height: inherit;
    // }
    .operation{
      margin-left: 10px;
      display: block;
      float: left;
      cursor: pointer;
      color: #409eff;
    }
  }
  .chatting-content {
    flex: 1;
    width: 100%;
    height: 100%;
    background-color: #fff;
    overflow: auto;
    .chatting-item {
      padding: 10px;
      box-sizing: border-box;
      width: 100%;
      .msg-date {
        text-align: center;
        color: gray;
        font-size: 80%;
      }
      .msg-from {
        display: flex;
        align-items: center;
        user-select: none;
        span.loc {
          color: gray;
          font-size: 60%;
          margin-right: 5px;
        }
        .msg-author {
          font-size: 12px;
          color: @vat;
        }
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
        }
      }
      .msg-content {
        margin-top: 10px;
        max-width: 340px;
        background-color: #f6f6f6;
        width: fit-content;
        padding: 16px 22px;
        font-size: 14px;
        color: #333;
        //   /deep/ .expandCardList .cardList{
        //       margin: 0 !important;
        //   }
      }
    }
    .none-message {
      display: flex;
      justify-content: center;
      color: grey;
    }
    .chatting-item + .chatting-item {
      margin-top: 10px;
    }
    .self {
      .msg-from {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        img {
          margin-left: 12px;
        }
      }
      .msg-content {
        float: right;
        word-wrap: break-word;
        word-break: break-all;
        margin-left: 60px;
        margin-right: 60px;
      }
    }
    .other {
      .msg-from {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img {
          margin-right: 12px;
        }
      }
      .msg-content {
        float: left;
        margin-left: 60px;
        margin-right: 60px;
        word-wrap: break-word;
        word-break: break-all;
      }
    }
    .online {
      width: 200px;
      // max-width: 100%;
      margin: 3px auto;
      border-radius: 4px;
      text-align: center;
      background-color: #fffde7;
    }
    .clearfix {
      *zoom: 1;
    }
    .clearfix:after {
      content: '';
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }
    .operation{
      margin-left: 10px;
      display: block;
      float: left;
      cursor: pointer;
      color: #409eff !important;
    }
  }

  /deep/ .el-drawer {
    width: 500px !important;
    height: 100%;
    .el-drawer__body {
      height: calc(100% - 80px);
      padding: 0;
    }
  }
  /deep/ .el-drawer__header {
    padding: 0 10px !important;
  }
  /deep/ .el-drawer__wrapper .el-drawer__header {
    margin-bottom: 20px;
  }
  /deep/ .el-drawer:focus {
    outline: initial;
  }
  /deep/ .el-drawer__header > :first-child {
    color: #333;
    font-size: 14px;
    font-weight: 400;
    margin-left: 30px;
  }
  /deep/ .el-drawer__header > :first-child:focus {
    outline: initial;
  }
  /deep/ .el-drawer__header {
    border: 1px solid #e5e5e5;
    padding: 10px;
  }
  /deep/ .el-drawer__close-btn:focus {
    outline: initial;
  }
  /deep/ .el-dialog__close:focus {
    outline: initial;
  }
  /deep/ .el-drawer__open .el-drawer.rtl {
    overflow-y: hidden;
  }
  /deep/ .el-tabs__item{
    user-select: none;
  }
}
</style>
