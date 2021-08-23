<template>
  <div id="mediaHeader">
    <!-- 媒体素材 -->
    <div class="header">
      <div class="title">媒体素材</div>
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick" style="background-color:none">
          <!-- 图片 -->
          <el-tab-pane label="图片" name="first">
            <div class="tab-content">
              <div class="type-tip">
                <div class="type-tip-left">
                  <span class="type-tip-left-total">图片 (共{{currentTotal}}条)</span>
                  <img src="../../assets/svg/平铺.svg" v-show="!pictureShowList" @click="pictureTile" />
                  <img src="../../assets/svg/icon_24px_pingpu.svg" v-show="pictureShowList" @click="pictureTile" />
                  <img src="../../assets/svg/icon_24px_list2.svg" v-show="!pictureShowList" @click="pictureList"/>
                  <img src="../../assets/svg/列表.svg" v-show="pictureShowList" @click="pictureList"/>
                </div>
                <div class="type-tip-right">
                  <el-input style="margin-right:12px" v-model="searchPicValue" placeholder="搜索素材" size="small" @keyup.enter.native="searchPic" clearable>
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="searchPic"></i>
                  </el-input>
                  <el-upload action="#" :show-file-list="false" :http-request="uploadPictures" :before-upload="handleBeforeUpload1">
                    <el-button size="small" type="primary" id="uploadPicture" v-has="'fileGroupDetailUpload'">上传</el-button>
                  </el-upload>
                  <el-button size="small" type="primary" class="diyUpload" @click="uploadPic">上传</el-button>
                </div>
              </div>
              <typeGroup :types="types1" @changeTypes="childChangeTypes1" :current="current1" @select="currentGroupSelect" :fileType="1" @updateList="updateList"></typeGroup>
              <div class="select-tip" v-if="isShowTip1">
                <div class="select-tip-left">
                  <label class="select-tip-left-item">
                    <el-checkbox v-model="isSelectAll" @change="(value) =>selectAllTable(value)"></el-checkbox> 全选
                  </label>
                  <span class="select-number select-tip-left-item">已选择{{selectNumber}}项内容</span>
                  <span class="select-cancle select-tip-left-item" @click="cancleSelect">取消选择</span>
                </div>
                <div class="select-tip-right">
                  <img src="../../assets/svg/icon-删除-灰色@1x.svg" @click="batchDelete" />
                  <el-popover placement="bottom" width="200" ref="popover4" trigger="click">
                    <div class="group-list-group">
                      <span v-for="(item, index) in types1" :key="index" :class="index === currentMoveIndex ? 'active' : ''" class="group-list" @click="moveGroup(index,item)">{{item.name}}</span>
                    </div>
                    <div class="group-footer">
                      <el-button size="mini" type="primary" @click="batchChangePicGroup">确定</el-button>
                      <el-button size="mini" @click="batchCancleChangePicGroup">取消</el-button>
                    </div>
                    <el-button type="text" style="padding: 0" slot="reference">
                      <img src="../../assets/svg/icon-移动-灰色@1x.svg" />
                    </el-button>
                  </el-popover>
                </div>
              </div>
            </div>
            <div class="table-area">
              <div v-show="pictureShowList">
                <el-table border ref="table" size="small" :data="tableData" :header-cell-style="{ background: '#F4F4F4', color: '#333333', 'line-height': '22px' }" :style="{'color':'#333','min-height':tableHeight + 'px'}"
                  v-loading="loading1" @select-all="selectAll" @selection-change="handleSelectionChange">
                  <el-table-column type="selection" width="50" align="center">
                  </el-table-column>
                  <el-table-column width="60" label="ID" prop="id"></el-table-column>
                  <el-table-column prop="fileName" label="文件名" show-overflow-tooltip width="180">
                    <template slot-scope="scope">
                      <span v-if="!scope.row.rowEdit" @click="editFileName($event,scope.row)">{{scope.row.fileName}}</span>
                      <el-input id="#input" v-else v-model="scope.row.fileName" size="small" @keyup.enter.native="$event.target.blur" @blur="blurName($event,scope.row)"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="fileUploadType" label="文件类型" width="120">
                    <!-- <template slot-scope="scope">
                          <span>{{scope.row.fileStatus == 1 ? '图片' : (scope.row.fileStatus == 2 ? '音频' : '视频')}}</span>
                        </template> -->
                      </el-table-column>
                      <el-table-column
                        prop="fileUploadSize"
                        label="文件大小">
                      </el-table-column>
                      <el-table-column label="应用" prop="appName" show-overflow-tooltip>

                      </el-table-column>
                      <el-table-column label="通道" prop="channel" show-overflow-tooltip>

                      </el-table-column>
                      <el-table-column
                        prop="createTime"
                        show-overflow-tooltip
                        label="创建时间"
                        width="150">
                      </el-table-column>
                      <el-table-column
                        prop="fileStatus"
                        label="状态">
                        <template slot-scope="scope">
                          <span>{{scope.row.fileStatus == 0 ? '待审核' : (scope.row.fileStatus == 1 ? '审核成功' : '审核不通过')}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                          <el-popover placement="bottom" width="200" :ref="`delete-${scope.$index}`" trigger="click">
                            <span style="padding:15px">确定删除此素材吗？</span>
                            <div class="group-footer">
                              <el-button size="mini" type="primary" @click="deleteFile(scope)">确定</el-button>
                              <el-button size="mini" @click="cancleDeleteFile(scope)">取消</el-button>
                            </div>
                            <!-- <el-tooltip class="item" effect="dark" content="删除" placement="bottom" slot="reference">
                              <img class="operation" src="../../assets/svg/icon-24px-删除@1x.svg" v-has="'fileGroupDetailDeleteById'" />
                            </el-tooltip> -->
                            <span class="operation" v-has="'fileGroupDetailDeleteById'" slot="reference">删除</span>
                          </el-popover>
                          <el-popover placement="bottom" width="200" :ref="`popover-${scope.$index}`" trigger="click">
                            <div class="group-list-group">
                              <span v-for="(item, index) in types1" :key="index" :class="index === currentMoveIndex ? 'active' : ''" class="group-list" @click="moveGroup(index,item)">{{item.name}}</span>
                            </div>
                            <div class="group-footer">
                              <el-button size="mini" type="primary" @click="changeGroup(scope)">确定</el-button>
                              <el-button size="mini" @click="cancleChangeGroup(scope)">取消</el-button>
                            </div>
                            <span class="operation" v-has="'fileGroupDetailBatchUpdateGroupId'" slot="reference">移动</span>
                            <!-- <el-tooltip class="item" effect="dark" content="移动分组" placement="bottom" slot="reference">
                              <img class="operation" src="../../assets/svg/icon-24px-移动@1x.svg" v-has="'fileGroupDetailBatchUpdateGroupId'" />
                            </el-tooltip> -->
                          </el-popover>
                        </template>
                      </el-table-column>
                </el-table>
              </div>
              <div v-show="!pictureShowList" class="picture-content" v-loading="loading1">
                <div :class="item.checked ? 'img-box-selected': 'img-box'" v-for="(item,index) in tableData" :key="index">
                  <el-checkbox class="file-select" v-model="item.checked" @change="(value) =>selectItem(index, value)"></el-checkbox>
                  <div class="file-more">
                    <el-popover
                      placement="bottom"
                      width="90"
                      trigger="click"
                      popper-class="my-popover"
                      >
                      <div class="operation-menu">
                        <div @click="rename(index)">重命名</div>
                        <div @click="movePicture(index)">移动分组</div>
                        <div @click="deletePicture(index)">删除</div>
                      </div>
                      <img slot="reference" src="../../assets/svg/icon_more.svg"/>
                    </el-popover>
                  </div>
                  <el-image
                    style="width: 100%; height: 100%"
                    :src="item.fileUrl"
                    :preview-src-list="[item.fileUrl]"
                    fit="contain">
                  </el-image>
                  <div class="filme-name">{{item.fileName}}</div>
                </div>
              </div>
              <div class="pagination" v-show="tableData.length > 0 || pictureShowList">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :current-page="page.currentPage"
                  :page-sizes="[10, 20, 50, 100, 200]" :page-size="page.pageSize" :total="page.total">
                </el-pagination>
              </div>
            </div>
            <el-dialog
              title="上传素材"
              :visible.sync="dialogVisiblePic"
              width="30%">
              <el-form label-width="80px">
                <el-form-item label="选择应用">
                  <el-select v-model="appId1" size="small" placeholder="请选择应用">
                    <el-option
                      v-for="item in appOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="选择通道">
                  <el-select v-model="channel1" size="small" placeholder="请选择通道">
                    <el-option
                      v-for="item in channelList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="determineUploadPic">确 定</el-button>
                <el-button size="small" @click="dialogVisiblePic = false">取 消</el-button>
              </span>
            </el-dialog>
            <el-dialog
              :visible.sync="renamePicVisible"
              width="250px"
              title="重命名"
              top="20%"
              :show-close="false">
                <el-form>
                  <el-form-item>
                    <el-input size="small" v-model="tempRenameObject.tempName"></el-input>
                  </el-form-item>
                  <el-form-item style="text-align:center">
                    <el-button size="mini" type="primary" @click="renamePictureTile">确 定</el-button>
                    <el-button size="mini" @click="renamePicVisible = false">取 消</el-button>
                  </el-form-item>
                </el-form>
            </el-dialog>
            <el-dialog
              width="300px"
              top="20%"
              title="移动分组"
              :show-close="false"
              :visible.sync="movePicVisible">
                <div>
                  <div class="group-tile">
                    <span v-for="(item, index) in types1" :key="index" :class="index === currentMoveIndex ? 'active' : ''" class="group-tile-item" @click="moveGroup(index,item)">{{item.name}}</span>
                    <div style="clear: both;"></div>
                  </div>
                  <div style="margin-top:12px;text-align:center">
                    <el-button size="mini" type="primary" @click="changeGroupTile">确定</el-button>
                    <el-button size="mini" @click="movePicVisible = false">取消</el-button>
                  </div>
                </div>
            </el-dialog>
          </el-tab-pane>
          <!-- 音频 -->
          <el-tab-pane label="音频" name="second">
            <div class="tab-content">
              <div class="type-tip">
                <div class="type-tip-left">
                  <span class="type-tip-left-total">音频 (共{{currentTotal}}条)</span>
                   <img src="../../assets/svg/icon_24px_pingpu.svg" v-show="audioShowList" @click="audioTile" />
                  <img src="../../assets/svg/平铺.svg" v-show="!audioShowList" @click="audioTile" />
                  <img src="../../assets/svg/列表.svg" v-show="audioShowList" @click="audioList"/>
                  <img src="../../assets/svg/icon_24px_list2.svg" v-show="!audioShowList" @click="audioList"/>
                </div>
                <div class="type-tip-right">
                  <el-input style="margin-right:12px" v-model="searchAudioValue" placeholder="搜索素材" size="small" @keyup.enter.native="searchAudio" clearable>
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="searchAudio"></i>
                  </el-input>
                  <el-upload
                    action="#"
                    :show-file-list="false"
                    :http-request="uploadAudio"
                    :before-upload="handleBeforeUpload2">
                    <el-button size="small" type="primary" id="uploadAudio" v-has="'fileGroupDetailUpload'">上传</el-button>
                  </el-upload>
                  <el-button type="primary" class="diyUpload" size="small" @click="beforeUploadAudio">上传</el-button>
                </div>
              </div>
              <typeGroup :types="types1" @changeTypes="childChangeTypes1" :current="current1" @select="currentGroupSelectAudio" :fileType="2" @updateList="updateList"></typeGroup>
              <div class="select-tip" v-if="isShowTip2">
                <div class="select-tip-left">
                  <label class="select-tip-left-item">
                    <el-checkbox v-model="isSelectAllAudio" @change="(value) => selectAllAudio(value)"></el-checkbox> 全选
                  </label>
                  <span class="select-number select-tip-left-item">已选择{{selectNumber2}}项内容</span>
                  <span class="select-cancle select-tip-left-item" @click="cancleSelectAudio">取消选择</span>
                </div>
                <div class="select-tip-right">
                  <img src="../../assets/svg/icon-删除-灰色@1x.svg" @click="batchDeleteAudio" />
                  <el-popover
                      placement="bottom"
                      width="200"
                      ref="popover5"
                      trigger="click">
                      <div class="group-list-group">
                        <span v-for="(item, index) in types1" :key="index" :class="index === currentMoveIndex ? 'active' : ''" class="group-list" @click="moveGroup(index,item)">{{item.name}}</span>
                      </div>
                      <div class="group-footer">
                        <el-button size="mini" type="primary" @click="batchChangeAudioGroup">确定</el-button>
                        <el-button size="mini" @click="batchCancleChangeAudioGroup">取消</el-button>
                      </div>
                      <el-button type="text" style="padding: 0" slot="reference">
                        <img src="../../assets/svg/icon-移动-灰色@1x.svg" />
                      </el-button>
                  </el-popover>
                </div>
              </div>
            </div>
            <div class="table-area">
              <div v-show="audioShowList">
                <el-table
                    border
                    ref="table1"
                    size="small"
                    :data="tableData2"
                    v-loading="loading2"
                    :header-cell-style="{ background: '#F4F4F4', color: '#333333', 'line-height': '22px' }"
                    :style="{'color':'#333','min-height':tableHeight + 'px'}"
                    @select-all="selectAllAudios"
                    @selection-change="handleSelectionChange2">
                      <el-table-column
                        type="selection"
                        align="center"
                        width="50">
                      </el-table-column>
                      <el-table-column width="60" label="ID" prop="id"></el-table-column>
                      <el-table-column
                        prop="fileName"
                        label="文件名"
                        show-overflow-tooltip
                        width="180">
                        <template slot-scope="scope">
                          <span v-if="!scope.row.rowEdit" @click="editFileName1($event,scope.row)">{{scope.row.fileName}}</span>
                          <el-input v-else id="#input1" v-model="scope.row.fileName" size="small"  @keyup.enter.native="$event.target.blur" @blur="blurName1($event,scope.row)"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="fileUploadType"
                        label="文件类型"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="fileUploadSize"
                        label="文件大小">
                      </el-table-column>
                      <el-table-column label="应用" prop="appName" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column label="通道" prop="channel" show-overflow-tooltip>
                      </el-table-column>
                      <el-table-column
                        prop="createTime"
                        show-overflow-tooltip
                        label="创建时间">
                      </el-table-column>
                      <el-table-column
                        prop="status"
                        label="状态">
                        <template slot-scope="scope">
                          <span>{{scope.row.fileStatus == 0 ? '待审核' : (scope.row.fileStatus == 1 ? '审核成功' : '审核不通过')}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作">
                        <template slot-scope="scope">
                        <el-popover placement="bottom" width="200" :ref="`deleteAudio-${scope.$index}`" trigger="click">
                          <span style="padding:15px">确定删除此素材吗？</span>
                          <div class="group-footer">
                            <el-button size="mini" type="primary" @click="deleteAvdio(scope)">确定</el-button>
                            <el-button size="mini" @click="cancleDeleteAudioFile(scope)">取消</el-button>
                          </div>
                          <!-- <el-tooltip class="item" effect="dark" content="删除" placement="bottom" slot="reference">
                            <img class="operation" src="../../assets/svg/icon-24px-删除@1x.svg" v-has="'fileGroupDetailDeleteById'" />
                          </el-tooltip> -->
                          <span class="operation" v-has="'fileGroupDetailDeleteById'"  slot="reference">删除</span>
                        </el-popover>
                        <el-popover placement="bottom" width="200" :ref="`popover1-${scope.$index}`" trigger="click">
                          <div class="group-list-group">
                            <span v-for="(item, index) in types1" :key="index" :class="index === currentMoveIndex ? 'active' : ''" class="group-list" @click="moveGroup(index,item)">{{item.name}}</span>
                          </div>
                          <div class="group-footer">
                            <el-button size="mini" type="primary" @click="changeAudioGroup(scope)">确定</el-button>
                            <el-button size="mini" @click="ccancleChangeAudioGroup(scope)">取消</el-button>
                          </div>
                          <!-- <el-tooltip class="item" effect="dark" content="移动分组" placement="bottom" slot="reference">
                            <img class="operation" src="../../assets/svg/icon-24px-移动@1x.svg" v-has="'fileGroupDetailBatchUpdateGroupId'" />
                          </el-tooltip> -->
                          <span class="operation" v-has="'fileGroupDetailBatchUpdateGroupId'" slot="reference">移动</span>
                        </el-popover>
                      </template>
                    </el-table-column>
                </el-table>
              </div>
              <div v-show="!audioShowList" class="audio-content" v-loading="loading2">
                <div v-for="(item,index) in tableData2" :key="index">
                  <div :class="['tile-audio', {'tile-audio-selected': item.checked}]">
                    <div class="tile-audio-left">
                      <span class="filename">{{item.fileName}}</span>
                      <span>{{item.createTime}}</span>
                    </div>
                    <div class="tile-audio-center">
                      <img v-show="item.playing" src="../../assets/svg/play_icon.svg" @click="changePlayStatus(index, 1, item.url)"  />
                      <img v-show="!item.playing" src="../../assets/svg/pause_icon.svg"  @click="changePlayStatus(index, 2, item.url)" />
                    </div>
                    <div class="tile-audio-right">
                      <img src="../../assets/svg/icon_14px_audio.svg" />
                    </div>
                    <el-checkbox class="file-select" v-model="item.checked" @change="(value) => selectItem2(index, value)"></el-checkbox>
                    <div class="file-more">
                      <el-popover
                        placement="bottom"
                        width="90"
                        trigger="click"
                        popper-class="my-popover"
                        >
                        <div class="operation-menu">
                          <div @click="renameAudio(index)">重命名</div>
                          <div @click="moveAudio(index)">移动分组</div>
                          <div @click="deleteAudioInTile(item)">删除</div>
                        </div>
                        <img slot="reference" src="../../assets/svg/icon_more.svg"/>
                      </el-popover>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pagination" v-show="tableData2.length > 0 || audioShowList">
              <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" layout="total, sizes, prev, pager, next, jumper" :current-page="page2.currentPage"
                :page-sizes="[10, 20, 50, 100, 200]" :page-size="page2.pageSize" :total="page2.total">
              </el-pagination>
            </div>
            <el-dialog
              title="上传素材"
              :visible.sync="dialogVisibleAudio"
              width="30%">
              <el-form label-width="80px">
                <el-form-item label="选择应用">
                  <el-select v-model="appId2" size="small" placeholder="请选择应用">
                    <el-option
                      v-for="item in appOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="选择通道">
                  <el-select v-model="channel2" size="small" placeholder="请选择通道">
                    <el-option
                      v-for="item in channelList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="determineUploadAudio">确 定</el-button>
                <el-button size="small" @click="dialogVisibleAudio = false">取 消</el-button>
              </span>
            </el-dialog>
            <el-dialog
              :visible.sync="renameAudioVisible"
              width="250px"
              title="重命名"
              top="20%"
              :show-close="false">
                <el-form>
                  <el-form-item>
                    <el-input size="small" v-model="tempRenameObject.tempName"></el-input>
                  </el-form-item>
                  <el-form-item style="text-align:center">
                    <el-button size="mini" type="primary" @click="renameAudioTile">确 定</el-button>
                    <el-button size="mini" @click="renameAudioVisible = false">取 消</el-button>
                  </el-form-item>
                </el-form>
            </el-dialog>
            <el-dialog
              width="300px"
              top="20%"
              title="移动分组"
              :show-close="false"
              :visible.sync="moveAudioVisible">
                <div>
                  <div class="group-tile">
                    <span v-for="(item, index) in types1" :key="index" :class="index === currentMoveIndex ? 'active' : ''" class="group-tile-item" @click="moveGroup(index,item)">{{item.name}}</span>
                    <div style="clear: both;"></div>
                  </div>
                  <div style="margin-top:12px;text-align:center">
                    <el-button size="mini" type="primary" @click="changeAudioGroupTile">确定</el-button>
                    <el-button size="mini" @click="moveAudioVisible = false">取消</el-button>
                  </div>
                </div>
            </el-dialog>
          </el-tab-pane>

            <!-- 视频 -->
          <el-tab-pane label="视频" name="third">
            <div class="tab-content">
              <div class="type-tip">
                <div class="type-tip-left">
                  <span class="type-tip-left-total">视频 (共{{currentTotal}}条)</span>
                  <!-- <img src="../../assets/icon-24px-平铺@1x.png" />
                  <img src="../../assets/icon-24px-列表@1x.png" /> -->
                </div>
                <div class="type-tip-right">
                  <el-input style="margin-right:12px" v-model="searchVideoValue" placeholder="搜索素材" size="small"  @keyup.enter.native="searchVideo" clearable>
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="searchVideo"></i>
                  </el-input>
                  <!-- <el-button type="primary" size="small">上传</el-button> -->
                  <el-upload
                    action="#"
                    :show-file-list="false"
                    :http-request="uploadVideo"
                    :before-upload="handleBeforeUpload3">
                    <el-button size="small" type="primary" id="uploadVideo" v-has="'fileGroupDetailUpload'">上传</el-button>
                  </el-upload>
                  <el-button size="small" type="primary" class="diyUpload" @click="beforeUploadVideo">上传</el-button>
                </div>
              </div>
              <typeGroup :types="types1" @changeTypes="childChangeTypes1" :current="current1" @select="currentGroupSelectVideo" :fileType="3" @updateList="updateList"></typeGroup>
              <div class="select-tip" v-if="isShowTip3">
                <div class="select-tip-left">
                  <label class="select-tip-left-item">
                    <el-checkbox v-model="isSelectVideo" @change="selectAllVideo"></el-checkbox> 全选
                  </label>
                  <span class="select-number select-tip-left-item">已选择{{selectNumber3}}项内容</span>
                  <span class="select-cancle select-tip-left-item" @click="cancleSelectVideo">取消选择</span>
                </div>
                <div class="select-tip-right">
                  <img src="../../assets/svg/icon-删除-灰色@1x.svg" @click="batchDeleteVideo" />
                  <!-- <img src="../../assets/icon-移动@1x.png" @click="batchMoveVideo" /> -->
                  <el-popover
                      placement="bottom"
                      width="200"
                      ref="popover6"
                      trigger="click">
                      <div class="group-list-group">
                        <span v-for="(item, index) in types1" :key="index" :class="index === currentMoveIndex ? 'active' : ''" class="group-list" @click="moveGroup(index,item)">{{item.name}}</span>
                      </div>
                      <div class="group-footer">
                        <el-button size="mini" type="primary" @click="batchChangeVideoGroup">确定</el-button>
                        <el-button size="mini" @click="batchCancleChangeVideoGroup">取消</el-button>
                      </div>
                      <el-button type="text" style="padding: 0" slot="reference">
                        <img src="../../assets/svg/icon-移动-灰色@1x.svg" />
                      </el-button>
                  </el-popover>
                </div>
              </div>
            </div>
            <div class="table-area">
              <el-table
              border
              ref="table2"
              size="small"
              :data="tableData3"
              v-loading="loading3"
              :header-cell-style="{ background: '#F4F4F4', color: '#333333', 'line-height': '22px' }"
              :style="{'color':'#333','min-height':tableHeight + 'px'}"
              @select-all="selectAllVideos"
              @selection-change="handleSelectionChange3">
                <el-table-column
                  type="selection"
                  align="center"
                  width="50">
                </el-table-column>
                <el-table-column width="60" label="ID" prop="id"></el-table-column>
                <el-table-column
                  prop="fileName"
                  label="文件名"
                  show-overflow-tooltip
                  width="180">
                  <template slot-scope="scope">
                    <span v-if="!scope.row.rowEdit" @click="editFileName2($event,scope.row)">{{scope.row.fileName}}</span>
                    <el-input v-else id="#input2" v-model="scope.row.fileName" size="small"  @keyup.enter.native="$event.target.blur" @blur="blurName2($event,scope.row)"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="fileUploadType"
                  label="文件类型"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="fileUploadSize"
                  label="文件大小">
                </el-table-column>
                <el-table-column label="应用" prop="appName" show-overflow-tooltip>

                </el-table-column>
                <el-table-column label="通道" prop="channel" show-overflow-tooltip>

                </el-table-column>
                <el-table-column
                  prop="createTime"
                  show-overflow-tooltip
                  label="创建时间">
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="状态">
                  <template slot-scope="scope">
                    <!-- <span>{{scope.row.fileStatus == 0 ? '待审核' : (scope.row.fileStatus == 1 ? '审核成功' : '审核不通过')}}</span> -->
                    <span v-if="scope.row.fileStatus == 0">待审核</span>
                    <span v-else-if="scope.row.fileStatus == 1">审核成功</span>
                    <span v-else-if="scope.row.fileStatus == 2">审核不通过</span>
                    <span v-else-if="scope.row.fileStatus == 3">素材已过期</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <el-popover placement="bottom" width="200" :ref="`deleteVideo-${scope.$index}`" trigger="click">
                      <span style="padding:15px">确定删除此素材吗？</span>
                      <div class="group-footer">
                        <el-button size="mini" type="primary" @click="deleteVideo(scope)">确定</el-button>
                        <el-button size="mini" @click="cancleDeleteVideoFile(scope)">取消</el-button>
                      </div>
                      <span class="operation" size="small" v-has="'fileGroupDetailDeleteById'" slot="reference">删除</span>
                      <!-- <el-tooltip class="item"  placement="bottom" slot="reference">
                        <el-button type="text" style="padding: 0" v-has="'fileGroupDetailDeleteById'">删除</el-button>
                        <img class="operation" src="../../assets/svg/icon-24px-删除@1x.svg" v-has="'fileGroupDetailDeleteById'" />
                      </el-tooltip> -->
                    </el-popover>
                    <el-popover
                      placement="bottom"
                      width="200"
                      :ref="`popover2-${scope.$index}`"
                      trigger="click">
                      <div class="group-list-group">
                        <span v-for="(item, index) in types1" :key="index" :class="index === currentMoveIndex ? 'active' : ''" class="group-list" @click="moveGroup(index,item)">{{item.name}}</span>
                      </div>
                      <div class="group-footer">
                        <el-button size="mini" type="primary" @click="changeVideoGroup(scope)">确定</el-button>
                        <el-button size="mini" @click="cancleChangeVideoGroup(scope)">取消</el-button>
                      </div>
                      <span class="operation" slot="reference" v-has="'fileGroupDetailBatchUpdateGroupId'">移动</span>
                      <!-- <el-tooltip class="item" effect="dark" content="移动分组" placement="bottom" slot="reference">
                        <img class="operation" src="../../assets/svg/icon-24px-移动@1x.svg" v-has="'fileGroupDetailBatchUpdateGroupId'" />
                      </el-tooltip> -->
                    </el-popover>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pagination">
              <el-pagination
                @size-change="handleSizeChange3"
                @current-change="handleCurrentChange3"
                layout="total, sizes, prev, pager, next, jumper"
                :current-page="page3.currentPage"
                :page-sizes="[10, 20, 50, 100, 200]"
                :page-size="page3.pageSize"
                :total="page3.total">
              </el-pagination>
            </div>
            <el-dialog
              title="上传素材"
              :visible.sync="dialogVisibleVedio"
              width="30%">
              <el-form label-width="80px">
                <el-form-item label="选择应用">
                  <el-select v-model="appId3" size="small" placeholder="请选择应用">
                    <el-option
                      v-for="item in appOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="选择通道">
                  <el-select v-model="channel3" size="small" placeholder="请选择通道">
                    <el-option
                      v-for="item in channelList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="determineUploadVedio">确 定</el-button>
                <el-button size="small" @click="dialogVisibleVedio = false">取 消</el-button>
              </span>
            </el-dialog>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import typeGroup from '@/components/typeGroup'
import {
  fileGroup,
  getGroupByType,
  getFileList,
  uploadFile,
  deleteFileById,
  updateFile,
  batchUpdate,
} from '@/api/message/media'
import { getAppLists } from '@/api/Develop/myapp'
import { enterpriseApplist } from '@/api/message/diyMessage'
import { channelLists } from '@/api/message/records'
export default {
    name:'mediaMaterial',
    components: {
      typeGroup
    },
    data() {
      return {
        fileType: 1,  // 当前的是何种图片类型，默认是图片
        currentTotal: 0,  // 当前的类型共有多少条
        current1: '', //  当前选择的分组
        activeName: 'first',
        currentMoveIndex: '',
        currentMove: '',  // 当前选择的要移动的分组
        tableHeight: window.innerHeight - 310 + "",
        appId: '',   // 应用
        channel: '',  // 通道
        appOptions: [],  // 应用选择列表
        channelList: [],  // 通道选择列表

        // <-----------------------------------------图片变量---------------------------------------->
        types1: [
          {
            id: 1,
            name: '我的图片',
            total: 0,
            isEdit: false
          }
        ],
        pictureShowList: false, // 图片以列表的方式展示
        loading1: false,  // loading时间
        searchPicValue: '',  //搜索图片
        isSelectAll: false,  // 是否全选
        currentSelect: 0,  // 当前选择的分组
        selectNumber: 0, // 当前选择了几项图片
        isShowTip1: false,  // 图片选择区域是否显示
        tableData: [],  // 表格数据
        multipleSelection: [],
        showDelete: true,
        page: {     // page数据
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        dialogVisiblePic: false,
        appId1: '',   // 图片上传绑定的应用
        channel1: '',  // 图片上传绑定的通道
        renamePicVisible: false, // 重命名弹框控制
        // tempName: '', // 临时名字
        tempRenameObject: {
          tempName: '',
          tempId: ''
        },
        movePicVisible:false, // 移动分组弹窗控制
        tempSelect: '', // 临时选择的数据
        // <-----------------------------------------音频变量---------------------------------------->
        audioShowList: false, // 音频列表或者平铺切换
        loading2: false,
        searchAudioValue: '', // 音频搜索值
        isSelectAllAudio: '', // 全选音频表格
        multipleSelection2: [], // 音频多选
        selectNumber2: 0, // 当前选择了几项音频
        isShowTip2: false, // 音频选择区域是否显示
        page2: {
          currentPage: 1,
          pageSize: 10,
          total: 0,
        },
        types2: [
          {
            id: 1,
            label: '我的音频',
            total: 9,
            isEdit: false,
          },
        ],
        tableData2: [
          // 音频表格数据
          {
            id: 0,
            fileName: '测试图片一',
            fileType: 'jpg',
            fileSize: '1M',
            createTime: '2020-08-29 11:23:45',
            status: '审核通过',
          },
          {
            id: 1,
            fileName: '测试音频一',
            fileType: 'wav',
            fileSize: '1M',
            createTime: '2020-08-29 11:23:45',
            status: '待审核',
          },
        ],
        dialogVisibleAudio: false,
        appId2: '',  // 音频上传绑定的应用
        channel2: '',  // 音频上传绑定的通道
        renameAudioVisible: false,  // 重命名弹框控制
        moveAudioVisible: false, // 移动分组弹框控制
        audio: '',

        // <-----------------------------------------视频变量---------------------------------------->
        loading3: false,
        searchVideoValue: '', // 视频搜索框值
        isSelectVideo: '', // 是否全选所有的表格视频
        multipleSelection3: [], // 音频多选
        selectNumber3: 0, // 当前选择了几项视频
        isShowTip3: false,  // 视频选择区域是否显示
        page3: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        types3: [
          {
            id: 1,
            label: '我的视频',
            total: 9,
            isEdit: false
          }
        ],
        tableData3: [  // 视频表格数据
          {
            id: 0,
            fileName: '测试视频一',
            fileType: 'MP4',
            fileSize: '1M',
            createTime: '2020-08-30 11:23:45',
            status: '审核通过'
          },
          {
            id: 1,
            fileName: '测试视频一',
            fileType: 'MP4',
            fileSize: '1M',
            createTime: '2020-08-30 11:23:45',
            status: '待审核'
          }
        ],
        dialogVisibleVedio: false,
        appId3: '',
        channel3: ''
      }
    },
    watch: {
      // 监听全选事件
      multipleSelection() {
        if (this.multipleSelection.length == 0) {
          this.isSelectAll = false
        } else if (this.multipleSelection.length == this.tableData.length) {
          this.isSelectAll = true
        }
      },
      searchPicValue() {
        this.page.currentPage = 1
      },
      searchAudioValue() {
        this.page2.currentPage = 1
      },
      searchVideoValue() {
        this.page3.currentPage = 1
      },
    },
    methods: {
    // <-----------------------------------------公用方法---------------------------------------->
    // 切换tabs页
    handleClick(tab, event) {
      if (tab.name == 'first') {
        // dosomething  图片
        this.fileType = 1
        this.current1 = null
        this.page.currentPage = 1
        this.getGroupByTypes()
        this.getPicTableList()
      } else if (tab.name == 'second') {
        // dosomething  音频
        this.fileType = 2
        this.current1 = null
        this.page2.currentPage = 1
        this.getGroupByTypes()
        this.getAudioList()

      } else {
        // dosomething  视频
        this.fileType = 3
        this.current1 = null
        this.page3.currentPage = 1
        this.getGroupByTypes()
        this.getVideoList()
      }
    },
    // 判断当前是选中的分组时哪一个
    selectType(val) {
      this.currentSelect = val
    },

    // 根据类型获取分组方法
    getGroupByTypes() {
      const query = {
        fileType: this.fileType,
      }
      getGroupByType(query).then((res) => {
        if (res.data.status == 0) {
          let sum = 0
          const data = res.data.data
          for (let k in data) {
            sum += data[k].total
          }
          const val = {
            id: null,
            total: sum,
            name:
              this.fileType == 1
                ? '我的图片'
                : this.fileType == 2
                ? '我的音频'
                : '我的视频',
          }
          data.unshift(val)
          data.forEach((item) => {
            item.isEdit = false
          })
          this.types1 = data
          this.current1 = this.types1[0].id
        }
      })
    },
    // 获取素材文件
    getFiles(query) {
      return getFileList(query)
    },
    // 行弹框移动分组
    moveGroup(index, item) {
      this.currentMoveIndex = index
      this.currentMove = item
    },
    // 更新表格列表
    updateList(val) {
      if (val == 1) {
        this.getPicTableList()
      } else if (val == 2) {
        this.getAudioList()
      } else {
        this.getVideoList()
      }
    },
    // 获取通道列表
    getChannelList() {
      channelLists().then((res) => {
        if (res.data.status == 0) {
          const data = res.data.data
          data.forEach(item => {
            this.channelList.push({
              value: item.id,
              label: item.name
            })
          })
          return this.channelList
        } else {
          this.$message({
            type: 'error',
            message: res.data.message,
            center: true
          })
        }
      })
    },
    //  获取应用列表
    getDataList() {
      return enterpriseApplist({productType: 1}).then((res) => {
        if (res.data.status == 0) {
          const data = res.data.data
          // console.log(data)
          data.forEach((item) => {
            const val = {}
            val.value = item.id
            val.label = item.name
            this.appOptions.push(val)
          })
          return this.appOptions
        } else {
          this.$message.error({
            message: res.data.message,
            center: true,
          })
        }
      }).catch((error) => {
          this.$message.error({
            message: error,
            center: true,
          })
        })
    },
    // 根据应用ID, 模板ID匹配应用、模板
    findAppByid(val, options) {
      let temp = ''
      options.map(item => {
        if (val == item.value) {
          temp =  item.label
        }
      })
      return temp
    },
    // <-----------------------------------------图片方法---------------------------------------->
    // 切换成列表显示
    pictureList() {
      this.pictureShowList = true
    },

    // 切换成分组显示
    pictureTile() {
      this.pictureShowList = false
      this.multipleSelection = []
      this.selectNumber = 0
      this.tableData.forEach(item => {
        item.checked = false
        this.selectNumber = 0
        this.isShowTip1 = false
      })
    },
    // 获取图片表格列表数据
    getPicTableList() {
      const that = this
      this.loading1 = true
      const query = {
        currentPage: this.page.currentPage,
        pageSize: this.page.pageSize,
        fileGroupId: this.current1,
        fileName: this.searchPicValue,
        // fileStatus: 1,   // 没有此限制条件时查全部状态的
        fileType: 1, // 1是图片 2是音频  3是视频
      }
      if (this.searchPicValue == '') {
        delete query.fileName
      }
      this.getFiles(query)
        .then((res) => {
          if (res.data.status == 0) {
            const data = res.data.data
            this.page.pageSize = data.size
            this.page.currentPage = data.current
            this.page.total = data.total
            if (
              this.current1 == null ||
              this.current1 == undefined ||
              this.current1 == ''
            ) {
              this.currentTotal = data.total
              this.types1[0].total = data.total
            }
            data.records.forEach((item, index) => {
              item.rowEdit = false
              item.index = index
              that.channelList.forEach(ele => {
                if (ele.value == item.channelId) {
                  item.channel = ele.label
                }
              })
              that.appOptions.forEach(ele => {
                if (ele.value == item.enterpriseAccountAppId) {
                  item.appName = ele.label
                }
              })
              // item.channel = that.findAppByid(item.channelId, that.channelList)
              // item.appName = that.findAppByid(item.enterpriseAccountAppId, that.appOptions)
              item.fileUploadSize = (item.fileUploadSize/1024/1024).toFixed(2) + 'MB'
              item.checked = false
            })
            this.$nextTick(() => {
              this.tableData = data.records
            })
          } else {
            this.$message({
              type: res.data.status === 2 ? 'warning' : 'error',
              message: res.data.message,
              center: true,
            })
          }
          this.loading1 = false
        })
        .catch((error) => {
          this.$message({
            type: 'error',
            message: error,
            center: true,
          })
          this.loading1 = false
        })
    },
    // 确定改变分组
    changeGroup(scope) {
      const query = {
        fileGroupId: this.currentMove.id,
        fileName: scope.row.fileName,
        id: scope.row.id,
      }
      updateFile(query)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '移动成功!',
              center: true,
            })
            this.getPicTableList()
            this.getGroupByTypes()
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
      scope._self.$refs[`popover-${scope.$index}`].doClose()
    },
    changeGroupTile(){
      const query = {
        fileGroupId: this.currentMove.id,
        fileName: this.tempSelect.fileName,
        id: this.tempSelect.id,
      }
      updateFile(query)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '移动成功!',
              center: true,
            })
            this.getPicTableList()
            this.getGroupByTypes()
            this.movePicVisible = false
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
          this.movePicVisible = false
        })
    },
    // 取消改变分组
    cancleChangeGroup(scope) {
      scope._self.$refs[`popover-${scope.$index}`].doClose()
    },
    // 上传图片
    uploadPictures(item) {
      const formData = new FormData()
      formData.append('file', item.file)
      formData.append('enterpriseAccountAppId', this.appId1)
      formData.append('channelId', this.channel1)
      if (this.current1 != null) {
        formData.append('groupId', this.current1)
      }
      this.loading1 = true
      uploadFile(formData).then((res) => {
        if (res.data.status == 0) {
          this.$message({
            type: 'success',
            message: '上传成功!',
            center: true,
          })
          this.getGroupByTypes()
          const timer = setTimeout(this.getPicTableList(), 3000)
          this.$once('hook:beforeDestroy', () => {
            clearInterval(timer)
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.message,
            center: true,
          })
        }
        this.loading1 = false
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true,
        })
        this.loading1 = false
      })
    },
    // 批量删除
    batchDelete() {
      this.$confirm('确定要删除选中的素材吗？', {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        closeOnClickModal:false,
        center:true
      })
        .then(() => {
          this.multipleSelection.forEach((item) => {
            this.deletePicfile(item)
            this.getGroupByTypes()
          })
        })
        .catch(() => {})
    },
    // 批量移动
    batchMove(query) {
      return batchUpdate(query).then((res) => res.data)
    },
    // 图片选择事件
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.selectNumber = val.length
      if (val.length > 0) {
        this.isShowTip1 = true
      } else {
        this.isShowTip1 = false
      }
    },
    // 搜索图片
    searchPic() {
      this.getPicTableList()
    },
    // 全选
    selectAll(val) {
      if (val.length == this.tableData.length) {
        this.isSelectAll = true
      } else {
        this.isSelectAll = false
      }
    },
    selectAllTable(value) {
      const that = this
      let tempArr = []
      if (this.pictureShowList) {
        this.$refs.table.toggleAllSelection()
      } else {
        if(value) {
          this.tableData.forEach(item => {
            item.checked = true
            tempArr.push(item)
          })
          this.multipleSelection = tempArr
          that.selectNumber = this.tableData.length
        } else{
          this.multipleSelection = []
          this.tableData.forEach(item => {
            item.checked = false
            that.selectNumber = 0
            this.isShowTip1 = false
          })
        }
      }
    },
    // 取消选择
    cancleSelect() {
      this.multipleSelection.forEach((item) => {
        this.$refs.table.toggleRowSelection(item)
      })
      this.multipleSelection = []
      this.selectNumber = 0
      this.tableData.forEach(item => {
        item.checked = false
        this.isShowTip1 = false
      })
    },
    // 行内单击可编辑
    editFileName(event, val) {
      this.tableData[val.index].rowEdit = !this.tableData[val.index].rowEdit
      this.$nextTick(() => {
        document.getElementById('#input').focus()
      })
    },
    blurName(event, val) {
      const query = {
        id: val.id,
        fileName: val.fileName,
      }
      this.tableData[val.index].rowEdit = !this.tableData[val.index].rowEdit
      updateFile(query)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '更新成功！',
              center: true,
            })
            this.getPicTableList()
          } else {
            this.$message({
              type: res.data.status === 2 ? 'warning' : 'error',
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
      },
      // 图片表格页码
      handleSizeChange(val) {
        this.page.pageSize = val
        this.getPicTableList()
      },
      handleCurrentChange(val) {
        this.page.currentPage = val
        this.getPicTableList()
      },
      childChangeTypes1(val) {
        this.types1 = val
      },
      // 上传前询问
      uploadPic() {
        this.dialogVisiblePic = true
      },
      // 确定打开文件上传框
      determineUploadPic() {
        this.dialogVisiblePic = false
        const e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);
        const uploadPic  = document.getElementById("uploadPicture")
        uploadPic.dispatchEvent(e)
      },
      // 图片文件上传前回调
      handleBeforeUpload1(file) {
        console.log(this.$refs.upload1)
        const allowUpload = ['jpg','jpeg', 'png', 'gif', 'bmp', 'JPG', 'PNG','JPEG', 'GIF', 'BMP']
        const type = file.name.slice(-3)
        if(allowUpload.indexOf(type) == -1) {
          this.$message({
            type: 'warning',
            message: '只能上传JPG、PNG、GIF、BMP格式的文件'
          })
          return false
        }
        const allowSize = file.size / 1024 / 1024
        if (allowSize > 2) {
          this.$message({
            type: 'warning',
            message: '上传的文件不能超过2M'
          })
          return false
        }
      },
      // 删除图片文件
      deleteFile(scope) {
        const query = {
          fileGroupDetailId: scope.row.id
        }
        deleteFileById(query).then(res => {
          if (res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '删除成功!',
              center: true,
            })
            scope._self.$refs[`delete-${scope.$index}`].doClose()
            this.getPicTableList()
          } else {
            this.$message({
              type: res.data.status === 2 ? 'warning' : 'error',
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
    },
    // 删除文件
    deletePicfile(val) {
      const query = {
        fileGroupDetailId: val.id,
      }
      this.loading1 = true
      deleteFileById(query)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '删除成功!',
              center: true,
            })
            this.getPicTableList()
          } else {
            this.$message({
              type: res.data.status === 2 ? 'warning' : 'error',
              message: res.data.message,
              center: true,
            })
            this.loading1 = false
          }
        })
        .catch((error) => {
          this.$message({
            type: 'error',
            message: error,
            center: true,
          })
          this.loading1 = false
        })
    },
    // 取消删除当前的选项
    cancleDeleteFile(scope) {
      scope._self.$refs[`delete-${scope.$index}`].doClose()
    },
    // 选中当前分组后触发的事件
    currentGroupSelect(val) {
      this.current1 = this.types1[val].id
      this.page.currentPage = 1
      this.getPicTableList()
      this.multipleSelection = []
      this.selectNumber = 0
    },
    // 批量移动分组
    batchChangePicGroup() {
      const that = this
      const tempArr = []
      this.multipleSelection.forEach((item) => {
        tempArr.push(item.id)
      })
      const query = {
        groupId: this.currentMove.id,
        idList: tempArr,
      }
      if (this.currentMove.id == null) {
        delete query.groupId
      }
      this.batchMove(query)
        .then((res) => {
          if (res.status == 0) {
            this.$message({
              type: 'success',
              message: '移动成功!',
              center: true,
            })
            that.getPicTableList()
            that.getGroupByTypes()
          } else {
            this.$message({
              type: res.data.status === 2 ? 'warning' : 'error',
              message: res.message,
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
      this.$refs.popover4.doClose()
    },
    // 取消移动分组
    batchCancleChangePicGroup() {
      this.$refs.popover4.doClose()
    },
    // 平铺重命名
    rename(index){
      this.renamePicVisible = true
      this.tempRenameObject.tempName = this.tableData[index].fileName
      this.tempRenameObject.tempId = this.tableData[index].id
    },
    // 平铺重命名提交
    renamePictureTile(){
      const query = {
        id: this.tempRenameObject.tempId,
        fileName: this.tempRenameObject.tempName
      }
      updateFile(query)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '更新成功！',
              center: true,
            })
            this.getPicTableList()
            this.renamePicVisible = false
          } else {
            this.$message({
              type: res.data.status === 2 ? 'warning' : 'error',
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
    },
    // 平铺移动分组
    movePicture(index) {
      this.movePicVisible = true
      this.currentMoveIndex = null
      this.tempSelect = this.tableData[index]
    },
    // 平铺删除图片
    deletePicture(index) {
      this.$confirm('确定要删除选中的素材吗？', {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        closeOnClickModal:false,
        center:true
      })
      .then(() => {
        this.deletePicfile(this.tableData[index])
        this.getGroupByTypes()
      })
      .catch(() => {})
    },
    // 选择
    selectItem(index,value) {
      if(value) {
        this.multipleSelection.splice(index, 0, this.tableData[index])
      } else {
        this.multipleSelection.forEach((item, i) => {
          if(item.id === this.tableData[index].id) {
            this.multipleSelection.splice(i, 1)
          }
        })
      }
      this.selectNumber = this.multipleSelection.length
      if(this.multipleSelection.length > 0) {
        this.isShowTip1 = true
      } else {
        this.isShowTip1 = false
      }
    },
    // <-----------------------------------------音频方法---------------------------------------->
    // 列表显示
    audioList(){
      this.audioShowList = true
    },
    // 平铺显示
    audioTile() {
      this.audioShowList = false
    },
    // 获取音频列表
    getAudioList() {
      this.loading2 = true
      const that = this
      const query = {
        currentPage: this.page2.currentPage,
        pageSize: this.page2.pageSize,
        fileGroupId: this.current1,
        fileName: this.searchAudioValue,
        // fileStatus: 1,   // 没有此限制条件时查全部状态的
        fileType: 2, // 1是图片 2是音频  3是视频
      }
      if (this.searchAudioValue == '') {
        delete query.fileName
      }
      this.getFiles(query)
        .then((res) => {
          if (res.data.status == 0) {
            const data = res.data.data
            this.page2.pageSize = data.size
            this.page2.currentPage = data.current
            this.page2.total = data.total
            if (
              this.current1 == null ||
              this.current1 == undefined ||
              this.current1 == ''
            ) {
              this.currentTotal = data.total
              this.types1[0].total = data.total
            }
            data.records.forEach((item, index) => {
              item.rowEdit = false
              item.index = index
              item.channel = that.findAppByid(item.channelId, that.channelList)
              item.appName = that.findAppByid(item.enterpriseAccountAppId, that.appOptions)
              item.fileUploadSize = (item.fileUploadSize/1024/1024).toFixed(2) + 'MB'
              item.checked = false
              item.playing = true
            })
            this.tableData2 = data.records
            // this.getGroupByTypes()
          } else {
            this.$message({
              type: res.data.status === 2 ? 'warning' : 'error',
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
    // 音频选择事件
    handleSelectionChange2(val) {
      this.multipleSelection2 = val
      this.selectNumber2 = val.length
      if (val.length > 0) {
        this.isShowTip2 = true
      } else {
        this.isShowTip2 = false
      }
    },
    // 音频切换分组
    changeAudioGroup(scope) {
      const query = {
        fileGroupId: this.currentMove.id,
        fileName: scope.row.fileName,
        id: scope.row.id,
      }
      updateFile(query)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '移动成功!',
              center: true,
            })
            this.getAudioList()
            this.getGroupByTypes()
          } else {
            this.$message({
              type: res.data.status === 2 ? 'warning' : 'error',
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
      scope._self.$refs[`popover1-${scope.$index}`].doClose()
    },
    // 删除音频
    deleteAvdio(scope) {
      const query = {
        fileGroupDetailId: scope.row.id,
      }
      deleteFileById(query)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '删除成功!',
              center: true,
            })
            scope._self.$refs[`deleteAudio-${scope.$index}`].doClose()
            this.getAudioList()
          } else {
            this.$message({
              type: res.data.status === 2 ? 'warning' : 'error',
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
    },
    cancleDeleteAudioFile(scope) {
      scope._self.$refs[`deleteAudio-${scope.$index}`].doClose()
    },
    // 批量删除音频
    deleteAvdioFile(val) {
      const query = {
        fileGroupDetailId: val.id,
      }
      deleteFileById(query)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '删除成功!',
              center: true,
            })
            this.getAudioList()
          } else {
            this.$message({
              type: res.data.status === 2 ? 'warning' : 'error',
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
    },
    // 批量删除音频列表
    batchDeleteAudio() {
      this.$confirm('确定要删除选中的素材吗？', {
        cancelButtonText: "取 消",
        confirmButtonText: "确 定",
        confirmButtonClass:'btn-custom-confirm',
        closeOnClickModal:false,
        center:true
      })
        .then(() => {
          this.multipleSelection.forEach((item) => {
            this.deleteAvdioFile(item)
            this.getGroupByTypes()
          })
        })
        .catch(() => {})
    },
    // 删除图片平铺
    deleteAudioInTile(item) {
      this.$confirm('确定要删除选中的素材吗？', {
          cancelButtonText: "取 消",
          confirmButtonText: "确 定",
          confirmButtonClass:'btn-custom-confirm',
          closeOnClickModal:false,
          center:true
      }).then(() => {
        const query = {
          fileGroupDetailId: item.id,
        }
        this.loading2 = true
      deleteFileById(query)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '删除成功!',
              center: true,
            })
            this.getAudioList()
          } else {
            this.$message({
              type: res.data.status === 2 ? 'warning' : 'error',
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
      }).catch(() => {})
    },
    // 批量移动音频
    batchChangeAudioGroup() {
      const tempArr = []
      this.multipleSelection2.forEach((item) => {
        tempArr.push(item.id)
      })
      const query = {
        groupId: this.currentMove.id,
        idList: tempArr,
      }
      if (this.currentMove.id == null) {
        delete query.groupId
      }
      this.batchMove(query)
        .then((res) => {
          if (res.status == 0) {
            this.$message({
              type: 'success',
              message: '移动成功!',
              center: true,
            })
            this.getAudioList()
            this.getGroupByTypes()
          } else {
            this.$message({
              type: res.data.status === 2 ? 'warning' : 'error',
              message: res.message,
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
      this.$refs.popover5.doClose()
    },
    // changeAudioGroup() {

    // },
    // 取消批量移动音频
    batchCancleChangeAudioGroup() {
      this.$refs.popover5.doClose()
    },
    ccancleChangeAudioGroup(scope) {
      scope._self.$refs[`popover1-${scope.$index}`].doClose()
    },
    // 选中当前分组后触发的事件
    currentGroupSelectAudio(val) {
      this.current1 = this.types1[val].id
      this.page2.currentPage = 1
      this.getAudioList()
    },
    // 搜索音频
    searchAudio() {
      this.getAudioList()
    },
    // 全选音频
    selectAllAudios(val) {
      if (val.length == this.tableData2.length) {
        this.isSelectAll = true
      } else {
        this.isSelectAll = false
      }
    },
    // 全选音频
    selectAllAudio(value) {
      let tempArr = []
      if(this.audioShowList) {
        this.$refs.table1.toggleAllSelection()
      } else {
        if(value) {
          this.multipleSelection2 = this.tableData2
          this.tableData2.forEach(item => {
            item.checked = true
            tempArr.push(item)
          })
          this.multipleSelection2 = tempArr
          this.selectNumber2 = this.tableData2.length
        } else {
          this.multipleSelection2 = []
          this.tableData2.forEach(item => {
            item.checked = false
            this.selectNumber2 = 0
            this.isShowTip2 = false
          })
        }
      }
    },
    // 上传音频文件
    uploadAudio(item) {
      const formData = new FormData()
      formData.append('file', item.file)
      formData.append('enterpriseAccountAppId', this.appId2)
      formData.append('channelId', this.channel2)
      if (this.current1 != null) {
        formData.append('groupId', this.current1)
      }
      this.loading2 = true
      uploadFile(formData).then((res) => {
        if (res.data.status == 0) {
          this.$message({
            type: 'success',
            message: '上传成功!',
            center: true,
          })
          this.getGroupByTypes()
          const timer = setTimeout(this.getAudioList(), 3000)
          this.$once('hook:beforeDestroy', () => {
            clearInterval(timer)
          })
        } else {
          this.$message({
            type: res.data.status === 2 ? 'warning' : 'error',
            message: res.data.message,
            center: true,
          })
        }
        this.loading2 = false
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true,
        })
        this.loading2 = false
      })
    },
    cancleSelectAudio() {
      this.multipleSelection2.forEach((item) => {
        this.$refs.table1.toggleRowSelection(item)
      })
      this.multipleSelection2 = []
    },
    // 音频表格页码
    handleSizeChange2(val) {
      this.page2.pageSize = val
      this.getAudioList()
    },
    handleCurrentChange2(val) {
      this.page2.currentPage = val
      this.getAudioList()
    },
    childChangeTypes2(val) {
      this.types2 = val
    },
    handleBeforeUpload2(file) {
      // return
      const allowUpload = [
        '3GP',
        'MPEG',
        'MP3',
        'M4A',
        'AAC',
        'AMR',
        '3GPP',
        '3GPP2',
        '3gp',
        'mp3',
        'm4a',
        'mpeg',
        'aac',
        'amr',
        '3gpp',
        '3gpp2',
        'x-m4a',
      ]
      const type = file.name.slice(-3)
      if (allowUpload.indexOf(type) == -1) {
        this.$message({
          type: 'warning',
          message: '只能上传3GP、MP3、M4A、AAC、AMR格式的文件',
        })
        return false
      }
      const allowSize = file.size / 1024 / 1024
      if (allowSize > 2) {
        this.$message({
          type: 'warning',
          message: '上传的文件不能超过2M',
        })
        return false
      }
    },
    currentGroupSelect2(val) {
      this.current1 = this.types1[val].id
      this.getAudioList()
    },
    // 行内单击可编辑
    editFileName1(event, val) {
      this.tableData2[val.index].rowEdit = !this.tableData2[val.index].rowEdit
      this.$nextTick(() => {
        document.getElementById('#input1').focus()
      })
    },
    blurName1(event, val) {
      const query = {
        id: val.id,
        fileName: val.fileName,
      }
      this.tableData2[val.index].rowEdit = !this.tableData2[val.index].rowEdit
      updateFile(query)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '更新成功！',
              center: true,
            })
            this.getAudioList()
          } else {
            this.$message({
              type: res.data.status === 2 ? 'warning' : 'error',
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
    },
    // 确定上传音频文件
    determineUploadAudio() {
      this.dialogVisibleAudio = false
      const e = document.createEvent("MouseEvents");
      e.initEvent("click", true, true);
      const uploadAudio  = document.getElementById("uploadAudio")
      uploadAudio.dispatchEvent(e)
    },
    // 上传音频前的询问事件
    beforeUploadAudio() {
      this.dialogVisibleAudio = true
    },
    // 音频事件
    selectItem2(index, value) {
      if (value) {
        this.multipleSelection2.splice(index, 0, this.tableData2[index])
      } else {
        this.multipleSelection2.forEach((item, i) => {
          if(item.id === this.tableData2[index].id){
            this.multipleSelection2.splice(i ,1)
          }
        })
      }
      this.selectNumber2 = this.multipleSelection2.length
      if(this.multipleSelection2.length > 0) {
        this.isShowTip2 = true
      } else {
        this.isShowTip2 = false
      }
    },
    changePlayStatus(index, num, src) {
      if(num == 1) {
        // this.$refs[`audio${index}`][0].play = false
        // console.log(this.$refs[`audio${index}`][0])
        // this.$refs[`audio${index}`][0].play()
        // console.log(this.$refs.audio[index])
        // this.$refs.audio[index].play = false
        // this.$refs.audio[index].play()
        this.audio = new Audio()
        this.audio.src = src
        this.tableData2[index].playing = false
        this.audio.play()
      } else {
        if(!this.audio.paused) {
          this.audio.pause()
          this.tableData2[index].playing = true
        }
      }
    },
    // 平铺点击重命名
    renameAudio(index) {
      this.renameAudioVisible = true
      this.tempRenameObject.tempName = this.tableData2[index].fileName
      this.tempRenameObject.tempId = this.tableData2[index].id
    },
    // 平铺重命名提交
    renameAudioTile() {
      const query = {
        id: this.tempRenameObject.tempId,
        fileName: this.tempRenameObject.tempName
      }
      updateFile(query)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '更新成功！',
              center: true,
            })
            this.getAudioList()
            this.renameAudioVisible = false
          } else {
            this.$message({
              type: res.data.status === 2 ? 'warning' : 'error',
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
    },
    // 平铺移动分组
    moveAudio(index) {
      this.moveAudioVisible = true
      this.currentMoveIndex = null
      this.tempSelect = this.tableData2[index]
    },
    // 音频移动分组
    changeAudioGroupTile() {
      const query = {
        fileGroupId: this.currentMove.id,
        fileName: this.tempSelect.fileName,
        id: this.tempSelect.id,
      }
      updateFile(query)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '移动成功!',
              center: true,
            })
            this.getAudioList()
            this.getGroupByTypes()
            this.moveAudioVisible = false
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
          this.moveAudioVisible = false
        })
    },
    // <----------------------------------------视频方法---------------------------------------->
    // 获取video列表
    getVideoList() {
      this.loading3 = true
      const that = this
      const query = {
        currentPage: this.page3.currentPage,
        pageSize: this.page3.pageSize,
        fileGroupId: this.current1,
        fileName: this.searchVideoValue,
        // fileStatus: 1,   // 没有此限制条件时查全部状态的
        fileType: 3, // 1是图片 2是音频  3是视频
      }
      if (this.searchVideoValue == '') {
        delete query.fileName
      }
      this.getFiles(query).then((res) => {
        if (res.data.status == 0) {
          const data = res.data.data
          this.page3.pageSize = data.size
          this.page3.currentPage = data.current
          this.page3.total = data.total
          if (
            this.current1 == null ||
            this.current1 == undefined ||
            this.current1 == ''
          ) {
            this.currentTotal = data.total
            this.types1[0].total = data.total
          }
          data.records.forEach((item, index) => {
            item.rowEdit = false
            item.index = index
            item.channel = that.findAppByid(item.channelId, that.channelList)
            item.appName = that.findAppByid(item.enterpriseAccountAppId, that.appOptions)
            item.fileUploadSize = (item.fileUploadSize/1024/1024).toFixed(2) + 'MB'
          })
          this.tableData3 = data.records
        } else {
          this.$message({
            type: 'error',
            message: res.data.message,
            center: true,
          })
        }
        this.loading3 = false
      })
    },
    currentGroupSelectVideo(val) {
      this.current1 = this.types1[val].id
      this.page3.currentPage = 1
      this.getVideoList()
    },
    uploadVideo(item) {
      const formData = new FormData()
      formData.append('file', item.file)
      formData.append('enterpriseAccountAppId', this.appId3)
      formData.append('channelId', this.channel3)
      if (this.current1 != null) {
        formData.append('groupId', this.current1)
      }
      this.loading3 = true
      uploadFile(formData).then((res) => {
        if (res.data.status == 0) {
          this.$message({
            type: 'success',
            message: '上传成功!',
            center: true,
          })
          this.getVideoList()
          const timer = setTimeout(this.getGroupByTypes(), 3000)
          this.$once('hook:beforeDestroy', () => {
            clearInterval(timer)
          })
        } else {
          this.$message({
            type: res.data.status === 2 ? 'warning' : 'error',
            message: res.data.message,
            center: true,
          })
        }
        this.loading3 = false
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error,
          center: true,
        })
        this.loading3 = false
      })
    },
    // 改变视频分组
    changeVideoGroup(scope) {
      const query = {
        fileGroupId: this.currentMove.id,
        fileName: scope.row.fileName,
        id: scope.row.id,
      }
      updateFile(query)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '移动成功!',
              center: true,
            })
            this.getVideoList()
            this.getGroupByTypes()
          } else {
            this.$message({
              type: res.data.status === 2 ? 'warning' : 'error',
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
      scope._self.$refs[`popover2-${scope.$index}`].doClose()
    },
    // 取消改变视频分组
    cancleChangeVideoGroup(scope) {
      scope._self.$refs[`popover2-${scope.$index}`].doClose()
    },
    // 删除视频文件
    deleteVideoFile(val) {
      const query = {
        fileGroupDetailId: val.id,
      }
      deleteFileById(query)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '删除成功!',
              center: true,
            })
            this.getVideoList()
          } else {
            this.$message({
              type: res.data.status === 2 ? 'warning' : 'error',
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
    },
    deleteVideo(scope) {
      const query = {
        fileGroupDetailId: scope.row.id,
      }
      deleteFileById(query)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '删除成功!',
              center: true,
            })
            scope._self.$refs[`deleteVideo-${scope.$index}`].doClose()
            this.getVideoList()
          } else {
            this.$message({
              type: res.data.status === 2 ? 'warning' : 'error',
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
    },
    // 取消删除
    cancleDeleteVideoFile(scope) {
      scope._self.$refs[`deleteVideo-${scope.$index}`].doClose()
    },
    // 批量删除视频文件
    batchDeleteVideo() {
      this.$confirm('确定要删除选中的素材吗？', {
        cancelButtonText: "取 消",
          confirmButtonText: "确 定",
          confirmButtonClass:'btn-custom-confirm',
          closeOnClickModal:false,
          center:true
      })
        .then(() => {
          this.multipleSelection3.forEach((item) => {
            this.deleteVideoFile(item)
            this.getGroupByTypes()
          })
        })
        .catch(() => {})
    },
    // 批量移动视频
    batchChangeVideoGroup() {
      const tempArr = []
      this.multipleSelection3.forEach((item) => {
        tempArr.push(item.id)
      })
      const query = {
        groupId: this.currentMove.id,
        idList: tempArr,
      }
      if (this.currentMove.id == null) {
        delete query.groupId
      }
      this.batchMove(query)
        .then((res) => {
          if (res.status == 0) {
            this.$message({
              type: 'success',
              message: '移动成功!',
              center: true,
            })
          } else {
            this.$message({
              type: res.data.status === 2 ? 'warning' : 'error',
              message: res.message,
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
      this.getGroupByTypes()
      this.$refs.popover6.doClose()
    },
    batchCancleChangeVideoGroup() {
      this.$refs.popover6.doClose()
    },
    // 视频选择事件
    handleSelectionChange3(val) {
      this.multipleSelection3 = val
      this.selectNumber3 = val.length
      if (val.length > 0) {
        this.isShowTip3 = true
      } else {
        this.isShowTip3 = false
      }
    },
    // 搜索视频
    searchVideo() {
      // concole.log(this.searchVideoValue)
      this.getVideoList()
    },
    selectAllVideos(val) {
      if (val.length == this.tableData3.length) {
        this.isSelectAll = true
      } else {
        this.isSelectAll = false
      }
    },
    // 全选视频
    selectAllVideo() {
      this.$refs.table2.toggleAllSelection()
    },
    cancleSelectVideo() {
      this.multipleSelection3.forEach((item) => {
        this.$refs.table2.toggleRowSelection(item)
      })
      this.multipleSelection3 = []
    },
    // 视频表格页码
    handleSizeChange3(val) {
      this.page3.pageSize = val
      this.getVideoList()
    },
    handleCurrentChange3(val) {
      this.page3.currentPage = val
      this.getVideoList()
    },
    childChangeTypes3(val) {
      this.types3 = val
    },
    handleBeforeUpload3(file) {
      // return
      const allowUpload = [
        '3GP',
        'MP4',
        '3GPP',
        '3GPP2',
        '3gp',
        'mp4',
        '3gpp',
        '3gpp2',
      ]
      const type = file.name.slice(-3)
      if (allowUpload.indexOf(type) == -1) {
        this.$message({
          type: 'warning',
          message: '只能上传3GP、MP4格式的文件',
        })
        return false
      }
      const allowSize = file.size / 1024 / 1024
      if (allowSize > 2) {
        this.$message({
          type: 'warning',
          message: '上传的文件不能超过2M',
        })
        return false
      }
    },
    // 行内单击可编辑
    editFileName2(event, val) {
      this.tableData3[val.index].rowEdit = !this.tableData3[val.index].rowEdit
      this.$nextTick(() => {
        document.getElementById('#input2').focus()
      })
    },
    blurName2(event, val) {
      const query = {
        id: val.id,
        fileName: val.fileName,
      }
      this.tableData3[val.index].rowEdit = !this.tableData3[val.index].rowEdit
      updateFile(query)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message({
              type: 'success',
              message: '更新成功！',
              center: true,
            })
            this.getVideoList()
          } else {
            this.$message({
              type: res.data.status === 2 ? 'warning' : 'error',
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
      },
      //  确定上传文件
      determineUploadVedio(){
        this.dialogVisibleVedio = false
        const e = document.createEvent("MouseEvents");
        e.initEvent("click", true, true);
        const uploadPic  = document.getElementById("uploadVideo")
        uploadPic.dispatchEvent(e)
      },
      // 上传视频前的询问事件
      beforeUploadVideo() {
        this.dialogVisibleVedio = true
      },
      async initList(){
          await this.getChannelList()
          await this.getDataList()
          this.getPicTableList()
        //   await this.$nextTick(() => {
        //     this.getPicTableList()
        //   })
        // }
        // channelLists().then((res) => {
        //   if (res.data.status == 0) {
        //     const data = res.data.data
        //     data.forEach(item => {
        //       this.channelList.push({
        //         value: item.id,
        //         label: item.name
        //       })
        //     })
        //   } else {
        //     this.$message({
        //       type: 'error',
        //       message: res.data.message,
        //       center: true
        //     })
        //   }
        // })
        // this.$nextTick(() => {
        //   getAppLists()
        //   .then((res) => {
        //     if (res.data.status == 0) {
        //       const data = res.data.data
        //       data.forEach((item) => {
        //         const val = {}
        //         val.value = item.id
        //         val.label = item.name
        //         this.appOptions.push(val)
        //       })
        //       this.getPicTableList()
        //     } else {
        //     }
        //   })
        //   .catch((error) => {
        //   })
        // })

      }
  },
  mounted() {
    this.getGroupByTypes()
    // this.initList()
  },
  created() {
    this.initList()
  }
}
</script>
<style lang="less" scoped>
    #mediaHeader{
      width: 100%;
      height: 100%;
      padding: 0 70px;
      box-sizing: border-box;
      .title{
        font-size: 20px;
        box-sizing: border-box;
        padding: 40px 0 10px 0;
        color: #333333;
        font-family: Microsoft YaHei;
        font-weight: regular;
      }
      /deep/  .el-tabs__nav-scroll {
          overflow: hidden;
          // padding: 0 70px;
      }
      /deep/ .el-tabs__nav-wrap::after{
        background-color: #E5E5E5;
      }
      /deep/ .el-container {
        padding: 0 0;
      }
      .tab-content{
        padding: 20px 0px;
      }
      .type-tip{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .type-tip-right{
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: relative;
        .diyUpload{
          position: absolute;
          right: 0;
          z-index: 20;
        }
      }
      .type-tip-left{
        display: flex;
        align-items: center;
      }
      .type-tip-left-total{
        margin-right: 10px;
        padding: 2px 0;
      }
      .select-tip {
        height: 50px;
        line-height: 50px;
        margin-top: 30px;
        padding-left: 20px;
        background: #F8F8FB;
        display: flex;
        justify-content: space-between;
      }
      .select-tip-left{
        display: flex;
        justify-content: start;
        align-items: center;
        font-family: Microsoft YaHei;
        font-weight: regular;
        font-size: 12px;
        line-height: normal;
        letter-spacing: 0.75px;
        text-align: left;

      }
      .select-tip-left-item{
        margin-right: 20px;
        cursor: default;
      }
      .select-tip-right img:nth-child(1){
        margin-right: 8px;
      }
      .select-tip-right img:nth-child(2){
        margin-right: 20px;
      }
      .select-number{
        color: #999999;
      }
      .select-cancle{
        color: #FE9636;
      }
      .table-area{
        padding: 0;
        .picture-content{
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          padding: 0 2px;
          .img-box{
            width: 182px;
            height: 142px;
            margin-right: 20px;
            background: #F8F8FB;
            margin-bottom: 40px;
            position: relative;
            box-sizing: border-box;
            .file-select{
              display: none;
            }
            .file-more{
              display: none;
            }
            .filme-name{
              width: 182px;
              font-size: 12px;
              color: #666;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              text-align: center;
            }
            .file-mask{
              position: absolute;
              top: 0;
              left: 0;
              width: 182px;
              height: 142px;
              background: rgba(54,140,254,0.24);
              z-index: 9999;
            }
          }
          .img-box:hover {
            background: rgba(54,140,254,0.12);
            .file-select{
              display: block;
              position: absolute;
              top: 5px;
              left: 5px;
            }
            .file-more{
              position: absolute;
              top: 5px;
              right: 5px;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 99;

            }
          }
          .img-box-selected{
            width: 182px;
            height: 142px;
            margin-bottom: 40px;
            position: relative;
            margin-right: 20px;
            background: rgba(54,140,254,0.24);
            box-sizing: border-box;
            outline: 1px solid #368CFE;
            .file-select{
              display: block;
              position: absolute;
              top: 5px;
              left: 5px;
            }
            .file-more{
              position: absolute;
              top: 5px;
              right: 5px;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 99;
            }
            .filme-name{
              width: 182px;
              font-size: 12px;
              color: #666;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
        }
        .audio-content{
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          padding: 0 2px;
          .tile-audio{
            width: 304px;
            height: 110px;
            border: 1px solid #e5e5e5;
            border-radius: 5px;
            margin-bottom: 20px;
            margin-right: 15px;
            box-sizing: border-box;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            position: relative;
            .tile-audio-left{
              width: 40%;
              display: flex;
              font-size: 12px;
              color: #666666;
              flex-direction: column;
              justify-content: space-between;
              .filename{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
              }
            }
            .tile-audio-center{
              opacity: 0;
              width: 38%;
              display: flex;
              align-items: center;
              justify-content: center;
              img{
                cursor: pointer;
              }
            }
            .tile-audio-right{
              width: 30%;
              background: #f8f8f8;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .file-select{
              display: none;
            }
            .file-more{
              display: none;
            }
          }
          .tile-audio:hover{
            border: 1px solid #368CFE;
            .file-select{
              display: block;
              position: absolute;
              top: 5px;
              left: 5px;
            }
            .file-more{
              display: block;
              position: absolute;
              top: 5px;
              right: 5px;
            }
            .tile-audio-center{
              opacity: 1;
              width: 38%;
              display: flex;
              align-items: center;
              justify-content: center;
              img{
                cursor: pointer;
              }
            }
          }
          .tile-audio-selected{
            border: 1px solid #368CFE;
            background: rgba(54,140,254,0.12);
            .file-select{
              display: block;
              position: absolute;
              top: 5px;
              left: 5px;
            }
            .file-more{
              display: block;
              position: absolute;
              top: 5px;
              right: 5px;
            }
          }
        }

      }
      /deep/ .el-dialog__body {
        padding: 10px 30px;
      }
      /deep/ .el-dialog__footer{
        text-align: center;
      }
      /deep/ .el-dialog__header{
        border-bottom: 1px solid #e5e5e5;
        padding: 10px 20px;
      }
      /deep/ #header #mediaHeader .header .el-tabs__item+.is-active{
        background-color: none !important;
      }
      .manage-sort {
        color: #999999;
        font-family: Microsoft YaHei;
        font-weight: regular;
        font-size: 12px;
        line-height: normal;
        letter-spacing: 0.2px;
        text-align: left;
      }
      .pagination {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      /deep/ .el-tabs__nav-wrap::after{
        height: 1px;
      }
      /deep/ .el-tabs__active-bar{
        height: 1px;
      }
    }
    .operation-menu{
        width: 100%;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        text-align: center;
        div{
          width: 100%;
          height: 32px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        div:hover{
          background: #f5f5f5;
        }
      }
    .group-tile{
      .group-tile-item{
        float: left;
        border-radius: 20px;
        padding: 5px 10px;
        border: 1px solid transparent;
        margin-right: 12px;
        margin-bottom: 12px;
      }
      .group-tile-item:hover{
        float: left;
        border: 1px solid #368cfe;
        cursor: pointer;
        padding: 5px 10px;
        margin-right: 12px;
        margin-bottom: 12px;
      }
      .active{
        border: 1px solid #368cfe;
        color: #368cfe;
      }
      }
      .operation{
        margin-left: 10px;
        display: block;
        float: left;
        cursor: pointer;
        color: #409eff;
      }
</style>

<style>
  .my-popover{
    min-width: 90px !important;
    padding: 0;
  }
  .btn-custom-cancel {
    float: right;
    margin-left: 10px;
  }
  .el-message-box__btns{
    text-align: center;
  }
</style>
