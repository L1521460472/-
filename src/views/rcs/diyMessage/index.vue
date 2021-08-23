<template>
  <div id="header">
    <div class="header">
      <div class="title">
        <div class="titleLeft">
          <el-button type="text" icon="el-icon-arrow-left" @click="handleBack">返回</el-button>
        </div>
        <div class="titleCenter">
          <ul ref="ulLi">
            <li :class="{ active: isDisable }" @click="btn($event)">
              UP2.4消息
            </li>
            <li v-if="isUP" @click="btn($event)">UP1.0消息</li>
            <li v-if="isSMS" @click="btn($event)">SMS消息</li>
          </ul>
        </div>
        <div class="titleRight">
          <el-button size="small" type="primary" v-if="msgValue == 2" @click="handleSaveCard" :disabled="isConfirmAdd">保存并继续</el-button>
          <el-button size="small" type="primary" v-else @click="handleSave" :disabled="isConfirmAdd">保存并继续</el-button>
          <el-button size="small" class="buttonRight" type="primary" v-if="msgValue == 2" plain @click="handleSaveAndAuditCard" :disabled="isConfirmAdd">保存并提交核审</el-button>
          <el-button size="small" class="buttonRight" type="primary" v-else plain @click="handleSaveAndAudit" :disabled="isConfirmAdd">保存并提交核审</el-button>
        </div>
      </div>
      <div class="banner">
        <div class="grid-content bannerLeft">
          <div class="nav">
            <div class="navTitle">基础组件</div>
            <div class="navFoo">
              <dl v-for="(item, index) in topList" :key="item.id" draggable="true" @dragstart="drag($event, index)" :ref="'dl' + index">
                <dd><img :src="item.imgUrl" alt="" ref="imageUrl" /></dd>
                <dt :ref="'navFoo' + index">{{ item.content }}</dt>
              </dl>
            </div>
          </div>
          <div class="nav" v-if="buttonValue">
            <div class="navTitle">菜单按钮</div>
            <div class="navFoo">
              <dl v-for="(items, index) in footerList" :key="items.id" draggable="true" @dragstart="dragF($event, index)">
                <dd><img :src="items.imgUrl" alt="" /></dd>
                <dt>{{ items.content }}</dt>
              </dl>
            </div>
          </div>
        </div>
        <div class="grid-content bannerCenter" @click.self="handleModule">
          <div ref="bannerCenterBoxT" class="bannerCenterBoxT" :class="{ boxactive: isBosDisable }" @click="handleFocus($event)" @drop="drop($event)" @dragover="allowDrop($event)">
            <div class="centerIcon">
              <img :src="centerImgUrl" alt="" />
            </div>
            <div v-if="isContent" class="centerText">
              <span>{{msg}}</span>
            </div>
          </div>
          <div id="bannerCenterBoxTT" class="bannerCenterBoxTT" v-if="isBoxTT" :class="{ boxactive: isBosDisable }">
            <div class="bannerCenterBoxTTText" @click="type = 3;isBosDisable = true;isTitleDisable = false;isContentDisable = false;" v-if="istype3">
              <div>{{ form.desc }}</div>
            </div>
            <div class="bannerCenterBoxTTText" @click="type = 41;isBosDisable = true;isTitleDisable = false;isContentDisable = false;" v-if="istype41">
              <div>{{ form.descChange }}</div>
            </div>
            <div class="bannerCenterBoxTTImage" @click="type = 8;isBosDisable = true;isTitleDisable = false;isContentDisable = false;" v-if="istype8">
              <!-- <img :src="imageUrl" class="avatar"> -->
              <el-image style="width: 375px; height: 212px" :src="imageUrl" fit="fill">
              </el-image>
              <img class="bannerCenterBoxTTDelete" @click="handleDeleted" src="../../../assets/images/icon-删除@1x-3.png" alt="">
            </div>
            <div class="bannerCenterBoxTTImage" @click="type = 9;isBosDisable = true;isTitleDisable = false;isContentDisable = false;" v-if="istype9">
              <audio ref="audio" @ended="handleEnded" @loadedmetadata="handleDuration" @timeupdate="handlePlaying" preload readyState>
                <source :src="audioUrl" type="audio/mpeg" />
              </audio>
              <div class="navI"><img src="../../../assets/images/icon-32px-音频@1x-1.png" alt=""></div>
              <div class="navB"><img @click="handlePlay" :src="audioImgUrl" alt=""><img @click="isSlider = !isSlider" src="../../../assets/images/icon-24px-音量@1x.png" alt=""></div>
              <hr color="#e5e5e5">
              <div class="navBB"><span>{{ currentTime }}</span><span>{{ duration }}</span></div>
              <el-slider v-if="isSlider" v-model="voiceValue" @input="handleSlider" vertical height="50px"></el-slider>
              <img class="bannerCenterBoxTTDelete" @click="handleDeleted" src="../../../assets/images/icon-删除@1x-3.png" alt="">
            </div>
            <div class="bannerCenterBoxTTImage" @click="type = 10;isBosDisable = true;isTitleDisable = false;isContentDisable = false;" v-if="istype10">
              <div class='demo'>
                <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions">
                </video-player>
              </div>
              <img class="bannerCenterBoxTTDelete" @click="handleDeleted" src="../../../assets/images/icon-删除@1x-3.png" alt="">
            </div>
          </div>
          <div id="bannerCenterBoxTT" class="bannerCenterBoxTT" v-if="isBoxTTOne" :class="{ boxactive: isBosDisable }">
            <div class="bannerCenterBoxTTText" @click="type = 18;isBosDisable = true;isTitleDisable = false;isContentDisable = false;" v-if="istype18">
              <div>{{ form.descOne }}</div>
            </div>
            <div class="bannerCenterBoxTTText" @click="type = 42;isBosDisable = true;isTitleDisable = false;isContentDisable = false;" v-if="istype42">
              <div>{{ form.descChangeOne }}</div>
            </div>
            <div class="bannerCenterBoxTTImage" @click="type = 19;isBosDisable = true;isTitleDisable = false;isContentDisable = false;" v-if="istype19">
              <!-- <img :src="imageUrl" class="avatar"> -->
              <el-image style="width: 375px; height: 212px" :src="imageUrlOne" fit="fill">
              </el-image>
              <img class="bannerCenterBoxTTDelete" @click="handleDeletedOne" src="../../../assets/images/icon-删除@1x-3.png" alt="">
            </div>
            <div class="bannerCenterBoxTTImage" @click="type = 20;isBosDisable = true;isTitleDisable = false;isContentDisable = false;" v-if="istype20">
              <audio ref="audioOne" @ended="handleEndedOne" @loadedmetadata="handleDurationOne" @timeupdate="handlePlayingOne" preload readyState>
                <source :src="audioUrlOne" type="audio/mpeg" />
              </audio>
              <div class="navI"><img src="../../../assets/images/icon-32px-音频@1x-1.png" alt=""></div>
              <div class="navB"><img @click="handlePlayOne" :src="audioImgUrl" alt=""><img @click="isSlider = !isSlider" src="../../../assets/images/icon-24px-音量@1x.png" alt=""></div>
              <hr color="#e5e5e5">
              <div class="navBB"><span>{{ currentTimeOne }}</span><span>{{ durationOne }}</span></div>
              <el-slider v-if="isSlider" v-model="voiceValue" @input="handleSliderOne" vertical height="50px"></el-slider>
              <img class="bannerCenterBoxTTDelete" @click="handleDeletedOne" src="../../../assets/images/icon-删除@1x-3.png" alt="">
            </div>
            <div class="bannerCenterBoxTTImage" @click="type = 21;isBosDisable = true;isTitleDisable = false;isContentDisable = false;" v-if="istype21">
              <div class='demo'>
                <video-player class="video-player vjs-custom-skin" ref="videoPlayerOne" :playsinline="true" :options="playerOptionsOne">
                </video-player>
              </div>
              <img class="bannerCenterBoxTTDelete" @click="handleDeletedOne" src="../../../assets/images/icon-删除@1x-3.png" alt="">
            </div>
          </div>
          <div id="bannerCenterBoxTT" class="bannerCenterBoxTT" v-if="isBoxTTSMS" :class="{ boxactive: isBosDisable }">
            <div class="bannerCenterBoxTTText" @click="type = 22;isBosDisable = true;isTitleDisable = false;isContentDisable = false;" v-if="istype22">
              <div>{{ form.descSMS }}</div>
            </div>
            <div class="bannerCenterBoxTTText" @click="type = 43;isBosDisable = true;isTitleDisable = false;isContentDisable = false;" v-if="istype43">
              <div>{{ form.descChangeSMS }}</div>
            </div>
          </div>
          <!-- <div id="bannerCenterBoxTT" class="bannerCenterBoxTT" v-if="isBoxTTSMS" :class="{ boxactive: isBosDisable }">
            
          </div> -->
          <div v-if="isTemplateShow" class="bannerCenterBoxR">
            <img :src="moduleImgUrl" alt="" /><span @click.stop="handleSet" :class="{ moduleactive: isModuleDisable }">模板设置</span>
            <div class="cardBox" v-if="isCardShow">
              <img :src="moduleCardImgUrl" alt="" /><span @click.stop="handleCardSet" :class="{ moduleCardactive: isModuleCardDisable }">卡片管理</span>
            </div>
          </div>
          <div class="bannerCenterBoxTitle" @click="handleCardTitle" v-if="isCard">
            <span v-if="isCardTitle">点击编辑标题</span>
            <div class="bannerCenterBoxTitleContent" :class="{ cardTitleactive: isTitleDisable }" v-if="istype16">
              <div>{{form.cardTitleValue}}</div>
            </div>
          </div>
          <div class="bannerCenterBoxmain" @click="handleCardContent" v-if="isCard">
            <span v-if="isCardContent">点击编辑内容</span>
            <div class="bannerCenterBoxmainContent" :class="{ cardContentactive: isContentDisable }" v-if="istype17">
              <div>{{form.cardContentValue}}</div>
            </div>
          </div>
          <div class="bannerCenterBoxCardBT" v-if="isCard">
            <span>附带卡片内置按钮</span>
          </div>
          <div class="bannerCenterBoxCardIcon" v-if="!isCardButtonText"><img @click="handleCardDelete" src="../../../assets/images/icon-删除@1x-3.png" alt=""></div>
          <div class="bannerCenterBoxCardBotton" v-if="isCard" :class="{ cardButtonactive: isCardButtonDisable }" @click="handleFocusCardBtn" @drop="dropM($event)" @dragover="allowDropM($event)">
            <span v-if="isCardButtonText">拖拽菜单按钮至此</span>
            <div class="bannerCenterBoxCardBtn" v-if="!isCardButtonText">
              <el-button plain v-for="(itemBtn,index) in cardButtonList" :key="itemBtn+index" size="mini" @click.stop="handleCardBtn(itemBtn)">
                <span>{{itemBtn.title}}</span>
              </el-button>
            </div>
          </div>
          <div ref="button1" class="bannerCenterBoxText" v-if="buttonValue">
            <span>附带屏幕底部悬浮菜单</span>
          </div>
          <div ref="button2" class="bannerCenterBoxIcon" v-if="!isButtonText"><img @click="handleDelete" src="../../../assets/images/icon-删除@1x-3.png" alt=""></div>
          <div ref="button3" class="bannerCenterBoxF" :class="{ buttonactive: isButtonDisable }" v-if="buttonValue" @click="handleFocusBtn" @drop="dropF($event)" @dragover="allowDropF($event)">
            <span v-if="isButtonText">拖拽菜单按钮至此</span>
            <div class="bannerCenterBoxFBtn" v-if="!isButtonText">
              <el-button plain v-for="(itemBtns, index) in buttonList" :key="index+'333'" size="mini" @click.stop="handleBtn(index,itemBtns)">{{ itemBtns.title }}</el-button>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 1">
          <div class="navTitle">模板设置</div>
          <div class="bannerRightMsg">
            <div class="navName">*模板名称</div>
            <div class="navInput">
              <el-input v-model="form.name" size="small" placeholder="请输入" maxlength="20" clearable></el-input>
              <span>不超过20个汉字/英文字母/数字</span>
            </div>
            <div class="navBlock">*业务类型</div>
            <div class="navInput">
              <el-select v-model="businessValue" size="small" placeholder="请选择" @change="handleChangeGetApp"><!--  @change="handleApp" -->
                <el-option v-for="item in businessOptions" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="navBlock">*模板类型</div>
            <div class="navInput">
              <el-select v-model="msgValue" size="small" placeholder="请选择" @change="handleChangeVal">
                <el-option v-for="item in msgOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="navBlock">*选择应用</div>
            <div class="navInput">
              <el-select v-model="appValue" size="small" placeholder="请选择"><!--  @change="handleApp" -->
                <el-option v-for="item in appOptions" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <!-- <div class="navBlock">*选择通道</div>
            <div class="navInput">
              <el-select v-model="channelValue" size="small" placeholder="请选择">
                <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </div> -->
            <div class="navBlock">悬浮菜单</div>
            <div class="navInput">
              <el-switch v-model="buttonValue" inactive-text="开启悬浮菜单" :disabled="isOpen">
              </el-switch>
            </div>
            <!-- <div class="navBlock">消息回落</div>
            <div class="navInput">
              <el-switch v-model="msgBackValue" inactive-text="开启消息回落" @change="handleMsgBack">
              </el-switch>
            </div> -->
            <!-- <hr v-if="msgBackValue" color="#e5e5e5" />
            <div class="cheblock" v-if="msgBackValue">
              <el-checkbox-group v-model="checkList" @change="handleChange">
                <el-checkbox label="回落到UP1.0"></el-checkbox>
                <el-checkbox label="回落到SMS"></el-checkbox>
              </el-checkbox-group>
            </div> -->
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 2">
          <div class="navTitle">{{msgT}}</div>
          <div class="bannerRightMsg"><span class="msgNo">{{msgN}}</span></div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 3">
          <div class="navTitle">内容文本</div>
          <div class="bannerRightMsg">
            <span class="msgYes">添加内容</span>
            <div class="msgMain">
              <el-input type="textarea" placeholder="在此输入文本内容…" v-model="form.desc" maxlength="9999" show-word-limit @focus="handleInput"></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 4">
          <div class="navTitle">悬浮菜单</div>
          <div class="bannerRightMsg">
            <span class="msgYes">拖拽进行排序</span>
            <span @click="handleDelete" class="msgYesR">清除组件</span>
            <div class="msgMain">
              <vuedraggable class="wrapper" v-model="buttonList">
                <transition-group>
                  <div v-for="(item,index) in buttonList" :key="item.title + index" class="item">
                    <img src="../../../assets/images/icon-拖拽@1x.png" alt="" />
                    <div>{{ item.title }}</div>
                    <!-- <img src="../../../assets/icon-删除@1x.png" alt="" /> -->
                    <el-button @click.stop="Delete(index)" plain icon="el-icon-delete"></el-button>
                  </div>
                </transition-group>
              </vuedraggable>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 5">
          <div class="navTitle">回复消息</div>
          <div class="bannerRightMsg">
            <div class="navBlock">显示文本</div>
            <div class="navInput">
              <el-input v-model="form.showTextMsg1" size="small" placeholder="回复" maxlength="12" clearable></el-input>
            </div>
            <div class="navBlock">回复文本</div>
            <div class="navInput">
              <el-input v-model="form.backTextMsg1" size="small" placeholder="Reply" maxlength="12" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 6">
          <div class="navTitle">打开链接</div>
          <div class="bannerRightMsg">
            <div class="navBlock">显示文本</div>
            <div class="navInput">
              <el-input v-model="form.showTextLink1" size="small" placeholder="访问链接" maxlength="12" clearable></el-input>
            </div>
            <div class="navBlock">链接地址</div>
            <div class="navInput">
              <el-input v-model="form.LinkAddress1" size="small" placeholder="http://" maxlength="256" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 7">
          <div class="navTitle">拨打电话</div>
          <div class="bannerRightMsg">
            <div class="navBlock">显示文本</div>
            <div class="navInput">
              <el-input v-model="form.showTextPhone1" size="small" placeholder="拨打电话" maxlength="12" clearable></el-input>
            </div>
            <div class="navBlock">电话号码</div>
            <div class="navInput">
              <el-input v-model="form.phoneNumber1" oninput = "value=value.replace(/[^\d]/g, '')" size="small" placeholder="输入号码" maxlength="15" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 8">
          <div class="navTitle">图片文件</div>
          <div class="bannerRightMsg">
            <div class="navBlock">添加图片</div>
            <div class="navBlock"><span>支持JPG、PNG、GIF、BMP格式，最大为20M</span></div>
            <div class="navInput">
              <div @click="handleNavButton" class="navButton">
                <i class="el-icon-plus"></i>
              </div>
            </div>
            <div class="navBlock">缩略图URL</div>
            <div class="navInput">
              <el-input v-model="form.textImgUrl" size="small" placeholder="http://" clearable></el-input>
            </div>
            <div class="navBlock">缩略图类型</div>
            <div class="navInput">
              <el-input v-model="form.textImgType" size="small" placeholder="image/" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 9">
          <div class="navTitle">音频文件</div>
          <div class="bannerRightMsg">
            <div class="navBlock">添加音频</div>
            <div class="navBlock navBlockTwo"><span>支持3GP，MP3，M4A，AAC，AMR格式，最大为20M</span></div>
            <div class="navInput">
              <div @click="handleNavButton" class="navButton">
                <i class="el-icon-plus"></i>
              </div>
            </div>
            <div class="navBlock">音频URL</div>
            <div class="navInput">
              <el-input v-model="form.textAudioUrl" size="small" placeholder="http://" clearable></el-input>
            </div>
            <div class="navBlock">音频类型</div>
            <div class="navInput">
              <el-input v-model="form.textAudioType" size="small" placeholder="image/" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 10">
          <div class="navTitle">视频文件</div>
          <div class="bannerRightMsg">
            <div class="navBlock">添加视频</div>
            <div class="navBlock"><span>支持3GP、MP4格式，最大为20M</span></div>
            <div class="navInput">
              <div @click="handleNavButton" class="navButton">
                <i class="el-icon-plus"></i>
              </div>
            </div>
            <div class="navBlock">视频URL</div>
            <div class="navInput">
              <el-input v-model="form.textVideoUrl" size="small" placeholder=" http://www.castelbds.com/…" clearable></el-input>
            </div>
            <div class="navBlock">视频类型</div>
            <div class="navInput">
              <el-input v-model="form.textVideoType" size="small" placeholder=" video/" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 11">
          <div class="navTitle">卡片管理</div>
          <div class="bannerRightMsg">
            <span class="msgYes">卡片列表</span>
            <!-- <span @click="handleDelete" class="msgYesR">清除组件</span> -->
            <div class="msgMain">
              <vuedraggable class="wrapper" v-model="cardList">
                <transition-group>
                  <li ref="wrapper" :class="{itemLast:index == cardCount}" @click="handleCard(index)" v-for="(item,index) in cardList" :key="item.id" class="item">
                    <img src="../../../assets/images/icon-拖拽@1x.png" alt="" />
                    <div>{{ item.title }}</div>
                    <!-- <img @click.stop="cardDelete(index)" src="../../../assets/icon-删除@1x.png" alt="" /> -->
                    <el-button @click.stop="cardManagementDelete(index,item.id)" plain icon="el-icon-delete"></el-button>
                    <!-- <el-button @click.stop="handleEdit(item)" plain icon="el-icon-edit-outline"></el-button> -->
                  </li>
                </transition-group>
              </vuedraggable>
              <div class="addCard" @click="handleAddCard">
                <i class="el-icon-circle-plus-outline"></i>
                <span>新建卡片</span>
              </div>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 12">
          <div class="navTitle">卡片按钮</div>
          <div class="bannerRightMsg">
            <span class="msgYes">菜单组件</span>
            <span @click="handleCardDelete" class="msgYesR">清除组件</span>
            <div class="msgMain">
              <vuedraggable class="wrapper" v-model="cardButtonList">
                <transition-group>
                  <div v-for="(item,index) in cardButtonList" :key="index+2222" class="item">
                    <img src="../../../assets/images/icon-拖拽@1x.png" alt="" />
                    <!-- <div><span v-if="item.reply">{{ item.reply.displayText }}</span></div>
                    <div><span v-if="item.action">{{ item.action.displayText }}</span></div> -->
                    <div><span>{{ item.title }}</span></div>
                    <!-- <img src="../../../assets/icon-删除@1x.png" alt="" /> -->
                    <el-button @click.stop="cardDelete(index)" plain icon="el-icon-delete"></el-button>
                  </div>
                </transition-group>
              </vuedraggable>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 13">
          <div class="navTitle">回复消息</div>
          <div class="bannerRightMsg">
            <div class="navBlock">显示文本</div>
            <div class="navInput">
              <el-input v-model="form.cardShowTextMsg1" size="small" placeholder="回复" maxlength="12" clearable></el-input>
            </div>
            <div class="navBlock">回复文本</div>
            <div class="navInput">
              <el-input v-model="form.cardBackTextMsg1" size="small" placeholder="Reply" maxlength="12" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 14">
          <div class="navTitle">打开链接</div>
          <div class="bannerRightMsg">
            <div class="navBlock">显示文本</div>
            <div class="navInput">
              <el-input v-model="form.cardShowTextLink1" size="small" placeholder="访问链接" maxlength="12" clearable></el-input>
            </div>
            <div class="navBlock">链接地址</div>
            <div class="navInput">
              <el-input v-model="form.cardLinkAddress1" size="small" placeholder="http://" maxlength="256" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 15">
          <div class="navTitle">拨打电话</div>
          <div class="bannerRightMsg">
            <div class="navBlock">显示文本</div>
            <div class="navInput">
              <el-input v-model="form.cardShowTextPhone1" size="small" placeholder="拨打电话" maxlength="12" clearable></el-input>
            </div>
            <div class="navBlock">电话号码</div>
            <div class="navInput">
              <el-input v-model="form.cardPhoneNumber1" oninput = "value=value.replace(/[^\d]/g, '')" size="small" placeholder="输入号码" maxlength="15" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 16">
          <div class="navTitle">标题文本</div>
          <div class="bannerRightMsg">
            <span class="msgYes">添加标题</span>
            <div class="msgMain1">
              <el-input type="textarea" class="textarea" placeholder="在此输入标题" maxlength="64" show-word-limit v-model="form.cardTitleValue"></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 17">
          <div class="navTitle">内容文本</div>
          <div class="bannerRightMsg">
            <span class="msgYes">添加内容</span>
            <div class="msgMain">
              <el-input type="textarea" placeholder="在此输入文本内容…" maxlength="1000" show-word-limit v-model="form.cardContentValue"></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 18">
          <div class="navTitle">内容文本</div>
          <div class="bannerRightMsg">
            <span class="msgYes">添加内容</span>
            <div class="msgMain">
              <el-input type="textarea" placeholder="在此输入文本内容…" v-model="form.descOne" maxlength="9999" show-word-limit @focus="handleInputOne"></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 19">
          <div class="navTitle">图片文件</div>
          <div class="bannerRightMsg">
            <div class="navBlock">添加图片</div>
            <div class="navBlock"><span>支持JPG、PNG、GIF、BMP格式，最大为20M</span></div>
            <div class="navInput">
              <div @click="handleNavButton" class="navButton">
                <i class="el-icon-plus"></i>
              </div>
            </div>
            <div class="navBlock">缩略图URL</div>
            <div class="navInput">
              <el-input v-model="form.textImgUrlOne" size="small" placeholder="http://" clearable></el-input>
            </div>
            <div class="navBlock">缩略图类型</div>
            <div class="navInput">
              <el-input v-model="form.textImgTypeOne" size="small" placeholder="image/" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 20">
          <div class="navTitle">音频文件</div>
          <div class="bannerRightMsg">
            <div class="navBlock">添加音频</div>
            <div class="navBlock navBlockTwo"><span>支持3GP，MP3，M4A，AAC，AMR格式，最大为20M</span></div>
            <div class="navInput">
              <div @click="handleNavButton" class="navButton">
                <i class="el-icon-plus"></i>
              </div>
            </div>
            <div class="navBlock">音频URL</div>
            <div class="navInput">
              <el-input v-model="form.textAudioUrlOne" size="small" placeholder="http://" clearable></el-input>
            </div>
            <div class="navBlock">音频类型</div>
            <div class="navInput">
              <el-input v-model="form.textAudioTypeOne" size="small" placeholder="image/" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 21">
          <div class="navTitle">视频文件</div>
          <div class="bannerRightMsg">
            <div class="navBlock">添加视频</div>
            <div class="navBlock"><span>支持3GP、MP4格式，最大为20M</span></div>
            <div class="navInput">
              <div @click="handleNavButton" class="navButton">
                <i class="el-icon-plus"></i>
              </div>
            </div>
            <div class="navBlock">视频URL</div>
            <div class="navInput">
              <el-input v-model="form.textVideoUrlOne" size="small" placeholder=" http://www.castelbds.com/…" clearable></el-input>
            </div>
            <div class="navBlock">视频类型</div>
            <div class="navInput">
              <el-input v-model="form.textVideoTypeOne" size="small" placeholder=" video/" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 22">
          <div class="navTitle">内容文本</div>
          <div class="bannerRightMsg">
            <span class="msgYes">添加内容</span>
            <div class="msgMain">
              <el-input type="textarea" placeholder="在此输入文本内容…" v-model="form.descSMS" maxlength="9999" show-word-limit @focus="handleInputSMS"></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 23">
          <div class="navTitle">回复消息</div>
          <div class="bannerRightMsg">
            <div class="navBlock">显示文本</div>
            <div class="navInput">
              <el-input v-model="form.showTextMsg2" size="small" placeholder="回复" maxlength="12" clearable></el-input>
            </div>
            <div class="navBlock">回复文本</div>
            <div class="navInput">
              <el-input v-model="form.backTextMsg2" size="small" placeholder="Reply" maxlength="12" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 24">
          <div class="navTitle">回复消息</div>
          <div class="bannerRightMsg">
            <div class="navBlock">显示文本</div>
            <div class="navInput">
              <el-input v-model="form.showTextMsg3" size="small" placeholder="回复" maxlength="12" clearable></el-input>
            </div>
            <div class="navBlock">回复文本</div>
            <div class="navInput">
              <el-input v-model="form.backTextMsg3" size="small" placeholder="Reply" maxlength="12" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 25">
          <div class="navTitle">回复消息</div>
          <div class="bannerRightMsg">
            <div class="navBlock">显示文本</div>
            <div class="navInput">
              <el-input v-model="form.showTextMsg4" size="small" placeholder="回复" maxlength="12" clearable></el-input>
            </div>
            <div class="navBlock">回复文本</div>
            <div class="navInput">
              <el-input v-model="form.backTextMsg4" size="small" placeholder="Reply" maxlength="12" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 26">
          <div class="navTitle">打开链接</div>
          <div class="bannerRightMsg">
            <div class="navBlock">显示文本</div>
            <div class="navInput">
              <el-input v-model="form.showTextLink2" size="small" placeholder="访问链接" maxlength="12" clearable></el-input>
            </div>
            <div class="navBlock">链接地址</div>
            <div class="navInput">
              <el-input v-model="form.LinkAddress2" size="small" placeholder="http://" maxlength="256" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 27">
          <div class="navTitle">打开链接</div>
          <div class="bannerRightMsg">
            <div class="navBlock">显示文本</div>
            <div class="navInput">
              <el-input v-model="form.showTextLink3" size="small" placeholder="访问链接" maxlength="12" clearable></el-input>
            </div>
            <div class="navBlock">链接地址</div>
            <div class="navInput">
              <el-input v-model="form.LinkAddress3" size="small" placeholder="http://" maxlength="256" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 28">
          <div class="navTitle">打开链接</div>
          <div class="bannerRightMsg">
            <div class="navBlock">显示文本</div>
            <div class="navInput">
              <el-input v-model="form.showTextLink4" size="small" placeholder="访问链接" maxlength="12" clearable></el-input>
            </div>
            <div class="navBlock">链接地址</div>
            <div class="navInput">
              <el-input v-model="form.LinkAddress4" size="small" placeholder="http://" maxlength="256" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 29">
          <div class="navTitle">拨打电话</div>
          <div class="bannerRightMsg">
            <div class="navBlock">显示文本</div>
            <div class="navInput">
              <el-input v-model="form.showTextPhone2" size="small" placeholder="拨打电话" maxlength="12" clearable></el-input>
            </div>
            <div class="navBlock">电话号码</div>
            <div class="navInput">
              <el-input v-model="form.phoneNumber2" oninput = "value=value.replace(/[^\d]/g, '')" size="small" placeholder="输入号码" maxlength="15" clearable></el-input>
            </div>            
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 30">
          <div class="navTitle">拨打电话</div>
          <div class="bannerRightMsg">
            <div class="navBlock">显示文本</div>
            <div class="navInput">
              <el-input v-model="form.showTextPhone3" size="small" placeholder="拨打电话" maxlength="12" clearable></el-input>
            </div>
            <div class="navBlock">电话号码</div>
            <div class="navInput">
              <el-input v-model="form.phoneNumber3" oninput = "value=value.replace(/[^\d]/g, '')" size="small" placeholder="输入号码" maxlength="15" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 31">
          <div class="navTitle">拨打电话</div>
          <div class="bannerRightMsg">
            <div class="navBlock">显示文本</div>
            <div class="navInput">
              <el-input v-model="form.showTextPhone4" size="small" placeholder="拨打电话" maxlength="12" clearable></el-input>
            </div>
            <div class="navBlock">电话号码</div>
            <div class="navInput">
              <el-input v-model="form.phoneNumber4" oninput = "value=value.replace(/[^\d]/g, '')" size="small" placeholder="输入号码" maxlength="15" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 32">
          <div class="navTitle">回复消息</div>
          <div class="bannerRightMsg">
            <div class="navBlock">显示文本</div>
            <div class="navInput">
              <el-input v-model="form.cardShowTextMsg2" size="small" placeholder="回复" maxlength="12" clearable></el-input>
            </div>
            <div class="navBlock">回复文本</div>
            <div class="navInput">
              <el-input v-model="form.cardBackTextMsg2" size="small" placeholder="Reply" maxlength="12" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 33">
          <div class="navTitle">回复消息</div>
          <div class="bannerRightMsg">
            <div class="navBlock">显示文本</div>
            <div class="navInput">
              <el-input v-model="form.cardShowTextMsg3" size="small" placeholder="回复" maxlength="12" clearable></el-input>
            </div>
            <div class="navBlock">回复文本</div>
            <div class="navInput">
              <el-input v-model="form.cardBackTextMsg3" size="small" placeholder="Reply" maxlength="12" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 34">
          <div class="navTitle">回复消息</div>
          <div class="bannerRightMsg">
            <div class="navBlock">显示文本</div>
            <div class="navInput">
              <el-input v-model="form.cardShowTextMsg4" size="small" placeholder="回复" maxlength="12" clearable></el-input>
            </div>
            <div class="navBlock">回复文本</div>
            <div class="navInput">
              <el-input v-model="form.cardBackTextMsg4" size="small" placeholder="Reply" maxlength="12" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 35">
          <div class="navTitle">打开链接</div>
          <div class="bannerRightMsg">
            <div class="navBlock">显示文本</div>
            <div class="navInput">
              <el-input v-model="form.cardShowTextLink2" size="small" placeholder="访问链接" maxlength="12" clearable></el-input>
            </div>
            <div class="navBlock">链接地址</div>
            <div class="navInput">
              <el-input v-model="form.cardLinkAddress2" size="small" placeholder="http://" maxlength="256" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 36">
          <div class="navTitle">打开链接</div>
          <div class="bannerRightMsg">
            <div class="navBlock">显示文本</div>
            <div class="navInput">
              <el-input v-model="form.cardShowTextLink3" size="small" placeholder="访问链接" maxlength="12" clearable></el-input>
            </div>
            <div class="navBlock">链接地址</div>
            <div class="navInput">
              <el-input v-model="form.cardLinkAddress3" size="small" placeholder="http://" maxlength="256" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 37">
          <div class="navTitle">打开链接</div>
          <div class="bannerRightMsg">
            <div class="navBlock">显示文本</div>
            <div class="navInput">
              <el-input v-model="form.cardShowTextLink4" size="small" placeholder="访问链接" maxlength="12" clearable></el-input>
            </div>
            <div class="navBlock">链接地址</div>
            <div class="navInput">
              <el-input v-model="form.cardLinkAddress4" size="small" placeholder="http://" maxlength="256" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 38">
          <div class="navTitle">拨打电话</div>
          <div class="bannerRightMsg">
            <div class="navBlock">显示文本</div>
            <div class="navInput">
              <el-input v-model="form.cardShowTextPhone2" size="small" placeholder="拨打电话" maxlength="12" clearable></el-input>
            </div>
            <div class="navBlock">电话号码</div>
            <div class="navInput">
              <el-input v-model="form.cardPhoneNumber2" oninput = "value=value.replace(/[^\d]/g, '')" size="small" placeholder="输入号码" maxlength="15" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 39">
          <div class="navTitle">拨打电话</div>
          <div class="bannerRightMsg">
            <div class="navBlock">显示文本</div>
            <div class="navInput">
              <el-input v-model="form.cardShowTextPhone3" size="small" placeholder="拨打电话" maxlength="12" clearable></el-input>
            </div>
            <div class="navBlock">电话号码</div>
            <div class="navInput">
              <el-input v-model="form.cardPhoneNumber3" oninput = "value=value.replace(/[^\d]/g, '')" size="small" placeholder="输入号码" maxlength="15" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 40">
          <div class="navTitle">拨打电话</div>
          <div class="bannerRightMsg">
            <div class="navBlock">显示文本</div>
            <div class="navInput">
              <el-input v-model="form.cardShowTextPhone4" size="small" placeholder="拨打电话" maxlength="12" clearable></el-input>
            </div>
            <div class="navBlock">电话号码</div>
            <div class="navInput">
              <el-input v-model="form.cardPhoneNumber4" oninput = "value=value.replace(/[^\d]/g, '')" size="small" placeholder="输入号码" maxlength="15" clearable></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 41">
          <div class="navTitle">内容文本</div>
          <div class="bannerRightMsg">
            <span class="msgYes">
              <el-button size="small" @click="handleAddChange" type="primary">添加变量</el-button>
            </span>
            <div class="msgMain2">
              <el-input type="textarea" ref="targetIn" placeholder="在此输入文本内容…" v-model="form.descChange" maxlength="9999" show-word-limit @focus="handleInputChange"></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 42">
          <div class="navTitle">内容文本</div>
          <div class="bannerRightMsg">
            <span class="msgYes">
              <el-button size="small" @click="handleAddChangeOne" type="primary">添加变量</el-button>
            </span>
            <div class="msgMain2">
              <el-input type="textarea" ref="targetInOne" placeholder="在此输入文本内容…" v-model="form.descChangeOne" maxlength="9999" show-word-limit @focus="handleInputChangeOne"></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 43">
          <div class="navTitle">内容文本</div>
          <div class="bannerRightMsg">
            <span class="msgYes">
              <el-button size="small" @click="handleAddChangeSMS" type="primary">添加变量</el-button>
            </span>
            <div class="msgMain2">
              <el-input type="textarea" ref="targetInSMS" placeholder="在此输入文本内容…" v-model="form.descChangeSMS" maxlength="9999" show-word-limit @focus="handleInputChangeSMS"></el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="MessageBox" v-if="dialogVisible">
      <div class="MessageBoxBanner" v-if="type == 8 || type == 19">
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
            已选择 <span> {{ count }} / 1 项</span>
          </div>
        </div>
        <div class="MessageBoxRight">
          <div class="MessageBoxRightT">
            <div class="MessageBoxRightTT">
              <el-checkbox-group v-model="checkbox" :max="1">
                <el-checkbox v-for="item in groupsImageList" :key="item.id" border :label="item.id">
                  <div class="checkboxImage">
                    <!-- <img ref="checkbox" :src="item.imgUrl" alt=""> -->
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
            <el-button type="primary" v-if="text == 'UP2.4消息'" @click="confirmImage" size="small">确定</el-button>
            <el-button type="primary" v-else @click="confirmImageOne" size="small">确定</el-button>
            <el-button size="small" @click="cancle">取消</el-button>
          </div>
        </div>
      </div>
      <div class="MessageBoxBannerN" v-if="type == 9 || type == 20">
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
            已选择 <span> {{ count }} / 1 项</span>
          </div>
          <div class="MessageBoxBottomR">
            <el-button type="primary" v-if="text == 'UP2.4消息'" @click="confirmAudio" size="small">确定</el-button>
            <el-button type="primary" v-else @click="confirmAudioOne" size="small">确定</el-button>
            <el-button size="small" @click="cancle">取消</el-button>
          </div>
        </div>
      </div>
      <div class="MessageBoxBannerN" v-if="type == 10 || type == 21">
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
            已选择 <span> {{ count }} / 1 项</span>
          </div>
          <div class="MessageBoxBottomR">
            <el-button type="primary" v-if="text == 'UP2.4消息'" @click="confirmVideo" size="small">确定</el-button>
            <el-button type="primary" v-else @click="confirmVideoOne" size="small">确定</el-button>
            <el-button size="small" @click="cancle">取消</el-button>
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
