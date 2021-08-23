<template>
  <div id="header">
    <div class="header">
      <div class="title">
        <div class="titleLeft">
          <el-button type="text" icon="el-icon-arrow-left" @click="handleBack">返回</el-button>
        </div>
        <div class="titleCenter">
          <ul>
            <li class="active">
              MMS短信
            </li>
          </ul>
        </div>
        <div class="titleRight">
          <el-button size="small" type="primary" @click="handleSave" :disabled="isConfirmAdd">保存并继续</el-button>
          <el-button size="small" class="buttonRight" type="primary" plain @click="handleSaveAndAudit" :disabled="isConfirmAdd">保存并提交核审</el-button>
        </div>
      </div>
      <div class="banner">
        <div class="grid-content bannerLeft">
          <div class="nav">
            <div class="navTitle">基础组件</div>
            <div class="navFoo">
              <dl v-for="(item, index) in List" :key="item.id" draggable="true" @dragstart="drag($event, index)" @click="handleClick(index)" :ref="'dl' + index">
                <dd><img :src="item.imgUrl" alt="" ref="imageUrl" /></dd>
                <dt :ref="'navFoo' + index">{{ item.content }}</dt>
              </dl>
            </div>
          </div>
        </div>
        <div class="grid-content bannerCenter">
          <div class="bannerCenterBoxR">
            <img :src="moduleImgUrl" alt="" /><span @click.stop="handleSet" :class="{ moduleactive: isModuleDisable }">模板设置</span>
          </div>
          <div ref="bannerCenterBoxT" class="bannerCenterBoxT" @click="handleFocus($event)" @drop="drop($event)" @dragover="allowDrop($event)">
            <div v-if="isShow">
              <div class="centerIcon">
                <img :src="centerImgUrl" alt="" />
              </div>
              <div v-if="isContent" class="centerText">
                <span>{{msg}}</span>
              </div>
            </div>
            <div class="descBox" v-else>
              <vuedraggable class="wrapper" v-model="items">
                <transition-group>
                  <div class="textBox" v-for="(item,index) in items" :key="'item' +index">
                    <div class="textMsg" v-if="item.type == 0">
                      <div class="msgLeft" :class="{boxactive: index == count}" @click="handleIndex(index)">{{item.content}}</div>
                      <div class="msgRight"> <img src="../../../assets/svg/delete_icon.svg" @click.stop="handleDelete(index)" alt=""></div>
                    </div>
                    <div class="imgMsg" v-if="item.type == 1">
                      <div class="msgLeft" :class="{boxactive: index == count}" @click="handleIndex(index)"><img :src="item.imgUrl" alt=""></div>
                      <div class="msgRight"> <img src="../../../assets/svg/delete_icon.svg" @click.stop="handleDelete(index)" alt=""></div>
                    </div>
                    <div class="audioMsg" v-if="item.type == 2">
                      <div class="msgLeft" :class="{boxactive: index == count}" @click="handleIndex(index)">
                        <audio :ref="'audio'+index" @ended="handleEnded(index)" @loadedmetadata="handleDuration(index)" @timeupdate="handlePlaying($event,index)" readyState>
                          <source :src="item.audioUrl" type="audio/mpeg" />
                          <source :src="item.audioUrl" type="audio/ogg">
                        </audio>
                        <div class="navI"><img src="../../../assets/images/icon-32px-音频@1x-1.png" alt=""></div>
                        <div class="navB"><img @click="handlePlay(index)" :src="item.audioPlayUrl" alt="">
                          <img @click="item.isSlider = !item.isSlider" src="../../../assets/images/icon-24px-音量@1x.png" alt="">
                        </div>
                        <hr color="#e5e5e5">
                        <div class="navBB"><span>{{ item.currentTime }}</span><span>{{ item.duration }}</span></div>
                        <el-slider v-if="item.isSlider" v-model="item.voiceValue" @input="handleSlider(index)" vertical height="40px"></el-slider>
                      </div>
                      <div class="msgRight"> <img src="../../../assets/svg/delete_icon.svg" @click.stop="handleDelete(index)" alt=""></div>
                    </div>                                                                                                                  
                    <div class="videoMsg" v-if="item.type == 3">
                      <div class="msgLeft" :class="{boxactive: index == count}" @click="handleIndex(index)">
                        <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="item.playerOptions"></video-player>
                      </div>
                      <div class="msgRight"> <img src="../../../assets/svg/delete_icon.svg" @click.stop="handleDelete(index)" alt=""></div>
                    </div>
                  </div>
                </transition-group>
              </vuedraggable>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="isRightModule">
          <div class="navTitle">模板设置</div>
          <div class="bannerRightMsg">
            <div class="navName">*模板名称</div>
            <div class="navInput">
              <el-input v-model="form.name" size="small" placeholder="请输入" maxlength="20" clearable></el-input>
              <span>不超过20个汉字/英文字母/数字</span>
            </div>
            <div class="navBlock">*业务类型</div>
            <div class="navInput">
              <el-select v-model="form.businessType" size="small" placeholder="请选择" @change="handleChangeGetApp">
                <el-option v-for="item in businessOptions" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="navBlock">*模板类型</div>
            <div class="navInput">
              <el-select v-model="form.msgType" size="small" placeholder="请选择">
                <el-option v-for="item in msgOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="navBlock">*选择应用</div>
            <div class="navInput">
              <el-select v-model="form.app" size="small" placeholder="请选择">
                <el-option v-for="item in appOptions" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="navBlock">*签名</div>
            <div class="navInput">
              <el-select v-model="form.signature" size="small" placeholder="请选择">
                <el-option v-for="item in signatureOptions" :key="item.signId" :label="item.signName" :value="item.signName">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-else>
          <div v-for="(item,index) in items" :key="item.id">
            <div v-if="item.type == 0 && count == index && form.msgType == 6">
              <div class="navTitle">内容文本</div>
              <div class="bannerRightMsg">
                <span class="msgYes">添加内容</span>
                <div class="msgMain">
                  <el-input type="textarea" placeholder="在此输入文本内容…" v-model="item.content" maxlength="9999" show-word-limit @focus="handleInput"></el-input>
                </div>
              </div>
            </div>
            <div v-if="item.type == 0 && count == index && form.msgType == 7">
              <div class="navTitle">内容文本</div>
              <div class="bannerRightMsg">
                <span class="msgYes">
                  <el-button size="small" @click="handleAddChange(index)" type="primary">添加变量</el-button>
                </span>
                <div class="msgMain2">
                  <el-input type="textarea" :ref="'targetIn' + index" placeholder="在此输入文本内容…" v-model="item.content" maxlength="9999" show-word-limit @focus="handleInputChange"></el-input>
                </div>
              </div>
            </div>
            <div v-if="item.type == 1 && count == index">
              <div class="navTitle">图片文件</div>
              <div class="bannerRightMsg">
                <div class="navBlock">添加图片</div>
                <div class="navBlock"><span>支持JPG、PNG、GIF、BMP格式，最大为2M</span></div>
                <div class="navInput">
                  <div @click="handleNavButton(index,item.type)" class="navButton">
                    <i class="el-icon-plus"></i>
                  </div>
                </div>
                <div class="navBlock">缩略图URL</div>
                <div class="navInput">
                  <el-input v-model="item.imgUrl" size="small" placeholder="http://" clearable></el-input>
                </div>
                <div class="navBlock">缩略图类型</div>
                <div class="navInput">
                  <el-input v-model="item.imgType" size="small" placeholder="image/" clearable></el-input>
                </div>
              </div>
            </div>
            <div v-if="item.type == 2 && count == index">
              <div class="navTitle">音频文件</div>
              <div class="bannerRightMsg">
                <div class="navBlock">添加音频</div>
                <div class="navBlock navBlockTwo"><span>支持3GP，MP3，M4A，AAC，AMR格式，最大为2M</span></div>
                <div class="navInput">
                  <div @click="handleNavButton(index,item.type)" class="navButton">
                    <i class="el-icon-plus"></i>
                  </div>
                </div>
                <div class="navBlock">音频URL</div>
                <div class="navInput">
                  <el-input v-model="item.audioUrl" size="small" placeholder="http://" clearable></el-input>
                </div>
                <div class="navBlock">音频类型</div>
                <div class="navInput">
                  <el-input v-model="item.audioType" size="small" placeholder="image/" clearable></el-input>
                </div>
              </div>
            </div>
            <div v-if="item.type == 3 && count == index">
              <div class="navTitle">视频文件</div>
              <div class="bannerRightMsg">
                <div class="navBlock">添加视频</div>
                <div class="navBlock"><span>支持3GP、MP4格式，最大为2M</span></div>
                <div class="navInput">
                  <div @click="handleNavButton(index,item.type)" class="navButton">
                    <i class="el-icon-plus"></i>
                  </div>
                </div>
                <div class="navBlock">视频URL</div>
                <div class="navInput">
                  <el-input v-model="item.playerOptions.sources[0].src" size="small" placeholder=" http://www.castelbds.com/…" clearable></el-input>
                </div>
                <div class="navBlock">视频类型</div>
                <div class="navInput">
                  <el-input v-model="item.videoType" size="small" placeholder=" video/" clearable></el-input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="MessageBox" v-if="dialogVisible">
        <div class="MessageBoxBanner" v-if="this.type == 1">
          <div class="MessageBoxTitle">
            <div class="titleLeft">选择图片</div>
            <div class="titleRight">
              <i @click="dialogVisible = false" class="el-icon-close"></i>
            </div>
          </div>
          <div class="MessageBoxLeft">
            <div class="MessageBoxLeftT">
              <ul>
                <li v-for="(item,index) in groupsList" :key="item.id" :class="{ groupsListactive: index == isDisableGroupsList }" @click="handleGroupsList(index,item.id)">{{ item.name }}
                  ({{ item.total }})</li>
              </ul>
            </div>
            <div class="MessageBoxLeftB">
              已选择 <span> {{ countNum }} / 1 项</span>
            </div>
          </div>
          <div class="MessageBoxRight">
            <div class="MessageBoxRightT">
              <div class="MessageBoxRightTT">
                <el-checkbox-group v-model="checkbox" :max="1">
                  <el-checkbox v-for="item in groupsImageList" :key="item.id" border :label="item.id">
                    <div class="checkboxImage">
                      <el-image style="width: 112px; height: 112px" :src="item.fileUrl" fit="contain">
                      </el-image>
                    </div>
                    <div class="MessageBoxRightTTName"><span>{{item.fileName}}</span></div>
                  </el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="MessageBoxRightTB">
                <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentpage" :page-size="18" background layout="prev, pager, next" :total="total">
                </el-pagination>
              </div>
            </div>
            <div class="MessageBoxRightB">
              <el-button type="primary" @click="confirmImage" size="small">确定</el-button>
              <el-button size="small" @click="cancle">取消</el-button>
            </div>
          </div>
        </div>
        <div class="MessageBoxBannerN" v-if="this.type == 2">
          <div class="MessageBoxTitle">
            <div class="titleLeft">选择音频</div>
            <div class="titleRight">
              <i @click="dialogVisible = false" class="el-icon-close"></i>
            </div>
          </div>
          <div class="MessageBoxMain">
            <div class="MessageBoxMainT">
              <el-checkbox-group v-model="checkbox" :max="1">
                <el-checkbox v-for="(item,index) in groupsAudioList" :key="item.id" border :label="item.id">
                  <audio ref="audioList" @canplay="handleDurations" preload readyState>
                    <source :src="item.fileUrl" type="audio/mpeg" />
                  </audio>
                  <div class="MessageBoxMainTAudio">
                    <div><img src="../../../assets/images/icon-14px-音频@1x.png" alt=""></div>
                    <div><span>{{audioTimeList[index]}}</span></div>
                  </div>
                  <div class="MessageBoxMainTName"><span>{{item.updateTime}}</span><span>{{item.fileName}}</span></div>
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="MessageBoxMainB">
              <el-pagination @current-change="handleCurrentChange" :page-size="4" background layout="prev, pager, next" :total="total">
              </el-pagination>
            </div>
          </div>
          <div class="MessageBoxBottom">
            <div class="MessageBoxBottomL">
              已选择 <span> {{ countNum }} / 1 项</span>
            </div>
            <div class="MessageBoxBottomR">
              <el-button type="primary" @click="confirmAudio" size="small">确定</el-button>
              <el-button size="small" @click="cancle">取消</el-button>
            </div>
          </div>
        </div>
        <div class="MessageBoxBannerN" v-if="this.type == 3">
          <div class="MessageBoxTitle">
            <div class="titleLeft">选择视频</div>
            <div class="titleRight">
              <i @click="dialogVisible = false" class="el-icon-close"></i>
            </div>
          </div>
          <div class="MessageBoxMain">
            <div class="MessageBoxMainT">
              <el-checkbox-group v-model="checkbox" :max="1">
                <el-checkbox v-for="item in groupsVideoList" :key="item.id" border :label="item.id">
                  <div class="MessageBoxMainTVideo">
                    <div><img src="../../../assets/images/icon-160px-shiping@1x.png" alt=""></div>
                    <div><span><i class="el-icon-caret-right"></i>00:07</span></div>
                  </div>
                  <div class="MessageBoxMainTVideoName"><span>{{item.updateTime}}</span><span>{{item.fileName}}</span></div>
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="MessageBoxMainB">
              <el-pagination @current-change="handleCurrentChange" :page-size="4" background layout="prev, pager, next" :total="total">
              </el-pagination>
            </div>
          </div>
          <div class="MessageBoxBottom">
            <div class="MessageBoxBottomL">
              已选择 <span> {{ countNum }} / 1 项</span>
            </div>
            <div class="MessageBoxBottomR">
              <el-button type="primary" @click="confirmVideo" size="small">确定</el-button>
              <el-button size="small" @click="cancle">取消</el-button>
            </div>
          </div>
        </div>
      </div>
      </div>
      
    </div>
  </div>
</template>
<script>
import index from './index'
export default index
</script>
<style lang="less" scoped>
@import './index.less';
</style>