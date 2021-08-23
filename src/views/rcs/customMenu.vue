<template>
  <div id="customMenu" v-loading="loading" element-loading-text="loading">
    <div class="title">自定义菜单</div>
    <div class="container">
      <div
        class="customMenuLeft"
        :style="{ 'min-height': tableHeight - -114 + 'px' }"
      >
        <el-tree
          :data="treeData"
          node-key="id"
          highlight-current
          :props="defaultProps"
          @node-click="getDefaultNode"
          :current-node-key="selectTreeId"
          default-expand-all
          :expand-on-click-node="false"
        >
        </el-tree>
      </div>
      <div class="customMenuRight" v-loading="loading2">
        <div class="haveData" v-show="selectTreeType === 2">
          <div class="header">
            <div class="headerLeft" v-if="!customMenuStatus && !publicStatus">
              菜单待编辑，请确认菜单编辑完成后点击“保存并发布”同步到手机。
            </div>
            <div class="headerLeft" v-else-if="customMenuStatus && !publicStatus">
              菜单编辑中，请确认菜单编辑完成后点击“保存并发布”同步到手机。
            </div>
            <div class="headerLeft" v-else-if="customMenuStatus && publicStatus === 1">
              菜单待发布，请确认菜单编辑完成后点击“保存并发布”同步到手机。
            </div>
            <div class="headerLeft" v-else="customMenuStatus && publicStatus === 2">
              菜单已发布，24小时后可在手机查看菜单内容。
            </div>
            <div class="headerRight" v-has="'customMenuStatusUpdate'">
              <el-switch
                v-model="customMenuStatus"
                @click.native="changeStatus(customMenuStatus)"
                :active-value="1"
                :inactive-value="0"
                disabled
              ></el-switch>
            </div>
          </div>
          <div class="customMenuRightMain" v-if="customMenuStatus">
            <div class="mainLeft">
              <div class="mainLeftHeader">
                <img :src="channelIcon" alt="" />
                <span>{{ channelName }}</span>
              </div>
              <ul class="menuList">
                <vuedraggable v-model="menuList"  class="menuDraggable" :disabled="disabled" >
                  <li class="menu_item0 active" v-if="menuList.length < 1"  @click="addMenu(0)"><i   class="el-icon-plus" /><span>添加菜单</span></i>
                  <li v-else class="menu_item"  :class="{'active' : activeIndex === index && activeSubIndex === null,'menu_item1':menuList.length > 2}" v-for="(item,index) in menuList">
                    <div class="menuName" @click="item.menuName === '' ? addMenu(index):changeIndex(index) " >
                      <img v-if="!showSortBtn" src="../../assets/images/drag_icon.png" >
                      <span  v-if="item.menuName" >{{item.menuName}}</span>
                      <i v-else  class="el-icon-plus" />
                    </div>
                    <ul class="subMenu" v-if="activeIndex === index && item.children.length>0">
                      <span class="triangle"></span>
                      <vuedraggable :disabled="disabled" v-model="item.children">
                        <li class="subMenuItem"  :class="{'subActive':activeSubIndex === subIndex}" @click="subItem.menuName === '' ? addSubMenu(subIndex):changeSubIndex(subIndex) " v-for="(subItem,subIndex) in item.children" :key="subIndex">
                          <img v-if="!showSortBtn" src="../../assets/images/drag_icon.png" >
                          <span class="menuName" v-if="subItem.menuName">{{subItem.menuName}}</span>
                          <i v-else     class="el-icon-plus" />
                        </li>
                      </vuedraggable>
                    </ul>
                  </li>
                </vuedraggable>
              </ul>
            </div>
            <div class="mianRight">
              <div class="menuInfo" v-if="menuInfo || subMenuInfo">
                <!-- 主菜单 -->
                <div v-if="menuInfo">
                  <div class="mianRightHeader">
                    <span>菜单名称</span>
                    <span @click="deleteMenu()">删除菜单</span>
                  </div>
                  <el-form
                    class="menuDetail"
                    ref="menuForm"
                    label-width="100px"
                    label-position="left"
                  >
                    <el-form-item  prop="menuName" label="菜单名称">
                      <el-input size="small" v-model="selectMenuName" @blur="changeMenuName" ></el-input>
                      <span class="tip">仅支持中英文和数字，字数不超过12个汉字或25个字符</span>
                      <span class="errtip">{{errMsg1}}</span>
                    </el-form-item>
                    <el-form-item prop="radio" label="菜单内容" v-if="!onlyShowMenuName" >
                      <el-radio-group v-model="selectRadio" @change="changeRadio">
                        <el-radio :label="0">发送消息</el-radio>
                        <el-radio :label="1">打开链接</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <div class="keyword" v-if="!onlyShowMenuName">
                      <span class="title" v-show="selectRadio === 0">点击该菜单会发送以下消息</span>
                      <span class="title" v-show="selectRadio === 1">点击该菜单会跳到以下链接</span>
                      <el-form-item v-if="selectRadio === 0" prop="keyword" label="关键词内容">
                        <el-input size="small" v-model="selectKeyword" @blur="changeUrl"></el-input>
                        <span class="tip">字数不超过12个汉字或25个字符</span>
                        <span class="errtip">{{errMsg2}}</span>
                      </el-form-item>
                      <el-form-item v-if="selectRadio === 1" prop="url" label="打开链接">
                        <el-input size="small" v-model="selectUrl" @blur="changeUrl" placeholder="http://或https://开头的网址"></el-input>
                        <span class="errtip">{{errMsg3}}</span>
                      </el-form-item>
                    </div>
                  </el-form>
                </div>
                <!-- 子菜单 -->
                <div v-if="subMenuInfo">
                  <div class="mianRightHeader">
                    <span>子菜单名称</span>
                    <span @click="deleteSubMenu()">删除子菜单</span>
                  </div>
                  <el-form
                    class="menuDetail"
                    ref="menuForm"
                    label-width="100px"
                    label-position="left"
                  >
                    <el-form-item  prop="menuName" label="子菜单名称">
                      <el-input size="small" v-model="selectMenuName" @blur="changeSubMenuName"></el-input>
                      <span class="tip">仅支持中英文和数字，字数不超过12个汉字或25个字符</span>
                      <span class="errtip">{{errMsg1}}</span>
                    </el-form-item>
                    <el-form-item prop="radio" label="子菜单内容">
                      <el-radio-group v-model="selectRadio" @change="changeSubRadio">
                        <el-radio :label="0">发送消息</el-radio>
                        <el-radio :label="1">打开链接</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <div class="keyword">
                      <span class="title" v-show="selectRadio === 0">点击该菜单会发送以下消息</span>
                      <span class="title" v-show="selectRadio === 1">点击该菜单会跳到以下链接</span>
                      <el-form-item v-if="selectRadio === 0" prop="keyword" label="关键词内容">
                        <el-input size="small" v-model="selectKeyword" @blur="changeSubUrl"></el-input>
                        <span class="tip">字数不超过12个汉字或25个字符</span>
                        <span class="errtip">{{errMsg2}}</span>
                      </el-form-item>
                      <el-form-item v-if="selectRadio === 1" prop="url" label="打开链接">
                        <el-input size="small" v-model="selectUrl" @blur="changeSubUrl" placeholder="http://或https://开头的网址"></el-input>
                        <span class="errtip">{{errMsg3}}</span>
                      </el-form-item>
                    </div>
                  </el-form>
                </div>
              </div>
              <span class="sortTip" v-if="!showSortBtn">请通过拖拽左边的菜单进行排序</span>
            </div>
          </div>
          <div class="btn" v-if="customMenuStatus && menuList.length>0">
            <el-button size="small" @click="sortAction" v-if="showSortBtn">菜单排序</el-button>
            <el-button size="small" @click="sortAccomplish" v-else>完成</el-button>
            <el-button v-has="'customMenuSaveOrUpdate'" size="small" type="primary" @click="saveAction(1)" :disabled="!showSortBtn">保存</el-button>
            <el-button v-has="'customMenuSaveOrUpdate'" size="small" type="primary" @click="saveAndPublish" :disabled="!showSortBtn">保存并发布</el-button>
          </div>
        </div>
        <div class="emptyData" v-show="selectTreeType === 1">请先选择通道</div>
      </div>
    </div>
  </div>
</template>
<script>
import {getCustomMenuTreeList,changeMenuStatus,getCustomMenuList,undateCustomMenuList} from "../../api/message/customMenu";
import {regexpMenu,getBLen,regexpUrl} from '../../public'
import vuedraggable from "vuedraggable";

export default {
  name: "customMenu",
  components: {
      vuedraggable,
  },
  data() {
    return {
      loading: false,
      loading2:false,
      treeData: [], //应用通道树
      defaultProps: {
        children: "channelList",
        label: "name",
      },
      selectTreeId: null, //选中的通道树的id
      selectTreeType: 1, //点击选择的类型
      customMenuStatus: 0,
      publicStatus:null,
      channelIcon: null, //通道icon
      channelName: null, //通道名
      menuList:[{menuName:'',radio:0,keyword:'',url:'',children:[{menuName:'',radio:0,keyword:'',url:''}]}],//菜单
      activeIndex:0,
      activeSubIndex:null,
      subMenuInfo:false, //显示子菜单编辑
      menuInfo:false,//显示主菜单编辑
      onlyShowMenuName:false,//主菜单是否只显示菜单名
      selectMenuName:null,
      selectRadio:0,
      selectKeyword:null,
      selectUrl:null,
      errMsg1:'',//菜单名称错误提示
      errMsg2:'',//关键词错误提示
      errMsg3:'',//链接错误提示
      showSortBtn:true,//显示排序按钮
      disabled:true,//是否禁用拖拽功能
      tableHeight: window.innerHeight - 310 + "",
    };
  },
  methods: {
    // 获取应用通道树
    getTreeList() {
      this.loading = true
      getCustomMenuTreeList()
        .then((res) => {
          this.loading = false
          if (res.data.status == 0) {
            // 增加所有应用父集
            let treeData
            treeData = res.data.data.length > 0 ? [{
                name: "所有应用",
                channelList: res.data.data,
                type: 1,
              }] : []
            this.treeData = treeData;
          } else {
            this.$message({
              message: res.data.message,
              center: true,
              type: res.data.status === 2 ? "warning" : "error",
            });
          }
        })
        .catch((err) => {
          this.loading = false
          this.$message.error({
            message: err,
            center: true,
          });
        });
    },
    // 选择通道，点击通道时才发请求
    getDefaultNode(node) {
      this.selectTreeType = node.type;
      this.resetAction()
      if (node.type === 2) {
        this.loading2 = true
        this.selectTreeId = node.id;
        this.customMenuStatus = node.customMenuStatus;
        this.publicStatus = node.publicStatus
        this.channelIcon = node.url;
        this.channelName = node.name;
        getCustomMenuList({channelId:node.id,h5Flag:false}).then(res=>{
          this.loading2 = false
          if(res.data.status == 0){
            this.menuList = res.data.data === null ? []:JSON.parse(res.data.data)
            if(this.menuList.length > 0){
              this.menuInfo = true
              this.selectMenuName = this.menuList[0].menuName
              this.selectRadio = this.menuList[0].radio
              this.selectKeyword = this.menuList[0].keyword
              this.selectUrl = this.menuList[0].url
              if(this.menuList[0].children[0].menuName) this.onlyShowMenuName = true
            }
          }else{
            this.$message.error({
              message:res.data.message,
              center:true
            })
          }
        }).catch(err=>{
          this.$message.error({
            message:err,
            center:true,
          })
        })
      }
    },
    // 点击改变菜单状态
    changeStatus(val){
      let params = {
        id: this.selectTreeId,
        status: val === 0 ? 1:0,
      };
      if(val === 0){
        changeMenuStatus(params)
          .then((res) => {
            if (res.data.status == 0) {
              this.customMenuStatus = val === 0 ? 1:0
              this.getTreeList();
            } else {
              this.$message({
                message: res.data.message,
                center: true,
                type: res.data.status === 2 ? "warning" : "error",
              });
            }
          })
          .catch((err) => {
            this.$message.error({
              message: err,
              center: true,
            });
          });
      }else{
        this.$confirm('关闭自定义菜单之后，将在24小时内对所有用户生效。确认关闭？',{
          cancelButtonText: "取 消",
          confirmButtonText: "确 认",
          confirmButtonClass:'btn-custom-confirm',
          center:true
        })
          .then(()=>{
            changeMenuStatus(params)
              .then((res) => {
                if (res.data.status == 0) {
                  this.customMenuStatus = val === 0 ? 1:0
                  this.getTreeList();
                } else {
                  this.$message({
                    message: res.data.message,
                    center: true,
                    type: res.data.status === 2 ? "warning" : "error",
                  });
                }
              })
              .catch((err) => {
                this.$message.error({
                  message: err,
                  center: true,
                });
              });
          })
          .catch(()=>{

          })
      }
    },
    // 新增主菜单
    addMenu(index){
      this.subMenuInfo = false
      this.menuInfo = true
      this.activeIndex = index
      this.activeSubIndex = null
      this.menuList.splice(index,1,{menuName:'菜单名称',radio:0,keyword:'',url:'',children:[{menuName:'',radio:0,keyword:'',url:''}]})
      this.selectMenuName = '菜单名称',//菜单名称
      this.selectRadio = 0,//菜单内容
      this.selectKeyword = '',//关键词
      this.selectUrl = ''//链接地址
      this.onlyShowMenuName = false
      this.errMsg1 = ''
      this.errMsg2 = ''
      this.errMsg3 = ''
      if(this.menuList.length<3){
        this.menuList.push({menuName:'',radio:0,keyword:'',url:'',children:[{menuName:'',radio:0,keyword:'',url:''}]})
      }
    },
    // 添加子菜单
    addSubMenu(subIndex){
      this.subMenuInfo = true
      this.menuInfo = false
      // this.activeIndex = 4
      this.activeSubIndex = subIndex
      this.menuList[this.activeIndex].children.splice(subIndex,1,{menuName:'子菜单名称',radio:0,keyword:'',url:''})
      this.selectMenuName = '子菜单名称',//菜单名称
      this.selectRadio = 0,//菜单内容
      this.selectKeyword = '',//关键词
      this.selectUrl = ''//链接地址
      this.errMsg1 = ''
      this.errMsg2 = ''
      this.errMsg3 = ''
      if(this.menuList[this.activeIndex].children.length<5){
        this.menuList[this.activeIndex].children.push({menuName:'',radio:0,keyword:'',url:''})
      }
    },
    // 点击主菜单
    changeIndex(index){
      this.activeIndex = index
      this.activeSubIndex = null
      if(!this.showSortBtn) return
      this.subMenuInfo = false
      this.menuInfo = true
      this.selectMenuName = this.menuList[index].menuName,//菜单名称
      this.selectRadio = this.menuList[index].radio,//菜单内容
      this.selectKeyword = this.menuList[index].keyword,//关键词
      this.selectUrl = this.menuList[index].url//链接地址
      this.onlyShowMenuName = this.menuList[index].children[0].menuName ? true:false
      // 重置错误信息
      this.errMsg1 = ''
      this.errMsg2 = ''
      this.errMsg3 = ''
    },
    // 点击子菜单
    changeSubIndex(subIndex){
      if(!this.showSortBtn) return
      this.activeSubIndex = subIndex
      this.subMenuInfo = true
      this.menuInfo = false
      this.selectMenuName = this.menuList[this.activeIndex].children[subIndex].menuName,//菜单名称
      this.selectRadio = this.menuList[this.activeIndex].children[subIndex].radio,//菜单内容
      this.selectKeyword = this.menuList[this.activeIndex].children[subIndex].keyword,//关键词
      this.selectUrl = this.menuList[this.activeIndex].children[subIndex].url//链接地址
      // 重置错误信息
      this.errMsg1 = ''
      this.errMsg2 = ''
      this.errMsg3 = ''
    },
    // 删除菜单
    deleteMenu(){
      let _this = this
      this.$confirm(`删除后“${this.selectMenuName}”菜单下设置的内容将被删除！`, {
        cancelButtonText: "取 消",
        confirmButtonText: "确 认",
        confirmButtonClass:'btn-custom-confirm',
        center:true
      })
        .then(() => {
          _this.menuList.splice(_this.activeIndex,1)
          if(_this.menuList.length<3 && _this.menuList[_this.menuList.length - 1].menuName){
            _this.menuList.push({menuName:'',radio:0,keyword:'',url:'',children:[{menuName:'',radio:0,keyword:'',url:''}]})
          }
          if(_this.activeIndex > 0){
            _this.activeIndex --
          }
          if(!_this.menuList[0].menuName){
            _this.menuList =[]
            _this.saveAction(0)
            _this.menuInfo =false
          }else{
            _this.onlyShowMenuName = _this.menuList[_this.activeIndex].children[0].menuName ? true:false
            _this.selectMenuName = _this.menuList[_this.activeIndex].menuName
            _this.selectRadio = _this.menuList[_this.activeIndex].radio
            _this.selectKeyword = _this.menuList[_this.activeIndex].keyword
            _this.selectUrl = _this.menuList[_this.activeIndex].url
          }
          // _this.saveAction(0)
        })
        .catch(() => {
          console.log("取消");
        });
    },
    // 删除子菜单
    deleteSubMenu(){
      let _this = this
      this.$confirm(`删除后“${this.selectMenuName}”菜单下设置的内容将被删除！`, {
        cancelButtonText: "取 消",
        confirmButtonText: "确 认",
        confirmButtonClass:'btn-custom-confirm',
        center:true
      })
        .then(() => {
          _this.menuList[_this.activeIndex].children.splice(_this.activeSubIndex,1)
          if(_this.menuList[_this.activeIndex].children.length<5 && _this.menuList[_this.activeIndex].children[_this.menuList[_this.activeIndex].children.length - 1].menuName){
           _this.menuList[_this.activeIndex].children.push({menuName:'',radio:0,keyword:'',url:''})
          }
          _this.activeSubIndex = null
          _this.subMenuInfo = false
          _this.menuInfo = true
          _this.changeIndex(_this.activeIndex)
          // _this.saveAction(0)
        })
        .catch(() => {
          console.log("取消");
        });
    },
    // 菜单姓名改变
    changeMenuName(e){
      if(this.regexpName(e.target.value)){
        this.menuList[this.activeIndex].menuName = e.target.value
      }else{
        this.menuList[this.activeIndex].menuName = '菜单名称'
      }
    },
    // 改变子菜单名称
    changeSubMenuName(e){
      if(this.regexpName(e.target.value)){
        this.menuList[this.activeIndex].children[this.activeSubIndex].menuName = e.target.value
      }else{
        this.menuList[this.activeIndex].children[this.activeSubIndex].menuName  = '子菜单名称'
      }

    },
    // 主菜单改变链接
    changeUrl(e){
      if(this.selectRadio === 0 ){
        this.regexpKeyword(e.target.value)
        this.menuList[this.activeIndex].keyword = e.target.value
        // if(this.regexpKeyword(e.target.value)){
        //   this.menuList[this.activeIndex].keyword = e.target.value
        // }else{
        //   this.menuList[this.activeIndex].keyword = ''
        // }
      }else{
        // if(this.regexpMenuUrl(e.target.value)){
          this.regexpMenuUrl(e.target.value)
          this.menuList[this.activeIndex].url = e.target.value
        // }
      }
    },
    // 改变子菜单链接
    changeSubUrl(e){
      if(this.selectRadio === 0 ){
        this.regexpKeyword(e.target.value)
        this.menuList[this.activeIndex].children[this.activeSubIndex].keyword = e.target.value
        // if(this.regexpKeyword(e.target.value)){
        //   this.menuList[this.activeIndex].children[this.activeSubIndex].keyword = e.target.value
        // }else{
        //   this.menuList[this.activeIndex].children[this.activeSubIndex].keyword = ''
        // }
      }else{
        this.regexpMenuUrl(e.target.value)
        this.menuList[this.activeIndex].children[this.activeSubIndex].url = e.target.value
      }
    },
    // 改变主菜单内容类型
    changeRadio(val){
      this.$set(this.menuList[this.activeIndex], 'radio', val)
      // this.menuList[this.activeIndex].radio = val
      if(val === 0) {
        this.menuList[this.activeIndex].url = ''
        this.selectUrl = ''
      }
      if(val === 1) {
        this.menuList[this.activeIndex].keyword = ''
        this.selectKeyword = ''
      }
    },
    // 改变子菜单内容类型
    changeSubRadio(val){
      this.menuList[this.activeIndex].children[this.activeSubIndex].radio = val
      if(val === 0){
        this.menuList[this.activeIndex].children[this.activeSubIndex].url = ''
        this.selectUrl = ''
      }
      if(val === 1) {
        this.menuList[this.activeIndex].children[this.activeSubIndex].keyword = ''
        this.selectKeyword = ''
      }
    },
    // 验证菜单名称
    regexpName(val){
      if(!val){
        this.errMsg1 = '菜单名称不能为空'
        // this.selectMenuName = ''
        return false
      }else if(!(regexpMenu(val))){
        this.errMsg1 = '菜单名称只能为中英文或数字'
        // this.selectMenuName = ''
        return false
      }else if(getBLen(val)>25){
        this.errMsg1 = '菜单名称长度不超过12个汉字或25个字符'
        // this.selectMenuName = ''
        return false
      }else{
        this.errMsg1 = ''
        return true
      }
    },
    // 验证关键词
    regexpKeyword(val){
      if(!val){
        this.errMsg2 = '关键词不能为空'
        // this.selectKeyword = '关键词'
        return false
      }else if(getBLen(val)>25){
        this.errMsg2 = '关键词长度不超过12个汉字或25个字符'
        // this.selectKeyword = '关键词'
        return false
      }else{
        this.errMsg2 = ''
        return true
      }
    },
    // 验证链接地址
    regexpMenuUrl(val){
      if(!val){
        this.errMsg3 = '链接地址不能为空'
        return false
      }else if(!regexpUrl(val)){
        this.errMsg3 = '链接地址格式不正确'
        return false
      }else{
        this.errMsg3 = ''
        return true
      }
    },
    // 菜单排序
    sortAction(){
      // 排序前过滤空的主子菜单
      this.menuList = this.menuList.filter(item=>{
        return item.menuName
      })
      this.menuList.map(item=>{
       item.children= item.children.filter(item2=>{
          return item2.menuName
        })
      })
      this.showSortBtn = !this.showSortBtn
      this.menuFlag = this.menuInfo
      this.subMenuFlag = this.subMenuInfo
      this.menuInfo = false
      this.subMenuInfo = false
      this.disabled = false
    },
    // 排序完成
    sortAccomplish(){
      // 排序完成后增加对应的空主子菜单
      if(this.menuList.length < 3){
        this.menuList.push({menuName:'',radio:0,keyword:'',url:'',children:[{menuName:'',radio:0,keyword:'',url:''}]})
      }
      this.menuList.map(item=>{
        if(item.children.length < 5){
          item.children.push({menuName:'',radio:0,keyword:'',url:''})
        }
      })
      this.onlyShowMenuName = this.menuList[this.activeIndex].children[0].menuName ? true:false
      this.selectMenuName = this.menuList[this.activeIndex].menuName
      this.selectRadio = this.menuList[this.activeIndex].radio
      this.selectKeyword = this.menuList[this.activeIndex].keyword
      this.selectUrl = this.menuList[this.activeIndex].url
      this.showSortBtn = !this.showSortBtn
      this.menuInfo = this.menuFlag
      this.subMenuInfo = this.subMenuFlag
      this.disabled = true
      // this.saveAction(1)
    },
    // 保存
    saveAction(val){
      if(this.errMsg1){
        this.$message.error({
          message:this.errMsg1,
          center:true
        })
        return
      }
      if(this.errMsg2){
        this.$message.error({
          message:this.errMsg2,
          center:true
        })
        return
      }
      let entries = []
      let arr = this.menuList.filter(item=>{
        return item.menuName
      })
      for(let i = 0;i<arr.length;i++){
        // 判断是否有子菜单
        if(!arr[i].children[0].menuName){
          // 无子菜单时
          if(arr[i].radio === 1  && (!arr[i].url)){
            this.$message.error({
              message:`${arr[i].menuName}链接地址不能为空`,
              center:true
            })
            return
          }else if(arr[i].radio === 1 && (!regexpUrl(arr[i].url))){
            this.$message.error({
              message:`${arr[i].menuName}链接地址格式不正确`,
              center:true
            })
            return
          }else if(arr[i].radio === 0  && (!arr[i].keyword)){
            this.$message.error({
              message:`${arr[i].menuName}关键词不能为空`,
              center:true
            })
            return
          }else if(arr[i].radio === 0  && (getBLen(arr[i].keyword)>25)){
            this.$message.error({
              message:`关键词长度不超过12个汉字或25个字符`,
              center:true
            })
            return
          }
        }else{
          let arr2 = arr[i].children.filter(item=>{
            return item.menuName
          })
          for(let j = 0;j<arr2.length;j++){
            if(arr2[j].radio === 1 && (!arr2[j].url)){
              this.$message.error({
                message:`${arr2[j].menuName}链接地址不能为空`,
                center:true
              })
              return
            }else if(arr2[j].radio === 1 && (!regexpUrl(arr2[j].url))){
              this.$message.error({
                message:`${arr2[j].menuName}链接地址格式不正确`,
                center:true
              })
              return
            }else if(arr2[j].radio === 0 && (!arr2[j].keyword)){
              this.$message.error({
                message:`${arr2[j].menuName}关键词不能为空`,
                center:true
              })
              return
            }else if(arr2[j].radio === 0 && (getBLen(arr2[j].keyword)>25)){
              this.$message.error({
                message:`关键词长度不超过12个汉字或25个字符`,
                center:true
              })
              return
            }
          }
        }
      }
      arr.map(item=>{
        let obj = {}
        if(item.children[0].menuName === ''){
          if(item.radio === 0){
            obj.reply = {}
            obj.reply.displayText = item.menuName
            obj.reply.postback = {}
            obj.reply.postback.data = item.keyword
          }else if(item.radio === 1){
            obj.action = {}
            obj.action.displayText = item.menuName
            obj.action.postback = {}
            obj.action.postback.data = item.url
            obj.action.urlAction = {}
            obj.action.urlAction.openUrl ={}
            obj.action.urlAction.openUrl.url = item.url
          }
        }else{
          obj.menu = {}
          obj.menu.displayText = item.menuName
          obj.menu.entries = []
          let arr2 = item.children.filter(item2=>{
            return item2.menuName
          })
          arr2.map(item3=>{
            let obj2 = {}
            if(item3.radio === 0){
              obj2.reply = {}
              obj2.reply.displayText = item3.menuName
              obj2.reply.postback = {}
              obj2.reply.postback.data = item3.keyword
            }else if(item3.radio === 1){
              obj2.action = {}
              obj2.action.displayText = item3.menuName
              obj2.action.postback = {}
              obj2.action.postback.data = item3.url
              obj2.action.urlAction = {}
              obj2.action.urlAction.openUrl ={}
              obj2.action.urlAction.openUrl.url = item3.url
            }
            obj.menu.entries.push(obj2)
          })
        }
        entries.push(obj)
      })
      let obj0 = {}
      obj0.menu ={}
      obj0.menu.entries = entries
      // console.log(this.menuList)
      let params = {
        channelId: this.selectTreeId,
        customMenuPublishStatus:val,
        menuJson: JSON.stringify(obj0),
        selfMenuJson: JSON.stringify(this.menuList)
      }
      let msg = ''
      if(val === 1){
        msg ='保存成功'
      }else if(val === 2){
        msg ='发布成功'
      }else{
        msg ='删除成功'
      }
      undateCustomMenuList(params).then(res=>{
        if(res.data.status === 0){
          this.$message.success({
            message:msg,
            center:true
          })
          if(val === 1){
            this.publicStatus = 1
          }else if(val === 2){
            this.publicStatus = 2
          }
        }else{
          this.$message.error({
            message:res.data.message,
            center:true
          })
        }
      }).catch(err=>{
        this.$message.error({
          message:err,
          center:true
        })
      })
    },
    // 保存并发布
    saveAndPublish(){
      this.$confirm('发布成功后会覆盖原版本，且将在24小时内对所有用户生效，确认发布？',{
        cancelButtonText: "取 消",
        confirmButtonText: "确 认",
        confirmButtonClass:'btn-custom-confirm',
        center:true
      })
        .then(()=>{
          this.saveAction(2)
        })
        .catch(()=>{

        })
    },
    // 重置默认条件
    resetAction(){
      this.activeIndex = 0
      this.activeSubIndex = null
      this.menuInfo = false
      this.subMenuInfo = false
      this.disabled = true
      this.showSortBtn = true
      this.onlyShowMenuName = false
    },
  },
  mounted() {
    this.getTreeList();
  },
};
</script>

<style lang="less"  scoped>
#customMenu {
  width: 100%;
  height: 100%;
  color: #333;
  letter-spacing: 0.75px;
  .title {
    // width: 100%;
    height: 96px;
    line-height: 96px;
    margin-left: 70px;
    font-size: 20px;
  }
  .container {
    width: 100%;
    height: calc(100% - 90px);
    display: flex;
    .customMenuLeft {
      width: 276px;
      min-height: 100%;
      overflow: auto;
      box-sizing: border-box;
      border-right: 1px solid #e5e5e5;
      .el-tree {
        margin: 0 20px;
        overflow: auto;
        color: #333;
        min-width: 85%;
        display: inline-block !important;
        font-size: 14px;
        /deep/.el-tree-node__children {
          color: #666;
        }
      }
    }
    .customMenuRight {
      margin-left: 10px;
      width: calc(100% - 286px);
      // min-height: 100%;
      padding-right: 28px;
      padding-bottom: 10px;
      box-sizing: border-box;
      .haveData {
        .header {
          height: 66px;
          padding: 0 32px;
          box-sizing: border-box;
          background: #f6f6f6;
          margin: 0 4px 0 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .headerLeft {
            margin-right: 59px;
            font-size: 12px;
            color: #666;
            letter-spacing: 0px;
          }
        }
        .customMenuRightMain {
          display: flex;
          margin-top: 40px;
          .mainLeft {
            margin-left: 40px;
            padding-right: 19px;
            width: 296px;
            height: 582px;
            background: url("../../assets/images/bg_phone.png") 0 0 no-repeat;
            background-size: 296px 582px;
            position: relative;
            .mainLeftHeader {
              padding: 33px 50px 0;
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                width: 18px;
                height: 18px;
                display: block;
                margin-right: 4px;
                border-radius: 50%;
              }
              span {
                font-size: 14px;
                font-weight: 700;
                color: #000000;
                max-width: 120px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .menuList {
              flex: 1;
              margin: 0;
              padding-left: 0;
              position: absolute;
              left: 55px;
              bottom: 1px;
              width: 240px;
              height: 49px;
              .menuDraggable{
                width: 100%;
                display: flex;
                .menu_item0{
                  width: 240px;
                  height: 49px;
                  font-size: 14px;
                  text-align: center;
                  line-height: 49px;
                  cursor: pointer;
                  .el-icon-plus{
                    margin-right: 4px;
                    font-weight: 900;
                  }
                }
                .menu_item{
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 49px;
                  line-height: 49px;
                  width: 50%;
                  border: 1px solid transparent;
                  border-left: 1px solid #E5E5E5;
                  box-sizing: border-box;
                  font-size: 14px;
                  color: #333;
                  position: relative;
                  .menuName{
                    width: 100%;
                    height: 100%;
                    display: block;
                    cursor: pointer;
                    text-align: center;
                    padding-left: 5px;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img{
                      width: 20px;
                      height: 20px;
                      display: block;
                    }
                    span{
                      flex: 1;
                      display: block;
                      overflow: hidden;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                  }
                  .subMenu{
                    width: 100%;
                    padding: 0;
                    text-align: center;
                    position: absolute;
                    bottom:  60px;
                    left: -1px;
                    border: 1px solid #E5E5E5;
                    border-bottom: 0;
                    background: #FAFAFA;
                    .triangle{
                      width: 0;
                      height: 0;
                      border-width: 9px 9px;
                      border-style: solid;
                      border-color: #E5E5E5 transparent transparent;
                      position: absolute;
                      left: 50%;
                      bottom: -18px;
                      transform: translateX(-50%);
                    }
                    .triangle::after {
                      content: "";
                      position: absolute;
                      top: -11px;
                      left: -10px;
                      border-width: 10px 10px;
                      border-style: solid;
                      border-color: #FAFAFA transparent transparent;
                    }
                    .subMenuItem{
                      color: #333;
                      font-size: 14px;
                      height: 49px;
                      border: 1px solid transparent;
                      border-bottom: 1px solid #E5E5E5;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      img{
                        width: 20px;
                        height: 20px;
                        display: block;
                      }
                      span{
                        display: block;
                        flex: 1;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        padding-left: 3px;
                        padding-right: 1px;
                        box-sizing: border-box;
                      }
                    }
                    .subActive{
                      color: #368CFE;
                      border: 1px solid #368CFE;
                      box-sizing: border-box;
                    }
                  }
                }
                .menu_item1{
                  width: 33.3333%;
                }
                .active{
                  color: #368CFE;
                  border: 1px solid #368CFE;
                  box-sizing: border-box;
                }
              }
            }
          }
          .mianRight{
            flex: 1;
            margin-right: 20px;
            // min-width: 57%;
            .menuInfo{
              width: 100%;
              height: 100%;
              padding:0 32px 0 32px;
              box-sizing: border-box;
              background-color: #F8F8FB;
              .mianRightHeader{
                display: flex;
                align-items: center;
                justify-content: space-between;
                line-height: 44px;
                font-size: 14px;
                color: #333;
                border-bottom: 1px solid #E5E5E5;
                box-sizing: border-box;
                span:nth-of-type(2){
                  color: #368CFE;
                  cursor: pointer;
                }
              }
              .menuDetail{
                margin-top: 30px;
                .keyword{
                  padding: 20px;
                  background-color: #fff;
                  border: 1px solid #E5E5E5;
                  .title{
                    font-size: 10px;
                    color: #999;
                    line-height: 10px;
                    margin: 0;
                  }
                  .el-form-item{
                    margin-top: 20px;
                  }
                }
                .tip{
                  display: block;
                  line-height: 20px;
                  font-size: 12px;
                  color: #999;
                }
                .errtip{
                  display: block;
                  line-height: 20px;
                  font-size: 12px;
                  color: #F56C6C;
                }
              }
            }
            .sortTip{
              display: block;
              font-size: 14px;
              color: #666;
              margin-top: 240px;
              margin-left: 90px;
            }
          }
        }
        .btn{
          margin:39px 0 30px 0;
          .el-button{
            margin-left: 150px;
          }
          .el-button:nth-of-type(3){
            margin-left: 50px;
          }
        }
      }
      .emptyData {
        color: #666;
        margin-top: 200px;
        margin-left: 45%;
      }
    }
  }
}
.el-input {
  width: 224px;
}
.el-input__inner {
  width: 224px;
}
#customMenu /deep/ .el-tree-node__content {
  height: 34px;
}
#customMenu
  /deep/
  .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  background-color: #f8f8fb;
}
// 更改tree组件icon
.el-tree /deep/ .el-tree-node__expand-icon.expanded {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
//有子节点 且未展开
.el-tree /deep/ .el-icon-caret-right:before {
  background: url("../../assets/svg/fold_icon.svg") no-repeat 0 0;
  content: "";
  display: block;
  width: 14px;
  height: 14px;
  font-size: 14px;
  background-size: 14px;
}
//有子节点 且已展开
.el-tree /deep/ .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
  background: url("../../assets/svg/unfold_icon.svg") no-repeat 0 0;
  content: "";
  display: block;
  width: 14px;
  height: 14px;
  font-size: 14px;
  background-size: 14px;
}
.el-tree /deep/.el-tree-node__expand-icon.is-leaf::before {
  background: url("../../assets/svg/file_icon.svg") no-repeat 0 0;
  content: "";
  display: block;
  width: 14px;
  height: 14px;
  font-size: 14px;
  background-size: 14px;
}
.el-switch.is-disabled {
 opacity: 1;
}
/deep/ .el-switch.is-disabled .el-switch__core, .el-switch.is-disabled .el-switch__label {
  cursor: pointer !important;;
}
</style>
