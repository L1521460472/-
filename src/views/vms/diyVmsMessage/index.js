import vuedraggable from "vuedraggable";
import { getBusinessLis, enterpriseApplist, save, saveAndAudit, MessageMould, imageGroup, imageLists, getFile,signConfigList} from '@/api/vms/diyVmsMessage'
export default {
    name:'diyVmsMessage',
    data() {
        return {
            List: [
                {
                    id: 1,
                    imgUrl: require("../../../assets/svg/icon_32px_正文.svg"),
                    content: "内容文本",
                },
                {
                    id: 2,
                    imgUrl: require("../../../assets/svg/icon_32px_图片.svg"),
                    content: "图片文本",
                },
                {
                    id: 3,
                    imgUrl: require("../../../assets/svg/icon_32px_音频.svg"),
                    content: "音频文本",
                },
                {
                    id: 4,
                    imgUrl: require("../../../assets/svg/icon_32px_视频.svg"),
                    content: "视频文本",
                },
            ],
            centerImgUrl: require("../../../assets/svg/组件.svg"),
            moduleImgUrl:require("../../../assets/svg/模板.svg"),
            msg:"拖拽文本组件至此",
            items:[],
            form:{
                name:'',//模板名称
                businessType:'',//业务类型
                msgType:'',//模板类型
                app:'',//应用
                signature:'',//签名
                desc:'',//普通value
                descChange:'',//变量value
            },
            businessOptions:[],
            msgOptions:[
                {
                    value: "6",
                    label: "普通模板",
                },
                {
                    value: "7",
                    label: "变量模板",
                },
            ],
            appOptions:[],
            signatureOptions:[],
            productType: 3,//产品类型
            Num:0,
            isContent: true, //是否显示拖动组件文字
            isModuleDisable:true,
            number:0,
            count:0,
            text:false,
            image:false,
            audio:false,
            video:false,
            isConfirmAdd:false,
            isShow:true,//是否中间显示输入的文本
            isRightModule:true,//是否右侧模板设置
            flag:false,//是否播放音频
            dialogVisible:false,//弹框
            type: 0,//0 文本，1 图片 2.音频 3.视频
            falg:false,//保存提交审核模板名称是否为空
            checkStatus:0,//0.未审核 1.审核通过
            messageMouldId: "", //模板ID
            groupsList:[{ id: 0, name: "我的图片", total: 0 }],//图片分组列表
            countNum:0,//选中素材条数
            groupsImageList:[],//图片列表
            groupsAudioList:[],//音频列表
            audioTimeList:[],//音频时长列表
            groupsVideoList:[],//视频列表
            checkbox: [], //图片,音频,视频单选
            fileIndex: 0,//组件的index
            isDisableGroupsList: 0, //点击分组list是否有背景色
            currentpage: 1,//素材页码
            total: 1, //素材总数
        }
    },
    methods: {
        //返回
        handleBack () {
            if (this.Num > 0) {
                this.$confirm("未保存编辑内容，是否保存离开消息编辑器？", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    confirmButtonClass: "btn-custom-confirm",
                    center: true,
                })
                    .then(() => {
                        this.status = true;
                        this.$router.back();
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消",
                            center: true,
                        });
                        this.status = false;
                    });
            } else {
                this.status = true;
                this.$router.back();
            }
        },
        //保存
        async handleSave(){
            if (this.form.name == "") {
                this.$message({
                    type: "warning",
                    message: "模板名称未设置!",
                    center: true,
                });
                this.falg = false;
                return;
            } else {
                this.falg = true;
            }
            if (this.form.app == '') {
                this.$message({
                    type: "warning",
                    message: "未选择应用!",
                    center: true,
                });
                return
            }
            if(this.form.signature == ''){
                this.$message({
                    type: "warning",
                    message: "未选择签名!",
                    center: true,
                });
                return
            }
            if(this.items.length == 0){
                this.$message({
                    type: "warning",
                    message: "内容不能为空!",
                    center: true,
                });
                return
            }else{
                var number = 0;
                this.items.map((item,index)=>{
                    if(item.type == 0){
                        if(item.content == ''){
                            number++
                        }
                    }else if(item.type == 1){
                        if(item.imgUrl == require('../../../assets/svg/icon_32px_图片.svg')){
                            number++
                        }
                    }else if(item.type == 2){
                        if(item.audioUrl == ''){
                            number++
                        }
                    }else if(item.type == 3){
                        if(item.playerOptions.sources[0].src == ''){ 
                            number++
                        }
                    }
                })
                if(number > 0){
                    this.$message({
                        type: "warning",
                        message: "内容不能为空!",
                        center: true,
                    });
                    return
                }
            }
            this.isConfirmAdd = true;
            var params = {
                businessType: this.form.businessType, //业务类型----------------------
                channelId: '',//通道id
                content: '', //文本内容
                cssContent: "", //文本文件样式数据
                enterpriseAccountAppId: this.form.app,//企业应用id------------------------
                fallbackDTO: {
                    content: '', //回落内容
                    id: '', //回落消息id,更新时必传
                    messageMouldType: '', //消息类型：0 文本消息，1 文件消息
                    messageVersion: '', //消息版本：0 UP2.4消息，1 UP1.0消息，2 SMS消息
                },
                smsFallbackDTO: {
                    content: '', //回落内容
                    id: '', //回落消息id,更新时必传
                    messageMouldType: '', //消息类型：0 文本消息，1 文件消息
                    messageVersion: '', //消息版本：0 UP2.4消息，1 UP1.0消息，2 SMS消息
                },
                fileGroupDetailId: '', //素材id
                id: this.form.id, //主键，更新必传-----------------------
                messageFall: 1, //消息回落：0开启，1关闭
                messageFallType: '', //消息回落类型 1 UP1.0消息，2 SMS消息 ，3 UP1.0消息 SMS消息
                messageType: this.form.msgType, //消息类型：0 文本消息，1 文件消息，2 卡片消息 3 变量消息
                messageVersion: '', //消息版本：0 UP2.4消息，1 UP1.0消息，2 SMS消息
                name: this.form.name, //模板名称------------------------
                productType: this.productType, //产品类型
                signName:this.form.signature,//签名
                suggestions: [], //建议回复列表，可不传,底部菜单按钮
                vmsMessageContents: this.items,
            };
            return save(params)
                .then((res) => {
                    if(res.data.status == 0){
                        this.isConfirmAdd = false;
                        this.messageMouldId = res.data.data.id;
                        this.form.id = res.data.data.id;
                        this.handleSet();
                        this.Num = -2;
                        this.$message({
                            type: "success",
                            message: "保存成功!",
                            center: true,
                        });
                    }else{
                        this.isConfirmAdd = false;
                        this.$message({
                            type: "error",
                            message: res.data.message,
                            center: true,
                        });
                    }
                })
                .catch((error) => {
                    this.$message.error({
                        message: error,
                        center: true,
                    });
                });
        },
        //保存并审核
        async handleSaveAndAudit(){
            if (this.form.app == '') {
                this.$message({
                    type: "warning",
                    message: "未选择应用!",
                    center: true,
                });
                return
            }
            if(this.form.signature == ''){
                this.$message({
                    type: "warning",
                    message: "未选择签名!",
                    center: true,
                });
                return
            }
            await this.handleSave();
            if (this.falg) {
                if (this.checkStatus !== 1) {
                    saveAndAudit(this.messageMouldId)
                        .then(() => {      
                            this.handleBack();
                        })
                        .catch((error) => {
                            this.$message.error({
                                message: error,
                                center: true,
                            });
                        });
                }
            }
        },
        //根据业务类型获取应用
        handleChangeGetApp(){
            enterpriseApplist({businessType:this.form.businessType,productType:3}).then(res => {
                this.appOptions = res.data.data;
            })
        },
        //点击基础组件
        handleFocus (e) {
            this.isModuleDisable = false;
            this.moduleImgUrl = require("../../../assets/images/icon-14px-模板@1x-1.png");
        },
        //模板设置
        handleSet () {
            this.isRightModule = true;
            this.isModuleDisable = true;
            this.moduleImgUrl = require("../../../assets/images/icon-14px-模板@1x.png");
        },
        handleInput(){
            this.isShow = false
        },
        handleInputChange(){
            this.isShow = false
        },
        //查询企业签名列表
        getsignConfigList(){
            signConfigList({}).then(res=>{
                this.signatureOptions = res.data.data
            }).catch(error=>{
                this.$message.error({
                    message: error,
                    center: true,
                });
            })
        },
        //添加变量
        handleAddChange (index) {
            const elInput = this.$refs[`targetIn${index}`][0].$el.firstElementChild; // 拿到目标标签；
            this.number = 0;
            var offset = 0;
            do {
                offset = this.items[index].content.indexOf('{ 变量', offset);
                if (offset != -1) {
                    this.number++;
                    offset += '{ 变量'.length;
                }
            } while (offset != -1)
            this.number++;
            const str = ` { 变量 ${this.number} } `;
            // 获取el-input的值
            let txt = elInput.value;
            // 做插入前做长度校验（如果有这个需要的话）
            // if (txt.length + value.length > 64) {
            //     return;
            // }
            // 获取选区开始位置
            let startPos = elInput.selectionStart;
            // 获取选区结束位置
            let endPos = elInput.selectionEnd;
            if (startPos === undefined || endPos === undefined) return;

            // 将文本插入光标位置
            this.items[index].content =
                txt.substring(0, startPos) + str + txt.substring(endPos);
            // 将光标移至文本末尾
            elInput.focus();
            elInput.selectionStart = startPos + str.length;
            elInput.selectionEnd = startPos + str.length;
        },
        //点击基础组件创建模板
        handleClick(index){
            this.isShow = false;
            this.isRightModule = false;
            if(index == 0){
                this.items.push({type:0,content:''})
                this.count = this.items.length - 1;
            }else if(index == 1){
                this.items.push({type:1,imgUrl:require('../../../assets/svg/icon_32px_图片.svg'),imgType:'png/pemg'})
                this.count = this.items.length - 1;
            }else if(index == 2){
                this.items.push({type:2,audioUrl:'',audioPlayUrl:require('../../../assets//images/icon-14px-播放@1x-1.png'),audioType:'mp3',currentTime:'0',duration:'0',voiceValue:30,flag:false,isSlider:false,})
                this.count = this.items.length - 1;
            }else{
                this.items.push({type:3,playerOptions: {
                    //播放速度
                    // playbackRates: [0.5, 1.0, 1.5, 2.0],
                    //如果true,浏览器准备好时开始回放。
                    autoplay: false,
                    // 默认情况下将会消除任何音频。
                    muted: false,
                    // 导致视频一结束就重新开始。
                    loop: false,
                    // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    preload: "auto",
                    language: "zh-CN",
                    // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    aspectRatio: "16:9",
                    // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    fluid: true,
                    sources: [
                        {
                            //类型
                            type: "video/mp4" || "video/3gp" || "video/3gpp" || "video/ogg",
                            //url地址
                            src:'',
                        },
                    ],
                    //你的封面地址
                    poster: '',
                    //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    notSupportedMessage: "此视频暂无法播放，请稍后再试",
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        //全屏按钮
                        fullscreenToggle: false,
                    },
                },videoType:'mp4'})
                this.count = this.items.length - 1;
            }
        },
        //点击中间哪个组件右侧显示相应内容
        handleIndex(index){
            this.isRightModule = false;
            this.count = index;
        },
        //删除组件
        handleDelete(index){
            this.items.splice(index,1)
            if(index >= 1){
                this.count = index - 1;
            }else{
                this.count = index;
            }
            if(this.items.length == 0){
                this.isShow = true;
                this.handleSet();
            }
        },
        //弹框
        async handleNavButton (index,type) {
            this.fileIndex = index;
            if (this.form.app == '') {
                this.$message({
                    type: "warning",
                    message: "应用未选择!",
                    center: true,
                });
                return
            }
            this.checkbox = [];
            if (type == 1) {
                this.type = 1;
                imageGroup({ fileType: 1, fileStatus: 1, enterpriseAccountAppId: this.form.app })
                    .then((res) => {
                        this.groupsList = [{ id: 0, name: "我的图片", total: null }];
                        res.data.data.map((item) => {
                            this.groupsList.push(item);
                        });
                    })
                    .catch((error) => {
                        this.$message.error({
                            message: error,
                            center: true,
                        });
                    });
                imageLists({
                    enterpriseAccountAppId: this.form.app,
                    fileType: 1,
                    fileStatus: 1,
                    pageSize: 18,
                    currentPage: 1,
                })
                    .then((res) => {
                        this.groupsImageList = res.data.data.records;
                        this.total = res.data.data.total;
                        this.$nextTick(() => {
                            this.groupsList[0].total = res.data.data.total;
                        });
                    })
                    .catch((error) => {
                        this.$message.error({
                            message: error,
                            center: true,
                        });
                    });
            } else if (type == 2) {
                this.type = 2;
                imageLists({
                    enterpriseAccountAppId: this.form.app,
                    fileType: 2,
                    fileStatus: 1,
                    pageSize: 4,
                    currentPage: 1,
                })
                    .then((res) => {
                        this.groupsAudioList = res.data.data.records;
                        this.total = res.data.data.total;
                    })
                    .catch((error) => {
                        this.$message.error({
                            message: error,
                            center: true,
                        });
                    });
            } else if (type == 3) {
                this.type = 3;
                imageLists({
                    enterpriseAccountAppId: this.form.app,
                    fileType: 3,
                    fileStatus: 1,
                    pageSize: 4,
                    currentPage: 1,
                })
                    .then((res) => {
                        this.groupsVideoList = res.data.data.records;
                        this.total = res.data.data.total;
                    })
                    .catch((error) => {
                        this.$message.error({
                            message: error,
                            center: true,
                        });
                    });
            }
            this.dialogVisible = true;
        },
        //点击图片分组
        handleGroupsList (index, id) {
            this.isDisableGroupsList = index;
            this.fileGroupId = id;
            this.currentpage = 1;
            imageLists({
                channelId: this.channelValue,
                enterpriseAccountAppId: this.appValue,
                fileType: 1,
                fileStatus: 1,
                fileGroupId: this.fileGroupId == 0 ? null : this.fileGroupId,
                pageSize: 18,
                currentPage: 1,
            })
                .then((res) => {
                    this.groupsImageList = res.data.data.records;
                    this.total = res.data.data.total;
                })
                .catch((error) => {
                    this.$message.error({
                        message: error,
                        center: true,
                    });
                });
        },
        //素材分页
        handleCurrentChange (val) {
            if (this.type == 1) {
                imageLists({
                    channelId: this.channelValue,
                    enterpriseAccountAppId: this.appValue,
                    fileType: 1,
                    fileStatus: 1,
                    fileGroupId: this.fileGroupId == 0 ? null : this.fileGroupId,
                    pageSize: 18,
                    currentPage: val,
                })
                    .then((res) => {
                        this.groupsImageList = res.data.data.records;
                        this.total = res.data.data.total;
                    })
                    .catch((error) => {
                        this.$message.error({
                            message: error,
                            center: true,
                        });
                    });
            } else if (this.type == 2) {
                imageLists({
                    channelId: this.channelId,
                    enterpriseAccountAppId: this.appValue,
                    fileType: 2,
                    fileStatus: 1,
                    pageSize: 4,
                    currentPage: val,
                })
                    .then((res) => {
                        this.groupsAudioList = res.data.data.records;
                        this.total = res.data.data.total;
                    })
                    .catch((error) => {
                        this.$message.error({
                            message: error,
                            center: true,
                        });
                    });
            } else if (this.type == 3) {
                imageLists({
                    channelId: this.channelId,
                    enterpriseAccountAppId: this.appValue,
                    fileType: 3,
                    fileStatus: 1,
                    pageSize: 4,
                    currentPage: val,
                })
                    .then((res) => {
                        this.groupsVideoList = res.data.data.records;
                        this.total = res.data.data.total;
                    })
                    .catch((error) => {
                        this.$message.error({
                            message: error,
                            center: true,
                        });
                    });
            }
        },
        //音频时间
        handleDurations () {
            for (var i = 0; i < this.$refs.audioList.length; i++) {
                var h = Math.floor(this.$refs.audioList[i].duration / 360);
                var m =
                    Math.floor(this.$refs.audioList[i].duration / 60) < 10
                        ? "0" + Math.floor(this.$refs.audioList[i].duration / 60)
                        : Math.floor(this.$refs.audioList[i].duration / 60);
                var s = Math.floor(this.$refs.audioList[i].duration % 60);
                var str = h > 0 ? h + ":" + m + ":" + s : m + ":" + s;
                this.audioTimeList.push(str);
                return;
            }
        },
        //确认图片
        confirmImage () {
            if (this.checkbox.length > 0) {
                this.type = 1;
                this.dialogVisible = false;
                getFile({ fileGroupDetailId: this.checkbox[0] })
                    .then((res) => {
                        this.items[this.fileIndex].fileDetailId = res.data.data.id;
                        this.items[this.fileIndex].imgUrl = res.data.data.fileUrl;
                        this.items[this.fileIndex].imgType = res.data.data.fileUploadType;
                        this.items[this.fileIndex].type = 1;
                        this.items[this.fileIndex].content = '';
                    })
                    .catch((error) => {
                        this.$message.error({
                            message: error,
                            center: true,
                        });
                    });
            } else {
                this.$message({
                    message: "请选择文件！",
                    type: "warning",
                    center: true,
                });
            }
        },
        //确认音频
        confirmAudio () {
            if (this.checkbox.length > 0) {
                this.type = 2;
                this.dialogVisible = false;
                getFile({ fileGroupDetailId: this.checkbox[0] })
                    .then((res) => {
                        this.items[this.fileIndex].fileDetailId = res.data.data.id;
                        this.items[this.fileIndex].audioUrl = res.data.data.fileUrl;
                        this.items[this.fileIndex].audioType = res.data.data.fileUploadType;
                        this.items[this.fileIndex].type = 2;
                        this.items[this.fileIndex].content = '';
                        this.$refs[`audio${this.fileIndex}`][0].load();
                    })
                    .catch((error) => {
                        this.$message.error({
                            message: error,
                            center: true,
                        });
                    });
            } else {
                this.$message({
                    message: "请选择文件！",
                    type: "warning",
                    center: true,
                });
            }
        },
        //确认视频
        confirmVideo () {
            if (this.checkbox.length > 0) {
                this.type = 3;
                this.dialogVisible = false;
                getFile({ fileGroupDetailId: this.checkbox[0] })
                    .then((res) => {
                        this.items[this.fileIndex].fileDetailId = res.data.data.id;
                        this.items[this.fileIndex].playerOptions.sources[0].src = res.data.data.fileUrl;
                        this.items[this.fileIndex].videoType = res.data.data.fileUploadType;
                        this.items[this.fileIndex].type = 3;
                        this.items[this.fileIndex].content = '';
                    })
                    .catch((error) => {
                        this.$message.error({
                            message: error,
                            center: true,
                        });
                    });
            } else {
                this.$message({
                    message: "请选择文件！",
                    type: "warning",
                    center: true,
                });
            }
        },
        //取消
        cancle () {
            this.dialogVisible = false;
        },
        //音频播放end
        handleEnded (index) {
            this.items[index].audioPlayUrl = require("../../../assets/images/icon-14px-播放@1x-1.png");
            this.items[index].flag = false;
        },
        //音频时长
        handleDuration (index) {
            var h = Math.floor(this.$refs[`audio${index}`][0].duration / 360);
            var m =
                Math.floor(this.$refs[`audio${index}`][0].duration / 60) < 10
                    ? "0" + Math.floor(this.$refs[`audio${index}`][0].duration / 60)
                    : Math.floor(this.$refs[`audio${index}`][0].duration / 60);
            var s = Math.floor(this.$refs[`audio${index}`][0].duration % 60);
            var str = h > 0 ? h + ":" + m + ":" + s : m + ":" + s;
            this.items[index].duration = str;
        },
        //音频播放ing
        handlePlaying (e,index) {
            var h = Math.floor(e.target.currentTime / 360);
            var m =
                Math.floor(e.target.currentTime / 60) < 10
                    ? "0" + Math.floor(e.target.currentTime / 60)
                    : Math.floor(e.target.currentTime / 60);
            var s =
                Math.floor(e.target.currentTime % 60) < 10
                    ? "0" + Math.floor(e.target.currentTime % 60)
                    : Math.floor(e.target.currentTime % 60);
            var str = h > 0 ? h + ":" + m + ":" + s : m + ":" + s;
            this.items[index].currentTime = str;
        },
        //播放音频
        handlePlay (index) {
            this.items[index].flag = !this.items[index].flag;
            if (this.items[index].flag) {
                this.$refs[`audio${index}`][0].play();
                this.items[index].audioPlayUrl = require("../../../assets/images/icon-14px-暂停@1x.png");
            } else {
                this.$refs[`audio${index}`][0].pause();
                this.items[index].audioPlayUrl = require("../../../assets/images/icon-14px-播放@1x-1.png");
            }
        },
        //音量大小
        handleSlider (index) {
            this.$refs[`audio${index}`][0].volume = this.items[index].voiceValue / 100;
        },
        //放到何处
        allowDrop (ev) {
            ev.preventDefault();
        },
        //拖动什么
        drag (ev, index) {
            // 
            if(index == 0){
                this.text = true;
            }else if(index == 1){
                this.image = true;
            }else if(index == 2){
                this.audio = true;
            }else if(index == 3){
                this.video = true;
            }
            ev.dataTransfer.setData("Text", index);
        },
        //进行放置
        drop (ev) {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("Text");
            this.isModuleDisable = false;
            this.moduleImgUrl = require("../../../assets/images/icon-14px-模板@1x-1.png");
            // ev.target.appendChild(document.getElementById(data));

            this.isShow = false;
            this.isRightModule = false;
            if(data == 0 && this.text){
                this.items.push({type:0,content:''})
                this.count = this.items.length - 1;
                this.text = false;
            }else if(data == 1 && this.image){
                this.items.push({type:1,imgUrl:require('../../../assets/svg/icon_32px_图片.svg'),imgType:'png/pemg'})
                this.count = this.items.length - 1;
                this.image = false;
            }else if(data == 2 && this.audio){
                this.items.push({type:2,audioUrl:'',audioPlayUrl:require('../../../assets//images/icon-14px-播放@1x-1.png'),audioType:'mp3',currentTime:'0',duration:'0',voiceValue:30,flag:false,isSlider:false,})
                this.count = this.items.length - 1;
                this.audio = false;
            }else if(data == 3 && this.video){
                this.items.push({type:3,playerOptions: {
                    //播放速度
                    // playbackRates: [0.5, 1.0, 1.5, 2.0],
                    //如果true,浏览器准备好时开始回放。
                    autoplay: false,
                    // 默认情况下将会消除任何音频。
                    muted: false,
                    // 导致视频一结束就重新开始。
                    loop: false,
                    // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    preload: "auto",
                    language: "zh-CN",
                    // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    aspectRatio: "16:9",
                    // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    fluid: true,
                    sources: [
                        {
                            //类型
                            type: "video/mp4" || "video/3gp" || "video/3gpp" || "video/ogg",
                            //url地址
                            src:'',
                        },
                    ],
                    //你的封面地址
                    poster: "",
                    //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    notSupportedMessage: "此视频暂无法播放，请稍后再试",
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        //全屏按钮
                        fullscreenToggle: true,
                    },
                },videoType:'mp4'})
                this.count = this.items.length - 1;
                this.video = false;
            }else{
                return
            }
        },
    },
    mounted() {
        getBusinessLis({ id: 3 }).then(res => {
            if(res.data.data.length > 0){
                this.businessOptions = res.data.data;
                if(!this.$route.query.id){
                    this.form.businessType = res.data.data[0].id;
                    this.handleChangeGetApp();
                }else{
                    this.handleChangeGetApp();
                }
            }
        })
        this.getsignConfigList()
        if(this.$route.query.id){
            MessageMould({ messageMouldId: this.$route.query.id }).then((res)=>{
                this.form.businessType = res.data.data.businessType;
                this.form.id = res.data.data.id;
                this.form.name = res.data.data.name;
                this.form.app = res.data.data.enterpriseAccountAppId;
                this.form.signature = res.data.data.signName;
                var arr = res.data.data.vmsMessageContentList;
                arr.map((item,index)=>{
                    if(item.type == 1){
                        arr[index].imgUrl = item.fileDetailUrl
                        arr[index].imgType = item.fileUploadType
                    }else if(item.type == 2){
                        arr[index].audioPlayUrl = require('../../../assets//images/icon-14px-播放@1x-1.png')
                        arr[index].audioUrl = item.fileDetailUrl
                        arr[index].audioType = item.fileUploadType
                        arr[index].currentTime = '0'
                        arr[index].duration = '0'
                        arr[index].voiceValue = 30
                        arr[index].flag = false
                        arr[index].isSlider = false
                    }else if(item.type == 3){
                        arr[index].playerOptions = {
                            //播放速度
                            // playbackRates: [0.5, 1.0, 1.5, 2.0],
                            //如果true,浏览器准备好时开始回放。
                            autoplay: false,
                            // 默认情况下将会消除任何音频。
                            muted: false,
                            // 导致视频一结束就重新开始。
                            loop: false,
                            // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                            preload: "auto",
                            language: "zh-CN",
                            // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                            aspectRatio: "16:9",                                                                 
                            // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                            fluid: true,
                            sources: [
                                {
                                    //类型
                                    type: "video/mp4" || "video/3gp" || "video/3gpp" || "video/ogg",
                                    //url地址
                                    src:item.fileDetailUrl,
                                },
                            ],
                            //你的封面地址
                            poster: "",
                            //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                            notSupportedMessage: "此视频暂无法播放，请稍后再试",
                            controlBar: {
                                timeDivider: true,
                                durationDisplay: true,
                                remainingTimeDisplay: false,
                                //全屏按钮
                                fullscreenToggle: true,
                            },
                        }
                    }
                })
                this.items = arr;
                this.isShow = false;
                this.isRightModule = false;
            }).catch((error)=>{
                this.$message.error({
                    message: error,
                    center: true,
                });
            })
        }
        if (this.$route.query.jum == "text") {
            this.form.msgType = '6'
        }else{
            this.form.msgType = '7'
        }
        this.Num = -3;
    },
    watch:{
        checkbox: function () {
            if (this.checkbox.length > 0) {
                this.countNum = 1;
            } else {
                this.countNum = 0;
            }
        },
        form: {
            handler (val) {
                if (val) {
                    this.Num++;
                }
            },
            deep: true,
        },
    },
    components: {
        vuedraggable,
    },
}