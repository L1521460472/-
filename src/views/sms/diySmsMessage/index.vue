<template>
  <div id="header">
    <div class="header">
      <div class="title">
        <div class="titleLeft">
          <el-button type="text" icon="el-icon-arrow-left" @click="handleBack">返回</el-button>
        </div>
        <div class="titleCenter">
          <ul ref="ulLi">
            <li class="active">
              SMS短信
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
              <dl v-for="(item, index) in List" :key="item.id" draggable="true" @dragstart="drag($event, index)" @click="handleClick">
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
          <div ref="bannerCenterBoxT" class="bannerCenterBoxT" :class="{ boxactive: isBosDisable }" @click="handleFocus($event)" @drop="drop($event)" @dragover="allowDrop($event)">
            <div v-if="isShow">
                <div class="centerIcon">
                    <img :src="centerImgUrl" alt="" />
                </div>
                <div v-if="isContent" class="centerText">
                    <span>{{msg}}</span>
                </div>
            </div>
            <div class="descBox" v-else>
                <div class="textBox" @click="type = 2;isBosDisable = true" v-if="istype2">
                    {{ form.desc }}
                </div>
                <div class="textBox" @click="type = 3;isBosDisable = true" v-if="istype3">
                    {{ form.descChange }}
                </div>
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
              <el-select v-model="form.businessType" size="small" placeholder="请选择" @change="handleChangeGetApp">
                <el-option v-for="item in businessOptions" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="navBlock">*模板类型</div>
            <div class="navInput">
              <el-select v-model="form.msgType" size="small" placeholder="请选择" @change="handleChange">
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
        <div class="grid-content bannerRight" v-if="type == 2">
          <div class="navTitle">内容文本</div>
          <div class="bannerRightMsg">
            <span class="msgYes">添加内容</span>
            <div class="msgMain">
              <el-input type="textarea" placeholder="在此输入文本内容…" v-model="form.desc" maxlength="9999" show-word-limit @focus="handleInput"></el-input>
            </div>
          </div>
        </div>
        <div class="grid-content bannerRight" v-if="type == 3">
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