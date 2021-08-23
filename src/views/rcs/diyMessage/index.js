import vuedraggable from "vuedraggable";
import {
    imageGroup,
    imageLists,
    getFile,
    save,
    getBusinessLis,
    businessTypeList,
    saveAndAudit,
    saveCard,
    cardList,
    MessageMould,
    enterpriseApplist,
    channelList,
    deleteCard,
} from "@/api/message/diyMessage";
export default {
    name: "diyMessage",
    data () {
        return {
            isDisable: true,
            isConfirmAdd:false,
            isUP: false, //UP消息
            isSMS: false, //SMS消息
            isCard: false, //卡片消息
            isTemplateShow: true, //模板设置,卡片管理显示隐藏
            isModuleDisable: true, //模板设置文字颜色
            isModuleCardDisable: false, //卡片管理文字颜色
            isCardShow: false, //卡片管理显示隐藏
            isBosDisable: false, //点击T是否蓝色边框
            isButtonDisable: false, //点击F是否蓝色边框
            isCardButtonDisable: false, //点击M是否蓝色边框
            isTitleDisable: false, //点击卡片标题是否蓝色边框
            isContentDisable: false, //点击卡片内容是否蓝色边框
            isContent: true, //是否显示拖动组件文字
            isButtonText: true, //是否显示底部菜单按钮文字
            isCardButtonText: true, //是否显示卡片菜单按钮文字
            isBoxTT: false, //2.4拖拽组件后
            isBoxTTOne: false, //1.0拖拽组件后
            isBoxTTSMS: false, //SMS拖拽组件后
            isOpen: false, //悬浮菜单是否禁用
            buttonValue: false, //悬浮菜单
            msgBackValue: false, //消息回落
            dialogVisible: false, //弹框
            isSlider: false, //音量大小控件
            isDisableGroupsList: 0, //点击分组list是否有背景色
            isCardTitle: true, //显示点击编辑标题
            isCardContent: true, //显示点击编辑内容
            status: false, //编辑保存状态
            istype3: false, //中间2.4文本消息显示
            istype8: false, //中间确认图片文件时显示
            istype9: false, //中间确认音频文件时显示
            istype10: false, //中间确认视频文件时显示
            istype16: false, //中间编辑标题时显示
            istype17: false, //中间编辑内容时显示
            istype18: false, //中间1.0文本消息显示
            istype19: false, //中间1.0确认图片文件时显示
            istype20: false, //中间1.0确认音频文件时显示
            istype21: false, //中间1.0确认视频文件时显示
            istype22: false, //中间SMS文本消息显示
            istype41: false, //中间2.4变量消息显示
            istype42: false, //中间1.0变量消息显示
            istype43: false, //中间sms变量消息显示
            falg: true, //保存提交审核模板名称是否为空
            flag: false, //音频播放
            flagOne: false, //1.0音频播放
            type: 1, //1. 模板设置 2. 暂无组件 3. 内容文本 4. 底部悬浮菜单 5. 底部回复消息1 6. 底部打开链接1 7. 底部拨打电话1 8. 图片文件 9. 音频文件 10. 视频文件 11. 卡片管理 12. 卡片悬浮菜单
            //13. 卡片回复消息1 14. 卡片打开链接1 15. 卡片拨打电话1 16. 卡片标题 17. 卡片内容 18. up1.0内容 19. up1.0图片 20. up1.0音频 21. up1.0视频 22. sms内容 23. 底部回复消息2
            //24. 底部回复消息3 25. 底部回复消息4 26. 底部打开链接2 27. 底部打开链接3 28. 底部打开链接4 29. 底部拨打电话2 30. 底部拨打电话3 31. 底部拨打电话4 32. 卡片回复消息2
            //33. 卡片回复消息3 34. 卡片回复消息4 35. 卡片打开链接2 36. 卡片打开链接3 37. 卡片打开链接4 38. 卡片拨打电话2 39. 卡片拨打电话3 40. 卡片拨打电话4 41. 变量消息2.4 42. 变量消息1.0 43. 变量消息sms
            form: {
                id: "", //消息模板id
                name: "", //模板名称
                desc: "", //内容文本
                descChange: "", //变量文本
                descChangeOne: "", //变量文本1.0
                descChangeSMS: "", //变量文本sms
                cardTitleValue: "", //卡片标题内容
                cardContentValue: "", //卡片内容文本
                textImgUrl: "", //缩略图URL
                textImgType: "", //缩略图类型
                textAudioUrl: "", //音频URL
                textAudioType: "", //音频类型
                textVideoUrl: "", //视频URL
                textVideoType: "", //视频类型
                showTextMsg1: "", //底部显示文本消息1
                backTextMsg1: "", //底部回复文本消息1
                showTextLink1: "", //底部显示文本链接1
                LinkAddress1: "", //底部链接地址1
                showTextPhone1: "", //底部显示文本电话1
                phoneNumber1: "", //底部电话号码1
                showTextMsg2: "", //底部显示文本消息2
                backTextMsg2: "", //底部回复文本消息2
                showTextLink2: "", //底部显示文本链接2
                LinkAddress2: "", //底部链接地址2
                showTextPhone2: "", //底部显示文本电话2
                phoneNumber2: "", //底部电话号码2
                showTextMsg3: "", //底部显示文本消息3
                backTextMsg3: "", //底部回复文本消息3
                showTextLink3: "", //底部显示文本链接3
                LinkAddress3: "", //底部链接地址3
                showTextPhone3: "", //底部显示文本电话3
                phoneNumber3: "", //底部电话号码3
                showTextMsg4: "", //底部显示文本消息4
                backTextMsg4: "", //底部回复文本消息4
                showTextLink4: "", //底部显示文本链接4
                LinkAddress4: "", //底部链接地址4
                showTextPhone4: "", //底部显示文本电话4
                phoneNumber4: "", //底部电话号码4
                cardShowTextMsg1: "", //卡片显示文本消息1
                cardBackTextMsg1: "", //卡片回复文本消息1
                cardShowTextLink1: "", //卡片显示文本链接1
                cardLinkAddress1: "", //卡片链接地址1
                cardShowTextPhone1: "", //卡片显示文本电话1
                cardPhoneNumber1: "", //卡片电话号码1
                cardShowTextMsg2: "", //卡片显示文本消息2
                cardBackTextMsg2: "", //卡片回复文本消息2
                cardShowTextLink2: "", //卡片显示文本链接2
                cardLinkAddress2: "", //卡片链接地址2
                cardShowTextPhone2: "", //卡片显示文本电话2
                cardPhoneNumber2: "", //卡片电话号码2
                cardShowTextMsg3: "", //卡片显示文本消息3
                cardBackTextMsg3: "", //卡片回复文本消息3
                cardShowTextLink3: "", //卡片显示文本链接3
                cardLinkAddress3: "", //卡片链接地址3
                cardShowTextPhone3: "", //卡片显示文本电话3
                cardPhoneNumber3: "", //卡片电话号码3
                cardShowTextMsg4: "", //卡片显示文本消息4
                cardBackTextMsg4: "", //卡片回复文本消息4
                cardShowTextLink4: "", //卡片显示文本链接4
                cardLinkAddress4: "", //卡片链接地址4
                cardShowTextPhone4: "", //卡片显示文本电话4
                cardPhoneNumber4: "", //卡片电话号码4
                descOne: "", //1.0内容文本
                textImgUrlOne: "", //1.0缩略图URL
                textImgTypeOne: "", //1.0缩略图类型
                textAudioUrlOne: "", //1.0音频URL
                textAudioTypeOne: "", //1.0音频类型
                textVideoUrlOne: "", //1.0视频URL
                textVideoTypeOne: "", //1.0视频类型
                descSMS: "", //SMS内容文本
            },
            msg: "拖拽文本组件至此", //
            text: "UP2.4消息", //判断点击的消息是什么，让左侧组件可以拖动什么
            count: 0, //已选择多少张图片
            currentpage: 1,
            total: 1, //
            Num: "", //页面编辑累加次数
            checkStatus: 0,//0.未审核 1.审核通过
            number: 0, //变量N 2.4
            numberOne: 0, //变量N 1.0
            numberSMS: 0, //变量N sms
            cardId: "", //卡片ID
            oneId: "", //up1.0消息 id
            smsId: "", //sms消息 id
            arr1: [], //有几个相同的卡片回复菜单按钮
            brr1: [], //有几个相同的卡片链接菜单按钮
            crr1: [], //有几个相同的卡片电话菜单按钮
            arr: [], //有几个相同的底部回复菜单按钮
            brr: [], //有几个相同的底部链接菜单按钮
            crr: [], //有几个相同的底部电话菜单按钮
            messageMouldTypeOne: 0, //1.0消息类型：0 文本消息，1 文件消息
            messageFallType: "", //消息回落类型 1 UP1.0消息，2 SMS消息 ，3 UP1.0消息 SMS消息
            cardCount: null, //点击第几个卡片改变其样式
            fileGroupId: 0, //图片分组ID
            checkbox: [], //图片,音频,视频单选
            fileIdTow: "", //2.4素材ID
            fileIdOne: "", //1.0素材ID
            currentTime: "00:00", //已播放时长
            duration: "00:00", //音频时长
            currentTimeOne: "00:00", //已播放时长
            durationOne: "00:00", //音频时长
            voiceValue: 30, //音量大小
            contentStatus: 100, //点击T右边显示哪一块内容
            centerImgUrl: require("../../../assets/svg/组件.svg"),
            moduleImgUrl: require("../../../assets/svg/模板.svg"),
            moduleCardImgUrl: require("../../../assets/svg/卡片.svg"),
            imageUrl: "", //2.4图片上传路径
            audioUrl: "", //2.4音频路径
            imageUrlOne: "", //1.0图片上传路径
            audioUrlOne: "", //1.0音频路径
            audioImgUrl: require("../../../assets/images/icon-14px-播放@1x-1.png"), //音频播放图片
            businessOptions: [],
            msgOptions: [
                {
                    value: "0",
                    label: "文本模板",
                },
                {
                    value: "1",
                    label: "文件模板",
                },
                {
                    value: "2",
                    label: "卡片模板",
                },
                {
                    value: "3",
                    label: "变量模板",
                },
            ],
            appOptions: [], //应用
            channelOptions: [], //通道
            businessValue: "", //业务类型
            msgValue: "0", //消息类型 0 文本消息，1 文件消息，2 卡片消息, 3 变量消息
            appValue: "", //应用id
            channelValue: "", //通道id
            messageVersion: "0", //消息版本：0 UP2.4消息，1 UP1.0消息，2 SMS消息
            productType: "", //产品类型
            messageMouldId: "", //模板ID
            msgT: "内容组件", //type=2 的title
            msgN: "暂无组件", //type=2 的msg
            checkList: [], //消息回落UP1.0,SMS
            groupsList: [{ id: 0, name: "我的图片", total: 0 }], //分组list
            groupsImageList: [], //图片list
            audioTimeList: [], //音频时长list
            groupsAudioList: [], //音频list
            groupsVideoList: [], //视频list
            topList: [
                {
                    id: 1,
                    imgUrl: require("../../../assets/svg/icon_32px_正文_1.svg"),
                    content: "内容文本",
                },
                {
                    id: 2,
                    imgUrl: require("../../../assets/svg/icon_32px_图片_1.svg"),
                    content: "图片文本",
                },
                {
                    id: 3,
                    imgUrl: require("../../../assets/svg/icon_32px_音频_1.svg"),
                    content: "音频文本",
                },
                {
                    id: 4,
                    imgUrl: require("../../../assets/svg/icon_32px_视频_1.svg"),
                    content: "视频文本",
                },
            ],
            footerList: [
                {
                    id: 11,
                    imgUrl: require("../../../assets/svg/回复消息.svg"),
                    content: "回复消息",
                },
                {
                    id: 12,
                    imgUrl: require("../../../assets/svg/打开链接.svg"),
                    content: "打开链接",
                },
                {
                    id: 13,
                    imgUrl: require("../../../assets/svg/拨打电话.svg"),
                    content: "拨打电话",
                },
                {
                    id: 14,
                    imgUrl: require("../../../assets/svg/分享位置.svg"),
                    content: "分享位置",
                },
            ],
            cardButtonList: [], //卡片菜单按钮list
            buttonList: [], //底部菜单按钮list
            cardList: [], //卡片管理list
            playerOptions: {
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
                        type: "video/mp4",
                        //url地址
                        src:"http://218.17.210.115:11204/rt?port=19350&app=realTime&stream=014612477227_1",
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
            },
            playerOptionsOne: {
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
                        type: "video/mp4",
                        //url地址
                        src:"https://baijiahao.baidu.com/s?id=1674047529039306689&wfr=content",
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
            },
        };
    },
    methods: {
        //文本，文件保存并继续
        async handleSave () {
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
            if (this.appValue == '') {
                this.$message({
                    type: "warning",
                    message: "未选择应用!",
                    center: true,
                });
                return
            }
            // if (this.channelValue == '') {
            //     this.$message({
            //         type: "warning",
            //         message: "未选择通道!",
            //         center: true,
            //     });
            //     return
            // }
            if(this.buttonList.length > 0){
                var number1 = 0;
                var number2 = 0;
                var number3 = 0;
                var reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(.)+$/;
                this.buttonList.map(item=>{
                    if(item.title == "回复消息"){
                        number1++;
                    }
                    if(item.title == "打开链接"){
                        number2++;
                    }
                    if(item.title == "拨打电话"){
                        number3++;
                    }
                })
                if(number1 == 1){
                    if(this.form.showTextMsg1 == '' || this.form.backTextMsg1 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写底部悬浮菜单内容！",
                            center: true,
                        });
                        return;
                    }
                }else if(number1 == 2){
                    if(this.form.showTextMsg1 == '' || this.form.backTextMsg1 == '' || this.form.showTextMsg2 == '' || this.form.backTextMsg2 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写底部悬浮菜单内容！",
                            center: true,
                        });
                        return;
                    }
                }else if(number1 == 3){
                    if(this.form.showTextMsg1 == '' || this.form.backTextMsg1 == '' || this.form.showTextMsg2 == '' || this.form.backTextMsg2 == '' || this.form.showTextMsg3 == '' || this.form.backTextMsg3 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写底部悬浮菜单内容！",
                            center: true,
                        });
                        return;
                    }
                }else if(number1 == 4){
                    if(this.form.showTextMsg1 == '' || this.form.backTextMsg1 == '' || this.form.showTextMsg2 == '' || this.form.backTextMsg2 == '' || this.form.showTextMsg3 == '' || this.form.backTextMsg3 == '' || this.form.showTextMsg4 == '' || this.form.backTextMsg4 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写底部悬浮菜单内容！",
                            center: true,
                        });
                        return;
                    }
                }
                if(number2 == 1){
                    if(this.form.showTextLink1 == '' || this.form.LinkAddress1 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写底部悬浮菜单内容！",
                            center: true,
                        });
                        return;
                    }
                    if(!reg.test(this.form.LinkAddress1)){
                        this.$message({
                            type: "warning",
                            message: "请正确填写链接地址！",
                            center: true,
                        });
                        return;
                    }
                }else if(number2 == 2){
                    if(this.form.showTextLink1 == '' || this.form.LinkAddress1 == '' || this.form.showTextLink2 == '' || this.form.LinkAddress2 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写底部悬浮菜单内容！",
                            center: true,
                        });
                        return;
                    }
                    if(!reg.test(this.form.LinkAddress1) || !reg.test(this.form.LinkAddress2)){
                        this.$message({
                            type: "warning",
                            message: "请正确填写链接地址！",
                            center: true,
                        });
                        return;
                    }
                }else if(number2 == 3){
                    if(this.form.showTextLink1 == '' || this.form.LinkAddress1 == '' || this.form.showTextLink2 == '' || this.form.LinkAddress2 == '' || this.form.showTextLink3 == '' || this.form.LinkAddress3 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写底部悬浮菜单内容！",
                            center: true,
                        });
                        return;
                    }
                    if(!reg.test(this.form.LinkAddress1) || !reg.test(this.form.LinkAddress2) || !reg.test(this.form.LinkAddress3)){
                        this.$message({
                            type: "warning",
                            message: "请正确填写链接地址！",
                            center: true,
                        });
                        return;
                    }
                }else if(number2 == 4){
                    if(this.form.showTextLink1 == '' || this.form.LinkAddress1 == '' || this.form.showTextLink2 == '' || this.form.LinkAddress2 == '' || this.form.showTextLink3 == '' || this.form.LinkAddress3 == '' || this.form.showTextLink4 == '' || this.form.LinkAddress4 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写底部悬浮菜单内容！",
                            center: true,
                        });
                        return;
                    }
                    if(!reg.test(this.form.LinkAddress1) || !reg.test(this.form.LinkAddress2) || !reg.test(this.form.LinkAddress3) || !reg.test(this.form.LinkAddress4)){
                        this.$message({
                            type: "warning",
                            message: "请正确填写链接地址！",
                            center: true,
                        });
                        return;
                    }
                }
                if(number3 == 1){
                    if(this.form.showTextPhone1 == '' || this.form.phoneNumber1 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写底部悬浮菜单内容！",
                            center: true,
                        });
                        return;
                    }
                }else if(number3 == 2){
                    if(this.form.showTextPhone1 == '' || this.form.phoneNumber1 == '' || this.form.showTextPhone2 == '' || this.form.phoneNumber2 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写底部悬浮菜单内容！",
                            center: true,
                        });
                        return;
                    }
                }else if(number3 == 3){
                    if(this.form.showTextPhone1 == '' || this.form.phoneNumber1 == '' || this.form.showTextPhone2 == '' || this.form.phoneNumber2 == '' || this.form.showTextPhone3 == '' || this.form.phoneNumber3 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写底部悬浮菜单内容！",
                            center: true,
                        });
                        return;
                    }
                }else if(number3 == 4){
                    if(this.form.showTextPhone1 == '' || this.form.phoneNumber1 == '' || this.form.showTextPhone2 == '' || this.form.phoneNumber2 == '' || this.form.showTextPhone3 == '' || this.form.phoneNumber3 == '' || this.form.showTextPhone4 == '' || this.form.phoneNumber4 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写底部悬浮菜单内容！",
                            center: true,
                        });
                        return;
                    }
                }
            }
            this.isConfirmAdd = true;
            var params = {
                businessType: this.businessValue, //业务类型
                // channelId: this.channelValue,//通道id
                content: this.msgValue == 0 ? this.form.desc : this.form.descChange, //文本内容
                cssContent: "", //文本文件样式数据
                enterpriseAccountAppId: this.appValue,//企业应用id
                fallbackDTO: {
                    content: this.fileIdOne != "" ? this.fileIdOne : this.msgValue == 3 ? this.form.descChangeOne : this.form.descOne, //回落内容
                    id: this.oneId, //回落消息id,更新时必传
                    messageMouldType: this.messageMouldTypeOne, //消息类型：0 文本消息，1 文件消息
                    messageVersion: 1, //消息版本：0 UP2.4消息，1 UP1.0消息，2 SMS消息
                },
                smsFallbackDTO: {
                    content: this.msgValue == 3 ? this.form.descChangeSMS : this.form.descSMS, //回落内容
                    id: this.smsId, //回落消息id,更新时必传
                    messageMouldType: 0, //消息类型：0 文本消息，1 文件消息
                    messageVersion: 2, //消息版本：0 UP2.4消息，1 UP1.0消息，2 SMS消息
                },
                fileGroupDetailId: this.fileIdTow, //素材id
                id: this.form.id, //主键，更新必传
                messageFall: this.msgBackValue ? 0 : 1, //消息回落：0开启，1关闭
                messageFallType: this.messageFallType, //消息回落类型 1 UP1.0消息，2 SMS消息 ，3 UP1.0消息 SMS消息
                messageType: this.msgValue, //消息类型：0 文本消息，1 文件消息，2 卡片消息 3 变量消息
                messageVersion: this.messageVersion, //消息版本：0 UP2.4消息，1 UP1.0消息，2 SMS消息
                name: this.form.name, //模板名称
                productType: this.productType, //产品类型
                suggestions: [], //建议回复列表，可不传,底部菜单按钮
            };
            this.buttonList.find((item, index) => {
                if (item.title == "回复消息") {
                    if (this.arr[0] && this.arr[0] == item) {
                        params.suggestions.push({
                            reply: {
                                displayText: this.form.showTextMsg1, //回复消息显示文本
                                postback: {
                                    data: this.form.backTextMsg1, //回复消息回复文本
                                },
                            },
                        });
                    } else if (this.arr[1] && this.arr[1] == item) {
                        params.suggestions.push({
                            reply: {
                                displayText: this.form.showTextMsg2, //回复消息显示文本
                                postback: {
                                    data: this.form.backTextMsg2, //回复消息回复文本
                                },
                            },
                        });
                    } else if (this.arr[2] && this.arr[2] == item) {
                        params.suggestions.push({
                            reply: {
                                displayText: this.form.showTextMsg3, //回复消息显示文本
                                postback: {
                                    data: this.form.backTextMsg3, //回复消息回复文本
                                },
                            },
                        });
                    } else if (this.arr[3] && this.arr[3] == item) {
                        params.suggestions.push({
                            reply: {
                                displayText: this.form.showTextMsg4, //回复消息显示文本
                                postback: {
                                    data: this.form.backTextMsg4, //回复消息回复文本
                                },
                            },
                        });
                    }
                } else if (item.title == "打开链接") {
                    if (this.brr[0] && this.brr[0] == item) {
                        params.suggestions.push({
                            action: {
                                displayText: this.form.showTextLink1, //打开链接显示文本
                                postback: {
                                    data: "nihao", //
                                },
                                urlAction: {
                                    openUrl: {
                                        url: this.form.LinkAddress1, //打开链接链接地址
                                    },
                                },
                            },
                        });
                    } else if (this.brr[1] && this.brr[1] == item) {
                        params.suggestions.push({
                            action: {
                                displayText: this.form.showTextLink2, //打开链接显示文本
                                postback: {
                                    data: "nihao", //
                                },
                                urlAction: {
                                    openUrl: {
                                        url: this.form.LinkAddress2, //打开链接链接地址
                                    },
                                },
                            },
                        });
                    } else if (this.brr[2] && this.brr[2] == item) {
                        params.suggestions.push({
                            action: {
                                displayText: this.form.showTextLink3, //打开链接显示文本
                                postback: {
                                    data: "nihao", //
                                },
                                urlAction: {
                                    openUrl: {
                                        url: this.form.LinkAddress3, //打开链接链接地址
                                    },
                                },
                            },
                        });
                    } else if (this.brr[3] && this.brr[3] == item) {
                        params.suggestions.push({
                            action: {
                                displayText: this.form.showTextLink4, //打开链接显示文本
                                postback: {
                                    data: "nihao", //
                                },
                                urlAction: {
                                    openUrl: {
                                        url: this.form.LinkAddress4, //打开链接链接地址
                                    },
                                },
                            },
                        });
                    }
                } else if (item.title == "拨打电话") {
                    if (this.crr[0] && this.crr[0] == item) {
                        params.suggestions.push({
                            action: {
                                displayText: this.form.showTextPhone1, //拨打号码显示文本
                                dialerAction: {
                                    dialPhoneNumber: {
                                        phoneNumber: this.form.phoneNumber1, //拨打号码
                                    },
                                },
                            },
                        });
                    } else if (this.crr[1] && this.crr[1] == item) {
                        params.suggestions.push({
                            action: {
                                displayText: this.form.showTextPhone2, //拨打号码显示文本
                                dialerAction: {
                                    dialPhoneNumber: {
                                        phoneNumber: this.form.phoneNumber2, //拨打号码
                                    },
                                },
                            },
                        });
                    } else if (this.crr[2] && this.crr[2] == item) {
                        params.suggestions.push({
                            action: {
                                displayText: this.form.showTextPhone3, //拨打号码显示文本
                                dialerAction: {
                                    dialPhoneNumber: {
                                        phoneNumber: this.form.phoneNumber3, //拨打号码
                                    },
                                },
                            },
                        });
                    } else if (this.crr[3] && this.crr[3] == item) {
                        params.suggestions.push({
                            action: {
                                displayText: this.form.showTextPhone4, //拨打号码显示文本
                                dialerAction: {
                                    dialPhoneNumber: {
                                        phoneNumber: this.form.phoneNumber4, //拨打号码
                                    },
                                },
                            },
                        });
                    }
                }
            });
            return save(params)
                .then((res) => {
                    if(res.data.status == 0){
                        this.isConfirmAdd = false;
                        this.messageMouldId = res.data.data.id;
                        this.Num = -1;
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
                        return
                    }
                })
                .catch((error) => {
                    this.$message.error({
                        message: error,
                        center: true,
                    });
                });
        },
        //文本，文件保存并审核
        async handleSaveAndAudit () {
            if (this.appValue == '') {
                this.$message({
                    type: "warning",
                    message: "未选择应用!",
                    center: true,
                });
                return
            }
            // if (this.channelValue == '') {
            //     this.$message({
            //         type: "warning",
            //         message: "未选择通道!",
            //         center: true,
            //     });
            //     return
            // }
            if (this.msgValue == "0") {
                if (this.form.desc == "") {
                    this.$message({
                        type: "warning",
                        message: "up2.4消息文本不能为空!",
                        center: true,
                    });
                    return;
                }
            } else if (this.msgValue == "1") {
                if (this.fileIdTow == "") {
                    this.$message({
                        type: "warning",
                        message: "up2.4消息文件不能为空!",
                        center: true,
                    });
                    return;
                }
            } else if (this.msgValue == "3") {
                if (this.form.descChange == "") {
                    this.$message({
                        type: "warning",
                        message: "up2.4消息文本不能为空!",
                        center: true,
                    });
                    return;
                }
            }
            if (this.checkList.length == 1) {
                this.checkList.map((item) => {
                    if (item == "回落到UP1.0") {
                        if (this.messageFallType == 1) {
                            if (this.form.descOne == "" && this.form.descChangeOne == '') {
                                this.$message({
                                    type: "warning",
                                    message: "up1.0消息文本不能为空!",
                                    center: true,
                                });
                                return;
                            }
                        } else {
                            if (this.fileIdOne == "") {
                                this.$message({
                                    type: "warning",
                                    message: "up1.0消息文件不能为空!",
                                    center: true,
                                });
                                return;
                            }
                        }
                    } else {
                        if (this.form.descSMS == "") {
                            this.$message({
                                type: "warning",
                                message: "SMS消息文本不能为空!",
                                center: true,
                            });
                            return;
                        }
                    }
                });
            } else if (this.checkList.length == 2) {
                if (this.fileIdOne == "" && this.form.descOne == "" && this.form.descChangeOne == '') {
                    this.$message({
                        type: "warning",
                        message: "up1.0消息内容不能为空!",
                        center: true,
                    });
                    return;
                }
                if (this.form.descSMS == "" && this.form.descChangeSMS == '') {
                    this.$message({
                        type: "warning",
                        message: "SMS消息文本不能为空!",
                        center: true,
                    });
                    return;
                }
            }
            await this.handleSave();
            if (this.falg) {
                if (this.checkStatus !== 1) {
                    saveAndAudit(this.messageMouldId)
                        .then((res) => {
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
        //卡片保存并继续
        async handleSaveCard () {
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
            if (this.appValue == '') {
                this.$message({
                    type: "warning",
                    message: "未选择应用!",
                    center: true,
                });
                return
            }
            // if (this.channelValue == '') {
            //     this.$message({
            //         type: "warning",
            //         message: "未选择通道!",
            //         center: true,
            //     });
            //     return
            // }
            if(this.cardButtonList.length > 0){
                // if(this.form.cardShowTextMsg1 == '' && this.form.cardShowTextLink1 == '' && this.form.cardShowTextPhone1 == ''){
                //     this.$message({
                //         type: "warning",
                //         message: "请填写卡片内置按钮内容！",
                //         center: true,
                //     });
                //     return;
                // }
                var cardNumber1 = 0;
                var cardNumber2 = 0;
                var cardNumber3 = 0;
                var cardReg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(.)+$/;
                this.cardButtonList.map(item=>{
                    if(item.title == "回复消息"){
                        cardNumber1++;
                    }
                    if(item.title == "打开链接"){
                        cardNumber2++;
                    }
                    if(item.title == "拨打电话"){
                        cardNumber3++;
                    }
                })
                if(cardNumber1 == 1){
                    if(this.form.cardShowTextMsg1 == '' || this.form.cardBackTextMsg1 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写卡片内置按钮内容！",
                            center: true,
                        });
                        return;
                    }
                }else if(cardNumber1 == 2){
                    if(this.form.cardShowTextMsg1 == '' || this.form.cardBackTextMsg1 == '' || this.form.cardShowTextMsg2 == '' || this.form.cardBackTextMsg2 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写卡片内置按钮内容！",
                            center: true,
                        });
                        return;
                    }
                }else if(cardNumber1 == 3){
                    if(this.form.cardShowTextMsg1 == '' || this.form.cardBackTextMsg1 == '' || this.form.cardShowTextMsg2 == '' || this.form.cardBackTextMsg2 == '' || this.form.cardShowTextMsg3 == '' || this.form.cardBackTextMsg3 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写卡片内置按钮内容！",
                            center: true,
                        });
                        return;
                    }
                }else if(cardNumber1 == 4){
                    if(this.form.cardShowTextMsg1 == '' || this.form.cardBackTextMsg1 == '' || this.form.cardShowTextMsg2 == '' || this.form.cardBackTextMsg2 == '' || this.form.cardShowTextMsg3 == '' || this.form.cardBackTextMsg3 == '' || this.form.cardShowTextMsg4 == '' || this.form.cardBackTextMsg4 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写卡片内置按钮内容！",
                            center: true,
                        });
                        return;
                    }
                }
                if(cardNumber2 == 1){
                    if(this.form.cardShowTextLink1 == '' || this.form.cardLinkAddress1 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写卡片内置按钮内容！",
                            center: true,
                        });
                        return;
                    }
                    if(!cardReg.test(this.form.cardLinkAddress1)){
                        this.$message({
                            type: "warning",
                            message: "请正确填写卡片链接地址！",
                            center: true,
                        });
                        return;
                    }
                }else if(cardNumber2 == 2){
                    if(this.form.cardShowTextLink1 == '' || this.form.cardLinkAddress1 == '' || this.form.cardShowTextLink2 == '' || this.form.cardLinkAddress2 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写卡片内置按钮内容！",
                            center: true,
                        });
                        return;
                    }
                    if(!cardReg.test(this.form.cardLinkAddress1) || !cardReg.test(this.form.cardLinkAddress2)){
                        this.$message({
                            type: "warning",
                            message: "请正确填写卡片链接地址！",
                            center: true,
                        });
                        return;
                    }
                }else if(cardNumber2 == 3){
                    if(this.form.cardShowTextLink1 == '' || this.form.cardLinkAddress1 == '' || this.form.cardShowTextLink2 == '' || this.form.cardLinkAddress2 == '' || this.form.cardShowTextLink3 == '' || this.form.cardLinkAddress3 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写卡片内置按钮内容！",
                            center: true,
                        });
                        return;
                    }
                    if(!cardReg.test(this.form.cardLinkAddress1) || !cardReg.test(this.form.cardLinkAddress2) || !cardReg.test(this.form.cardLinkAddress3)){
                        this.$message({
                            type: "warning",
                            message: "请正确填写卡片链接地址！",
                            center: true,
                        });
                        return;
                    }
                }else if(cardNumber2 == 4){
                    if(this.form.cardShowTextLink1 == '' || this.form.cardLinkAddress1 == '' || this.form.cardShowTextLink2 == '' || this.form.cardLinkAddress2 == '' || this.form.cardShowTextLink3 == '' || this.form.cardLinkAddress3 == '' || this.form.cardShowTextLink4 == '' || this.form.cardLinkAddress4 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写卡片内置按钮内容！",
                            center: true,
                        });
                        return;
                    }
                    if(!cardReg.test(this.form.cardLinkAddress1) || !cardReg.test(this.form.cardLinkAddress2) || !cardReg.test(this.form.cardLinkAddress3) || !cardReg.test(this.form.cardLinkAddress4)){
                        this.$message({
                            type: "warning",
                            message: "请正确填写卡片链接地址！",
                            center: true,
                        });
                        return;
                    }
                }
                if(cardNumber3 == 1){
                    if(this.form.cardShowTextPhone1 == '' || this.form.cardPhoneNumber1 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写卡片内置按钮内容！",
                            center: true,
                        });
                        return;
                    }
                }else if(cardNumber3 == 2){
                    if(this.form.cardShowTextPhone1 == '' || this.form.cardPhoneNumber1 == '' || this.form.cardShowTextPhone2 == '' || this.form.cardPhoneNumber2 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写卡片内置按钮内容！",
                            center: true,
                        });
                        return;
                    }
                }else if(cardNumber3 == 3){
                    if(this.form.cardShowTextPhone1 == '' || this.form.cardPhoneNumber1 == '' || this.form.cardShowTextPhone2 == '' || this.form.cardPhoneNumber2 == '' || this.form.cardShowTextPhone3 == '' || this.form.cardPhoneNumber3 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写卡片内置按钮内容！",
                            center: true,
                        });
                        return;
                    }
                }else if(cardNumber3 == 4){
                    if(this.form.cardShowTextPhone1 == '' || this.form.cardPhoneNumber1 == '' || this.form.cardShowTextPhone2 == '' || this.form.cardPhoneNumber2 == '' || this.form.cardShowTextPhone3 == '' || this.form.cardPhoneNumber3 == '' || this.form.cardShowTextPhone4 == '' || this.form.cardPhoneNumber4 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写卡片内置按钮内容！",
                            center: true,
                        });
                        return;
                    }
                }
            }
            if(this.buttonList.length > 0){
                var number1 = 0;
                var number2 = 0;
                var number3 = 0;
                var reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(.)+$/;
                this.buttonList.map(item=>{
                    if(item.title == "回复消息"){
                        number1++;
                    }
                    if(item.title == "打开链接"){
                        number2++;
                    }
                    if(item.title == "拨打电话"){
                        number3++;
                    }
                })
                if(number1 == 1){
                    if(this.form.showTextMsg1 == '' || this.form.backTextMsg1 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写底部悬浮菜单内容！",
                            center: true,
                        });
                        return;
                    }
                }else if(number1 == 2){
                    if(this.form.showTextMsg1 == '' || this.form.backTextMsg1 == '' || this.form.showTextMsg2 == '' || this.form.backTextMsg2 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写底部悬浮菜单内容！",
                            center: true,
                        });
                        return;
                    }
                }else if(number1 == 3){
                    if(this.form.showTextMsg1 == '' || this.form.backTextMsg1 == '' || this.form.showTextMsg2 == '' || this.form.backTextMsg2 == '' || this.form.showTextMsg3 == '' || this.form.backTextMsg3 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写底部悬浮菜单内容！",
                            center: true,
                        });
                        return;
                    }
                }else if(number1 == 4){
                    if(this.form.showTextMsg1 == '' || this.form.backTextMsg1 == '' || this.form.showTextMsg2 == '' || this.form.backTextMsg2 == '' || this.form.showTextMsg3 == '' || this.form.backTextMsg3 == '' || this.form.showTextMsg4 == '' || this.form.backTextMsg4 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写底部悬浮菜单内容！",
                            center: true,
                        });
                        return;
                    }
                }
                if(number2 == 1){
                    if(this.form.showTextLink1 == '' || this.form.LinkAddress1 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写底部悬浮菜单内容！",
                            center: true,
                        });
                        return;
                    }
                    if(!reg.test(this.form.LinkAddress1)){
                        this.$message({
                            type: "warning",
                            message: "请正确填写底部按钮链接地址！",
                            center: true,
                        });
                        return;
                    }
                }else if(number2 == 2){
                    if(this.form.showTextLink1 == '' || this.form.LinkAddress1 == '' || this.form.showTextLink2 == '' || this.form.LinkAddress2 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写底部悬浮菜单内容！",
                            center: true,
                        });
                        return;
                    }
                    if(!reg.test(this.form.LinkAddress1) || !reg.test(this.form.LinkAddress2)){
                        this.$message({
                            type: "warning",
                            message: "请正确填写底部按钮链接地址！",
                            center: true,
                        });
                        return;
                    }
                }else if(number2 == 3){
                    if(this.form.showTextLink1 == '' || this.form.LinkAddress1 == '' || this.form.showTextLink2 == '' || this.form.LinkAddress2 == '' || this.form.showTextLink3 == '' || this.form.LinkAddress3 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写底部悬浮菜单内容！",
                            center: true,
                        });
                        return;
                    }
                    if(!reg.test(this.form.LinkAddress1) || !reg.test(this.form.LinkAddress2) || !reg.test(this.form.LinkAddress3)){
                        this.$message({
                            type: "warning",
                            message: "请正确填写底部按钮链接地址！",
                            center: true,
                        });
                        return;
                    }
                }else if(number2 == 4){
                    if(this.form.showTextLink1 == '' || this.form.LinkAddress1 == '' || this.form.showTextLink2 == '' || this.form.LinkAddress2 == '' || this.form.showTextLink3 == '' || this.form.LinkAddress3 == '' || this.form.showTextLink4 == '' || this.form.LinkAddress4 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写底部悬浮菜单内容！",
                            center: true,
                        });
                        return;
                    }
                    if(!reg.test(this.form.LinkAddress1) || !reg.test(this.form.LinkAddress2) || !reg.test(this.form.LinkAddress3) || !reg.test(this.form.LinkAddress4)){
                        this.$message({
                            type: "warning",
                            message: "请正确填写底部按钮链接地址！",
                            center: true,
                        });
                        return;
                    }
                }
                if(number3 == 1){
                    if(this.form.showTextPhone1 == '' || this.form.phoneNumber1 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写底部悬浮菜单内容！",
                            center: true,
                        });
                        return;
                    }
                }else if(number3 == 2){
                    if(this.form.showTextPhone1 == '' || this.form.phoneNumber1 == '' || this.form.showTextPhone2 == '' || this.form.phoneNumber2 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写底部悬浮菜单内容！",
                            center: true,
                        });
                        return;
                    }
                }else if(number3 == 3){
                    if(this.form.showTextPhone1 == '' || this.form.phoneNumber1 == '' || this.form.showTextPhone2 == '' || this.form.phoneNumber2 == '' || this.form.showTextPhone3 == '' || this.form.phoneNumber3 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写底部悬浮菜单内容！",
                            center: true,
                        });
                        return;
                    }
                }else if(number3 == 4){
                    if(this.form.showTextPhone1 == '' || this.form.phoneNumber1 == '' || this.form.showTextPhone2 == '' || this.form.phoneNumber2 == '' || this.form.showTextPhone3 == '' || this.form.phoneNumber3 == '' || this.form.showTextPhone4 == '' || this.form.phoneNumber4 == ''){
                        this.$message({
                            type: "warning",
                            message: "请填写底部悬浮菜单内容！",
                            center: true,
                        });
                        return;
                    }
                }
            }
            this.isConfirmAdd = true;
            var params = {
                businessType: this.businessValue, //业务类型
                // channelId: this.channelValue,//通道id
                content: null, //文本内容
                cssContent: "", //文本文件样式数据
                enterpriseAccountAppId: this.appValue,//企业应用id
                fallbackDTO: {
                    content: this.fileIdOne != "" ? this.fileIdOne : this.msgValue == 3 ? this.form.descChangeOne : this.descOne, //回落内容
                    id: this.oneId, //回落消息id,更新时必传
                    messageMouldType: this.messageMouldTypeOne, //消息类型：0 文本消息，1 文件消息
                    messageVersion: 1, //消息版本：0 UP2.4消息，1 UP1.0消息，2 SMS消息
                },
                smsFallbackDTO: {
                    content: this.msgValue == 3 ? this.form.descChangeSMS : this.form.descSMS, //回落内容
                    id: this.smsId, //回落消息id,更新时必传
                    messageMouldType: 0, //消息类型：0 文本消息，1 文件消息
                    messageVersion: 2, //消息版本：0 UP2.4消息，1 UP1.0消息，2 SMS消息
                },
                fileGroupDetailId: "", //素材id
                id: this.messageMouldId, //主键，更新必传
                messageFall: this.msgBackValue ? 0 : 1, //消息回落：0开启，1关闭
                messageFallType: this.messageFallType, //消息回落类型 1 UP1.0消息，2 SMS消息 ，3 UP1.0消息 SMS消息
                messageType: this.msgValue, //消息类型：0 文本消息，1 文件消息，2 卡片消息
                messageVersion: this.messageVersion, //消息版本：0 UP2.4消息，1 UP1.0消息，SMS消息
                name: this.form.name, //模板名称
                productType: this.productType, //产品类型
                suggestions: [], //建议回复列表，可不传,底部菜单按钮
            };
            this.buttonList.find((item, index) => {
                if (item.title == "回复消息") {
                    if (this.arr[0] && this.arr[0] == item) {
                        params.suggestions.push({
                            reply: {
                                displayText: this.form.showTextMsg1, //回复消息显示文本
                                postback: {
                                    data: this.form.backTextMsg1, //回复消息回复文本
                                },
                            },
                        });
                    } else if (this.arr[1] && this.arr[1] == item) {
                        params.suggestions.push({
                            reply: {
                                displayText: this.form.showTextMsg2, //回复消息显示文本
                                postback: {
                                    data: this.form.backTextMsg2, //回复消息回复文本
                                },
                            },
                        });
                    } else if (this.arr[2] && this.arr[2] == item) {
                        params.suggestions.push({
                            reply: {
                                displayText: this.form.showTextMsg3, //回复消息显示文本
                                postback: {
                                    data: this.form.backTextMsg3, //回复消息回复文本
                                },
                            },
                        });
                    } else if (this.arr[3] && this.arr[3] == item) {
                        params.suggestions.push({
                            reply: {
                                displayText: this.form.showTextMsg4, //回复消息显示文本
                                postback: {
                                    data: this.form.backTextMsg4, //回复消息回复文本
                                },
                            },
                        });
                    }
                } else if (item.title == "打开链接") {
                    if (this.brr[0] && this.brr[0] == item) {
                        params.suggestions.push({
                            action: {
                                displayText: this.form.showTextLink1, //打开链接显示文本
                                postback: {
                                    data: "nihao", //
                                },
                                urlAction: {
                                    openUrl: {
                                        url: this.form.LinkAddress1, //打开链接链接地址
                                    },
                                },
                            },
                        });
                    } else if (this.brr[1] && this.brr[1] == item) {
                        params.suggestions.push({
                            action: {
                                displayText: this.form.showTextLink2, //打开链接显示文本
                                postback: {
                                    data: "nihao", //
                                },
                                urlAction: {
                                    openUrl: {
                                        url: this.form.LinkAddress2, //打开链接链接地址
                                    },
                                },
                            },
                        });
                    } else if (this.brr[2] && this.brr[2] == item) {
                        params.suggestions.push({
                            action: {
                                displayText: this.form.showTextLink3, //打开链接显示文本
                                postback: {
                                    data: "nihao", //
                                },
                                urlAction: {
                                    openUrl: {
                                        url: this.form.LinkAddress3, //打开链接链接地址
                                    },
                                },
                            },
                        });
                    } else if (this.brr[3] && this.brr[3] == item) {
                        params.suggestions.push({
                            action: {
                                displayText: this.form.showTextLink4, //打开链接显示文本
                                postback: {
                                    data: "nihao", //
                                },
                                urlAction: {
                                    openUrl: {
                                        url: this.form.LinkAddress4, //打开链接链接地址
                                    },
                                },
                            },
                        });
                    }
                } else if (item.title == "拨打电话") {
                    if (this.crr[0] && this.crr[0] == item) {
                        params.suggestions.push({
                            action: {
                                displayText: this.form.showTextPhone1, //拨打号码显示文本
                                dialerAction: {
                                    dialPhoneNumber: {
                                        phoneNumber: this.form.phoneNumber1, //拨打号码
                                    },
                                },
                            },
                        });
                    } else if (this.crr[1] && this.crr[1] == item) {
                        params.suggestions.push({
                            action: {
                                displayText: this.form.showTextPhone2, //拨打号码显示文本
                                dialerAction: {
                                    dialPhoneNumber: {
                                        phoneNumber: this.form.phoneNumber2, //拨打号码
                                    },
                                },
                            },
                        });
                    } else if (this.crr[2] && this.crr[2] == item) {
                        params.suggestions.push({
                            action: {
                                displayText: this.form.showTextPhone3, //拨打号码显示文本
                                dialerAction: {
                                    dialPhoneNumber: {
                                        phoneNumber: this.form.phoneNumber3, //拨打号码
                                    },
                                },
                            },
                        });
                    } else if (this.crr[3] && this.crr[3] == item) {
                        params.suggestions.push({
                            action: {
                                displayText: this.form.showTextPhone4, //拨打号码显示文本
                                dialerAction: {
                                    dialPhoneNumber: {
                                        phoneNumber: this.form.phoneNumber4, //拨打号码
                                    },
                                },
                            },
                        });
                    }
                }
            });
            let paramsCard = {
                cssContent: "", //卡片样式数据
                description: this.form.cardContentValue, //卡片描述
                fileGroupDetailId: this.fileIdTow, //素材id
                id: this.cardId, //主键卡片id，更新必传
                imageAlignment: "", //图片对齐方式
                messageMouldId: this.messageMouldId, //模板id
                messageMouldOrder: "", //排序
                orientation: "", //卡片方向
                title: this.form.cardTitleValue, //卡片标题
                width: "", //卡片宽度
                suggestions: [], //建议回复,卡片
            };
            this.cardButtonList.find((item) => {
                if (item.title == "回复消息") {
                    if (this.arr1[0] && this.arr1[0] == item) {
                        paramsCard.suggestions.push({
                            reply: {
                                displayText: this.form.cardShowTextMsg1, //回复消息显示文本
                                postback: {
                                    data: this.form.cardBackTextMsg1, //回复消息回复文本
                                },
                            },
                        });
                    } else if (this.arr1[1] && this.arr1[1] == item) {
                        paramsCard.suggestions.push({
                            reply: {
                                displayText: this.form.cardShowTextMsg2, //回复消息显示文本
                                postback: {
                                    data: this.form.cardBackTextMsg2, //回复消息回复文本
                                },
                            },
                        });
                    } else if (this.arr1[2] && this.arr1[2] == item) {
                        paramsCard.suggestions.push({
                            reply: {
                                displayText: this.form.cardShowTextMsg3, //回复消息显示文本
                                postback: {
                                    data: this.form.cardBackTextMsg3, //回复消息回复文本
                                },
                            },
                        });
                    } else if (this.arr1[3] && this.arr1[3] == item) {
                        paramsCard.suggestions.push({
                            reply: {
                                displayText: this.form.cardShowTextMsg4, //回复消息显示文本
                                postback: {
                                    data: this.form.cardBackTextMsg4, //回复消息回复文本
                                },
                            },
                        });
                    }
                } else if (item.title == "打开链接") {
                    if (this.brr1[0] && this.brr1[0] == item) {
                        paramsCard.suggestions.push({
                            action: {
                                displayText: this.form.cardShowTextLink1, //打开链接显示文本
                                postback: {
                                    data: "nihao", //
                                },
                                urlAction: {
                                    openUrl: {
                                        url: this.form.cardLinkAddress1, //打开链接链接地址
                                    },
                                },
                            },
                        });
                    } else if (this.brr1[1] && this.brr1[1] == item) {
                        paramsCard.suggestions.push({
                            action: {
                                displayText: this.form.cardShowTextLink2, //打开链接显示文本
                                postback: {
                                    data: "nihao", //
                                },
                                urlAction: {
                                    openUrl: {
                                        url: this.form.cardLinkAddress2, //打开链接链接地址
                                    },
                                },
                            },
                        });
                    } else if (this.brr1[2] && this.brr1[2] == item) {
                        paramsCard.suggestions.push({
                            action: {
                                displayText: this.form.cardShowTextLink3, //打开链接显示文本
                                postback: {
                                    data: "nihao", //
                                },
                                urlAction: {
                                    openUrl: {
                                        url: this.form.cardLinkAddress3, //打开链接链接地址
                                    },
                                },
                            },
                        });
                    } else if (this.brr1[3] && this.brr1[3] == item) {
                        paramsCard.suggestions.push({
                            action: {
                                displayText: this.form.cardShowTextLink4, //打开链接显示文本
                                postback: {
                                    data: "nihao", //
                                },
                                urlAction: {
                                    openUrl: {
                                        url: this.form.cardLinkAddress4, //打开链接链接地址
                                    },
                                },
                            },
                        });
                    }
                } else if (item.title == "拨打电话") {
                    if (this.crr1[0] && this.crr1[0] == item) {
                        paramsCard.suggestions.push({
                            action: {
                                displayText: this.form.cardShowTextPhone1, //拨打号码显示文本
                                dialerAction: {
                                    dialPhoneNumber: {
                                        phoneNumber: this.form.cardPhoneNumber1, //拨打号码
                                    },
                                },
                            },
                        });
                    } else if (this.crr1[1] && this.crr1[1] == item) {
                        paramsCard.suggestions.push({
                            action: {
                                displayText: this.form.cardShowTextPhone2, //拨打号码显示文本
                                dialerAction: {
                                    dialPhoneNumber: {
                                        phoneNumber: this.form.cardPhoneNumber2, //拨打号码
                                    },
                                },
                            },
                        });
                    } else if (this.crr1[2] && this.crr1[2] == item) {
                        paramsCard.suggestions.push({
                            action: {
                                displayText: this.form.cardShowTextPhone3, //拨打号码显示文本
                                dialerAction: {
                                    dialPhoneNumber: {
                                        phoneNumber: this.form.cardPhoneNumber3, //拨打号码
                                    },
                                },
                            },
                        });
                    } else if (this.crr1[3] && this.crr1[3] == item) {
                        paramsCard.suggestions.push({
                            action: {
                                displayText: this.form.cardShowTextPhone4, //拨打号码显示文本
                                dialerAction: {
                                    dialPhoneNumber: {
                                        phoneNumber: this.form.cardPhoneNumber4, //拨打号码
                                    },
                                },
                            },
                        });
                    }
                }
            });
            await save(params)
                .then((res) => {
                    if(res.data.status == 0){
                        this.isConfirmAdd = false;
                        this.messageMouldId = res.data.data.id;
                        this.Num = -1;
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
            paramsCard.messageMouldId = this.messageMouldId; //模板id
            await saveCard(paramsCard)
                .then((res) => { })
                .catch((error) => {
                    this.$message.error({
                        message: error,
                        center: true,
                    });
                });
        },
        //卡片保存并审核
        async handleSaveAndAuditCard () {
            if (this.appValue == '') {
                this.$message({
                    type: "warning",
                    message: "未选择应用!",
                    center: true,
                });
                return
            }
            // if (this.channelValue == '') {
            //     this.$message({
            //         type: "warning",
            //         message: "未选择通道!",
            //         center: true,
            //     });
            //     return
            // }
            if (this.fileIdTow == "") {
                this.$message({
                    type: "warning",
                    message: "文件不能为空!",
                    center: true,
                });
                return;
            }
            if (this.form.cardTitleValue == "") {
                this.$message({
                    type: "warning",
                    message: "标题不能为空!",
                    center: true,
                });
                return;
            }
            if (this.checkList.length == 1) {
                this.checkList.map((item) => {
                    if (item == "回落到UP1.0") {
                        if (this.messageFallType == 1) {
                            if (this.form.descOne == "") {
                                this.$message({
                                    type: "warning",
                                    message: "up1.0消息文本不能为空!",
                                    center: true,
                                });
                                return;
                            }
                        } else {
                            if (this.fileIdOne == "") {
                                this.$message({
                                    type: "warning",
                                    message: "up1.0消息文件不能为空!",
                                    center: true,
                                });
                                return;
                            }
                        }
                    } else {
                        if (this.form.descSMS == "") {
                            this.$message({
                                type: "warning",
                                message: "SMS消息文本不能为空!",
                                center: true,
                            });
                            return;
                        }
                    }
                });
            } else if (this.checkList.length == 2) {
                if (this.fileIdOne == "" && this.form.descOne == "") {
                    this.$message({
                        type: "warning",
                        message: "up1.0消息内容不能为空!",
                        center: true,
                    });
                    return;
                }
                if (this.form.descSMS == "") {
                    this.$message({
                        type: "warning",
                        message: "SMS消息文本不能为空!",
                        center: true,
                    });
                    return;
                }
            }
            await this.handleSaveCard();
            if (this.falg) {
                if (this.checkStatus !== 1) {
                    saveAndAudit(this.messageMouldId)
                        .then((res) => {
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
        //清空
        handleClear () {
            this.form.id = "";
            this.form.desc = "";
            this.form.descChange = "";
            this.form.descChangeOne = "";
            this.form.descChangeSMS = "";
            this.form.cardTitleValue = "";
            this.form.cardContentValue = "";
            this.form.textImgUrl = "";
            this.form.textImgType = "";
            this.form.textAudioUrl = "";
            this.form.textAudioType = "";
            this.form.textVideoUrl = "";
            this.form.textVideoType = "";
            this.form.showTextMsg1 = "";
            this.form.backTextMsg1 = "";
            this.form.showTextLink1 = "";
            this.form.LinkAddress1 = "";
            this.form.showTextPhone1 = "";
            this.form.phoneNumber1 = "";
            this.form.showTextMsg2 = "";
            this.form.backTextMsg2 = "";
            this.form.showTextLink2 = "";
            this.form.LinkAddress2 = "";
            this.form.showTextPhone2 = "";
            this.form.phoneNumber2 = "";
            this.form.showTextMsg3 = "";
            this.form.backTextMsg3 = "";
            this.form.showTextLink3 = "";
            this.form.LinkAddress3 = "";
            this.form.showTextPhone3 = "";
            this.form.phoneNumber3 = "";
            this.form.showTextMsg4 = "";
            this.form.backTextMsg4 = "";
            this.form.showTextLink4 = "";
            this.form.LinkAddress4 = "";
            this.form.showTextPhone4 = "";
            this.form.phoneNumber4 = "";
            this.form.cardShowTextMsg1 = "";
            this.form.cardBackTextMsg1 = "";
            this.form.cardShowTextLink1 = "";
            this.form.cardLinkAddress1 = "";
            this.form.cardShowTextPhone1 = "";
            this.form.cardPhoneNumber1 = "";
            this.form.cardShowTextMsg2 = "";
            this.form.cardBackTextMsg2 = "";
            this.form.cardShowTextLink2 = "";
            this.form.cardLinkAddress2 = "";
            this.form.cardShowTextPhone2 = "";
            this.form.cardPhoneNumber2 = "";
            this.form.cardShowTextMsg3 = "";
            this.form.cardBackTextMsg3 = "";
            this.form.cardShowTextLink3 = "";
            this.form.cardLinkAddress3 = "";
            this.form.cardShowTextPhone3 = "";
            this.form.cardPhoneNumber3 = "";
            this.form.cardShowTextMsg4 = "";
            this.form.cardBackTextMsg4 = "";
            this.form.cardShowTextLink4 = "";
            this.form.cardLinkAddress4 = "";
            this.form.cardShowTextPhone4 = "";
            this.form.cardPhoneNumber4 = "";
            this.form.descOne = "";
            this.form.textImgUrlOne = "";
            this.form.textImgTypeOne = "";
            this.form.textAudioUrlOne = "";
            this.form.textAudioTypeOne = "";
            this.form.textVideoUrlOne = "";
            this.form.textVideoTypeOne = "";
            this.form.descSMS = "";
            this.fileIdOne = "";
            this.fileIdTow = "";
            this.isBoxTT = false;
            this.isContent = true;
            if (!this.isCard) {
                this.form.name = "";
            }
        },
        //根据业务类型获取应用
        handleChangeGetApp(){
            enterpriseApplist({businessType:this.businessValue,productType:1}).then(res => {
                this.appOptions = res.data.data;
            })
        },       
        handleBack () {
            if (this.Num > 0) {
                this.$confirm("未保存编辑内容，是否保存离开消息编辑器？", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    confirmButtonClass: "btn-custom-confirm",
                    center: true,
                })
                    .then(() => {
                        // this.$message({
                        //   type: 'success',
                        //   message: '删除成功!',
                        //   center:true
                        // });
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
        btn (e) {
            for (var i = 0; i < e.target.parentNode.children.length; i++) {
                if (e.target.parentNode.children[i] == e.target) {
                    e.target.setAttribute("class", "active");
                    if (e.target.innerText == "UP2.4消息") {
                        this.text = "UP2.4消息";
                        this.buttonValue = true;
                        this.isBosDisable = false;
                        this.messageVersion = "0";
                        this.isTemplateShow = true;
                        this.isOpen = false;
                        this.type = 1;
                        this.centerImgUrl = require("../../../assets/images/icon-24px-组件@1x.png");
                        if (this.msgValue == "2") {
                            this.msg = "拖拽文件组件至此";
                            this.handleFile();
                            this.isCardShow = true;
                            this.isCard = true;
                        } else if (this.msgValue == "1") {
                            this.msg = "拖拽文件组件至此";
                            this.handleFile();
                            this.isCardShow = false;
                            this.isCard = false;
                        } else {
                            this.msg = "拖拽文本组件至此";
                            this.handleText();
                            this.isCardShow = false;
                            this.isCard = false;
                        }
                        this.isBoxTTOne = false;
                        this.isBoxTTSMS = false;
                        if (this.form.desc !== "" || this.fileIdTow !== "" || this.form.descChange !== "") {
                            this.isBoxTT = true;
                        } else {
                            this.isBoxTT = false;
                            this.isContent = true;
                        }
                        if(this.buttonList.length > 0){
                            this.isButtonText = false;
                        }else{
                            this.isButtonText = true;
                        }
                        if(this.cardButtonList.length > 0){
                            this.isCardButtonText = false;
                        }else{
                            this.isCardButtonText = true;
                        }
                    } else if (e.target.innerText == "UP1.0消息") {
                        this.text = "UP1.0消息";
                        this.msg = "拖拽文本、文件组件至此";
                        this.topList[0].imgUrl = require("../../../assets/svg/icon_32px_正文.svg");
                        this.topList[1].imgUrl = require("../../../assets/svg/icon_32px_图片.svg");
                        this.topList[2].imgUrl = require("../../../assets/svg/icon_32px_音频.svg");
                        this.topList[3].imgUrl = require("../../../assets/svg/icon_32px_视频.svg");
                        this.$refs.navFoo0[0].style.color = "#FE9636";
                        this.$refs.navFoo1[0].style.color = "#FE9636";
                        this.$refs.navFoo2[0].style.color = "#FE9636";
                        this.$refs.navFoo3[0].style.color = "#FE9636";
                        this.$refs.dl0[0].style.cursor = "pointer";
                        this.$refs.dl1[0].style.cursor = "pointer";
                        this.$refs.dl2[0].style.cursor = "pointer";
                        this.$refs.dl3[0].style.cursor = "pointer";
                        this.isOpen = true;
                        this.buttonValue = false;
                        this.isTemplateShow = false;
                        this.messageVersion = "1";
                        this.isCard = false;
                        this.isCardShow = false;
                        this.isModuleDisable = true;
                        this.isCardButtonText = true;
                        this.isButtonText = true;
                        this.contentStatus = 100;
                        this.isBosDisable = false;
                        this.isButtonDisable = false;
                        this.isModuleCardDisable = false;
                        this.moduleCardImgUrl = require("../../../assets/images/icon-14px-卡片@1x.png");
                        this.centerImgUrl = require("../../../assets/images/icon-24px-组件@1x.png");
                        this.moduleImgUrl = require("../../../assets/images/icon-14px-模板@1x.png");
                        this.isBoxTT = false;
                        this.isBoxTTSMS = false;
                        if (this.form.descOne !== "" || this.form.descChangeOne !== "" || this.fileIdOne !== "") {
                            this.isBoxTTOne = true;
                            if (this.istype18) {
                                this.type = 18;
                            } else if (this.istype19) {
                                this.type = 19;
                            } else if (this.istype20) {
                                this.type = 20;
                            } else if (this.istype21) {
                                this.type = 21;
                            } else if (this.istype42) {
                                this.type = 42;
                            }
                        } else {
                            this.isBoxTTOne = false;
                            this.type = 2;
                            this.isContent = true;
                        }
                    } else {
                        this.msg = "拖拽文本组件至此";
                        this.text = "SMS消息";
                        this.handleText();
                        this.isOpen = true;
                        this.buttonValue = false;
                        this.isTemplateShow = false;
                        this.messageVersion = "1";
                        this.isCard = false;
                        this.isCardShow = false;
                        this.isModuleDisable = true;
                        this.isCardButtonText = true;
                        this.isButtonText = true;
                        this.contentStatus = 100;
                        this.isBosDisable = false;
                        this.isButtonDisable = false;
                        this.isModuleCardDisable = false;
                        this.moduleCardImgUrl = require("../../../assets/images/icon-14px-卡片@1x.png");
                        this.centerImgUrl = require("../../../assets/images/icon-24px-组件@1x.png");
                        this.moduleImgUrl = require("../../../assets/images/icon-14px-模板@1x.png");
                        this.isBoxTT = false;
                        this.isBoxTTOne = false;
                        if (this.form.descSMS !== "") {
                            this.isBoxTTSMS = true;
                            this.type = 22;
                            this.istype22 = true;
                        }else if (this.form.descChangeSMS !== "") {
                            this.isBoxTTSMS = true;
                            this.type = 43;
                            this.istype43 = true;
                        } else {
                            this.isBoxTTSMS = false;
                            this.type = 2;
                            this.isContent = true;
                        }
                    }
                } else {
                    e.target.parentNode.children[i].setAttribute("class", "actived");
                }
            }
        },
        //点击图片分组
        handleGroupsList (index, id) {
            this.isDisableGroupsList = index;
            this.fileGroupId = id;
            this.currentpage = 1;
            imageLists({
                // channelId: this.channelValue,
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
        //改变消息类型
        handleChangeVal () {
            if (this.msgValue == 0) {
                this.isCard = false;
                this.isCardShow = false;
                this.buttonValue = false;
                this.isModuleDisable = true;
                this.msg = "拖拽文本组件至此";
                this.isBoxTT = false;
                this.istype3 = false;
                this.istype8 = false;
                this.istype9 = false;
                this.istype10 = false;
                this.handleText();
                this.handleClear();
                this.Num = -1;
            } else if (this.msgValue == 1) {
                this.isCard = false;
                this.isCardShow = false;
                this.buttonValue = false;
                this.isModuleDisable = true;
                this.msg = "拖拽文件组件至此";
                this.isBoxTT = false;
                this.istype3 = false;
                this.istype8 = false;
                this.istype9 = false;
                this.istype10 = false;
                this.handleFile();
                this.handleClear();
                this.Num = -1;
            } else if (this.msgValue == 2) {
                this.isCard = true;
                this.buttonValue = true;
                this.isCardShow = true;
                this.msg = "拖拽文件组件至此";
                this.isBoxTT = false;
                this.istype3 = false;
                this.istype8 = false;
                this.istype9 = false;
                this.istype10 = false;
                this.isModuleDisable = true;
                this.handleFile();
                this.handleClear();
                this.Num = -1;
                // this.moduleImgUrl = require("../../../assets/images/icon-14px-模板@1x-1.png");
            } else if (this.msgValue == 3) {
                this.isCard = false;
                this.isCardShow = false;
                this.buttonValue = false;
                this.isModuleDisable = true;
                this.msg = "拖拽文本组件至此";
                this.isBoxTT = false;
                this.istype3 = false;
                this.istype8 = false;
                this.istype9 = false;
                this.istype10 = false;
                this.handleText();
                this.handleClear();
                this.Num = -1;
            }
        },
        //文本消息可拖拽
        handleText () {
            this.topList[0].imgUrl = require("../../../assets/svg/icon_32px_正文.svg");
            this.topList[1].imgUrl = require("../../../assets/svg/icon_32px_图片_1.svg");
            this.topList[2].imgUrl = require("../../../assets/svg/icon_32px_音频_1.svg");
            this.topList[3].imgUrl = require("../../../assets/svg/icon_32px_视频_1.svg");
            this.$refs.navFoo0[0].style.color = "#FE9636";
            this.$refs.navFoo1[0].style.color = "#999999";
            this.$refs.navFoo2[0].style.color = "#999999";
            this.$refs.navFoo3[0].style.color = "#999999";
            this.$refs.dl0[0].style.cursor = "pointer";
            this.$refs.dl1[0].style.cursor = "not-allowed";
            this.$refs.dl2[0].style.cursor = "not-allowed";
            this.$refs.dl3[0].style.cursor = "not-allowed";
        },
        //文件消息可拖拽
        handleFile () {
            this.topList[0].imgUrl = require("../../../assets/svg/icon_32px_正文_1.svg");
            this.topList[1].imgUrl = require("../../../assets/svg/icon_32px_图片.svg");
            this.topList[2].imgUrl = require("../../../assets/svg/icon_32px_音频.svg");
            this.topList[3].imgUrl = require("../../../assets/svg/icon_32px_视频.svg");
            this.$refs.navFoo0[0].style.color = "#999999";
            this.$refs.navFoo1[0].style.color = "#FE9636";
            this.$refs.navFoo2[0].style.color = "#FE9636";
            this.$refs.navFoo3[0].style.color = "#FE9636";
            this.$refs.dl0[0].style.cursor = "not-allowed";
            this.$refs.dl1[0].style.cursor = "pointer";
            this.$refs.dl2[0].style.cursor = "pointer";
            this.$refs.dl3[0].style.cursor = "pointer";
        },
        //文本编辑显示
        handleIsType3 () {
            if (this.text == "UP2.4消息") {
                this.type = 3;
                this.isBosDisable = true;
                this.isTitleDisable = false;
                this.isContentDisable = false;
            } else if (this.text == "UP1.0消息") {
                this.type = 18;
                this.isBosDisable = true;
                this.isTitleDisable = false;
                this.isContentDisable = false;
            } else {
                this.type = 22;
                this.isBosDisable = true;
                this.isTitleDisable = false;
                this.isContentDisable = false;
            }
        },
        //消息回落
        handleChange () {
            this.isUP = false;
            this.isSMS = false;
            if (this.checkList.length == 1) {
                this.checkList.map((item) => {
                    if (item == "回落到UP1.0") {
                        this.isUP = true;
                        this.messageFallType = 1;
                    } else {
                        this.isSMS = true;
                        this.messageFallType = 2;
                    }
                });
            } else if (this.checkList.length == 2) {
                this.isUP = true;
                this.isSMS = true;
                this.messageFallType = 3;
            }
        },
        //消息回落开关
        handleMsgBack () {
            if (this.msgBackValue) {
                // this.checkList = ["回落到UP1.0", "回落到SMS"];
                this.isUP = true;
                // this.isSMS = true;
                this.messageFallType = 3;
            } else {
                this.checkList = [];
                this.isUP = false;
                this.isSMS = false;
                this.messageFallType = "";
            }
        },
        //模板设置
        handleSet () {
            this.type = 1;
            this.isModuleDisable = true;
            this.contentStatus = 100;
            this.isBosDisable = false;
            this.isButtonDisable = false;
            this.isModuleCardDisable = false;
            this.moduleCardImgUrl = require("../../../assets/images/icon-14px-卡片@1x.png");
            this.centerImgUrl = require("../../../assets/images/icon-24px-组件@1x.png");
            this.moduleImgUrl = require("../../../assets/images/icon-14px-模板@1x.png");
            if (this.msgValue == 2) {
                this.isCard = true;
            } else {
                this.isCard = false;
            }
        },
        //卡片管理
        handleCardSet () {                                                                                                                                                                 
            this.type = 11;
            this.cardCount = 0; //第几个卡片
            this.isModuleDisable = false;
            this.contentStatus = 100;
            this.isBosDisable = false;
            this.isButtonDisable = false;
            this.isCard = true;
            this.isCardContent = true;
            this.isCardButtonDisable = false;
            this.isModuleCardDisable = true;
            this.moduleCardImgUrl = require("../../../assets/images/icon-14px-卡片@1x-1.png");
            this.centerImgUrl = require("../../../assets/images/icon-24px-组件@1x.png");
            this.moduleImgUrl = require("../../../assets/images/icon-14px-模板@1x-1.png");
            if (this.messageMouldId != "") {
                cardList({ messageMouldId: this.messageMouldId })
                    .then((res) => {
                        this.cardList = res.data.data;
                        //图片，音频，视频
                        if (this.cardList.length == 0) {
                            this.isContent = true;
                            this.isBoxTT = false;
                            this.istype8 = false;
                            this.istype9 = false;
                            this.istype10 = false;
                            this.isCardTitle = true;
                            this.form.cardTitleValue == "";
                            this.istype16 = false;
                            this.isCardContent = true;
                            this.form.cardContentValue == "";
                            this.istype17 = false;
                            this.isCardButtonText = true;
                            this.cardButtonList = [];
                            return;
                        }
                        this.fileIdTow = this.cardList[0].fileGroupDetail.id;
                        this.cardId = this.cardList[0].id;
                        if (this.cardList[0].fileGroupDetail.fileType == 1) {
                            this.isBoxTT = true;
                            this.istype8 = true;
                            this.istype9 = false;
                            this.istype10 = false;
                            this.imageUrl = this.cardList[0].fileGroupDetail.fileUrl;
                            this.form.textImgUrl = this.cardList[0].fileGroupDetail.fileUrl;
                            this.form.textImgType = this.cardList[0].fileGroupDetail.fileUploadType;
                        } else if (this.cardList[0].fileGroupDetail.fileType == 2) {
                            this.isBoxTT = true;
                            this.istype8 = false;
                            this.istype9 = true;
                            this.istype10 = false;
                            this.audioUrl = this.cardList[0].fileGroupDetail.fileUrl;
                            this.form.textAudioUrl = this.cardList[0].fileGroupDetail.fileUrl;
                            this.form.textAudioType = this.cardList[0].fileGroupDetail.fileUploadType;
                        } else if (this.cardList[0].fileGroupDetail.fileType == 3) {
                            this.isBoxTT = true;
                            this.istype8 = false;
                            this.istype9 = false;
                            this.istype10 = true;
                            this.playerOptions.sources[0].src = this.cardList[0].fileGroupDetail.fileUrl;
                            this.form.textVideoUrl = this.cardList[0].fileGroupDetail.fileUrl;
                            this.form.textVideoType = this.cardList[0].fileGroupDetail.fileUploadType;
                        }
                        //卡片标题
                        this.form.cardTitleValue = this.cardList[0].title;
                        if (this.form.cardTitleValue == "") {
                            this.isCardTitle = true;
                        } else {
                            this.isCardTitle = false;
                            this.istype16 = true;
                        }
                        //卡片内容
                        this.form.cardContentValue = this.cardList[0].description;
                        if (this.form.cardContentValue == "") {
                            this.isCardContent = true;
                        } else {
                            this.isCardContent = false;
                            this.istype17 = true;
                        }
                        //卡片菜单按钮
                        if (this.cardList[0].suggestions.length > 0) {
                            this.cardButtonList = this.cardList[0].suggestions;
                            let json1 = { data: "nihao" };
                            this.cardButtonList.map((res, index) => {
                                if (res.reply) {
                                    res.title = "回复消息";
                                    this.arr1.push(res);
                                    // this.form.cardShowTextMsg = res.reply.displayText;//卡片显示文本消息
                                    // this.form.cardBackTextMsg = res.reply.postback.data;//卡片回复文本消息
                                } else if (
                                    JSON.stringify(this.cardButtonList[index]).indexOf(
                                        JSON.stringify(json1)
                                    ) > 0
                                ) {
                                    res.title = "打开链接";
                                    this.brr1.push(res);
                                    // this.form.cardShowTextLink = res.action.displayText;//底部显示文本链接
                                    // this.form.cardLinkAddress = res.action.urlAction.openUrl.url;//底部链接地址
                                } else {
                                    res.title = "拨打电话";
                                    this.crr1.push(res);
                                    // this.form.cardShowTextPhone = res.action.displayText;//卡片显示文本电话
                                    // this.form.cardPhoneNumber = res.action.dialerAction.dialPhoneNumber.phoneNumber;//卡片电话号码
                                }
                            });
                            this.$nextTick(() => {
                                if (this.arr1[0]) {
                                    if (this.arr1[0].reply) {
                                        this.form.cardShowTextMsg1 = this.arr1[0].reply.displayText; //卡片显示文本消息
                                        this.form.cardBackTextMsg1 = this.arr1[0].reply.postback.data; //卡片回复文本消息
                                    }
                                }
                                if (this.arr1[1]) {
                                    if (this.arr1[1].reply) {
                                        this.form.cardShowTextMsg2 = this.arr1[1].reply.displayText; //卡片显示文本消息
                                        this.form.cardBackTextMsg2 = this.arr1[1].reply.postback.data; //卡片回复文本消息
                                    }
                                }
                                if (this.arr1[2]) {
                                    if (this.arr1[2].reply) {
                                        this.form.cardShowTextMsg3 = this.arr1[2].reply.displayText; //卡片显示文本消息
                                        this.form.cardBackTextMsg3 = this.arr1[2].reply.postback.data; //卡片回复文本消息
                                    }
                                }
                                if (this.arr1[3]) {
                                    if (this.arr1[3].reply) {
                                        this.form.cardShowTextMsg4 = this.arr1[3].reply.displayText; //卡片显示文本消息
                                        this.form.cardBackTextMsg4 = this.arr1[3].reply.postback.data; //卡片回复文本消息
                                    }
                                }
                                if (this.brr1[0]) {
                                    if (this.brr1[0].action) {
                                        this.form.cardShowTextLink1 = this.brr1[0].action.displayText; //卡片显示文本链接
                                        this.form.cardLinkAddress1 = this.brr1[0].action.urlAction.openUrl.url; //卡片链接地址
                                    }
                                }
                                if (this.brr1[1]) {
                                    if (this.brr1[1].action) {
                                        this.form.cardShowTextLink2 = this.brr1[1].action.displayText; //卡片显示文本链接
                                        this.form.cardLinkAddress2 = this.brr1[1].action.urlAction.openUrl.url; //卡片链接地址
                                    }
                                }
                                if (this.brr1[2]) {
                                    if (this.brr1[2].action) {
                                        this.form.cardShowTextLink3 = this.brr1[2].action.displayText; //卡片显示文本链接
                                        this.form.cardLinkAddress3 = this.brr1[2].action.urlAction.openUrl.url; //卡片链接地址
                                    }
                                }
                                if (this.brr1[3]) {
                                    if (this.brr1[3].action) {
                                        this.form.cardShowTextLink4 = this.brr1[3].action.displayText; //卡片显示文本链接
                                        this.form.cardLinkAddress4 = this.brr1[3].action.urlAction.openUrl.url; //卡片链接地址
                                    }
                                }
                                if (this.crr1[0]) {
                                    if (this.crr1[0].action) {
                                        this.form.cardShowTextPhone1 = this.crr1[0].action.displayText; //卡片显示文本电话
                                        this.form.cardPhoneNumber1 = this.crr1[0].action.dialerAction.dialPhoneNumber.phoneNumber; //卡片电话号码
                                    }
                                }
                                if (this.crr1[1]) {
                                    if (this.crr1[1].action) {
                                        this.form.cardShowTextPhone2 = this.crr1[1].action.displayText; //卡片显示文本电话
                                        this.form.cardPhoneNumber2 = this.crr1[1].action.dialerAction.dialPhoneNumber.phoneNumber; //卡片电话号码
                                    }
                                }
                                if (this.crr1[2]) {
                                    if (this.crr1[2].action) {
                                        this.form.cardShowTextPhone3 = this.crr1[2].action.displayText; //卡片显示文本电话
                                        this.form.cardPhoneNumber3 = this.crr1[2].action.dialerAction.dialPhoneNumber.phoneNumber; //卡片电话号码
                                    }
                                }
                                if (this.crr1[3]) {
                                    if (this.crr1[3].action) {
                                        this.form.cardShowTextPhone4 = this.crr1[3].action.displayText; //卡片显示文本电话
                                        this.form.cardPhoneNumber4 = this.crr1[3].action.dialerAction.dialPhoneNumber.phoneNumber; //卡片电话号码
                                    }
                                }
                            });
                        }
                        if (this.cardButtonList.length > 0) {
                            this.isCardButtonText = false;
                        } else {
                            this.isCardButtonText = true;
                        }
                    })
                    .catch((error) => {
                        this.$message.error({
                            message: error,
                            center: true,
                        });
                    });
            }
        },
        //点击基础组件
        handleFocus (e) {
            this.isButtonDisable = false;
            this.isCardButtonDisable = false;
            this.isTitleDisable = false;
            this.isContentDisable = false;
            this.isModuleDisable = false;
            this.moduleImgUrl = require("../../../assets/images/icon-14px-模板@1x-1.png");
            this.isModuleCardDisable = false;
            this.moduleCardImgUrl = require("../../../assets/images/icon-14px-卡片@1x.png");
            if (this.contentStatus == 100) {
                this.isBosDisable = true;
                this.type = 2;
                this.msgT = "内容组件";
            } else if (this.contentStatus == 101) {
                this.isBosDisable = true;
                this.type = 2;
            } else if (this.contentStatus == 102) {
                this.isBosDisable = true;
                this.type = 3;
            }
            if (this.form.cardContentValue == "") {
                this.isCardContent = true;
            } else {
                this.isCardContent = false;
            }
            if (this.form.cardTitleValue == "") {
                this.isCardTitle = true;
            } else {
                this.isCardTitle = false;
            }
        },
        //点击卡片菜单部分
        handleFocusCardBtn () {
            this.isBosDisable = false;
            this.isModuleDisable = false;
            this.isButtonDisable = false;
            this.isTitleDisable = false;
            this.isContentDisable = false;
            this.isCardButtonDisable = true;
            this.moduleImgUrl = require("../../../assets/images/icon-14px-模板@1x-1.png");
            this.isModuleCardDisable = false;
            this.moduleCardImgUrl = require("../../../assets/images/icon-14px-卡片@1x.png");
            if (this.cardButtonList.length == 0) {
                this.type = 2;
                this.msgT = "卡片按钮";
            } else {
                this.type = 12;
            }
            if (this.form.cardContentValue == "") {
                this.isCardContent = true;
            } else {
                this.isCardContent = false;
            }
            if (this.form.cardTitleValue == "") {
                this.isCardTitle = true;
            } else {
                this.isCardTitle = false;
            }
        },
        //点击底部菜单部分
        handleFocusBtn () {
            this.isBosDisable = false;
            this.isModuleDisable = false;
            this.isTitleDisable = false;
            this.isContentDisable = false;
            this.isCardButtonDisable = false;
            this.isButtonDisable = true;
            this.moduleImgUrl = require("../../../assets/images/icon-14px-模板@1x-1.png");
            this.isModuleCardDisable = false;
            this.moduleCardImgUrl = require("../../../assets/images/icon-14px-卡片@1x.png");
            if (this.buttonList.length == 0) {
                this.type = 2;
                this.msgT = "悬浮菜单";
            } else {
                this.type = 4;
            }
        },
        handleInput () {
            this.isBoxTT = true;
            this.istype3 = true;
        },
        handleInputOne () {
            this.isBoxTTOne = true;
            this.istype18 = true;
        },
        handleInputSMS () {
            this.isBoxTTSMS = true;
            this.istype22 = true;
        },
        handleInputChange () {
            this.isBoxTT = true;
            this.istype41 = true;
        },
        handleInputChangeOne () {
            this.isBoxTTOne = true;
            this.istype42 = true;
        },
        handleInputChangeSMS () {
            this.isBoxTTSMS = true;
            this.istype43 = true;
        },
        //基础组件不聚焦
        handleModule (e) {
            this.isBosDisable = false;
            this.isButtonDisable = false;
            this.isCardButtonDisable = false;
        },
        //点击编辑标题
        handleCardTitle () {
            this.isCardTitle = false;
            this.isTitleDisable = true;
            this.isContentDisable = false;
            this.isBosDisable = false;
            this.isModuleDisable = false;
            this.isModuleCardDisable = false;
            this.moduleCardImgUrl = require("../../../assets/images/icon-14px-卡片@1x.png");
            this.isCardButtonDisable = false;
            this.isButtonDisable = false;
            this.istype16 = true;
            this.type = 16;
            if (this.form.cardContentValue == "") {
                this.isCardContent = true;
            } else {
                this.isCardContent = false;
            }
        },
        //点击编辑内容
        handleCardContent () {
            this.isBosDisable = false;
            this.isTitleDisable = false;
            this.isContentDisable = true;
            this.isModuleDisable = false;
            this.isModuleCardDisable = false;
            this.isCardButtonDisable = false;
            this.moduleCardImgUrl = require("../../../assets/images/icon-14px-卡片@1x.png");
            this.isButtonDisable = false;
            this.isCardContent = false;
            this.istype17 = true;
            this.type = 17;
            if (this.form.cardTitleValue == "") {
                this.isCardTitle = true;
            } else {
                this.isCardTitle = false;
            }
        },
        //点击卡片菜单按钮
        handleCardBtn (val) {
            this.isModuleDisable = false;
            this.isButtonDisable = false;
            this.isTitleDisable = false;
            this.isContentDisable = false;
            this.isCardButtonDisable = false;
            this.moduleImgUrl = require("../../../assets/images/icon-14px-模板@1x-1.png");
            this.isModuleCardDisable = false;
            this.moduleCardImgUrl = require("../../../assets/images/icon-14px-卡片@1x.png");
            this.arr1 = [];
            this.brr1 = [];
            this.crr1 = [];
            this.cardButtonList.map((item) => {
                if (item.title == "回复消息") {
                    this.arr1.push(item);
                }
                if (item.title == "打开链接") {
                    this.brr1.push(item);
                }
                if (item.title == "拨打电话") {
                    this.crr1.push(item);
                }
            });
            if (val.title == "回复消息") {
                if (this.arr1[0] && this.arr1[0] == val) {
                    this.type = 13;
                } else if (this.arr1[1] && this.arr1[1] == val) {
                    this.type = 32;
                } else if (this.arr1[2] && this.arr1[2] == val) {
                    this.type = 33;
                } else if (this.arr1[3] && this.arr1[3] == val) {
                    this.type = 34;
                }
            } else if (val.title == "打开链接") {
                if (this.brr1[0] && this.brr1[0] == val) {
                    this.type = 14;
                } else if (this.brr1[1] && this.brr1[1] == val) {
                    this.type = 35;
                } else if (this.brr1[2] && this.brr1[2] == val) {
                    this.type = 36;
                } else if (this.brr1[3] && this.brr1[3] == val) {
                    this.type = 37;
                }
            } else if (val.title == "拨打电话") {
                if (this.crr1[0] && this.crr1[0] == val) {
                    this.type = 15;
                } else if (this.crr1[1] && this.crr1[1] == val) {
                    this.type = 38;
                } else if (this.crr1[2] && this.crr1[2] == val) {
                    this.type = 39;
                } else if (this.crr1[3] && this.crr1[3] == val) {
                    this.type = 40;
                }
            } else if (val.title == "分享位置") {
                this.type = 2;
                this.msgT = "分享位置";
            }
            if (this.form.cardContentValue == "") {
                this.isCardContent = true;
            } else {
                this.isCardContent = false;
            }
            if (this.form.cardTitleValue == "") {
                this.isCardTitle = true;
            } else {
                this.isCardTitle = false;
            }
        },
        //点击底部菜单按钮
        handleBtn (index, val) {
            //
            this.isModuleDisable = false;
            this.isButtonDisable = false;
            this.isTitleDisable = false;
            this.isContentDisable = false;
            this.isCardButtonDisable = false;
            this.moduleImgUrl = require("../../../assets/images/icon-14px-模板@1x-1.png");
            this.isModuleCardDisable = false;
            this.moduleCardImgUrl = require("../../../assets/images/icon-14px-卡片@1x.png");
            this.arr = [];
            this.brr = [];
            this.crr = [];
            this.buttonList.map((item) => {
                if (item.title == "回复消息") {
                    this.arr.push(item);
                }
                if (item.title == "打开链接") {
                    this.brr.push(item);
                }
                if (item.title == "拨打电话") {
                    this.crr.push(item);
                }
            });
            //
            if (val.title == "回复消息") {
                if (this.arr[0] && this.arr[0] == val) {
                    this.type = 5;
                } else if (this.arr[1] && this.arr[1] == val) {
                    this.type = 23;
                } else if (this.arr[2] && this.arr[2] == val) {
                    this.type = 24;
                } else if (this.arr[3] && this.arr[3] == val) {
                    this.type = 25;
                }
            } else if (val.title == "打开链接") {
                if (this.brr[0] && this.brr[0] == val) {
                    this.type = 6;
                } else if (this.brr[1] && this.brr[1] == val) {
                    this.type = 26;
                } else if (this.brr[2] && this.brr[2] == val) {
                    this.type = 27;
                } else if (this.brr[3] && this.brr[3] == val) {
                    this.type = 28;
                }
            } else if (val.title == "拨打电话") {
                if (this.crr[0] && this.crr[0] == val) {
                    this.type = 7;
                } else if (this.crr[1] && this.crr[1] == val) {
                    this.type = 29;
                } else if (this.crr[2] && this.crr[2] == val) {
                    this.type = 30;
                } else if (this.crr[3] && this.crr[3] == val) {
                    this.type = 31;
                }
            } else if (val == "分享位置") {
                this.type = 2;
                this.msgT = "分享位置";
            }
            if (this.form.cardContentValue == "") {
                this.isCardContent = true;
            } else {
                this.isCardContent = false;
            }
            if (this.form.cardTitleValue == "") {
                this.isCardTitle = true;
            } else {
                this.isCardTitle = false;
            }
        },
        //清除卡片按钮组件
        handleCardDelete () {
            this.$confirm("是否清除全部组件？", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                confirmButtonClass: "btn-custom-confirm",
                center: true,
            })
                .then(() => {
                    this.cardButtonList = [];
                    this.type = 2;
                    this.isCardButtonDisable = true;
                    this.isButtonDisable = false;
                    this.isCardButtonText = true;
                    this.isTitleDisable = false;
                    this.isContentDisable = false;
                    if (this.form.cardContentValue == "") {
                        this.isCardContent = true;
                    } else {
                        this.isCardContent = false;
                    }
                    if (this.form.cardTitleValue == "") {
                        this.isCardTitle = true;
                    } else {
                        this.isCardTitle = false;
                    }
                    this.msgT = "卡片管理";
                    this.$message({
                        type: "success",
                        message: "清除成功!",
                        center: true,
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消清除",
                        center: true,
                    });
                });
        },
        //删除单个卡片菜单按钮
        cardDelete (val) {
            this.$confirm("是否删除该组件?", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                confirmButtonClass: "btn-custom-confirm",
                center: true,
            })
                .then(() => {
                    this.cardButtonList.splice(val, 1);
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                        center: true,
                    });
                    if (this.cardButtonList.length == 0) {
                        this.type = 2;
                        this.isCardButtonDisable = true;
                        this.isButtonDisable = false;
                        this.isCardButtonText = true;
                        this.isTitleDisable = false;
                        this.isContentDisable = false;
                        if (this.form.cardContentValue == "") {
                            this.isCardContent = true;
                        } else {
                            this.isCardContent = false;
                        }
                        if (this.form.cardTitleValue == "") {
                            this.isCardTitle = true;
                        } else {
                            this.isCardTitle = false;
                        }
                        this.msgT = "卡片按钮";
                    }
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                        center: true,
                    });
                });
        },
        //删除单个卡片管理按钮
        cardManagementDelete (index, val) {
            this.$confirm("是否删除该组件?", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                confirmButtonClass: "btn-custom-confirm",
                center: true,
            })
                .then(() => {
                    deleteCard({ messageMouldCardId: val }).then((res) => {
                        // this.cardList.splice(index,1);
                        this.istype8 = false;
                        this.istype9 = false;
                        this.istype10 = false;
                        this.handleCardSet();
                    });
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                        center: true,
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                        center: true,
                    });
                });
        },
        //清除底部按钮组件
        handleDelete () {
            this.$confirm("是否清除全部组件？", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                confirmButtonClass: "btn-custom-confirm",
                center: true,
            })
                .then(() => {
                    this.buttonList = [];
                    this.type = 2;
                    this.isCardButtonDisable = false;
                    this.isButtonDisable = true;
                    this.isButtonText = true;
                    this.isTitleDisable = false;
                    this.isContentDisable = false;
                    if (this.form.cardContentValue == "") {
                        this.isCardContent = true;
                    } else {
                        this.isCardContent = false;
                    }
                    if (this.form.cardTitleValue == "") {
                        this.isCardTitle = true;
                    } else {
                        this.isCardTitle = false;
                    }
                    this.msgT = "悬浮菜单";
                    this.$message({
                        type: "success",
                        message: "清除成功!",
                        center: true,
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消清除",
                        center: true,
                    });
                });
        },
        //删除单个底部菜单按钮
        Delete (val) {
            this.$confirm("是否删除该组件?", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                confirmButtonClass: "btn-custom-confirm",
                center: true,
            })
                .then(() => {
                    this.buttonList.splice(val, 1);
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                        center: true,
                    });
                    if (this.buttonList.length == 0) {
                        this.type = 2;
                        this.isCardButtonDisable = false;
                        this.isButtonDisable = true;
                        this.isButtonText = true;
                        this.isTitleDisable = false;
                        this.isContentDisable = false;
                        if (this.form.cardContentValue == "") {
                            this.isCardContent = true;
                        } else {
                            this.isCardContent = false;
                        }
                        if (this.form.cardTitleValue == "") {
                            this.isCardTitle = true;
                        } else {
                            this.isCardTitle = false;
                        }
                        this.msgT = "悬浮菜单";
                    }
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                        center: true,
                    });
                });
        },
        //删除2.4图片、音频、视频组件
        handleDeleted () {
            this.$confirm("是否清除全部组件？", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                confirmButtonClass: "btn-custom-confirm",
                center: true,
            })
                .then(() => {
                    this.type = 2;
                    this.fileIdTow = "";
                    this.isBoxTT = false;
                    this.istype8 = false;
                    this.istype9 = false;
                    this.istype10 = false;
                    this.isContent = true;
                    this.contentStatus = 100;
                    this.centerImgUrl = require("../../../assets/images/icon-24px-组件@1x.png");
                    this.msgT = "内容组件";
                    this.msg = "拖拽文件组件至此";
                    this.$message({
                        type: "success",
                        message: "清除成功!",
                        center: true,
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消清除",
                        center: true,
                    });
                });
        },
        //删除1.0图片、音频、视频组件
        handleDeletedOne () {
            this.$confirm("是否清除全部组件？", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                confirmButtonClass: "btn-custom-confirm",
                center: true,
            })
                .then(() => {
                    this.type = 2;
                    this.fileIdOne = "";
                    this.isBoxTTOne = false;
                    this.istype19 = false;
                    this.istype20 = false;
                    this.istype21 = false;
                    this.isButtonText = true;
                    this.isContent = true;
                    this.contentStatus = 100;
                    this.centerImgUrl = require("../../../assets/images/icon-24px-组件@1x.png");
                    this.msgT = "内容组件";
                    this.msg = "拖拽文件组件至此";
                    this.$message({
                        type: "success",
                        message: "清除成功!",
                        center: true,
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消清除",
                        center: true,
                    });
                });
        },
        //弹框
        async handleNavButton () {
            if (this.appValue == '') {
                this.$message({
                    type: "warning",
                    message: "应用未选择!",
                    center: true,
                });
                return
            }
            // if (this.channelValue == '') {
            //     this.$message({
            //         type: "warning",
            //         message: "通道未选择!",
            //         center: true,
            //     });
            //     return
            // }
            this.checkbox = [];
            if (this.type == 8 || this.type == 19) {
                await imageGroup({ 
                    fileType: 1, 
                    fileStatus: 1, 
                    // channelId: this.channelValue, 
                    enterpriseAccountAppId: this.appValue, 
                })
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
                    // channelId: this.channelValue,
                    enterpriseAccountAppId: this.appValue,
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
            } else if (this.type == 9 || this.type == 20) {
                imageLists({
                    // channelId: this.channelValue,
                    enterpriseAccountAppId: this.appValue,
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
            } else if (this.type == 10 || this.type == 21) {
                imageLists({
                    // channelId: this.channelValue,
                    enterpriseAccountAppId: this.appValue,
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
        //图片分页
        handleCurrentChange (val) {

            if (this.type == 8) {
                imageLists({
                    // channelId: this.channelValue,
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
            } else if (this.type == 9) {
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
            } else if (this.type == 10) {
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
                this.type = 8;
                this.istype8 = true;
                this.isBoxTT = true;
                this.dialogVisible = false;
                this.fileIdTow = this.checkbox[0];
                getFile({ fileGroupDetailId: this.checkbox[0] })
                    .then((res) => {
                        
                        this.imageUrl = res.data.data.fileUrl;
                        this.form.textImgUrl = res.data.data.fileUrl;
                        this.form.textImgType = res.data.data.fileUploadType;
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
                this.type = 9;
                this.istype9 = true;
                this.isBoxTT = true;
                this.imageUrl = require("../../../assets/images/icon-32px-音频@1x-1.png");
                this.dialogVisible = false;
                this.fileIdTow = this.checkbox[0];
                getFile({ fileGroupDetailId: this.checkbox[0] })
                    .then((res) => {
                        this.audioUrl = res.data.data.fileUrl;
                        this.form.textAudioUrl = res.data.data.fileUrl;
                        this.form.textAudioType = res.data.data.fileUploadType;
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
                this.type = 10;
                this.istype10 = true;
                this.isBoxTT = true;
                this.dialogVisible = false;
                this.fileIdTow = this.checkbox[0];
                getFile({ fileGroupDetailId: this.checkbox[0] })
                    .then((res) => {
                        this.playerOptions.sources[0].src = res.data.data.fileUrl;
                        this.form.textVideoUrl = res.data.data.fileUrl;
                        this.form.textVideoType = res.data.data.fileUploadType;
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
        //1.0确认图片
        confirmImageOne () {
            if (this.checkbox.length > 0) {
                this.type = 19;
                this.istype19 = true;
                this.isBoxTTOne = true;
                this.dialogVisible = false;
                this.fileIdOne = this.checkbox[0];
                getFile({ fileGroupDetailId: this.checkbox[0] })
                    .then((res) => {
                        this.imageUrlOne = res.data.data.fileUrl;
                        this.form.textImgUrlOne = res.data.data.fileUrl;
                        this.form.textImgTypeOne = res.data.data.fileUploadType;
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
        //1.0确认音频
        confirmAudioOne () {
            if (this.checkbox.length > 0) {
                this.type = 20;
                this.istype20 = true;
                this.isBoxTTOne = true;
                this.imageUrl = require("../../../assets/images/icon-32px-音频@1x-1.png");
                this.dialogVisible = false;
                this.fileIdOne = this.checkbox[0];
                getFile({ fileGroupDetailId: this.checkbox[0] })
                    .then((res) => {
                        this.audioUrlOne = res.data.data.fileUrl;
                        this.form.textAudioUrlOne = res.data.data.fileUrl;
                        this.form.textAudioTypeOne = res.data.data.fileUploadType;
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
        //1.0确认视频
        confirmVideoOne () {
            if (this.checkbox.length > 0) {
                this.type = 21;
                this.istype21 = true;
                this.isBoxTTOne = true;
                this.dialogVisible = false;
                this.fileIdOne = this.checkbox[0];
                getFile({ fileGroupDetailId: this.checkbox[0] })
                    .then((res) => {
                        this.playerOptionsOne.sources[0].src = res.data.data.fileUrl;
                        this.form.textVideoUrlOne = res.data.data.fileUrl;
                        this.form.textVideoTypeOne = res.data.data.fileUploadType;
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
        handleEnded () {
            this.audioImgUrl = require("../../../assets/images/icon-14px-播放@1x-1.png");
            this.flag = false;
        },
        //音频时长
        handleDuration () {
            var h = Math.floor(this.$refs.audio.duration / 360);
            var m =
                Math.floor(this.$refs.audio.duration / 60) < 10
                    ? "0" + Math.floor(this.$refs.audio.duration / 60)
                    : Math.floor(this.$refs.audio.duration / 60);
            var s = Math.floor(this.$refs.audio.duration % 60);
            var str = h > 0 ? h + ":" + m + ":" + s : m + ":" + s;
            this.duration = str;
        },
        //音频播放ing
        handlePlaying (e) {
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
            this.currentTime = str;
        },
        //播放音频
        handlePlay () {
            this.flag = !this.flag;
            if (this.flag) {
                this.$refs.audio.play();
                this.audioImgUrl = require("../../../assets/images/icon-14px-暂停@1x.png");
            } else {
                this.$refs.audio.pause();
                this.audioImgUrl = require("../../../assets/images/icon-14px-播放@1x-1.png");
            }
        },
        //音量大小
        handleSlider () {
            this.$refs.audio.volume = this.voiceValue / 100;
        },
        handleEndedOne () {
            this.audioImgUrl = require("../../../assets/images/icon-14px-播放@1x-1.png");
            this.flagOne = false;
        },
        //音频时长
        handleDurationOne () {
            var h = Math.floor(this.$refs.audioOne.duration / 360);
            var m =
                Math.floor(this.$refs.audioOne.duration / 60) < 10
                    ? "0" + Math.floor(this.$refs.audioOne.duration / 60)
                    : Math.floor(this.$refs.audioOne.duration / 60);
            var s = Math.floor(this.$refs.audioOne.duration % 60);
            var str = h > 0 ? h + ":" + m + ":" + s : m + ":" + s;
            this.durationOne = str;
        },
        //音频播放ing
        handlePlayingOne (e) {
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
            this.currentTimeOne = str;
        },
        //播放音频
        handlePlayOne () {
            this.flagOne = !this.flagOne;
            if (this.flagOne) {
                this.$refs.audioOne.play();
                this.audioImgUrl = require("../../../assets/images/icon-14px-暂停@1x.png");
            } else {
                this.$refs.audioOne.pause();
                this.audioImgUrl = require("../../../assets/images/icon-14px-播放@1x-1.png");
            }
        },
        //音量大小
        handleSliderOne () {
            this.$refs.audioOne.volume = this.voiceValue / 100;
        },
        //改变卡片样式,获取卡片详情
        handleCard (index) {
            if(this.cardList[index].title !== ''){
                this.isBoxTT = true;
                this.fileIdTow = this.cardList[index].fileGroupDetail.id;
                this.cardCount = index;
                this.cardId = this.cardList[index].id;
                if (this.cardList[index].fileGroupDetail.fileType == 1) {
                    this.istype8 = true;
                    this.istype9 = false;
                    this.istype10 = false;
                    this.imageUrl = this.cardList[index].fileGroupDetail.fileUrl;
                    console.log('this.imageUrl: ', this.imageUrl);
                } else if (this.cardList[index].fileGroupDetail.fileType == 2) {
                    this.istype8 = false;
                    this.istype9 = true;
                    this.istype10 = false;
                    this.audioUrl = this.cardList[index].fileGroupDetail.fileUrl;
                } else if (this.cardList[index].fileGroupDetail.fileType == 3) {
                    this.istype8 = false;
                    this.istype9 = false;
                    this.istype10 = true;
                    this.playerOptions.sources[0].src = this.cardList[
                        index
                    ].fileGroupDetail.fileUrl;
                }
                this.form.cardTitleValue = this.cardList[index].title;
                if (this.form.cardTitleValue == "") {
                    this.isCardTitle = true;
                } else {
                    this.isCardTitle = false;
                    this.istype16 = true;
                }
                this.form.cardContentValue = this.cardList[index].description;
                if (this.form.cardContentValue == "") {
                    this.isCardContent = true;
                } else {
                    this.isCardContent = false;
                    this.istype17 = true;
                }
                this.cardButtonList = this.cardList[index].suggestions;
                var json1 = { data: "nihao" };
                this.cardButtonList.map((res, index) => {
                    if (res.reply) {
                        res.title = "回复消息";
                        this.form.cardShowTextMsg = res.reply.displayText; //卡片显示文本消息
                        this.form.cardBackTextMsg = res.reply.postback.data; //卡片回复文本消息
                    } else if (
                        JSON.stringify(this.cardButtonList[index]).indexOf(
                            JSON.stringify(json1)
                        ) > 0
                    ) {
                        res.title = "打开链接";
                        this.form.cardShowTextLink = res.action.displayText; //底部显示文本链接
                        this.form.cardLinkAddress = res.action.urlAction.openUrl.url; //底部链接地址
                    } else {
                        res.title = "拨打电话";
                        this.form.cardShowTextPhone = res.action.displayText; //卡片显示文本电话
                        this.form.cardPhoneNumber =
                            res.action.dialerAction.dialPhoneNumber.phoneNumber; //卡片电话号码
                    }
                });
                if (this.cardButtonList.length > 0) {
                    this.isCardButtonText = false;
                } else {
                    this.isCardButtonText = true;
                }
            }else{
                this.isBoxTT = false;
                this.istype8 = false;
                this.istype9 = false;
                this.istype10 = false;
                this.isCardTitle = true;
                this.form.cardTitleValue = "";
                this.isCardContent = true;
                this.form.cardContentValue = "";
                this.isCardButtonText = true;
                this.cardButtonList = [];
                this.form.cardShowTextMsg = ""; //卡片显示文本消息
                this.form.cardBackTextMsg = ""; //卡片回复文本消息
                this.form.cardShowTextLink = ""; //卡片显示文本链接
                this.form.cardLinkAddress = ""; //卡片链接地址
                this.form.cardShowTextPhone = ""; //卡片显示文本电话
                this.form.cardPhoneNumber = ""; //卡片电话号码
            }
        },
        //新建卡片
        handleAddCard () {
            if(this.cardList.length > 11){
                this.$message({
                    message: "最多新增12个卡片！",
                    type: "warning",
                    center: true,
                });
                return
            }
            var title = "";
            this.cardId = "";
            var result = this.cardList.find((item) => {
                return item["title"] == title;
            });
            if (result) {
                this.$message({
                    message: "一次只能新建一张卡片！",
                    type: "warning",
                    center: true,
                });
            } else {
                this.cardList.push({ id: '', title: "" });
                this.cardCount = this.cardList.length - 1;
                this.isBoxTT = false;
                this.istype8 = false;
                this.istype9 = false;
                this.istype10 = false;
                this.isCardTitle = true;
                this.form.cardTitleValue = "";
                this.isCardContent = true;
                this.form.cardContentValue = "";
                this.isCardButtonText = true;
                this.cardButtonList = [];
                this.form.cardShowTextMsg = ""; //卡片显示文本消息
                this.form.cardBackTextMsg = ""; //卡片回复文本消息
                this.form.cardShowTextLink = ""; //卡片显示文本链接
                this.form.cardLinkAddress = ""; //卡片链接地址
                this.form.cardShowTextPhone = ""; //卡片显示文本电话
                this.form.cardPhoneNumber = ""; //卡片电话号码
            }
        },
        //修改卡片
        handleEdit (val) {
            this.cardCount = null;
        },
        //添加变量2.4
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
        //添加变量1.0
        handleAddChangeOne () {
            const elInput = this.$refs.targetInOne.$el.firstElementChild; // 拿到目标标签；
            this.numberOne = 0;
            var offset = 0;
            do {
                offset = this.form.descChangeOne.indexOf('{ 变量', offset);
                if (offset != -1) {
                    this.numberOne++;
                    offset += '{ 变量'.length;
                }
            } while (offset != -1)
            this.numberOne++;
            const str = ` { 变量 ${this.numberOne} } `;
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
            this.form.descChangeOne =
                txt.substring(0, startPos) + str + txt.substring(endPos);
            // 将光标移至文本末尾
            elInput.focus();
            elInput.selectionStart = startPos + str.length;
            elInput.selectionEnd = startPos + str.length;
        },
        //添加变量sms
        handleAddChangeSMS () {
            const elInput = this.$refs.targetInSMS.$el.firstElementChild; // 拿到目标标签；
            this.numberSMS = 0;
            var offset = 0;
            do {
                offset = this.form.descChangeSMS.indexOf('{ 变量', offset);
                if (offset != -1) {
                    this.numberSMS++;
                    offset += '{ 变量'.length;
                }
            } while (offset != -1)
            this.numberSMS++;
            const str = ` { 变量 ${this.numberSMS} } `;
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
            this.form.descChangeSMS =
                txt.substring(0, startPos) + str + txt.substring(endPos);
            // 将光标移至文本末尾
            elInput.focus();
            elInput.selectionStart = startPos + str.length;
            elInput.selectionEnd = startPos + str.length;
        },
        //根据业务类型应用获取通道
        // handleApp () {
        //     channelList({ enterpriseAccountAppId: this.appValue, businessTypeConfigId: this.businessValue }).then(res => {
        //         this.channelOptions = res.data.data;
        //         this.channelValue = '';
        //     })
        // },
        //获取底部菜单按钮详情
        getText () {
            if (this.arr[0]) {
                if (this.arr[0].reply) {
                    this.form.showTextMsg1 = this.arr[0].reply.displayText; //底部显示文本消息
                    this.form.backTextMsg1 = this.arr[0].reply.postback.data; //底部回复文本消息
                }
            }
            if (this.arr[1]) {
                if (this.arr[1].reply) {
                    this.form.showTextMsg2 = this.arr[1].reply.displayText; //底部显示文本消息
                    this.form.backTextMsg2 = this.arr[1].reply.postback.data; //底部回复文本消息
                }
            }
            if (this.arr[2]) {
                if (this.arr[2].reply) {
                    this.form.showTextMsg3 = this.arr[2].reply.displayText; //底部显示文本消息
                    this.form.backTextMsg3 = this.arr[2].reply.postback.data; //底部回复文本消息
                }
            }
            if (this.arr[3]) {
                if (this.arr[3].reply) {
                    this.form.showTextMsg4 = this.arr[3].reply.displayText; //底部显示文本消息
                    this.form.backTextMsg4 = this.arr[3].reply.postback.data; //底部回复文本消息
                }
            }
            if (this.brr[0]) {
                if (this.brr[0].action) {
                    this.form.showTextLink1 = this.brr[0].action.displayText; //底部显示文本链接
                    this.form.LinkAddress1 = this.brr[0].action.urlAction.openUrl.url; //底部链接地址
                }
            }
            if (this.brr[1]) {
                if (this.brr[1].action) {
                    this.form.showTextLink2 = this.brr[1].action.displayText; //底部显示文本链接
                    this.form.LinkAddress2 = this.brr[1].action.urlAction.openUrl.url; //底部链接地址
                }
            }
            if (this.brr[2]) {
                if (this.brr[2].action) {
                    this.form.showTextLink3 = this.brr[2].action.displayText; //底部显示文本链接
                    this.form.LinkAddress3 = this.brr[2].action.urlAction.openUrl.url; //底部链接地址
                }
            }
            if (this.brr[3]) {
                if (this.brr[3].action) {
                    this.form.showTextLink4 = this.brr[3].action.displayText; //底部显示文本链接
                    this.form.LinkAddress4 = this.brr[3].action.urlAction.openUrl.url; //底部链接地址
                }
            }
            if (this.crr[0]) {
                if (this.crr[0].action) {
                    this.form.showTextPhone1 = this.crr[0].action.displayText; //底部显示文本电话
                    this.form.phoneNumber1 = this.crr[0].action.dialerAction.dialPhoneNumber.phoneNumber; //底部电话号码
                }
            }
            if (this.crr[1]) {
                if (this.crr[1].action) {
                    this.form.showTextPhone2 = this.crr[1].action.displayText; //底部显示文本电话
                    this.form.phoneNumber2 = this.crr[1].action.dialerAction.dialPhoneNumber.phoneNumber; //底部电话号码
                }
            }
            if (this.crr[2]) {
                if (this.crr[2].action) {
                    this.form.showTextPhone3 = this.crr[2].action.displayText; //底部显示文本电话
                    this.form.phoneNumber3 = this.crr[2].action.dialerAction.dialPhoneNumber.phoneNumber; //底部电话号码
                }
            }
            if (this.crr[3]) {
                if (this.crr[3].action) {
                    this.form.showTextPhone4 = this.crr[3].action.displayText; //底部显示文本电话
                    this.form.phoneNumber4 = this.crr[3].action.dialerAction.dialPhoneNumber.phoneNumber; //底部电话号码
                }
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
            this.isButtonDisable = false;
            this.isCardButtonDisable = false;
            if (this.form.cardContentValue == "") {
                this.isCardContent = true;
            } else {
                this.isCardContent = false;
            }
            if (this.form.cardTitleValue == "") {
                this.isCardTitle = true;
            } else {
                this.isCardTitle = false;
            }
            this.moduleImgUrl = require("../../../assets/images/icon-14px-模板@1x-1.png");
            this.isModuleCardDisable = false;
            this.moduleCardImgUrl = require("../../../assets/images/icon-14px-卡片@1x.png");
            //   ev.target.appendChild(document.getElementById(data));
            if (this.text == "UP2.4消息") {
                if (this.msgValue == 0) {
                    if (data == 0) {
                        this.centerImgUrl = require("../../../assets/images/icon-32px-正文@1x.png");
                        this.contentStatus = 102;
                        this.isContent = false;
                        this.isBosDisable = true;
                        this.type = 3;
                        this.istype3 = true;
                    } else {
                        this.$message({
                            type: "warning",
                            message: "只能拖动内容文本组件!",
                            center: true,
                        });
                    }
                } else if (this.msgValue == 3) {
                    if (data == 0) {
                        this.centerImgUrl = require("../../../assets/images/icon-32px-正文@1x.png");
                        this.contentStatus = 102;
                        this.isContent = false;
                        this.isBosDisable = true;
                        this.type = 41;
                        this.istype41 = true;
                    } else {
                        this.$message({
                            type: "warning",
                            message: "只能拖动内容文本组件!",
                            center: true,
                        });
                    }
                } else {
                    if (data == 1) {
                        this.centerImgUrl = require("../../../assets/images/icon-32px-图片@1x.png");
                        this.contentStatus = 103;
                        this.isContent = false;
                        this.isBosDisable = true;
                        this.type = 8;
                    } else if (data == 2) {
                        this.centerImgUrl = require("../../../assets/images/icon-32px-音频@1x.png");
                        this.contentStatus = 104;
                        this.isContent = false;
                        this.isBosDisable = true;
                        this.type = 9;
                    } else if (data == 3) {
                        this.centerImgUrl = require("../../../assets/images/icon-32px-视频@1x.png");
                        this.contentStatus = 105;
                        this.isContent = false;
                        this.isBosDisable = true;
                        this.type = 10;
                    } else {
                        this.$message({
                            type: "warning",
                            message: "只能拖动拖动图片、音频、视频组件!",
                            center: true,
                        });
                    }
                }
            } else if (this.text == "UP1.0消息") {
                if (data == 0) {
                    if(this.msgValue == 3){
                        this.centerImgUrl = require("../../../assets/images/icon-32px-正文@1x.png");
                        this.contentStatus = 102;
                        this.isContent = false;
                        this.isBosDisable = true;
                        this.type = 42;
                        this.istype42 = true;
                        this.messageMouldTypeOne = 0;
                        this.fileIdOne = "";
                    }else{
                        this.centerImgUrl = require("../../../assets/svg/正文.svg");
                        this.contentStatus = 102;
                        this.isContent = false;
                        this.isBosDisable = true;
                        this.type = 18;
                        this.istype18 = true;
                        this.messageMouldTypeOne = 0;
                        this.fileIdOne = "";
                    }
                } else if (data == 1) {
                    this.centerImgUrl = require("../../../assets/svg/图片.svg");
                    this.contentStatus = 103;
                    this.isContent = false;
                    this.isBosDisable = true;
                    this.type = 19;
                    this.messageMouldTypeOne = 1;
                } else if (data == 2) {
                    this.centerImgUrl = require("../../../assets/svg/音频 (2).svg");
                    this.contentStatus = 104;
                    this.isContent = false;
                    this.isBosDisable = true;
                    this.type = 20;
                    this.messageMouldTypeOne = 1;
                } else if (data == 3) {
                    this.centerImgUrl = require("../../../assets/svg/视频.svg");
                    this.contentStatus = 105;
                    this.isContent = false;
                    this.isBosDisable = true;
                    this.type = 21;
                    this.messageMouldTypeOne = 1;
                } else {
                    this.$message({
                        type: "warning",
                        message: "只能拖动拖动文本、图片、音频、视频组件!",
                        center: true,
                    });
                }
            } else {
                if (data == 0) {
                    if(this.msgValue == 3){
                        this.centerImgUrl = require("../../../assets/svg/正文.svg");
                        this.contentStatus = 102;
                        this.isContent = false;
                        this.isBosDisable = true;
                        this.type = 43;
                        this.istype43 = true;
                    }else{
                        this.centerImgUrl = require("../../../assets/svg/正文.svg");
                        this.contentStatus = 102;
                        this.isContent = false;
                        this.isBosDisable = true;
                        this.type = 22;
                        this.istype22 = true;
                    }
                } else {
                    this.$message({
                        type: "warning",
                        message: "只能拖动拖动文本组件!",
                        center: true,
                    });
                }
            }
        },
        allowDropM (ev) {
            //放到何处
            ev.preventDefault();
        },
        dragM (ev, index) {
            //拖动什么
            ev.dataTransfer.setData("Text", index + 10);
        },
        dropM (ev) {
            //进行放置
            ev.preventDefault();
            var data = ev.dataTransfer.getData("Text");
            this.isModuleDisable = false;
            this.moduleImgUrl = require("../../../assets/images/icon-14px-模板@1x-1.png");
            this.isModuleCardDisable = false;
            this.moduleCardImgUrl = require("../../../assets/images/icon-14px-卡片@1x.png");
            if (this.cardButtonList.length == 4) {
                this.$message({
                    type: "warning",
                    message: "最多存在4个按钮！",
                    center: true,
                });
                return;
            }
            if (data == 10) {
                this.cardButtonList.push({ title: "回复消息" });
                this.isCardButtonText = false;
                if (this.form.cardContentValue == "") {
                    this.isCardContent = true;
                } else {
                    this.isCardContent = false;
                }
                if (this.form.cardTitleValue == "") {
                    this.isCardTitle = true;
                } else {
                    this.isCardTitle = false;
                }
                this.isCardButtonDisable = true;
                this.type = 12;
            } else if (data == 11) {
                this.cardButtonList.push({ title: "打开链接" });
                this.isCardButtonText = false;
                if (this.form.cardContentValue == "") {
                    this.isCardContent = true;
                } else {
                    this.isCardContent = false;
                }
                if (this.form.cardTitleValue == "") {
                    this.isCardTitle = true;
                } else {
                    this.isCardTitle = false;
                }
                this.isCardButtonDisable = true;
                this.type = 12;
            } else if (data == 12) {
                this.cardButtonList.push({ title: "拨打电话" });
                this.isCardButtonText = false;
                if (this.form.cardContentValue == "") {
                    this.isCardContent = true;
                } else {
                    this.isCardContent = false;
                }
                if (this.form.cardTitleValue == "") {
                    this.isCardTitle = true;
                } else {
                    this.isCardTitle = false;
                }
                this.isCardButtonDisable = true;
                this.type = 12;
            } else if (data == 13) {
                // this.cardButtonList.push("分享位置" );
                // this.isCardButtonText = false;
                // if(this.form.cardContentValue == ''){
                //     this.isCardContent = true;
                // }else{
                //     this.isCardContent = false;
                // }
                // if(this.form.cardTitleValue == ''){
                //     this.isCardTitle = true;
                // }else{
                //     this.isCardTitle = false;
                // }
                // this.isCardButtonDisable = true;
                // this.type = 12;
                return;
            }
            //   this.cardButtonList = this.cardButtonList.filter((item, index) => {
            //     let brr = [];
            //     this.cardButtonList.forEach((items) => {
            //       brr.push(items);
            //     });
            //     return brr.indexOf(item) == index;
            //   });

            // let newobj = {};
            // this.cardButtonList = this.cardButtonList .reduce((preVal, curVal) => {
            //     newobj[curVal.title] ? '' : newobj[curVal.title] = preVal.push(curVal);
            //     return preVal
            // }, [])
            //   ev.target.appendChild(document.getElementById(data));
        },
        allowDropF (ev) {
            //放到何处
            ev.preventDefault();
        },
        dragF (ev, index) {
            //拖动什么
            //
            ev.dataTransfer.setData("Text", index + 10);
        },
        dropF (ev) {
            //进行放置
            ev.preventDefault();
            var data = ev.dataTransfer.getData("Text");
            this.isModuleDisable = false;
            this.moduleImgUrl = require("../../../assets/images/icon-14px-模板@1x-1.png");
            this.isModuleCardDisable = false;
            this.moduleCardImgUrl = require("../../../assets/images/icon-14px-卡片@1x.png");
            if (this.buttonList.length == 4) {
                this.$message({
                    type: "warning",
                    message: "最多存在4个按钮！",
                    center: true,
                });
                return;
            }
            if (data == 10) {
                this.buttonList.push({ title: "回复消息" });
                this.isButtonText = false;
                this.isCardButtonDisable = false;
                this.isButtonDisable = true;
                if (this.form.cardContentValue == "") {
                    this.isCardContent = true;
                } else {
                    this.isCardContent = false;
                }
                if (this.form.cardTitleValue == "") {
                    this.isCardTitle = true;
                } else {
                    this.isCardTitle = false;
                }
                this.type = 4;
            } else if (data == 11) {
                this.buttonList.push({ title: "打开链接" });
                this.isButtonText = false;
                this.isCardButtonDisable = false;
                this.isButtonDisable = true;
                if (this.form.cardContentValue == "") {
                    this.isCardContent = true;
                } else {
                    this.isCardContent = false;
                }
                if (this.form.cardTitleValue == "") {
                    this.isCardTitle = true;
                } else {
                    this.isCardTitle = false;
                }
                this.type = 4;
            } else if (data == 12) {
                this.buttonList.push({ title: "拨打电话" });
                this.isButtonText = false;
                this.isCardButtonDisable = false;
                this.isButtonDisable = true;
                if (this.form.cardContentValue == "") {
                    this.isCardContent = true;
                } else {
                    this.isCardContent = false;
                }
                if (this.form.cardTitleValue == "") {
                    this.isCardTitle = true;
                } else {
                    this.isCardTitle = false;
                }
                this.type = 4;
            } else if (data == 13) {
                // this.buttonList.push("分享位置" );
                // this.isButtonText = false;
                // this.isCardButtonDisable = false;
                // this.isButtonDisable = true;
                // if(this.form.cardContentValue == ''){
                //     this.isCardContent = true;
                // }else{
                //     this.isCardContent = false;
                // }
                // if(this.form.cardTitleValue == ''){
                //     this.isCardTitle = true;
                // }else{
                //     this.isCardTitle = false;
                // }
                // this.type = 4;
                return;
            }
            // this.buttonList = this.buttonList.filter((item, index) => {
            //     let brr = [];
            //     this.buttonList.forEach((items) => {
            //     brr.push(items);
            //     });
            //     return brr.indexOf(item) == index;
            // });

            // let newobj = {};
            // this.buttonList = this.buttonList .reduce((preVal, curVal) => {
            //     newobj[curVal.title] ? '' : newobj[curVal.title] = preVal.push(curVal);
            //     return preVal
            // }, [])
            //   ev.target.appendChild(document.getElementById(data));
        },
    },
    mounted () {
        this.status = true;
        businessTypeList(["productType", "businessType"]).then((res) => {
            // this.businessOptions = res.data.data.businessType;
            // this.businessValue = res.data.data.businessType[0].id;
            this.productType = res.data.data.productType[0].id;
            getBusinessLis({ id: this.productType }).then(res => {
                if(res.data.data.length > 0){
                    this.businessOptions = res.data.data;
                    if(!this.$route.query.id){
                        this.businessValue = res.data.data[0].id;
                        this.handleChangeGetApp();
                    }else{
                        this.handleChangeGetApp();
                    }
                }
            })
        });
        // channelList({ enterpriseAccountAppId: this.appValue, businessTypeConfigId: this.businessValue }).then(res => {
        //     this.channelOptions = res.data.data;
        //     console.log(this.channelOptions)
        // })
        this.$nextTick(()=>{
            if (this.$route.query.jum == "text") {
                this.msg = "拖拽文本组件至此";
                this.handleText();
                this.msgValue = "0";
                if (this.$route.query.id) {
                    MessageMould({ messageMouldId: this.$route.query.id })
                        .then((res) => {
                            if (res.data.data.checkStatus) {
                                if (res.data.data.checkStatus == 1) {
                                    this.checkStatus = 1
                                }
                            }
                            //1.0消息
                            if (res.data.data.fallbackDTO) {
                                this.oneId = res.data.data.fallbackDTO.id;
                                if (res.data.data.fallbackDTO.messageMouldType == 0) {
                                    this.form.descOne = res.data.data.fallbackDTO.content;
                                    this.istype18 = true;
                                } else {
                                    this.fileIdOne = res.data.data.fallbackDTO.fileGroupDetail.id;
                                    this.messageMouldTypeOne = 1;
                                    if (res.data.data.fallbackDTO.fileGroupDetail.fileType == 1) {
                                        this.istype19 = true;
                                        this.imageUrlOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUrl;
                                        this.form.textImgUrlOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUrl;
                                        this.form.textImgTypeOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUploadType;
                                    } else if (
                                        res.data.data.fallbackDTO.fileGroupDetail.fileType == 2
                                    ) {
                                        this.istype20 = true;
                                        this.audioUrlOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUrl;
                                        this.form.textAudioUrlOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUrl;
                                        this.form.textAudioTypeOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUploadType;
                                    } else if (
                                        res.data.data.fallbackDTO.fileGroupDetail.fileType == 3
                                    ) {
                                        this.istype21 = true;
                                        this.playerOptionsOne.sources[0].src =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUrl;
                                        this.form.textVideoUrlOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUrl;
                                        this.form.textVideoTypeOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUploadType;
                                    }
                                }
                            }
                            //sms消息
                            if (res.data.data.smsFallbackDTO) {
                                this.smsId = res.data.data.smsFallbackDTO.id;
                                if (res.data.data.smsFallbackDTO.messageMouldType == 0) {
                                    this.form.descSMS = res.data.data.smsFallbackDTO.content;
                                    this.istype22 = true;
                                }
                            }
                            //底部菜单按钮
                            if (res.data.data.suggestions.length > 0) {
                                this.buttonList = res.data.data.suggestions;
                                var json2 = { data: "nihao" };
                                this.buttonList.map((res, index) => {
                                    if (res.reply) {
                                        res.title = "回复消息";
                                        this.arr.push(res);
                                    } else if (
                                        JSON.stringify(this.buttonList[index]).indexOf(
                                            JSON.stringify(json2)
                                        ) > 0
                                    ) {
                                        res.title = "打开链接";
                                        this.brr.push(res);
                                    } else {
                                        res.title = "拨打电话";
                                        this.crr.push(res);
                                    }
                                });
                                this.$nextTick(() => {
                                    this.getText();
                                });
                                this.buttonValue = true;
                                this.isButtonText = false;
                            }
                            this.form.id = res.data.data.id;
                            this.type = 3;
                            this.handleInput();
                            this.form.name = res.data.data.name;
                            this.appValue = res.data.data.enterpriseAccountAppId;
                            // this.channelValue = res.data.data.channelId;
                            this.businessValue = res.data.data.businessType;
                            this.form.desc = res.data.data.content;
                            if (res.data.data.messageFall == 0) {
                                this.msgBackValue = true;
                                // this.checkList = ["回落到UP1.0", "回落到SMS"];
                                this.isUP = true;
                                // this.isSMS = true;
                            } else {
                                this.msgBackValue = false;
                            }
                            this.$nextTick(() => {
                                this.Num = -1;
                            });
                        })
                        .catch((error) => {
                            this.$message.error({
                                message: error,
                                center: true,
                            });
                        });
                }
            } else if (this.$route.query.jum == "change") {
                this.msg = "拖拽文本组件至此";
                this.handleText();
                this.msgValue = "3";
                if (this.$route.query.id) {
                    MessageMould({ messageMouldId: this.$route.query.id })
                        .then((res) => {
                            var offset = 0;
                            do {
                                offset = res.data.data.content.indexOf('{ 变量', offset);
                                if (offset != -1) {
                                    this.number++;
                                    offset += '{ 变量'.length;
                                }
                            } while (offset != -1)
                            if (res.data.data.checkStatus) {
                                if (res.data.data.checkStatus == 1) {
                                    this.checkStatus = 1
                                }
                            }
                            //1.0消息
                            if (res.data.data.fallbackDTO) {
                                this.oneId = res.data.data.fallbackDTO.id;
                                if (res.data.data.fallbackDTO.messageMouldType == 0) {
                                    this.form.descChangeOne = res.data.data.fallbackDTO.content;
                                    this.istype42 = true;
                                } else {
                                    this.fileIdOne = res.data.data.fallbackDTO.fileGroupDetail.id;
                                    this.messageMouldTypeOne = 1;
                                    if (res.data.data.fallbackDTO.fileGroupDetail.fileType == 1) {
                                        this.istype19 = true;
                                        this.imageUrlOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUrl;
                                        this.form.textImgUrlOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUrl;
                                        this.form.textImgTypeOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUploadType;
                                    } else if (
                                        res.data.data.fallbackDTO.fileGroupDetail.fileType == 2
                                    ) {
                                        this.istype20 = true;
                                        this.audioUrlOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUrl;
                                        this.form.textAudioUrlOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUrl;
                                        this.form.textAudioTypeOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUploadType;
                                    } else if (
                                        res.data.data.fallbackDTO.fileGroupDetail.fileType == 3
                                    ) {
                                        this.istype21 = true;
                                        this.playerOptionsOne.sources[0].src =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUrl;
                                        this.form.textVideoUrlOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUrl;
                                        this.form.textVideoTypeOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUploadType;
                                    }
                                }
                            }
                            //sms消息
                            if (res.data.data.smsFallbackDTO) {
                                this.smsId = res.data.data.smsFallbackDTO.id;
                                if (res.data.data.smsFallbackDTO.messageMouldType == 0) {
                                    this.form.descChangeSMS = res.data.data.smsFallbackDTO.content;
                                    this.istype43 = true;
                                }
                            }
                            //底部菜单按钮
                            if (res.data.data.suggestions.length > 0) {
                                this.buttonList = res.data.data.suggestions;
                                var json2 = { data: "nihao" };
                                this.buttonList.map((res, index) => {
                                    if (res.reply) {
                                        res.title = "回复消息";
                                        this.arr.push(res);
                                    } else if (
                                        JSON.stringify(this.buttonList[index]).indexOf(
                                            JSON.stringify(json2)
                                        ) > 0
                                    ) {
                                        res.title = "打开链接";
                                        this.brr.push(res);
                                    } else {
                                        res.title = "拨打电话";
                                        this.crr.push(res);
                                    }
                                });
                                this.$nextTick(() => {
                                    this.getText();
                                });
                                this.buttonValue = true;
                                this.isButtonText = false;
                            }
                            this.form.id = res.data.data.id;
                            this.type = 41;
                            this.handleInputChange();
                            this.form.name = res.data.data.name;
                            this.appValue = res.data.data.enterpriseAccountAppId;
                            // this.channelValue = res.data.data.channelId;
                            this.businessValue = res.data.data.businessType;
                            this.form.descChange = res.data.data.content;
                            if (res.data.data.messageFall == 0) {
                                this.msgBackValue = true;
                                // this.checkList = ["回落到UP1.0", "回落到SMS"];
                                this.isUP = true;
                                // this.isSMS = true;
                            } else {
                                this.msgBackValue = false;
                            }
                            this.$nextTick(() => {
                                this.Num = -1;
                            });
                        })
                        .catch((error) => {
                            this.$message.error({
                                message: error,
                                center: true,
                            });
                        });
                }
            } else if (this.$route.query.jum == "file") {
                this.msgValue = "1";
                this.msg = "拖拽文件组件至此";
                this.handleFile();
                if (this.$route.query.id) {
                    MessageMould({ messageMouldId: this.$route.query.id })
                        .then((res) => {
                            if (res.data.data.checkStatus) {
                                if (res.data.data.checkStatus == 1) {
                                    this.checkStatus = 1
                                }
                            }
                            //1.0消息
                            if (res.data.data.fallbackDTO) {
                                this.oneId = res.data.data.fallbackDTO.id;
                                if (res.data.data.fallbackDTO.messageMouldType == 0) {
                                    this.form.descOne = res.data.data.fallbackDTO.content;
                                    this.istype18 = true;
                                } else {
                                    this.fileIdOne = res.data.data.fallbackDTO.fileGroupDetail.id;
                                    this.messageMouldTypeOne = 1;
                                    if (res.data.data.fallbackDTO.fileGroupDetail.fileType == 1) {
                                        this.istype19 = true;
                                        this.imageUrlOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUrl;
                                        this.form.textImgUrlOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUrl;
                                        this.form.textImgTypeOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUploadType;
                                    } else if (
                                        res.data.data.fallbackDTO.fileGroupDetail.fileType == 2
                                    ) {
                                        this.istype20 = true;
                                        this.audioUrlOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUrl;
                                        this.form.textAudioUrlOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUrl;
                                        this.form.textAudioTypeOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUploadType;
                                    } else if (
                                        res.data.data.fallbackDTO.fileGroupDetail.fileType == 3
                                    ) {
                                        this.istype21 = true;
                                        this.playerOptionsOne.sources[0].src =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUrl;
                                        this.form.textVideoUrlOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUrl;
                                        this.form.textVideoTypeOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUploadType;
                                    }
                                }
                            }
                            //sms消息
                            if (res.data.data.smsFallbackDTO) {
                                this.smsId = res.data.data.smsFallbackDTO.id;
                                if (res.data.data.smsFallbackDTO.messageMouldType == 0) {
                                    this.form.descSMS = res.data.data.smsFallbackDTO.content;
                                    this.istype22 = true;
                                }
                            }
                            //底部菜单按钮
                            if (res.data.data.suggestions.length > 0) {
                                this.buttonList = res.data.data.suggestions;
                                var json2 = { data: "nihao" };
                                this.buttonList.map((res, index) => {
                                    if (res.reply) {
                                        res.title = "回复消息";
                                        this.arr.push(res);
                                    } else if (
                                        JSON.stringify(this.buttonList[index]).indexOf(
                                            JSON.stringify(json2)
                                        ) > 0
                                    ) {
                                        res.title = "打开链接";
                                        this.brr.push(res);
                                    } else {
                                        res.title = "拨打电话";
                                        this.crr.push(res);
                                    }
                                });
                                this.$nextTick(() => {
                                    this.getText();
                                });
                                this.buttonValue = true;
                                this.isButtonText = false;
                            }
                            //文件
                            getFile({ fileGroupDetailId: res.data.data.fileGroupDetailId })
                                .then((res) => {
                                    this.fileIdTow = res.data.data.id;
                                    if (res.data.data.fileType == 1) {
                                        this.type = 8;
                                        this.istype8 = true;
                                        this.isBoxTT = true;
                                        this.imageUrl = res.data.data.fileUrl;
                                        this.form.textImgUrl = res.data.data.fileUrl;
                                        this.form.textImgType = res.data.data.fileUploadType;
                                    } else if (res.data.data.fileType == 2) {
                                        this.type = 9;
                                        this.istype9 = true;
                                        this.isBoxTT = true;
                                        this.audioUrl = res.data.data.fileUrl;
                                        this.form.textAudioUrl = res.data.data.fileUrl;
                                        this.form.textAudioType = res.data.data.fileUploadType;
                                    } else if (res.data.data.fileType == 3) {
                                        this.type = 10;
                                        this.istype10 = true;
                                        this.isBoxTT = true;
                                        this.playerOptions.sources[0].src = res.data.data.fileUrl;
                                        this.form.textVideoUrl = res.data.data.fileUrl;
                                        this.form.textVideoType = res.data.data.fileUploadType;
                                    }
                                })
                                .catch((error) => {
                                    this.$message.error({
                                        message: error,
                                        center: true,
                                    });
                                });
                            this.form.id = res.data.data.id;
                            this.form.name = res.data.data.name;
                            this.appValue = res.data.data.enterpriseAccountAppId;
                            // this.channelValue = res.data.data.channelId;
                            this.businessValue = res.data.data.businessType;
                            if (res.data.data.messageFall == 0) {
                                this.msgBackValue = true;
                                // this.checkList = ["回落到UP1.0", "回落到SMS"];
                                this.isUP = true;
                                // this.isSMS = true;
                            } else {
                                this.msgBackValue = false;
                            }
                            this.$nextTick(() => {
                                this.Num = -1;
                            });
                        })
                        .catch((error) => {
                            this.$message.error({
                                message: error,
                                center: true,
                            });
                        });
                }
            } else if (this.$route.query.jum == "card") {
                this.msgValue = "2";
                this.msg = "拖拽文件组件至此";
                this.handleFile();
                this.isCard = true;
                this.buttonValue = true;
                this.isCardShow = true;
                this.isModuleDisable = true;
                this.moduleImgUrl = require("../../../assets/images/icon-14px-模板@1x.png");
                if (this.$route.query.id) {
                    MessageMould({ messageMouldId: this.$route.query.id })
                        .then((res) => {
                            if (res.data.data.checkStatus) {
                                if (res.data.data.checkStatus == 1) {
                                    this.checkStatus = 1
                                }
                            }
                            //1.0消息
                            if (res.data.data.fallbackDTO) {
                                this.oneId = res.data.data.fallbackDTO.id;
                                if (res.data.data.fallbackDTO.messageMouldType == 0) {
                                    this.form.descOne = res.data.data.fallbackDTO.content;
                                    this.istype18 = true;
                                } else {
                                    this.fileIdOne = res.data.data.fallbackDTO.fileGroupDetail.id;
                                    this.messageMouldTypeOne = 1;
                                    if (res.data.data.fallbackDTO.fileGroupDetail.fileType == 1) {
                                        this.istype19 = true;
                                        this.imageUrlOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUrl;
                                        this.form.textImgUrlOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUrl;
                                        this.form.textImgTypeOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUploadType;
                                    } else if (
                                        res.data.data.fallbackDTO.fileGroupDetail.fileType == 2
                                    ) {
                                        this.istype20 = true;
                                        this.audioUrlOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUrl;
                                        this.form.textAudioUrlOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUrl;
                                        this.form.textAudioTypeOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUploadType;
                                    } else if (
                                        res.data.data.fallbackDTO.fileGroupDetail.fileType == 3
                                    ) {
                                        this.istype21 = true;
                                        this.playerOptionsOne.sources[0].src =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUrl;
                                        this.form.textVideoUrlOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUrl;
                                        this.form.textVideoTypeOne =
                                            res.data.data.fallbackDTO.fileGroupDetail.fileUploadType;
                                    }
                                }
                            }
                            //sms消息
                            if (res.data.data.smsFallbackDTO) {
                                this.smsId = res.data.data.smsFallbackDTO.id;
                                if (res.data.data.smsFallbackDTO.messageMouldType == 0) {
                                    this.form.descSMS = res.data.data.smsFallbackDTO.content;
                                    this.istype22 = true;
                                }
                            }
                            //底部菜单按钮
                            if (res.data.data.suggestions.length > 0) {
                                this.buttonList = res.data.data.suggestions;
                                var json2 = { data: "nihao" };
                                this.buttonList.map((res, index) => {
                                    if (res.reply) {
                                        res.title = "回复消息";
                                        this.arr.push(res);
                                    } else if (
                                        JSON.stringify(this.buttonList[index]).indexOf(
                                            JSON.stringify(json2)
                                        ) > 0
                                    ) {
                                        res.title = "打开链接";
                                        this.brr.push(res);
                                    } else {
                                        res.title = "拨打电话";
                                        this.crr.push(res);
                                    }
                                });
                                this.$nextTick(() => {
                                    this.getText();
                                });
                                this.buttonValue = true;
                                this.isButtonText = false;
                            }
                            this.messageMouldId = res.data.data.id;
                            this.appValue = res.data.data.enterpriseAccountAppId;
                            // this.channelValue = res.data.data.channelId;
                            this.form.name = res.data.data.name;
                            this.businessValue = res.data.data.businessType;
                            if (res.data.data.messageFall == 0) {
                                this.msgBackValue = true;
                                // this.checkList = ["回落到UP1.0", "回落到SMS"];
                                this.isUP = true;
                                // this.isSMS = true;
                            } else {
                                this.msgBackValue = false;
                            }
                            this.handleCardSet();
                            this.isBoxTT = true;
                            this.$nextTick(() => {
                                this.Num = -1;
                            });
                        })
                        .catch((error) => {
                            this.$message.error({
                                message: error,
                                center: true,
                            });
                        });
                }
            }
        })
    },
    watch: {
        checkbox: function () {
            if (this.checkbox.length > 0) {
                this.count = 1;
            } else {
                this.count = 0;
            }
        },
        buttonValue (){
            this.$nextTick(()=>{
                if(this.msgValue != 2){
                    if(this.buttonValue){
                        this.$refs.button1.style.top = 575 + 'px'
                        this.$refs.button3.style.top = 600 + 'px'
                    }
                }
            })
        },
        msgValue (){
            this.$nextTick(()=>{
                if(this.msgValue == 2){
                    if(this.buttonValue){
                        this.$refs.button1.style.top = 740 + 'px'
                        this.$refs.button3.style.top = 765 + 'px'
                    }
                }
            })
        },
        isButtonText(){
            this.$nextTick(()=>{
                if(this.msgValue == 2){
                    if(!this.isButtonText){
                        this.$refs.button2.style.top = 778 + 'px'
                    }
                }else{
                    if(!this.isButtonText){
                        this.$refs.button2.style.top = 613 + 'px'
                    }
                }
            })
        },
        form: {
            handler (val) {
                if (val) {
                    this.Num++;
                    this.status = false;
                }
            },
            deep: true,
        },
    },
    components: {
        vuedraggable,
    },
};
