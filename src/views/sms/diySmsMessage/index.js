import {  getBusinessLis, enterpriseApplist, save, saveAndAudit, MessageMould,signConfigList} from '@/api/sms/diySmsMessage'
export default {
    name:'diySmsMessage',
    data() {
        return {
            List: [
                {
                    id: 1,
                    imgUrl: require("../../../assets/svg/icon_32px_正文.svg"),
                    content: "内容文本",
                },
            ],
            centerImgUrl: require("../../../assets/svg/组件.svg"),
            moduleImgUrl:require("../../../assets/svg/模板.svg"),
            msg:"拖拽文本组件至此",
            form:{
                id:'',
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
                    value: "4",
                    label: "普通模板",
                },
                {
                    value: "5",
                    label: "变量模板",
                },
            ],
            appOptions:[],
            signatureOptions:[],
            productType: 2,//产品类型
            Num:0,
            type: 1,
            istype2:false,
            istype3:false,
            isContent: true, //是否显示拖动组件文字
            isBosDisable:false,
            isModuleDisable:true,
            isConfirmAdd:false,
            number:0,//变量值
            isShow:true,//是否中间显示输入的文本
            falg:false,//保存提交审核模板名称是否为空
            checkStatus:0,//0.未审核 1.审核通过
            messageMouldId: "", //模板ID
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
            if(this.form.msgType == 4){
                if (this.form.desc == '') {
                    this.$message({
                        type: "warning",
                        message: "内容为空，请填写内容再保存!",
                        center: true,
                    });
                    return
                }
            }
            if(this.form.msgType == 5){
                if (this.form.descChange == '') {
                    this.$message({
                        type: "warning",
                        message: "内容为空，请填写内容再保存!",
                        center: true,
                    });
                    return
                }
            }
            if(this.form.signature == ''){
                this.$message({
                    type: "warning",
                    message: "未选择签名!",
                    center: true,
                });
                return
            }
            this.isConfirmAdd = true;
            var params = {
                businessType: this.form.businessType, //业务类型----------------------
                channelId: '',//通道id
                content: this.form.msgType == 4 ? this.form.desc : this.form.descChange, //文本内容----------------------
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
            if(this.form.msgType == 4){
                if (this.form.desc == '') {
                    this.$message({
                        type: "warning",
                        message: "内容为空，请填写内容再保存!",
                        center: true,
                    });
                    return
                }
            }
            if(this.form.msgType == 5){
                if (this.form.descChange == '') {
                    this.$message({
                        type: "warning",
                        message: "内容为空，请填写内容再保存!",
                        center: true,
                    });
                    return
                }
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
                    console.log(this.messageMouldId)
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
        //点击基础组件
        handleFocus (e) {
            this.isTitleDisable = false;
            this.isContentDisable = false;
            this.isModuleDisable = false;
            this.moduleImgUrl = require("../../../assets/images/icon-14px-模板@1x-1.png");
            this.moduleCardImgUrl = require("../../../assets/images/icon-14px-卡片@1x.png");
        },
        //模板设置
        handleSet () {
            this.type = 1;
            // this.isShow = true;
            this.isModuleDisable = true;
            this.isBosDisable = false;
            // this.isContent = true; //是否显示拖动组件文字
            this.centerImgUrl = require("../../../assets/images/icon-24px-组件@1x.png");
            this.moduleImgUrl = require("../../../assets/images/icon-14px-模板@1x.png");
        },
        //改变模板类型
        handleChange(){
            console.log(111)
            this.isShow = true;
            this.isContent = true;
            this.form.desc = '';
            this.form.descChange = '';
            if(this.type == 2){
                this.istype2 = true;
                this.istype3 = false;
            }else{
                this.istype2 = false;
                this.istype3 = true;
            }
        },
        //根据业务类型获取应用
        handleChangeGetApp(){
            enterpriseApplist({businessType:this.form.businessType,productType:2
            }).then(res => {
                this.appOptions = res.data.data;
            })
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
        handleInput(){
            this.isShow = false
            this.isBosDisable = false
        },
        handleInputChange(){
            this.isShow = false
            this.isBosDisable = false
        },
        handleAddChange () {
            const elInput = this.$refs.targetIn.$el.firstElementChild; // 拿到目标标签；
            this.number = 0;
            var offset = 0;
            do {
                offset = this.form.descChange.indexOf('{ 变量', offset);
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
            this.form.descChange =
                txt.substring(0, startPos) + str + txt.substring(endPos);
            // 将光标移至文本末尾
            elInput.focus();
            elInput.selectionStart = startPos + str.length;
            elInput.selectionEnd = startPos + str.length;
        },
        //点击组件创建模板
        handleClick(){
            this.centerImgUrl = require("../../../assets/images/icon-32px-正文@1x.png");
            this.isContent = false;
            this.isBosDisable = true;
            if(this.form.msgType == 4){
                this.type = 2
                this.istype2 = true
                this.istype3 = false
            }else{
                this.type = 3
                this.istype2 = false
                this.istype3 = true
            }
        },
        //放到何处
        allowDrop (ev) {
            ev.preventDefault();
        },
        //拖动什么
        drag (ev, index) {
            //
            this.isBosDisable = false;
            ev.dataTransfer.setData("Text", index);
        },
        //进行放置
        drop (ev) {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("Text");
            
            this.isModuleDisable = false;
            this.moduleImgUrl = require("../../../assets/images/icon-14px-模板@1x-1.png");
            this.isModuleCardDisable = false;
            this.moduleCardImgUrl = require("../../../assets/images/icon-14px-卡片@1x.png");
            // ev.target.appendChild(document.getElementById(data));

            this.centerImgUrl = require("../../../assets/images/icon-32px-正文@1x.png");
            this.isContent = false;
            this.isBosDisable = true;
            if(this.form.msgType == 4){
                this.type = 2
                this.istype2 = true
            }else{
                this.type = 3
                this.istype3 = true
            }
        },
    },
    mounted() {
        getBusinessLis({ id: 2 }).then(res => {
            this.businessOptions = res.data.data;
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
                this.form.signature = res.data.data.signName;
                this.form.app = res.data.data.enterpriseAccountAppId;
                this.centerImgUrl = require("../../../assets/images/icon-32px-正文@1x.png");
                this.isContent = false;
                this.isBosDisable = true;
                if(this.form.msgType == 4){
                    this.type = 2
                    this.istype2 = true
                    this.form.desc = res.data.data.content;
                    this.handleInput();
                }else{
                    this.type = 3
                    this.istype3 = true
                    this.form.descChange = res.data.data.content;
                    this.handleInput()
                }
            }).catch((error)=>{
                this.$message.error({
                    message: error,
                    center: true,
                });
            })
        }
        if (this.$route.query.jum == "text") {
            this.form.msgType = '4'
            
        }else{
            this.form.msgType = '5'
        }
        this.Num = -2;
    },
    watch:{
        form: {
            handler (val) {
                if (val) {
                    this.Num++;
                }
            },
            deep: true,
        },
    }
}