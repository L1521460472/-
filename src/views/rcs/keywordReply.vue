<template>
  <div id="keywordReply">
    <div class="header">
      <div class="title">关键词回复</div>
      <div class="container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- 关键词回复 -->
          <el-tab-pane label="关键词回复" name="0">
            <div class="headerBtn">
              <div class="headerBtnLeft">
                <el-button-group>
                  <el-button class="addBtn" type="primary" size="small" @click="getKeywordsList">
                    <i class="iconfont iconshuaxin"></i>
                  </el-button>
                  <el-button class="addBtn" type="primary" size="small" @click="clearSearch">
                    <i class="iconfont iconguanbi"></i>
                  </el-button>
                </el-button-group>
                <el-select v-model="appValue" ref="searchSelect"  clearable size="small" placeholder="全部" @change="getKeywordsList" style="width:160px;margin-right:10px;height:36px">
                  <el-option v-for="item in appOptions" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
                <el-input v-model="name" size="small" maxlength="20" clearable placeholder="关键词" style="width:160px">
                  <i slot="suffix" class="el-input__icon el-icon-search" @click="getKeywordsList" style="cursor:pointer"></i>
                </el-input>
              </div>
              <div class="headerBtnRight" >
                <el-button size="small" type="primary" v-has="'enterpriseKeyWordReplyAdd'" @click="addKeywordAction">
                  <i class="iconfont iconxinzeng"></i>新增
                </el-button>
                <el-button size="small" class="iconBtn" v-has="'enterpriseKeyWordReplyUpdate'" :class="{ 'active': !isDisable }" :disabled="isDisable" @click="batchUpdate">
                  <i class="iconfont iconxiugai"></i>修改
                </el-button>
                <el-button size="small" class="iconBtn" v-has="'enterpriseKeyWordReplyBatchDelete'" :class="{ 'active': !isDisable }" :disabled="isDisable" @click="batchDelete">
                  <i class="iconfont iconshanchu"></i>删除
                </el-button>
              </div>
            </div>
            <div class="tableArea">
              <el-table
                size="small"
                border
                v-loading="loading"
                :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
                :style="{ color: '#333', 'min-height': tableHeight + 'px' }"
                @selection-change="handleSelectionChange"
                @expand-change="tableExpand"
                :data="tableData">
                <el-table-column type="expand">
                  <template slot-scope="scope">
                    <div class="module">
                      <!-- 文本消息 -->
                      <div v-if="scope.row.messageType == 0 || scope.row.messageType == 3" class="textClass">
                        {{scope.row.textContent}}
                      </div>

                      <!-- 文件消息 -->
                      <div v-else-if="scope.row.messageType == 1 && scope.row.fileContent">
                        <img v-if="scope.row.fileContent.fileType == 1" class="imaClass" :src="scope.row.fileContent.fileUrl" />
                        <div v-if="scope.row.fileContent.filetype == 2">
                          <audio controls="controls" class="audio-class">
                            <source :src="scope.row.fileContent.fileUrl" type="audio/mpeg" />
                          </audio>
                        </div>
                        <div v-if="scope.row.fileContent.fileType == 3">
                          <video :src="scope.row.fileContent.fileUrl" controls="controls" class="video-class"></video>
                        </div>
                      </div>

                      <!-- 卡片消息 -->
                      <div v-else-if="scope.row.messageType == 2 && scope.row.cardContent">
                        <div class="moduleBox">
                          <div class="card" v-for="(item,index) in scope.row.cardContent" :key="index">
                            <div class="card-head">
                              <img :src="item.fileUrl" v-if="item.fileType == 1" />
                              <div v-if="item.filetype == 2">
                                <audio controls="controls" class="audio-class">
                                  <source :src="item.fileUrl" type="audio/mpeg" />
                                </audio>
                              </div>
                              <div v-if="item.fileType == 3">
                                <video :src="item.fileUrl" controls="controls" class="video-class"></video>
                              </div>
                            </div>
                            <div class="file-content">
                              <div class="file-content-head">
                                {{item.title}}
                              </div>
                              <div class="file-content-body">
                                {{item.textContent}}
                              </div>
                              <template v-if="item.buttonList.length > 0">
                                <template v-for="(ele, index) in item.buttonList">
                                  <div class="file-content-button" :key="index" v-if="ele.reply">{{ele.reply.displayText}}</div>
                                  <div class="file-content-button" :key="index" v-if="ele.action">{{ele.action.displayText}}</div>
                                </template>
                              </template>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- 变量消息 -->
                      <!-- <div v-else-if="scope.row.messageType == 3">
                        <div class="textClass">
                          111
                          {{scope.row.textContent}}
                        </div>
                      </div> -->
                    </div>
                  </template>
                </el-table-column>
                <el-table-column align="center" type="selection"></el-table-column>
                <el-table-column label="关键词" prop="keyWord"></el-table-column>
                <el-table-column label="应用" prop="appName"></el-table-column>
                <el-table-column label="关键词回复" prop="messageMouldName"></el-table-column>
                <el-table-column label="更新时间" prop="updateTime"></el-table-column>
                <el-table-column label="备注" show-overflow-tooltip prop="content"></el-table-column>
                <el-table-column label="操作" width="120px">
                  <template slot-scope="scope">
                    <!-- <el-tooltip class="item" effect="dark" content="修改" placement="top" v-has="'addressBookUpdate'">
                      <img class="operation"  @click="updateKeyword(scope.row)" src="../../assets/svg/edit_icon.svg">
                    </el-tooltip>
                    <el-tooltip  class="item" effect="dark" content="删除" placement="top" v-has="'addressBookDelete'">
                      <img class="operation"  @click="deleteKeyword(scope.row)"  src="../../assets/svg/delete_icon.svg">
                    </el-tooltip> -->
                    <span class="operation" v-has="'enterpriseKeyWordReplyUpdate'" @click="updateKeyword(scope.row)">修改</span>
                    <span class="operation" v-has="'enterpriseKeyWordReplyBatchDelete'" @click="deleteKeyword(scope.row)">删除</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="footer_page">
              <el-pagination
                @size-change="handleSizeChange1"
                @current-change="handleCurrentChange1"
                :current-page="page1.currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="page1.pageSize"
                :pager-count="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page1.total">
              </el-pagination>
            </div>
          </el-tab-pane>
          <!-- 收到消息回复 -->
          <el-tab-pane label="收到消息回复" name="1">
            <div class="headerBtn">
              <div class="headerBtnLeft">
                <el-button-group>
                  <el-button class="addBtn" type="primary" size="small" @click="getReceiveReplyList">
                    <i class="iconfont iconshuaxin"></i>
                  </el-button>
                  <el-button class="addBtn" type="primary" size="small" @click="clearSearchForReceive">
                    <i class="iconfont iconguanbi"></i>
                  </el-button>
                </el-button-group>
                <el-select v-model="appValue2" ref="searchSelect"  clearable size="small" placeholder="全部" @change="getReceiveReplyList" style="width:160px;margin-right:10px;height:36px">
                  <el-option v-for="item in appOptions" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
                <el-input v-model="name2" size="small" maxlength="20" clearable placeholder="模板名称" style="width:160px">
                  <i slot="suffix" class="el-input__icon el-icon-search" @click="getReceiveReplyList" style="cursor:pointer"></i>
                </el-input>
              </div>
              <div class="headerBtnRight" >
                <el-button size="small" type="primary" v-has="'enterpriseKeyWordReplyAdd'" @click="addKeywordAction2">
                  <i class="iconfont iconxinzeng"></i>新增
                </el-button>
                <el-button size="small" class="iconBtn" v-has="'enterpriseKeyWordReplyUpdate'" :class="{ 'active': !isDisable }" :disabled="isDisable" @click="batchUpdate">
                  <i class="iconfont iconxiugai"></i>修改
                </el-button>
                <el-button size="small" class="iconBtn" v-has="'enterpriseKeyWordReplyBatchDelete'" :class="{ 'active': !isDisable }" :disabled="isDisable" @click="batchDelete">
                  <i class="iconfont iconshanchu"></i>删除
                </el-button>
              </div>
            </div>
            <div class="tableArea">
              <el-table
                size="small"
                border
                v-loading="loading2"
                :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
                :style="{ color: '#333', 'min-height': tableHeight + 'px' }"
                @selection-change="handleSelectionChange"
                @expand-change="tableExpand"
                :data="tableData2">
                <el-table-column type="expand">
                  <template slot-scope="scope">
                    <div class="module">
                      <!-- 文本消息 -->
                      <div v-if="scope.row.messageType == 0 || scope.row.messageType == 3" class="textClass">
                        {{scope.row.textContent}}
                      </div>

                      <!-- 文件消息 -->
                      <div v-else-if="scope.row.messageType == 1 && scope.row.fileContent">
                        <img v-if="scope.row.fileContent.fileType == 1" class="imaClass" :src="scope.row.fileContent.fileUrl" />
                        <div v-if="scope.row.fileContent.filetype == 2">
                          <audio controls="controls" class="audio-class">
                            <source :src="scope.row.fileContent.fileUrl" type="audio/mpeg" />
                          </audio>
                        </div>
                        <div v-if="scope.row.fileContent.fileType == 3">
                          <video :src="scope.row.fileContent.fileUrl" controls="controls" class="video-class"></video>
                        </div>
                      </div>

                      <!-- 卡片消息 -->
                      <div v-else-if="scope.row.messageType == 2 && scope.row.cardContent">
                        <div class="moduleBox">
                          <div class="card" v-for="(item, index) in scope.row.cardContent" :key="index">
                            <div class="card-head">
                              <img :src="item.fileUrl" v-if="item.fileType == 1" />
                              <div v-if="item.filetype == 2">
                                <audio controls="controls" class="audio-class">
                                  <source :src="item.fileUrl" type="audio/mpeg" />
                                </audio>
                              </div>
                              <div v-if="item.fileType == 3">
                                <video :src="item.fileUrl" controls="controls" class="video-class"></video>
                              </div>
                            </div>
                            <div class="file-content">
                              <div class="file-content-head">
                                {{item.title}}
                              </div>
                              <div class="file-content-body">
                                {{item.textContent}}
                              </div>
                              <template v-if="item.buttonList.length > 0">
                                <template v-for="(ele, index) in item.buttonList">
                                  <div class="file-content-button" :key="index" v-if="ele.reply">{{ele.reply.displayText}}</div>
                                  <div class="file-content-button" :key="index" v-if="ele.action">{{ele.action.displayText}}</div>
                                </template>
                              </template>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column align="center" type="selection"></el-table-column>
                <el-table-column label="应用" prop="appName"></el-table-column>
                <el-table-column label="自动回复" prop="messageMouldName"></el-table-column>
                <el-table-column label="更新时间" prop="updateTime"></el-table-column>
                <el-table-column label="备注" show-overflow-tooltip prop="content"></el-table-column>
                <el-table-column label="操作" width="120px">
                  <template slot-scope="scope">
                    <!-- <el-tooltip class="item" effect="dark" content="修改" placement="top" v-has="'addressBookUpdate'">
                      <img class="operation"  @click="updateKeyword(scope.row)" src="../../assets/svg/edit_icon.svg">
                    </el-tooltip>
                    <el-tooltip  class="item" effect="dark" content="删除" placement="top" v-has="'addressBookDelete'">
                      <img class="operation"  @click="deleteKeyword(scope.row)"  src="../../assets/svg/delete_icon.svg">
                    </el-tooltip> -->
                    <span class="operation" v-has="'enterpriseKeyWordReplyUpdate'" @click="updateKeyword2(scope.row)">修改</span>
                    <span class="operation" v-has="'enterpriseKeyWordReplyBatchDelete'" @click="deleteKeyword(scope.row)">删除</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="footer_page">
              <el-pagination
                @size-change="handleSizeChange2"
                @current-change="handleCurrentChange2"
                :current-page="page2.currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="page2.pageSize"
                :pager-count="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page2.total">
              </el-pagination>
            </div>
          </el-tab-pane>
          <!-- 被关注回复 -->
          <el-tab-pane label="被关注回复" name="2">
            <div class="headerBtn">
              <div class="headerBtnLeft">
                <el-button-group>
                  <el-button class="addBtn" type="primary" size="small" @click="getConcernedList">
                    <i class="iconfont iconshuaxin"></i>
                  </el-button>
                  <el-button class="addBtn" type="primary" size="small" @click="clearSearchForConcern">
                    <i class="iconfont iconguanbi"></i>
                  </el-button>
                </el-button-group>
                <el-select v-model="appValue3" ref="searchSelect"  clearable size="small" placeholder="全部" @change="getConcernedList" style="width:160px;margin-right:10px;height:36px">
                  <el-option v-for="item in appOptions" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
                <el-input v-model="name3" size="small" maxlength="20" clearable placeholder="模板名称" style="width:160px">
                  <i slot="suffix" class="el-input__icon el-icon-search" @click="getConcernedList" style="cursor:pointer"></i>
                </el-input>
              </div>
              <div class="headerBtnRight" >
                <el-button size="small" type="primary" v-has="'enterpriseKeyWordReplyAdd'" @click="addKeywordAction3">
                  <i class="iconfont iconxinzeng"></i>新增
                </el-button>
                <el-button size="small" class="iconBtn" v-has="'enterpriseKeyWordReplyUpdate'" :class="{ 'active': !isDisable }" :disabled="isDisable" @click="batchUpdate">
                  <i class="iconfont iconxiugai"></i>修改
                </el-button>
                <el-button size="small" class="iconBtn" v-has="'enterpriseKeyWordReplyBatchDelete'" :class="{ 'active': !isDisable }" :disabled="isDisable" @click="batchDelete">
                  <i class="iconfont iconshanchu"></i>删除
                </el-button>
              </div>
            </div>
            <div class="tableArea">
              <el-table
                size="small"
                border
                v-loading="loading3"
                :header-cell-style="{background:'#F5F7FA',color:'#333333'}"
                :style="{ color: '#333', 'min-height': tableHeight + 'px' }"
                @selection-change="handleSelectionChange"
                @expand-change="tableExpand"
                :data="tableData3">
                <el-table-column type="expand">
                  <template slot-scope="scope">
                    <div class="module">
                      <!-- 文本消息 -->
                      <div v-if="scope.row.messageType == 0 || scope.row.messageType == 3" class="textClass">
                        {{scope.row.textContent}}
                      </div>

                      <!-- 文件消息 -->
                      <div v-else-if="scope.row.messageType == 1 && scope.row.fileContent">
                        <img v-if="scope.row.fileContent.fileType == 1" class="imaClass" :src="scope.row.fileContent.fileUrl" />
                        <div v-if="scope.row.fileContent.filetype == 2">
                          <audio controls="controls" class="audio-class">
                            <source :src="scope.row.fileContent.fileUrl" type="audio/mpeg" />
                          </audio>
                        </div>
                        <div v-if="scope.row.fileContent.fileType == 3">
                          <video :src="scope.row.fileContent.fileUrl" controls="controls" class="video-class"></video>
                        </div>
                      </div>

                      <!-- 卡片消息 -->
                      <div v-else-if="scope.row.messageType == 2 && scope.row.cardContent">
                        <div class="moduleBox">
                          <div class="card" v-for="(item, index) in scope.row.cardContent" :key="index">
                            <div class="card-head">
                              <img :src="item.fileUrl" v-if="item.fileType == 1" />
                              <div v-if="item.filetype == 2">
                                <audio controls="controls" class="audio-class">
                                  <source :src="item.fileUrl" type="audio/mpeg" />
                                </audio>
                              </div>
                              <div v-if="item.fileType == 3">
                                <video :src="item.fileUrl" controls="controls" class="video-class"></video>
                              </div>
                            </div>
                            <div class="file-content">
                              <div class="file-content-head">
                                {{item.title}}
                              </div>
                              <div class="file-content-body">
                                {{item.textContent}}
                              </div>
                              <template v-if="item.buttonList.length > 0">
                                <template v-for="(ele, index) in item.buttonList">
                                  <div class="file-content-button" :key="index" v-if="ele.reply">{{ele.reply.displayText}}</div>
                                  <div class="file-content-button" :key="index" v-if="ele.action">{{ele.action.displayText}}</div>
                                </template>
                              </template>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column align="center" type="selection"></el-table-column>
                <el-table-column label="应用" prop="appName"></el-table-column>
                <el-table-column label="自动回复" prop="messageMouldName"></el-table-column>
                <el-table-column label="更新时间" prop="updateTime"></el-table-column>
                <el-table-column label="备注" show-overflow-tooltip prop="content"></el-table-column>
                <el-table-column label="操作" width="120px">
                  <template slot-scope="scope">
                    <!-- <el-tooltip class="item" effect="dark" content="修改" placement="top" v-has="'addressBookUpdate'">
                      <img class="operation"  @click="updateKeyword(scope.row)" src="../../assets/svg/edit_icon.svg">
                    </el-tooltip>
                    <el-tooltip  class="item" effect="dark" content="删除" placement="top" v-has="'addressBookDelete'">
                      <img class="operation"  @click="deleteKeyword(scope.row)"  src="../../assets/svg/delete_icon.svg">
                    </el-tooltip> -->
                    <span class="operation" v-has="'enterpriseKeyWordReplyUpdate'" @click="updateKeyword3(scope.row)">修改</span>
                    <span class="operation" v-has="'enterpriseKeyWordReplyBatchDelete'" @click="deleteKeyword(scope.row)">删除</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="footer_page">
              <el-pagination
                @size-change="handleSizeChange3"
                @current-change="handleCurrentChange3"
                :current-page="page3.currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="page3.pageSize"
                :pager-count="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page3.total">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-drawer
      :title="isNewAdd ? '新增关键词回复' : '修改关键词回复'"
      direction="rtl"
      size="500px"
      :wrapperClosable="false"
      :visible.sync="addVisible">
      <div>
        <el-form :model="formData" :rules="rules" ref="form" label-width="90px">
          <el-form-item label="关键词:" prop="keyWord">
            <el-input size="small" v-model="formData.keyWord" show-word-limit maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="选择应用:" prop="appId">
            <el-select v-model="formData.appId" size="small" clearable @change="changeAppid1" @clear="clearAppid1">
              <el-option v-for="(item, index) in appOptions" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关联内容:" prop="messageMouldId">
            <el-select v-model="formData.messageMouldId" filterable clearable size="small">
              <el-option v-for="(item, index) in messageModuleList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" v-if="formData.messageMouldId">
            <div class="module">
              <!-- 文本消息 -->
              <div v-if="messageType == 0" class="textClass">
                {{textContent}}
              </div>

              <!-- 文件消息 -->
              <div v-else-if="messageType == 1">
                <img v-if="fileContent.fileType == 1" class="imaClass" :src="fileContent.fileUrl" />
                <div v-if="fileContent.filetype == 2">
                  <audio controls="controls" class="audio-class">
                    <source :src="fileContent.fileUrl" type="audio/mpeg" />
                  </audio>
                </div>
                <div v-if="fileContent.fileType == 3">
                  <video :src="fileContent.fileUrl" controls="controls" class="video-class"></video>
                </div>
              </div>

              <!-- 卡片消息 -->
              <div v-else-if="messageType == 2">
                <div class="moduleBox">
                  <div class="card" v-for="(item, index) in cardContent" :key="index">
                    <div class="card-head">
                      <img :src="item.fileUrl" v-if="item.fileType == 1" />
                      <div v-if="item.filetype == 2">
                        <audio controls="controls" class="audio-class">
                          <source :src="item.fileUrl" type="audio/mpeg" />
                        </audio>
                      </div>
                      <div v-if="item.fileType == 3">
                        <video :src="item.fileUrl" controls="controls" class="video-class"></video>
                      </div>
                    </div>
                    <div class="file-content">
                      <div class="file-content-head">
                        {{item.title}}
                      </div>
                      <div class="file-content-body">
                        {{item.textContent}}
                      </div>
                      <template v-if="item.showButton">
                        <div class="file-content-button" v-for="(item, index) in item.buttonList" :key="index">{{item.displayText}}</div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 变量消息 -->
              <div v-else>
                <div class="textClass">
                  {{variableMessage}}
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input size="small" type="textarea" style="width: 260px" show-word-limit maxlength="200" :autosize="{ minRows: 4, maxRows: 6 }" v-model="formData.content"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" v-if="isNewAdd" @click="submit" :disabled="submitDisable">提交</el-button>
            <el-button size="small" type="primary" v-else @click="update" :disabled="updateDisable">提交</el-button>
            <el-button size="small" @click="cancle">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
    <el-drawer
      :title="isNewAdd ? '新增消息回复' : '修改消息回复'"
      direction="rtl"
      size="500px"
      :wrapperClosable="false"
      :visible.sync="addVisible2">
      <div>
        <el-form :model="formData2" :rules="rules2" ref="form2" label-width="90px">
          <!-- <el-form-item label="关键词:" prop="keyWord">
            <el-input size="small" v-model="formData.keyWord" show-word-limit maxlength="20"></el-input>
          </el-form-item> -->
          <el-form-item label="选择应用:" prop="appId">
            <el-select v-model="formData2.appId" size="small" clearable @change="changeAppid2" @clear="clearAppid2">
              <el-option v-for="(item, index) in appOptions" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关联内容:" prop="messageMouldId">
            <el-select v-model="formData2.messageMouldId" filterable clearable size="small">
              <el-option v-for="(item, index) in messageModuleList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" v-if="formData2.messageMouldId">
            <div class="module">
              <!-- 文本消息 -->
              <div v-if="messageType == 0" class="textClass">
                {{textContent}}
              </div>

              <!-- 文件消息 -->
              <div v-else-if="messageType == 1">
                <img v-if="fileContent.fileType == 1" class="imaClass" :src="fileContent.fileUrl" />
                <div v-if="fileContent.filetype == 2">
                  <audio controls="controls" class="audio-class">
                    <source :src="fileContent.fileUrl" type="audio/mpeg" />
                  </audio>
                </div>
                <div v-if="fileContent.fileType == 3">
                  <video :src="fileContent.fileUrl" controls="controls" class="video-class"></video>
                </div>
              </div>

              <!-- 卡片消息 -->
              <div v-else-if="messageType == 2">
                <div class="moduleBox">
                  <div class="card" v-for="(item, index) in cardContent" :key="index">
                    <div class="card-head">
                      <img :src="item.fileUrl" v-if="item.fileType == 1" />
                      <div v-if="item.filetype == 2">
                        <audio controls="controls" class="audio-class">
                          <source :src="item.fileUrl" type="audio/mpeg" />
                        </audio>
                      </div>
                      <div v-if="item.fileType == 3">
                        <video :src="item.fileUrl" controls="controls" class="video-class"></video>
                      </div>
                    </div>
                    <div class="file-content">
                      <div class="file-content-head">
                        {{item.title}}
                      </div>
                      <div class="file-content-body">
                        {{item.textContent}}
                      </div>
                      <template v-if="item.showButton">
                        <div class="file-content-button" v-for="(ele, index) in item.buttonList" :key="index">{{ele.displayText}}</div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 变量消息 -->
              <div v-else>
                <div class="textClass">
                  {{variableMessage}}
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input size="small" type="textarea" style="width: 260px" show-word-limit maxlength="200" :autosize="{ minRows: 4, maxRows: 6 }" v-model="formData2.content"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" v-if="isNewAdd" @click="submit2" :disabled="submitDisable2">提交</el-button>
            <el-button size="small" type="primary" v-else @click="update2" :disabled="updateDisable2">提交</el-button>
            <el-button size="small" @click="cancle2">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
    <el-drawer
      :title="isNewAdd ? '新增被关注回复' : '修改被关注回复'"
      direction="rtl"
      size="500px"
      :wrapperClosable="false"
      :visible.sync="addVisible3">
      <div>
        <el-form :model="formData3" :rules="rules3" ref="form3" label-width="90px">
          <!-- <el-form-item label="关键词:" prop="keyWord">
            <el-input size="small" v-model="formData3.keyWord" show-word-limit maxlength="20"></el-input>
          </el-form-item> -->
          <el-form-item label="选择应用:" prop="appId">
            <el-select v-model="formData3.appId" size="small" clearable @change="changeAppid3" @clear="clearAppid3">
              <el-option v-for="(item, index) in appOptions" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关联内容:" prop="messageMouldId">
            <el-select v-model="formData3.messageMouldId" filterable clearable size="small">
              <el-option v-for="(item, index) in messageModuleList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" v-if="formData3.messageMouldId">
            <div class="module">
              <!-- 文本消息 -->
              <div v-if="messageType == 0" class="textClass">
                {{textContent}}
              </div>

              <!-- 文件消息 -->
              <div v-else-if="messageType == 1">
                <img v-if="fileContent.fileType == 1" class="imaClass" :src="fileContent.fileUrl" />
                <div v-if="fileContent.filetype == 2">
                  <audio controls="controls" class="audio-class">
                    <source :src="fileContent.fileUrl" type="audio/mpeg" />
                  </audio>
                </div>
                <div v-if="fileContent.fileType == 3">
                  <video :src="fileContent.fileUrl" controls="controls" class="video-class"></video>
                </div>
              </div>

              <!-- 卡片消息 -->
              <div v-else-if="messageType == 2">
                <div class="moduleBox">
                  <div class="card" v-for="(item, index) in cardContent" :key="index">
                    <div class="card-head">
                      <img :src="item.fileUrl" v-if="item.fileType == 1" />
                      <div v-if="item.filetype == 2">
                        <audio controls="controls" class="audio-class">
                          <source :src="item.fileUrl" type="audio/mpeg" />
                        </audio>
                      </div>
                      <div v-if="item.fileType == 3">
                        <video :src="item.fileUrl" controls="controls" class="video-class"></video>
                      </div>
                    </div>
                    <div class="file-content">
                      <div class="file-content-head">
                        {{item.title}}
                      </div>
                      <div class="file-content-body">
                        {{item.textContent}}
                      </div>
                      <template v-if="item.showButton">
                        <div class="file-content-button" v-for="(ele, index) in item.buttonList" :key="index">{{ele.displayText}}</div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 变量消息 -->
              <div v-else>
                <div class="textClass">
                  {{variableMessage}}
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input size="small" type="textarea" style="width: 260px" show-word-limit maxlength="200" :autosize="{ minRows: 4, maxRows: 6 }" v-model="formData3.content"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" v-if="isNewAdd" @click="submit3" :disabled="submitDisable3">提交</el-button>
            <el-button size="small" type="primary" v-else @click="update3" :disabled="updateDisable3">提交</el-button>
            <el-button size="small" @click="cancle3">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { getAppLists } from '@/api/Develop/myapp'
import { getMessageList } from '@/api/message/moreMessage'
import { MessageMould, MessageMouldCard, cardList, getFile } from '@/api/message/diyMessage'
import { getKeyords, delKeyword, addKeyword, updateKeywords, keywordDetail } from '@/api/message/keywordReply'
export default{
  name: "keywordReply",
  data() {
    return {
      // --------------------------------------关键词回复---------------------------------------------
      activeName: '0',
      loading: false,
      appValue: '', // 应用搜索值
      name: '',
      isDisable: true, // 是否禁用按钮
      appOptions: [],  // 应用列表
      messageModuleList: [], // 消息模板列表
      tempMessageModuleList: [],
      tableData: [],
      tableHeight: window.innerHeight - 304 + '', // 表格高度
      page1: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      isNewAdd: true,  // 是否为新增
      addVisible: false, // 抽屉控制
      addVisible2: false,
      addVisible3: false,
      formData: {
        keyWord: '',
        appId: '',
        messageMouldId: '',
        content: '',
        id: '',
        type: 0
      },
      rules: {
        keyWord: [
          {
            required: true, message: '请输入关键词', trigger: 'blur'
          }
        ],
        appId: [
          {
            required: true, message: '请选择应用', trigger: 'blur'
          }
        ],
        messageMouldId: [
          {
            required: true, message: '请选择关联内容', trigger: 'blur'
          }
        ]
      },
      messageType: 0, // 消息类型 0文本消息 1文件消息 2卡片消息 3变量消息
      textContent: '', // 文本内容
      fileContent: {  // 文件内容
        fileType: 1, // 1图片 2视频  3音频
        fileUrl: '',
      },
      cardContent: [
        {  // 卡片内容
          title: '',
          textContent: '',
          fileUrl: '',
          buttonList: [],
          fileType: 1,
          showButton: false
        }
      ],
      variableMessage: '', // 变量内容
      mutiSelectData: [],
      submitDisable: false, // 提交按钮是否禁用
      updateDisable: false,
      // --------------------------------------收到消息回复---------------------------------------------
      tableData2: [],
      loading2: false,
      page2: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      appValue2: '',
      name2: '',  // 模板名称
      formData2: {
        appId: '',
        messageMouldId: '',
        content: '',
        id: '',
        type: 1
      },
      rules2: {
        appId: [
          {
            required: true, message: '请选择应用', trigger: 'blur'
          }
        ],
        messageMouldId: [
          {
            required: true, message: '请选择关联内容', trigger: 'blur'
          }
        ]
      },
      submitDisable2: false, // 提交按钮是否禁用
      updateDisable2: false, // 更新按钮是否禁用
      // --------------------------------------被关注回复---------------------------------------------
      tableData3: [],
      loading3: false,
      page3: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      appValue3: '',
      name3: '', // 模板名称
      formData3: {
        appId: '',
        messageMouldId: '',
        content: '',
        id: '',
        type: 2
      },
      rules3: {
        appId: [
          {
            required: true, message: '请选择应用', trigger: 'blur'
          }
        ],
        messageMouldId: [
          {
            required: true, message: '请选择关联内容', trigger: 'blur'
          }
        ]
      },
      submitDisable3: false,
      updateDisable3:false,
    }
  },
  watch: {
    'formData.messageMouldId': {
      handler() {
        if (this.formData.messageMouldId) {
          this.selectedModule(this.formData.messageMouldId)
        }
      }
    },
    'formData2.messageMouldId': {
      handler() {
        if (this.formData2.messageMouldId) {
          this.selectedModule(this.formData2.messageMouldId)
        }
      }
    },
    'formData3.messageMouldId': {
      handler() {
        if (this.formData3.messageMouldId) {
          this.selectedModule(this.formData3.messageMouldId)
        }
      }
    },
    'formData.appId': {
      handler() {
        if(this.formData.appId) {
          this.messageModuleList = []
          // this.formData.messageMouldId = ''
          this.getMessageList(this.formData.appId)
        }
      }
    },
    'formData2.appId': {
      handler() {
        if(this.formData2.appId) {
          this.messageModuleList = []
          // this.formData2.messageMouldId = ''
          this.getMessageList(this.formData2.appId)
        }
      }
    },
    'formData3.appId': {
      handler() {
        if(this.formData3.appId) {
          this.messageModuleList = []
          // this.formData3.messageMouldId = ''
          this.getMessageList(this.formData3.appId)
        }
      }
    },
    mutiSelectData() {
      if (this.mutiSelectData.length > 0) {
        this.isDisable = false
      } else {
        this.isDisable = true
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      if (this.activeName === '0') {
        this.getKeywordsList()
      } else if(this.activeName === '1') {
        this.getReceiveReplyList()
      } else if (this.activeName === '2') {
        this.getConcernedList()
      }
    },
    // --------------------------------------收到消息回复---------------------------------------------
    updateKeyword(val) {
      this.isNewAdd = false
      this.addVisible = true
      const temp = {}
      temp.keyWord = val.keyWord
      temp.content = val.content
      temp.appId = val.appId
      temp.messageMouldId = val.messageMouldId
      temp.id = val.id
      const temp1 = Object.assign({}, temp)
      this.formData = temp1
    },
    deleteKeyword(val) {
      this.$confirm('确定要删除此关键词吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass:'btn-custom-confirm',
        center:true
      }).then(() => {
        const arr = [val.id]
        delKeyword(arr).then(res => {
          if(res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '删除成功!',
              center: true
            })
           if (this.activeName == 0) {
              this.getKeywordsList()
            } else if (this.activeName == 1) {
              this.getReceiveReplyList()
            } else if (this.activeName == 2) {
              this.getConcernedList()
            }
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!',
              center: true
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: error,
            center: true
          })
        })
      }).catch(() => {})
    },
    handleSizeChange1(val) {
      this.page1.pageSize = val
      this.getKeywordsList()
    },
    handleCurrentChange1(val) {
      this.page1.currentPage = val
      this.getKeywordsList()
    },
    // 点击新增按钮事件
    addKeywordAction() {
      this.addVisible = true
      this.formData.content = ''
      this.formData.appId = ''
      this.formData.messageMouldId = ''
      this.formData.keyWord = ''
      this.formData.type = this.activeName
      this.isNewAdd = true
      delete this.formData.id
      if (this.$refs.form) {
        // this.$refs.form.resetFields()
        this.$refs.form.clearValidate()
      }
    },
    // 提交
    submit() {
      this.$refs.form.validate((valid) => {
        if(valid) {
          this.submitDisable = true
          addKeyword(this.formData).then(res => {
            if(res.data.status == 0) {
              this.$message({
                type: 'success',
                message: '新增成功!',
                center: true
              })
              this.getKeywordsList()
              this.cancle()
            } else {
              this.$message({
                type: 'error',
                message: res.data.message,
                center: true
              })
            }
            this.submitDisable = false
          }).catch(error => {
            this.$message({
              type: 'error',
              message: error,
              center: true
            })
            this.submitDisable = true
          })
        }
      })
    },
    // 更新
    update() {
      this.$refs.form.validate((valid) => {
        if(valid) {
          this.updateDisable = true
          updateKeywords(this.formData).then(res => {
            if(res.data.status == 0) {
              this.$message({
                type: 'success',
                message: '修改成功!',
                center: true
              })
              if (this.activeName == 0) {
                this.getKeywordsList()
              } else if (this.activeName == 1) {
                this.getReceiveReplyList()
              } else if (this.activeName == 2) {
                this.getConcernedList()
              }
              this.addVisible = false
              this.$refs.form.clearValidate();
              this.$refs.form.resetFields();
            } else {
              this.$message({
                type: 'error',
                message: res.data.message,
                center: true
              })
            }
            this.updateDisable = false
          }).catch(error => {
            this.$message({
              type: 'error',
              message: error,
              center: true
            })
            this.updateDisable = false
          })
        }
      })
    },
    // 取消
    cancle() {
      this.addVisible = false
      this.$refs.form.clearValidate();
      this.$refs.form.resetFields();
    },
    // 获取应用列表
    getAppList() {
      getAppLists().then(res => {
        if (res.data.status == 0) {
          this.appOptions = res.data.data
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
      })
    },
    // 获取消息模板列表
    getMessageList(appId) {
      const params = {
        checkStatus: 1,
        enterpriseAccountAppId: appId
      }
      const res = getMessageList(params).then(res => {
        if (res.data.status == 0) {
          this.messageModuleList = []
          this.messageModuleList = res.data.data
          return res.data.data
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
      })
      return res
    },
    // 选中模板
    selectedModule(val) {
      const params = {
        messageMouldId: val
      }
      MessageMould(params).then(res => {
        if(res.data.status == 0) {
          const data = res.data.data
          if (data.enterpriseAccountAppId != null) {
            if (this.activeName == 0) {
              this.formData.appId = data.enterpriseAccountAppId
            } else if(this.activeName == 1) {
              this.formData2.appId = data.enterpriseAccountAppId
            } else if(this.activeName == 2) {
              this.formData3.appId = data.enterpriseAccountAppId
            }
          }
          if (data.messageType == 0) {
            this.messageType = 0
            this.textContent = data.content
          } else if (data.messageType == 1) {
            this.messageType = 1
            getFile({fileGroupDetailId: data.fileGroupDetailId}).then(result => {
              if (result.data.status == 0) {
                const data = result.data.data
                this.fileContent.fileType = data.fileType
                this.fileContent.fileUrl = data.fileUrl
              }
            }).catch(error => {
              this.$message({
                type: 'error',
                message: error,
                center: true
              })
            })
          } else if(data.messageType == 2) {
            this.messageType = 2
            this.cardContent = []
            cardList({messageMouldId: val}).then(ele => {
              if (ele.data.status == 0) {
                const tempdata = ele.data.data
                tempdata.forEach(item => {
                  const val = {}
                  val.textContent = item.description
                  val.title = item.title
                  val.fileType = 1
                  val.fileUrl = ''
                  if (item.fileGroupDetail != null) {
                    val.fileType = item.fileGroupDetail.fileType
                    val.fileUrl = item.fileGroupDetail.fileUrl
                  }
                  val.buttonList = []
                  val.showButton = false
                  if (item.suggestions.length > 0) {
                    val.showButton = true
                    item.suggestions.forEach(ele => {
                      if (ele.reply) {
                        val.buttonList.push({displayText: ele.reply.displayText})
                      }
                      if (ele.action) {
                        val.buttonList.push({displayText: ele.action.displayText})
                      }
                    })
                  }
                  this.cardContent.push(val)
                })
                // this.$set(this.cardContent, 'textContent', tempdata.textContent)
                // this.$set(this.cardContent, 'title', tempdata.title)
                // this.$set(this.cardContent, 'fileType', tempdata.fileGroupDetail.fileType)
                // if (tempdata.suggestions.length > 0) {
                //   this.cardContent.showButton = true
                //   this.$set(this.cardContent, 'fileUrl', tempdata.fileGroupDetail.fileUrl)
                //   tempdata.suggestions.forEach(item => {
                //     if (item.reply) {
                //       this.cardContent.buttonList.push({displayText: item.reply.displayText})
                //     }
                //     if (item.action) {
                //       this.cardContent.buttonList.push({displayText: item.action.displayText})
                //     }
                //   })
                // }
                // console.log(this.cardContent)
              }
            }).catch(error => {
              this.$message({
                type: 'error',
                message: error,
                center: true
              })
            })
          } else {
            this.messageType = 3
            this.variableMessage = data.content
          }
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
      })
    },
    // 获取关键词列表
    getKeywordsList(){
      const params = {
        "currentPage": this.page1.currentPage,
        "pageSize": this.page1.pageSize,
        "appId": this.appValue,
        "keyWord": this.name,
        "type": 0
      }
      this.loading = true
      getKeyords(params).then(res => {
        if(res.data.status == 0) {
          const data = res.data.data
          this.page1.total = data.total
          data.records.forEach(item => {
            item.expanded = false
            item.messageType = 0
            item.textContent = null
            item.fileContent = null
            item.cardContent = []
          })
          this.tableData = data.records
        } else {
          this.$message({
            type: 'error',
            message: res.data.message,
            center: true
          })
        }
        this.loading = false
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
        this.loading = false
      })
    },

    // 清空搜索条件
    clearSearch(){
      this.appValue = ''
      this.name = ''
    },
    // 表格多选事件
    handleSelectionChange(val) {
      this.mutiSelectData = val
    },
    // 批量删除
    batchDelete() {
      this.$confirm('确定要删除选中的关键词吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass:'btn-custom-confirm',
        center:true
      }).then(() => {
        const arr = this.mutiSelectData.map(item => {
          return item.id
        })
        delKeyword(arr).then(res => {
          if(res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '删除成功!',
              center: true
            })
           if (this.activeName == 0) {
              this.getKeywordsList()
            } else if (this.activeName == 1) {
              this.getReceiveReplyList()
            } else if (this.activeName == 2) {
              this.getConcernedList()
            }
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!',
              center: true
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: error,
            center: true
          })
        })
      }).catch(() => {})
    },
    // 修改
    batchUpdate() {
      if (this.mutiSelectData.length > 1) {
        this.$message({
          type: 'warning',
          message: '一次只能修改一个',
          center: true
        })
      } else {
        const arr = this.mutiSelectData.map(item => {
          return item.id
        })
        keywordDetail(arr[0]).then(res => {
          if (res.data.status == 0) {
            const data = res.data.data
            const temp = {}
            temp.keyWord = data.keyWord
            temp.content = data.content
            temp.messageMouldId = data.messageMouldId
            temp.appId = data.appId
            temp.id = data.id
            this.isNewAdd = false
            if(this.activeName == 0) {
              this.formData = Object.assign({}, temp)
              this.addVisible = true
            } else if(this.activeName ==  1) {
              this.formData2 = Object.assign({}, temp)
              this.addVisible2 = true
            } else if (this.activeName == 2) {
              this.formData3 = Object.assign({}, temp)
              this.addVisible3 = true
            }
          }
        }).catch(error => {
          this.$message({
            type: 'error',
            message: error,
            center: true
          })
        })
      }
    },
    // 回车事件
    keyDown(e) {
      if (e.keyCode == 13) {
        if (this.activeName == '0') {
          this.getKeywordsList()
        } else if(this.activeName == '1') {
            this.getReceiveReplyList()
        } else if (this.activeName == '2') {
          this.getConcernedList()
        }
      }
    },
    tableExpand(row, expandedRows){
      if(!row.expanded) {
        const params = {
          messageMouldId: row.messageMouldId
        }
        MessageMould(params).then(res => {
          if(res.data.status == 0) {
            const data = res.data.data
            row.messageType = data.messageType
            if (data.messageType == 0 || data.messageType == 3) {
              this.$set(row, 'textContent', data.content)
            } else if (data.messageType == 1) {
              getFile({fileGroupDetailId: data.fileGroupDetailId}).then(result => {
                if (result.data.status == 0) {
                  const data = result.data.data
                  // console.log(data)
                  if (data != null) {
                    this.$set(row, 'fileContent', data)
                  }
                }
              }).catch(error => {
                this.$message({
                  type: 'error',
                  message: error,
                  center: true
                })
              })
            } else if (data.messageType == 2) {
              row.cardContent = []
              cardList({messageMouldId: row.messageMouldId}).then(ele => {
                if (ele.data.status == 0) {
                  const data = ele.data.data
                  data.forEach(item => {
                    const val = {}
                    val.textContent = item.description
                    val.title = item.title
                    val.fileType = 1
                    val.fileUrl = ''
                    if (item.fileGroupDetail != null) {
                        val.fileType = item.fileGroupDetail.fileType
                        val.fileUrl = item.fileGroupDetail.fileUrl
                      }
                      val.buttonList = []
                      val.showButton = false
                      if (item.suggestions.length > 0) {
                        val.showButton = true
                        item.suggestions.forEach(ele => {
                          if (ele.reply) {
                            val.buttonList.push({displayText: ele.reply.displayText})
                          }
                          if (ele.action) {
                            val.buttonList.push({displayText: ele.action.displayText})
                          }
                        })
                      }
                      row.cardContent.push(val)
                    })
                    // console.log(row.cardContent)
                  }
                }).catch(error => {
                  this.$message({
                    type: 'error',
                    message: error,
                    center: true
                  })
                })
            }
          }
        }).catch(error => {
          this.$message({
            type: 'error',
            message: error,
            center: true
          })
        })
      }
      row.expanded = !row.expanded
    },
    clearAppid1() {
      this.messageModuleList = this.tempMessageModuleList
      this.formData.messageMouldId = ''
    },
    changeAppid1(value){
      this.formData.messageMouldId = ''
    },
    clearAppid2() {
      this.messageModuleList = this.tempMessageModuleList
      this.formData2.messageMouldId = ''
    },
    changeAppid2(value){
      this.formData2.messageMouldId = ''
    },
    clearAppid3() {
      this.messageModuleList = this.tempMessageModuleList
      this.formData3.messageMouldId = ''
    },
    changeAppid3(value){
      this.formData3.messageMouldId = ''
    },
    // --------------------------------------收到消息回复---------------------------------------------
    // 获取收到消息回复
    getReceiveReplyList() {
      const params = {
        "currentPage": this.page2.currentPage,
        "pageSize": this.page2.pageSize,
        "appId": this.appValue2,
        "mouldName": this.name2,
        "type": 1
      }
      this.loading2 = true
      getKeyords(params).then(res => {
        if(res.data.status == 0) {
          const data = res.data.data
          this.page2.total = data.total
          data.records.forEach(item => {
            item.expanded = false
            item.messageType = 0
            item.textContent = null
            item.fileContent = null
            item.cardContent = []
          })
          this.tableData2 = data.records
        } else {
          this.$message({
            type: 'error',
            message: res.data.message,
            center: true
          })
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
    handleSizeChange2(val) {
      this.page2.pageSize = val
      this.getReceiveReplyList()
    },
    handleCurrentChange2(val) {
      this.page2.currentPage = val
      this.getReceiveReplyList()
    },
    clearSearchForReceive() {
      this.appValue2 = ''
      this.name2 = ''
    },
    // 点击新增按钮事件
    addKeywordAction2() {
      this.addVisible2 = true
      this.formData2.content = ''
      this.formData2.appId = ''
      this.formData2.messageMouldId = ''
      this.formData2.type = this.activeName
      this.isNewAdd = true
      delete this.formData2.id
      if (this.$refs.form) {
        // this.$refs.form.resetFields()
        this.$refs.form.clearValidate()
      }
    },
    // 提交
    submit2() {
      this.$refs.form2.validate((valid) => {
        if(valid) {
          this.submitDisable2 = true
          addKeyword(this.formData2).then(res => {
            if(res.data.status == 0) {
              this.$message({
                type: 'success',
                message: '新增成功!',
                center: true
              })
              this.getReceiveReplyList()
              this.cancle2()
            } else {
              this.$message({
                type: 'error',
                message: res.data.message,
                center: true
              })
            }
            this.submitDisable2 = false
          }).catch(error => {
            this.$message({
              type: 'error',
              message: error,
              center: true
            })
            this.submitDisable2 = false
          })
        }
      })
    },
     // 取消
    cancle2() {
      this.addVisible2 = false
      this.$refs.form2.clearValidate();
      this.$refs.form2.resetFields();
    },
    // 更新
    update2() {
      this.$refs.form2.validate((valid) => {
        if(valid) {
          this.updateDisable2 = true
          updateKeywords(this.formData2).then(res => {
            if(res.data.status == 0) {
              this.$message({
                type: 'success',
                message: '修改成功!',
                center: true
              })
              this.getReceiveReplyList()
              this.addVisible2 = false
              this.$refs.form2.clearValidate();
              this.$refs.form2.resetFields();
            } else {
              this.$message({
                type: 'error',
                message: res.data.message,
                center: true
              })
            }
            this.updateDisable2 = false
          }).catch(error => {
            this.$message({
              type: 'error',
              message: error,
              center: true
            })
            this.updateDisable2 = false
          })
        }
      })
    },
    updateKeyword2(val) {
      this.isNewAdd = false
      this.addVisible2 = true
      const temp = {}
      temp.keyWord = val.keyWord
      temp.content = val.content
      temp.messageMouldId = val.messageMouldId
      temp.appId = val.appId
      temp.id = val.id
      this.formData2 = Object.assign({}, temp)
    },
    // --------------------------------------收到消息回复---------------------------------------------
    // 获取被关注回复列表
    getConcernedList() {
      const params = {
        "currentPage": this.page3.currentPage,
        "pageSize": this.page3.pageSize,
        "appId": this.appValue3,
        "mouldName": this.name3,
        "type": 2
      }
      this.loading3 = true
      getKeyords(params).then(res => {
        if(res.data.status == 0) {
          const data = res.data.data
          this.page3.total = data.total
          data.records.forEach(item => {
            item.expanded = false
            item.messageType = 0
            item.textContent = null
            item.fileContent = null
            item.cardContent = []
          })
          this.tableData3 = data.records
        } else {
          this.$message({
            type: 'error',
            message: res.data.message,
            center: true
          })
        }
        this.loading3 = false
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true
        })
        this.loading2 = false
      })
    },
    handleSizeChange3(val) {
      this.page3.pageSize = val
      this.getConcernedList()
    },
    handleCurrentChange3(val) {
      this.page3.currentPage = val
      this.getConcernedList()
    },
    clearSearchForConcern() {
      this.appValue3 = ''
      this.name3 = ''
    },
    // 点击新增按钮事件
    addKeywordAction3() {
      this.addVisible3 = true
      this.formData3.content = ''
      this.formData3.appId = ''
      this.formData3.messageMouldId = ''
      this.formData3.type = this.activeName
      this.isNewAdd = true
      delete this.formData3.id
      if (this.$refs.form) {
        // this.$refs.form.resetFields()
        this.$refs.form.clearValidate()
      }
    },
    // 取消
    cancle3() {
      this.addVisible3 = false
      this.$refs.form3.clearValidate();
      this.$refs.form3.resetFields();
    },
    // 更新
    update3() {
      this.$refs.form3.validate((valid) => {
        if(valid) {
          this.updateDisable3 = true
          updateKeywords(this.formData3).then(res => {
            if(res.data.status == 0) {
              this.$message({
                type: 'success',
                message: '修改成功!',
                center: true
              })
              this.getConcernedList()
              this.addVisible3 = false
              this.$refs.form3.clearValidate();
              this.$refs.form3.resetFields();
            } else {
              this.$message({
                type: 'error',
                message: res.data.message,
                center: true
              })
            }
            this.updateDisable3 = false
          }).catch(error => {
            this.$message({
              type: 'error',
              message: error,
              center: true
            })
            this.updateDisable3 = false
          })
        }
      })
    },
    // 提交
    submit3() {
      this.$refs.form3.validate((valid) => {
        if(valid) {
          this.submitDisable3 = true
          addKeyword(this.formData3).then(res => {
            if(res.data.status == 0) {
              this.$message({
                type: 'success',
                message: '新增成功!',
                center: true
              })
              this.getConcernedList()
              this.cancle3()
            } else {
              this.$message({
                type: 'error',
                message: res.data.message,
                center: true
              })
            }
            this.submitDisable3 = true
          }).catch(error => {
            this.$message({
              type: 'error',
              message: error,
              center: true
            })
            this.submitDisable3 = true
          })
        }
      })
    },
    updateKeyword3(val) {
      this.isNewAdd = false
      this.addVisible3 = true
      const temp = {}
      temp.keyWord = val.keyWord
      temp.content = val.content
      temp.messageMouldId = val.messageMouldId
      temp.appId = val.appId
      temp.id = val.id
      this.formData3 = Object.assign({}, temp)
    },
    // 第一次获取应用列表后给临时存放的消息列表赋值
    firstGetMessageList() {
      return new Promise((reslove, reject) => {
        const result = this.getMessageList(this.formData.appId)
        reslove(result)
      })
    }
  },
  mounted() {
    this.getAppList()
    this.getKeywordsList()
    window.addEventListener('keydown', this.keyDown)
  },
  created() {
    this.firstGetMessageList().then(res => {
      this.tempMessageModuleList = res
    })
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDown, false)
  }
}
</script>
<style lang="less" scoped>
#keywordReply{
  width: 100%;
  height: 100%;
  color: #333;
  .header{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-size: 14px;
    padding: 0 70px;
    .title {
      height: 90px;
      font-size: 20px;
      line-height: 80px;
      box-sizing: border-box;
      padding-top: 10px;
    }
    .container{
      width: 100%;
      height: calc(100%-90px);
      .headerBtn {
        height: 64px;
        display: flex;
        justify-content: space-between;
        .headerBtnLeft {
          // float: left;
          display: flex;
          justify-content: space-around;
          align-items: center;
          /deep/ .el-button + .el-button {
            margin-left: 0px;
            margin-right: 10px;
            border-radius: 0 4px 4px 0;
            border-left-color: rgba(255, 255, 255, 0.5);
          }
          /deep/ .el-input--small .el-input__inner {
            height: 36px;
            line-height: 36px;
          }
        }
        .headerBtnRight {
          float: right;
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
          .iconBtn.el-button:focus {
            background-color: #fff;
          }
        }
      }
      .footer_page{
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .module{
    padding: 10px 0;
    width: 260px;
    // max-height: 280px;
    overflow-y: scroll;
  }
  .moduleBox{
    padding: 10px;
    width: 250px;
    // max-height: 200px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    .card{
      width: 200px;
      padding-bottom: 10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid #eee;
      margin-right: 3px;
      .card-head{
        width: 200px;
        height: 180px;
        overflow: hidden;
        img{
          width:100%;
          max-height: 100%;
          height: auto;
        }
        .video-class{
          width: 100%;
          height: 150px;
        }
        .audio-class{
          width: 200px;
          height: 100px;
        }
      }
      .file-content{
        width: 200px;
        font-size: 12px;
        line-height: 16px;
        .file-content-head{
          font-weight: bold;
          margin-left: 15px;
        }
        .file-content-body{
          padding: 5px 15px;
        }
        .file-content-button{
          height: 30px;
          line-height: 30px;
          margin: 0 auto;
          background-color: #eee;
          text-align: center;
          border-radius: 10px;
          margin-top: 5px;
          width: 160px;
        }
      }
    }
  }
  .textClass{
    width: 200px;
    padding: 10px;
    background: #eee;
    color: #333;
    border-radius: 5px;
    font-size: 12px;
    line-height: 14px;
  }
  /deep/ .el-textarea .el-input__count{
    background: transparent;
    line-height: 12px;
    bottom:0;
  }
  /deep/ .el-input .el-input__count{
    position: absolute;
    right: 0;
    bottom: -4px;
    line-height: 12px;
    height: auto;
  }
  .imaClass{
    max-width: 100%;
    max-height: 180px;
  }
  .operation{
    margin-left: 10px;
    display: block;
    float: left;
    cursor: pointer;
    color: #409eff;
  }
  .video-class{
    width: 100%;
    height: 170px;
  }
}
</style>
